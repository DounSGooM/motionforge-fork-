// End-to-end two-scene compositor test: browser timelines -> MP4 clips -> crossfade -> validated H.264.
import assert from "node:assert/strict";
import { test } from "node:test";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RENDERER=path.join(ROOT, "engines/canvas/render.mjs");
function run(cmd,args){
  const v=spawnSync(cmd,args,{cwd:ROOT,encoding:"utf8",timeout:120000,maxBuffer:5*1024*1024});
  assert.equal(v.error,undefined,String(v.error));
  assert.equal(v.status,0,`${cmd} failed (${v.status}):\n${v.stdout}\n${v.stderr}`);
  return v.stdout;
}
function scene(dir,label,background,accent){
  fs.mkdirSync(dir,{recursive:true});
  const conf=JSON.stringify({label,background,accent}).replaceAll("<","\\u003c");
  fs.writeFileSync(path.join(dir,"index.html"),`<!doctype html><meta charset="utf-8">
<style>body{margin:0;background:${background};color:white;font:700 38px sans-serif}#text{padding:140px 32px}#bar{height:25px;width:0;background:${accent};position:absolute;top:300px}</style>
<div id="text"></div><div id="bar"></div><script>
const config=${conf};
window.SIZE=[320,568];window.DUR=1.5;window.READY=true;
window.render=(t)=>{
  document.getElementById("text").textContent=config.label;
  document.getElementById("bar").style.width=Math.round(300*t/1.5)+"px";
};
window.render(0);
</script>`,"utf8");
}
function videoInfo(file){
  return JSON.parse(run("ffprobe",["-v","error","-select_streams","v:0",
    "-show_entries","stream=codec_name,width,height,nb_frames,r_frame_rate:format=duration",
    "-of","json",file]));
}
test("two distinct scenes produce a 2.5s crossfaded H.264 output", {timeout:180000},()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),"mf-two-scene-"));
 try {
   const a=path.join(dir,"scene-a"),b=path.join(dir,"scene-b");
   scene(a,"FIRST SCENE","#162238","#ffad52");
   scene(b,"SECOND SCENE","#45203d","#8de5c7");
   const first=path.join(dir,"first.mp4"),second=path.join(dir,"second.mp4");
   for(const [input,out] of [[a,first],[b,second]])
     run("node",[RENDERER,"video",input,"--size","320x568","--fps","10","--workers","2","--out",out]);
   for(const file of [first,second]){
     const meta=videoInfo(file);
     assert.equal(meta.streams[0].codec_name,"h264");
     assert.equal(Number(meta.streams[0].nb_frames),15);
   }
   const output=path.join(dir,"final.mp4");
   run("ffmpeg",["-hide_banner","-loglevel","error","-y","-i",first,"-i",second,
     "-filter_complex","[0:v]settb=AVTB,setpts=PTS-STARTPTS,format=yuv420p[v0];[1:v]settb=AVTB,setpts=PTS-STARTPTS,format=yuv420p[v1];[v0][v1]xfade=transition=fade:duration=0.5:offset=1.0,format=yuv420p[v]",
     "-map","[v]","-an","-c:v","libx264","-pix_fmt","yuv420p","-movflags","+faststart",output]);
   const info=videoInfo(output);
   assert.equal(info.streams[0].codec_name,"h264");
   assert.equal(info.streams[0].width,320);
   assert.equal(info.streams[0].height,568);
   assert.ok(Math.abs(Number(info.format.duration)-2.5)<0.15,JSON.stringify(info));
   assert.ok(Math.abs(Number(info.streams[0].nb_frames)-25)<=1,JSON.stringify(info));
   const frames=[];
   for(const sec of ["0.3","1.3","2.2"]){
     const f=path.join(dir,`t-${sec}.png`);
     run("ffmpeg",["-hide_banner","-loglevel","error","-y","-ss",sec,"-i",output,"-frames:v","1",f]);
     frames.push(fs.readFileSync(f));
   }
   assert.notDeepEqual(frames[0],frames[1],"crossfade must differ from first shot");
   assert.notDeepEqual(frames[1],frames[2],"crossfade must differ from last shot");
 } finally {fs.rmSync(dir,{recursive:true,force:true});}
});
