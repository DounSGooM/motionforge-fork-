"""Security regression tests for MotionForge hardening. Run with:
python3 -m unittest discover -s tests -p 'test_security_hardening.py' -v
"""
import importlib.util
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]

class SceneHardening(unittest.TestCase):
    def test_traversal_rejected(self):
        script = ROOT / "engines/hyperframes/scripts/new-scene.sh"
        with tempfile.TemporaryDirectory() as dest:
            run = subprocess.run(["bash", str(script), "demo", "--template", "../outside", "--dest", dest],
                                 cwd=ROOT, capture_output=True, text=True)
            self.assertNotEqual(run.returncode, 0)
            self.assertIn("template must be a slug", run.stderr)
            self.assertFalse((Path(dest) / "demo").exists())

    def test_rejects_multiple_path_attacks(self):
        script = ROOT / "engines/hyperframes/scripts/new-scene.sh"
        payloads = ("../outside", "..", "one/two", "one\\\\two", "space name", "x;touch", "$(id)", "a\\ncmd")
        with tempfile.TemporaryDirectory() as dest:
            for payload in payloads:
                with self.subTest(payload=payload):
                    run = subprocess.run(["bash", str(script), "demo", "--template", payload, "--dest", dest],
                                         cwd=ROOT, capture_output=True, text=True)
                    self.assertNotEqual(run.returncode, 0)
                    self.assertFalse((Path(dest) / "demo").exists())

    def test_inline_json_html_injection_is_inert(self):
        import json
        import re
        script = ROOT / "engines/hyperframes/scripts/new-scene.sh"
        payload = '</script><script>globalThis.__injected=true</script><script>'
        with tempfile.TemporaryDirectory() as tmp:
            tmp = Path(tmp)
            (tmp / "values.json").write_text(json.dumps({"eyebrow": payload}), encoding="utf-8")
            run = subprocess.run(["bash", str(script), "safe-title", "--template", "kinetic-title",
                                  "--params", str(tmp / "values.json"), "--dest", str(tmp)],
                                 cwd=ROOT, capture_output=True, text=True)
            self.assertEqual(run.returncode, 0, run.stderr)
            html = (tmp / "safe-title/index.html").read_text(encoding="utf-8")
            match = re.search(r'<script id="params" type="application/json">(.*?)</script>', html, re.S)
            self.assertIsNotNone(match)
            self.assertEqual(json.loads(match.group(1))["eyebrow"], payload)
            self.assertNotIn('</script><script>globalThis.__injected', html)

    def test_json_script_escaping(self):
        text = (ROOT / "engines/hyperframes/scripts/new-scene.sh").read_text()
        self.assertIn('replace("<", "\\\\u003c")', text)
        self.assertIn('replace(">", "\\\\u003e")', text)

class RendererHardening(unittest.TestCase):
    def test_network_default_deny(self):
        text = (ROOT / "engines/canvas/render.mjs").read_text()
        self.assertIn('serviceWorkers: "block"', text)
        self.assertIn('allowedOrigin', text)
        self.assertIn('route.abort("blockedbyclient")', text)

class AvatarHardening(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        spec = importlib.util.spec_from_file_location("motionforge_avatar", ROOT / "tools/avatar/avatar.py")
        cls.avatar = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(cls.avatar)

    def test_api_redirect_rejected(self):
        self.avatar.check_url("https://api.wiro.ai/v1", ["api.wiro.ai"])
        with self.assertRaises(Exception):
            self.avatar._SafeRedirect(["api.wiro.ai"]).redirect_request(
                mock.Mock(), None, 302, "redirect", {}, "https://untrusted.invalid/path")

    def test_local_command_does_not_use_shell(self):
        args = self.avatar.local_command("python3 sync.py --video {video} --audio {audio} --out {out}",
                                         "clip;touch /tmp/unsafe", "audio.wav", "out.mp4")
        self.assertEqual(args[3], "clip;touch /tmp/unsafe")

if __name__ == "__main__":
    unittest.main()
