<div align="center">

# motionforge

**코딩 에이전트가 코드로 만드는 모션 디자인 영상.**

원하는 영상을 설명하세요. 에이전트가 훅과 대본을 쓰고, 단어 하나하나를 내레이션에 맞추고, 장면을 만들고, 렌더링한 뒤, 결과물을 보여 드리기 전에 직접 검토합니다.

[English](../../README.md) · [Türkçe](README.tr.md) · [Español](README.es.md) · [Português (BR)](README.pt-BR.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [हिन्दी](README.hi.md)

![license](https://img.shields.io/badge/license-MIT-C8F53A?style=flat-square) ![agents](https://img.shields.io/badge/agents-Claude%20Code%20%C2%B7%20Codex%20%C2%B7%20Cursor-111317?style=flat-square) ![engine](https://img.shields.io/badge/default%20engine-HyperFrames-111317?style=flat-square) ![languages](https://img.shields.io/badge/languages-10-111317?style=flat-square)

</div>

---

## 하는 일

예를 들어 이렇게 입력합니다.

> 내가 매일 쓰는 무료 도구 5가지를 소개하는 60초짜리 세로 릴스를 만들어 줘. 다크 스타일, 내 목소리, 자막 포함.

motionforge는 정해진 단계를 거쳐 이를 검수된 MP4로 만듭니다.

| 단계 | 하는 일 |
|---|---|
| **브리프** | 에이전트가 요청을 한 문장으로 다시 정리하고, 빠진 정보(포맷, 길이, 언어, 목소리)만 묻습니다. |
| **훅과 대본** | 훅 후보 2–3개, 말하는 속도에 맞춘 대본, 그리고 직접 확인해야 할 사실 주장 목록을 만듭니다. 통계를 지어내지 않습니다. 흔한 "AI 말투"도 쓰지 않습니다(10개 언어별 금지 표현 목록). |
| **음성** | 직접 발급받은 TTS 키(ElevenLabs, OpenAI)나 로컬 모델을 사용합니다. 유료 호출 전에는 에이전트가 비용을 알리고 "네"라는 답을 기다립니다. |
| **타이밍** | 내레이션에서 단어 단위 타임스탬프를 추출해, 모든 제목, 로고, 자막이 해당 단어가 발화되는 순간에 나타나게 합니다. |
| **스타일과 브랜드** | 스타일 라이브러리에서 룩을 고르고 `brand.json`(색상, 폰트, 로고, 워터마크, 아웃트로)을 적용합니다. |
| **장면** | 어느 시점으로든 이동할 수 있는 결정적(deterministic) 코드로 만듭니다. 기본은 HyperFrames(HTML + GSAP)이고, 더 잘 맞을 때는 Remotion이나 canvas 엔진을 씁니다. |
| **QA** | 콘택트 시트, 텍스트 넘침과 세이프 영역 검사, 화면 텍스트 읽기 시간, 라우드니스를 확인하고, 장면을 직접 쓰지 않은 새 컨텍스트의 비평가가 검토합니다. |
| **전달** | 9:16 / 1:1 / 16:9 MP4, 커버 이미지, 자막, 게시물 설명을 제공합니다. 수정은 타임스탬프로 요청합니다: "0:12의 제목을 바꿔 줘". |

## 설치

### Claude Code (플러그인)

```text
/plugin marketplace add aykutucesai/motionforge
/plugin install motionforge@motionforge
```

그다음에는 영상을 요청하기만 하면 됩니다. `motion-director` 스킬이 이어서 진행합니다.

### Codex, Cursor 등 다른 에이전트

```bash
git clone https://github.com/aykutucesai/motionforge
```

폴더를 열고(또는 프로젝트에 추가하고) 에이전트가 [`AGENTS.md`](../../AGENTS.md)를 따르도록 지정합니다. 모든 스킬은 정확한 명령어가 담긴 일반 Markdown이므로, 파일을 읽고 셸을 실행할 수 있는 에이전트라면 그대로 따라 할 수 있습니다.

### 요구 사항

- Node.js 18 이상(22 권장)과 ffmpeg
- Python 3.10 이상
- 선택: `faster-whisper`(단어 타이밍), `rembg`(말하는 인물 배경 제거), `fonttools`(글리프 검사), Playwright Chromium

에이전트가 작업을 시작할 때 이를 확인하고, 무엇을 설치해야 하는지 정확히 알려 줍니다.

## 이런 프롬프트를 써 보세요

```text
이 내레이션(voice.mp3)을 9:16 릴스로 만들어 줘. 키네틱 자막, 다크 스타일, 내가 언급하는 모든 제품에는 실제 로고를 넣어 줘.
```
```text
이 스크린숏 4장으로 내 앱의 30초짜리 출시 영상을 만들어 줘. 내 브랜드 키트를 써 줘.
```
```text
소프트웨어 비용 절약에 관한 스페인어 훅 후보 3개와 70초 대본을 써 줘. 오디오는 아직 만들지 마.
```
```text
책상에 앉아 있는 내 모습을 찍은 10초 클립이야. 처음 5초는 인트로, 마지막 5초는 아웃트로로 쓰고, 그 사이에는 그래픽을 넣어 줘.
```

## 구성

```
motionforge/
├─ AGENTS.md                 모든 에이전트의 진입점
├─ skills/
│  ├─ motion-director/       전체 워크플로와 승인 단계
│  ├─ script-and-hooks/      훅, 대본, 사실 주장 목록, 금지 표현(10개 언어)
│  ├─ voice-and-timing/      동의 후에만 실행하는 TTS, 단어 타이밍, 자막, 라우드니스
│  ├─ style-library/         룩 20종, 룩마다 STYLE.md 하나
│  ├─ brand-kit/             brand.json: 색상, 폰트, 로고, 워터마크, 아웃트로
│  └─ qa-review/             검사 + 독립 비평가
├─ engines/
│  ├─ hyperframes/           기본 엔진(HTML + GSAP, Apache-2.0)
│  ├─ remotion/              선택형 React 엔진 + 키트
│  └─ canvas/                손그림 및 절차적 룩을 위한 frame = f(t) 페이지
├─ templates/                바로 쓰는 장면: 키네틱 타이틀, 자막, 카운터, 브라우저, 휴대폰, 채팅, 체크리스트, 커버
└─ tools/                    단어 타이밍, 배경 제거, 라우드니스, 콘택트 시트, 텍스트 검사, 내보내기, 커버 세이프 영역
```

## 원칙

1. **기본 구성은 누구나 무료입니다.** 기본 엔진인 HyperFrames는 Apache-2.0입니다. Remotion은 선택 사항입니다([라이선스](../LICENSING.md) 참고).
2. **결정적입니다.** 모든 프레임은 시간의 함수입니다. 입력이 같으면 영상도 같습니다.
3. **동의 없는 유료 작업은 없습니다.** 에이전트가 먼저 비용을 알립니다.
4. **콘텐츠는 정직해야 합니다.** 출처가 필요한 주장은 목록으로 정리해 드리고, 목업 화면은 목업임을 밝힙니다.
5. **전달 전에 검수합니다.** QA에 해결되지 않은 실패 항목이 있으면 영상을 전달하지 않습니다.

## 언어

스킬 지침은 에이전트를 위해 영어로 작성되어 있습니다. 에이전트는 사용자의 언어로 대화하고, 대본·자막·화면 텍스트는 영상의 언어로 씁니다. 훅 패턴과 금지 표현 목록은 번역이 아니라 다음 각 언어로 직접 작성되어 있습니다.

English · Türkçe · Español · Português (Brasil) · Français · Deutsch · 简体中文 · 日本語 · 한국어 · हिन्दी

## 라이선스

motionforge는 [MIT 라이선스](../../LICENSE)로 배포됩니다. 각자의 라이선스를 따르는 서드파티 도구를 호출하므로 [THIRD_PARTY.md](../../THIRD_PARTY.md)와 쉬운 말로 정리한 가이드 [docs/LICENSING.md](../LICENSING.md)를 참고하세요. 요약하면 HyperFrames는 Apache-2.0이고, GSAP는 npm에서 자체 라이선스로 설치되며, Remotion은 개인과 직원 3명 이하 회사에는 무료이고 그보다 큰 회사는 회사 라이선스가 필요합니다.

## 기여하기

이슈와 풀 리퀘스트를 환영합니다. 새 스타일, 템플릿, 언어 목록, 엔진 개선 모두 좋습니다. 먼저 [CONTRIBUTING.md](../../CONTRIBUTING.md)를 읽어 주세요.

---

<div align="center">

Made by <a href="https://www.instagram.com/aykutucesai/">Aykut Üçeş</a> · <a href="https://x.com/Aykutuces">@Aykutuces</a>

</div>
