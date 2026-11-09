// Execute real Chromium against an intentionally hostile local scene.
// npm install --no-save --ignore-scripts playwright && npx playwright install chromium
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { once } from "node:events";
import { test } from "node:test";
import { openPage, serveDir } from "../engines/canvas/render.mjs";

test("real browser blocks external, loopback-other-port, and WebSocket requests", async () => {
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),"mf-security-"));
  let foreign, session;
  try {
    fs.writeFileSync(path.join(dir,"index.html"), `<!doctype html><script>
    window.READY=true; window.DUR=1; window.render=()=>{};
    </script>`);
    foreign=http.createServer((req,res)=>res.end("other-service-secret"));
    foreign.listen(0,"127.0.0.1");
    await once(foreign,"listening");
    const p=foreign.address().port;
    const upgradeCount={n:0};
    foreign.on("upgrade",(req,socket)=>{upgradeCount.n++;socket.destroy();});
    session=await openPage(path.join(dir,"index.html"),{timeoutMs:5000});
    const results=await session.page.evaluate(async (port)=>{
      const attempts=[
        fetch("https://example.com/").then(()=>"allowed",()=>"blocked"),
        fetch("http://127.0.0.1:"+port+"/private").then(()=>"allowed",()=>"blocked"),
        new Promise(resolve=>{
          const ws=new WebSocket("ws://127.0.0.1:"+port+"/ws");
          ws.onopen=()=>{ws.close();resolve("allowed");};
          ws.onerror=()=>resolve("blocked");
          setTimeout(()=>resolve("timeout"),3000);
        })
      ];
      return Promise.all(attempts);
    },p);
    assert.deepEqual(results,["blocked","blocked","blocked"]);
    assert.equal(upgradeCount.n,0);
    assert.equal(await session.page.evaluate(()=>fetch("./index.html").then(r=>r.ok)),true);
  } finally {
    if(session) await session.close();
    if(foreign) await new Promise(resolve=>foreign.close(resolve));
    fs.rmSync(dir,{recursive:true,force:true});
  }
});

test("static scene server rejects symlink and traversal and malformed encodings", async ()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),"mf-path-"));
  const privateDir=fs.mkdtempSync(path.join(os.tmpdir(),"mf-outside-"));
  let server;
  try{
    fs.writeFileSync(path.join(dir,"index.html"),"ok");
    fs.writeFileSync(path.join(privateDir,"secret.txt"),"PRIVATE");
    fs.symlinkSync(path.join(privateDir,"secret.txt"),path.join(dir,"linked.txt"));
    const bound=await serveDir(dir);
    server=bound.server;
    const base="http://127.0.0.1:"+bound.port;
    assert.equal((await fetch(base+"/index.html")).status,200);
    assert.equal((await fetch(base+"/linked.txt")).status,403);
    assert.equal((await fetch(base+"/%GG")).status,400);
    const traversal=await fetch(base+"/%2e%2e%2fsecret.txt");
    assert.notEqual(traversal.status,200);
  }finally{
    if(server) await new Promise(resolve=>server.close(resolve));
    fs.rmSync(dir,{recursive:true,force:true});
    fs.rmSync(privateDir,{recursive:true,force:true});
  }
});
