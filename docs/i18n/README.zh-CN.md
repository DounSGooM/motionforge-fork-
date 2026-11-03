<div align="center">

# motionforge

**动态设计视频，由你的编程智能体用代码写出来。**

描述你想要的视频。你的智能体会写好开头钩子和脚本，把每个词对齐到配音，搭建 2D 和 3D 场景，完成渲染，并在交给你之前先检查自己的成果。

[English](../../README.md) · [Türkçe](README.tr.md) · [Español](README.es.md) · [Português (BR)](README.pt-BR.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [हिन्दी](README.hi.md)

![license](https://img.shields.io/badge/license-MIT-C8F53A?style=flat-square) ![agents](https://img.shields.io/badge/agents-Claude%20Code%20%C2%B7%20Codex%20%C2%B7%20Cursor-111317?style=flat-square) ![styles](https://img.shields.io/badge/styles-100-111317?style=flat-square) ![3D](https://img.shields.io/badge/3D-three.js-111317?style=flat-square) ![languages](https://img.shields.io/badge/languages-10-111317?style=flat-square)

<img src="../media/hero.gif" alt="3D 主持人、带航线弧线的地球、创作者短视频、足球战术板和产品转台，全部由 motionforge 渲染" width="900">

</div>

---

## 亮点

| | |
|---|---|
| **20 个类别，100 种风格** | 创作者、电商、房地产、足球、纪录片、教育、科技、金融、美食、健身、旅行、活动、新闻、商业、游戏、儿童、时尚、汽车、艺术指导和公益组织。每种风格都是一份完整规范：配色、字体、版式、动效、剪辑节奏、声音和标志性场景。 |
| **基于 three.js 的 3D 场景** | 产品转台展示、带航线弧线的地球、带步行距离圈的城市、自动搭建的房屋、足球战术场地、3D 图表。结果确定、逐帧精确、离线渲染。 |
| **会说话的角色和头像** | 用代码搭建的 3D 主持人，或把你的照片、插画变成会说话的人偶。口型跟随配音。默认免费、本地运行。接入密钥后，还可以选用 fal.ai、Wiro 或本地的口型同步模型。 |
| **从脚本到交付** | 带 10 种语言禁用语清单的钩子和脚本、逐词计时、字幕、响度、联系表（contact sheet），以及交付前的独立评审。 |
| **未经你同意，不产生任何费用** | 每个付费调用（配音、视频、口型同步）都会先说明要生成什么以及预估费用，然后等待确认。密钥只从你的环境变量读取。 |

## 工作方式

你输入类似这样的内容：

> 为我的房产账号做一条 45 秒的短视频，介绍这套公寓。要有周边地图、3D 户型图、我的声音和字幕。

motionforge 会经过固定的几个阶段，把它变成一个检查过的 MP4：

| 阶段 | 做什么 |
|---|---|
| **需求确认** | 智能体用一句话复述你的需求，只询问缺少的信息（画幅、时长、语言、配音）。 |
| **钩子与脚本** | 2–3 个开头钩子选项、一份按口语节奏写的脚本，以及一份需要你核实的事实陈述清单。不编造数据，不用套路化的“AI 腔”。 |
| **配音** | 你自己的录音、本地 TTS 模型，或在你确认费用后使用你的密钥调用付费 TTS。 |
| **计时** | 逐词时间戳，让每个标题、标志和字幕都准确落在说出的那个词上。 |
| **风格与品牌** | 风格库中的一种风格，加上你的 `brand.json`（颜色、字体、标志、水印、片尾）。 |
| **场景** | 可跳转到任意一帧、结果确定的代码：默认使用 HyperFrames（HTML + GSAP，3D 部分用 three.js），更合适时使用 Remotion 或 canvas 引擎。 |
| **质检** | 联系表、文字溢出和安全区检查、阅读时长、响度、口型同步偏移，以及一位从未看过制作过程、上下文全新的评审。 |
| **交付** | 9:16 / 1:1 / 16:9 的 MP4、封面图、字幕和发布文案。按时间点修改：“把 0:12 处的标题换掉”。 |

## 风格库

<p align="center"><img src="../media/styles.gif" alt="20 种 motionforge 风格的动态预览" width="720"></p>

100 种外观，按使用它们的账号类型分组。每个类别举几个例子：

| 类别 | 风格（示例） |
|---|---|
| 创作者与个人品牌 | `creator-reels-dark`, `talking-head-pop`, `podcast-clip-studio`, `vlog-film-diary`, `cinematic-quote` |
| 电商与产品 | `product-hero-turntable`, `flash-sale`, `unboxing-pop`, `ugc-testimonial`, `before-after-split` |
| 房地产与地图 | `map-flyover-pins`, `floorplan-draw-on`, `neighborhood-guide`, `listing-tour-cards`, `luxury-estate` |
| 足球与体育 | `matchday-graphics`, `tactics-board`, `player-stat-card`, `transfer-breaking`, `telestrator-replay` |
| 纪录片与叙事 | `archival-newsreel`, `true-crime-board`, `history-map-campaign`, `interview-doc`, `cosmos-scale` |
| 教育、科技、金融、新闻、美食、旅行、活动、时尚…… | 见完整目录 |

完整目录，每种风格一行说明：[skills/style-library/styles/README.md](../../skills/style-library/styles/README.md)。

## 3D 场景

<p align="center"><img src="../media/3d.gif" alt="六个 3D 模板：产品转台、地球、城市定位、房屋搭建、战术场地、柱状图" width="600"></p>

为 HyperFrames 引擎提供的 three.js 图层。3D 画布位于 HTML 文字下方，每一帧只根据时间计算（不依赖时钟，没有随机数），全部在无头 Chrome 中离线渲染。可以导入你自己的 GLB 模型，也可以使用内置的程序化物体。详情：[engines/hyperframes/three](../../engines/hyperframes/three/README.md)。

| 模板 | 适用场景 |
|---|---|
| `product-turntable-3d` | 产品发布，在打光底座上标注规格 |
| `globe-arcs-3d` | 旅行路线、全球团队、历史与新闻 |
| `city-pin-3d` | 房产位置、周边配套和步行时间 |
| `house-build-3d` | 房源展示、装修翻新、各房间面积 |
| `pitch-tactics-3d` | 足球分析：跑位、传球、逼抢区域 |
| `bars-3d` | 增长与对比，画面上标注数据来源 |

## 无出镜与 UGC 视频

<p align="center"><img src="../media/avatars.gif" alt="一个 3D 主持人角色和一个由照片生成的说话头像" width="540"></p>

适合不想出镜的创作者，以及制作 UGC 风格广告的品牌。[`faceless-ugc`](../../skills/faceless-ugc/SKILL.md) 技能提供四种方案：

| 方案 | 你会得到 | 费用 |
|---|---|---|
| **不露脸** | 动态字幕、B-roll、录屏、只拍手或只拍产品的形式 | 免费 |
| **3D 角色** | `character-3d`：用代码搭建的主持人，有五种预设（创作者、老师、厨师、教练、分析师），按提示点眨眼、做手势和表情 | 免费 |
| **照片头像** | `photo-avatar`：把你的照片或插画变成 2.5D 人偶：下颌、口腔内部、头部摆动、呼吸、眨眼 | 免费 |
| **AI 头像** | 通过 fal.ai、Wiro 或在你自己 GPU 上运行的口型同步模型，实现图生视频和口型同步（`tools/avatar`） | 付费，先做 dry-run 费用预估，再经你确认 |

口型动作根据配音计算（`tools/mouth_curve.py`），每种方案最后都会做口型同步偏移检查（`tools/avatar/sync_check.py`）。用真人形象制作头像需要本人同意，广告中的 AI 主持人会明确标注。

## 安装

### Claude Code（插件）

```text
/plugin marketplace add aykutucesai/motionforge
/plugin install motionforge@motionforge
```

然后直接提出你要的视频，`motion-director` 技能会接手。

### Codex、Cursor 及其他智能体

```bash
git clone https://github.com/aykutucesai/motionforge
```

让智能体读取 [`AGENTS.md`](../../AGENTS.md)。每个技能都是带有确切命令的纯 Markdown，任何能读取文件、运行 shell 的智能体都能照着执行。

### 环境要求

- Node.js 18+（推荐 22）和 ffmpeg
- Python 3.10+ 及 numpy
- 可选：`faster-whisper`（逐词计时）、`rembg`（抠图）、`fonttools`（字形检查）、`mediapipe`（面部关键点）、`fal-client`（fal.ai）、Playwright Chromium

智能体会在每个任务开始时检查这些依赖，并明确告诉你需要安装什么。

## 试试这些提示词

```text
把这段配音（voice.mp3）做成 9:16 短视频。动态字幕、深色风格，我提到的每个产品都用真实标志。
```
```text
给这款音箱做一条 30 秒的产品视频，用 3D 转台展示，加三个规格标注。使用我的品牌套件。
```
```text
在 3D 球场上讲解这次反击：三脚传球、一次跑位，然后进球。比赛日风格。
```
```text
我不想露脸。做一个戴眼镜、穿绿色连帽衫的 3D 主持人来读这段脚本。
```
```text
用西班牙语写 3 个开头钩子选项和一份 70 秒的脚本，主题是如何在软件上省钱。先不要生成音频。
```

## 目录结构

```
motionforge/
├─ AGENTS.md                 任何智能体的入口
├─ skills/
│  ├─ motion-director/       完整工作流及其审批关卡
│  ├─ script-and-hooks/      钩子、脚本、事实清单、禁用语（10 种语言）
│  ├─ voice-and-timing/      需同意后才调用的 TTS、逐词计时、字幕、响度
│  ├─ style-library/         20 个类别 100 种风格，每种一个 STYLE.md
│  ├─ brand-kit/             brand.json：颜色、字体、标志、水印、片尾
│  ├─ faceless-ugc/          无出镜形式、角色、头像、口型同步、UGC 广告形式
│  └─ qa-review/             检查 + 独立评审
├─ engines/
│  ├─ hyperframes/           默认引擎（HTML + GSAP，Apache-2.0）
│  │  └─ three/              3D 图层：舞台、灯光、环绕镜头、跟随 3D 点的标签
│  ├─ remotion/              可选的 React 引擎 + 工具包
│  └─ canvas/                frame = f(t) 页面，用于手绘和程序化风格
├─ templates/                16 个现成场景：8 个 2D、6 个 3D、character-3d、photo-avatar
├─ examples/styles/          风格预览背后的场景
└─ tools/                    逐词计时、口型曲线、头像 CLI、同步检查、抠图、
                             响度、联系表、文字检查、导出、封面安全区
```

所有模板的动画预览：[templates/README.md](../../templates/README.md)。

## 原则

1. **默认免费。** 默认引擎 HyperFrames 采用 Apache-2.0 许可；three.js 采用 MIT 许可。Remotion 和付费 API 均为可选（见[许可说明](../LICENSING.md)）。
2. **结果确定。** 每一帧都是时间的函数。相同输入，相同视频。
3. **未经同意不产生费用。** 智能体先说明费用，然后等待。
4. **内容诚实。** 需要来源的陈述会列出来交给你核实；模拟界面、示例数据和 AI 主持人都会注明。
5. **交付前必检。** 只要质检还有未解决的问题，视频就不会交付。

## 语言

技能说明用英文写给智能体看。智能体会用你的语言和你交流，并用视频的语言撰写脚本、字幕和画面文字。钩子模式和禁用语清单以下列语言原生编写：

English · Türkçe · Español · Português (Brasil) · Français · Deutsch · 简体中文 · 日本語 · 한국어 · हिन्दी

## 许可

motionforge 以 [MIT 许可证](../../LICENSE) 发布。它会调用保留各自许可证的第三方工具；见 [THIRD_PARTY.md](../../THIRD_PARTY.md) 以及通俗说明 [docs/LICENSING.md](../LICENSING.md)。简而言之：HyperFrames 采用 Apache-2.0；three.js 采用 MIT；GSAP 通过 npm 安装，遵循其自身许可；Remotion 对个人和员工不超过 3 人的公司免费，超过则需要购买公司许可。地图数据来自 Natural Earth（公有领域）和 OpenStreetMap（ODbL，需署名）。

## 参与贡献

欢迎提交 issue 和 pull request：新风格、模板、3D 场景、语言清单、引擎改进。请先阅读 [CONTRIBUTING.md](../../CONTRIBUTING.md)。

---

<div align="center">

作者：<a href="https://www.instagram.com/aykutucesai/">Aykut Üçeş</a> · <a href="https://x.com/Aykutuces">@Aykutuces</a>

</div>
