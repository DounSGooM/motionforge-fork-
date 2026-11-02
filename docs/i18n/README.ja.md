<div align="center">

# motionforge

**コーディングエージェントがコードで書く、モーションデザイン動画。**

作りたい動画を説明してください。エージェントがフックと台本を書き、ナレーションに合わせて一語ずつタイミングをそろえ、シーンを組み立ててレンダリングし、あなたに見せる前に自分で仕上がりをチェックします。

[English](../../README.md) · [Türkçe](README.tr.md) · [Español](README.es.md) · [Português (BR)](README.pt-BR.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [हिन्दी](README.hi.md)

![license](https://img.shields.io/badge/license-MIT-C8F53A?style=flat-square) ![agents](https://img.shields.io/badge/agents-Claude%20Code%20%C2%B7%20Codex%20%C2%B7%20Cursor-111317?style=flat-square) ![engine](https://img.shields.io/badge/default%20engine-HyperFrames-111317?style=flat-square) ![languages](https://img.shields.io/badge/languages-10-111317?style=flat-square)

</div>

<p align="center"><img src="../media/showcase.gif" alt="motionforge templates" width="720"></p>

---

## できること

たとえば、次のように入力します。

> 毎日使っている無料ツール5つを紹介する、60秒の縦型リールを作って。ダークなスタイルで、自分の声、字幕付きで。

motionforge は決まった工程を順に進め、チェック済みの MP4 に仕上げます。

| 工程 | 内容 |
|---|---|
| **ブリーフ** | エージェントが依頼内容を一文で復唱し、足りない情報（フォーマット、尺、言語、声）だけを質問します。 |
| **フックと台本** | フック案を2〜3個、話すテンポに合わせた台本、そして確認が必要な事実関係のリストを用意します。統計を捏造することはありません。ありがちな「AIっぽい言い回し」も使いません（10言語分の禁止フレーズリストがあります）。 |
| **音声** | 自分の TTS キー（ElevenLabs、OpenAI）またはローカルモデルを使います。有料の呼び出しの前には、エージェントが費用を伝え、あなたの「OK」を待ちます。 |
| **タイミング** | ナレーションから単語単位のタイムスタンプを取得し、タイトル、ロゴ、字幕がそれぞれの単語が話される瞬間に表示されるようにします。 |
| **スタイルとブランド** | スタイルライブラリからルックを選び、`brand.json`（カラー、フォント、ロゴ、ウォーターマーク、アウトロ）を適用します。 |
| **シーン** | 任意の時点にシークできる、決定論的なコードとして組み立てます。標準は HyperFrames（HTML + GSAP）で、より適している場合は Remotion や canvas エンジンを使います。 |
| **QA** | コンタクトシート、テキストのはみ出しとセーフエリアのチェック、画面上のテキストを読むのに必要な時間、ラウドネスを確認し、さらにシーンを書いていない、まっさらなコンテキストのレビュアーが講評します。 |
| **納品** | 9:16 / 1:1 / 16:9 の MP4、カバー画像、字幕、投稿用の説明文をお渡しします。修正はタイムスタンプで指定できます（例：「0:12 のタイトルを変えて」）。 |

## インストール

### Claude Code（プラグイン）

```text
/plugin marketplace add aykutucesai/motionforge
/plugin install motionforge@motionforge
```

あとは動画を依頼するだけです。`motion-director` スキルが引き継ぎます。

### Codex、Cursor などのエージェント

```bash
git clone https://github.com/aykutucesai/motionforge
```

フォルダを開き（またはプロジェクトに追加し）、エージェントに [`AGENTS.md`](../../AGENTS.md) を読ませてください。各スキルは正確なコマンドを含むプレーンな Markdown なので、ファイルを読めてシェルを実行できるエージェントであれば、そのまま手順をたどれます。

### 必要な環境

- Node.js 18 以上（22 推奨）と ffmpeg
- Python 3.10 以上
- 任意：`faster-whisper`（単語タイミング）、`rembg`（話している人物の切り抜き）、`fonttools`（グリフのチェック）、Playwright Chromium

エージェントがジョブの開始時にこれらを確認し、何をインストールすればよいかを具体的にお伝えします。

## プロンプト例

```text
このナレーション（voice.mp3）を 9:16 のリールにして。キネティック字幕、ダークなスタイルで、話に出てくる製品にはすべて本物のロゴを使って。
```
```text
この4枚のスクリーンショットから、自分のアプリの30秒のローンチ動画を作って。ブランドキットを使って。
```
```text
ソフトウェア代を節約する方法について、スペイン語でフック案を3つと70秒の台本を書いて。音声はまだ生成しないで。
```
```text
これはデスクにいる自分を撮った10秒のクリップです。最初の5秒をイントロ、最後の5秒をアウトロにして、間はグラフィックにして。
```

## 中身

```
motionforge/
├─ AGENTS.md                 すべてのエージェントの入口
├─ skills/
│  ├─ motion-director/       ワークフロー全体と承認ステップ
│  ├─ script-and-hooks/      フック、台本、事実確認リスト、禁止フレーズ（10言語）
│  ├─ voice-and-timing/      同意制の TTS、単語タイミング、字幕、ラウドネス
│  ├─ style-library/         20種類のルック、それぞれに STYLE.md
│  ├─ brand-kit/             brand.json：カラー、フォント、ロゴ、ウォーターマーク、アウトロ
│  └─ qa-review/             チェック + 独立したレビュアー
├─ engines/
│  ├─ hyperframes/           標準エンジン（HTML + GSAP、Apache-2.0）
│  ├─ remotion/              任意の React エンジン + キット
│  └─ canvas/                手描き風・プロシージャルなルック向けの frame = f(t) ページ
├─ templates/                既製シーン：キネティックタイトル、字幕、カウンター、ブラウザ、スマホ、チャット、チェックリスト、カバー
└─ tools/                    単語タイミング、切り抜き、ラウドネス、コンタクトシート、テキストチェック、書き出し、カバーのセーフエリア
```

## 基本方針

1. **標準構成は誰でも無料です。** 標準エンジンの HyperFrames は Apache-2.0 です。Remotion は任意です（[ライセンス](../LICENSING.md)を参照）。
2. **決定論的です。** すべてのフレームは時間の関数です。同じ入力からは同じ動画ができます。
3. **同意なしに費用は発生しません。** エージェントが先に費用をお伝えします。
4. **誠実なコンテンツを作ります。** 出典が必要な主張はリストにしてお見せし、モック画面であることは明記します。
5. **納品前に必ずチェックします。** QA に未解決の不合格項目があれば、動画は納品されません。

## 対応言語

スキルの指示はエージェント向けに英語で書かれています。エージェントはあなたの言語で会話し、台本・字幕・画面上のテキストは動画の言語で書きます。フックのパターンと禁止フレーズのリストは、翻訳ではなく次の各言語で直接書かれています。

English · Türkçe · Español · Português (Brasil) · Français · Deutsch · 简体中文 · 日本語 · 한국어 · हिन्दी

## ライセンス

motionforge は [MIT License](../../LICENSE) で公開されています。独自のライセンスを持つサードパーティ製ツールを呼び出すため、[THIRD_PARTY.md](../../THIRD_PARTY.md) と、平易な言葉で書いたガイド [docs/LICENSING.md](../LICENSING.md) をご覧ください。要点は次のとおりです。HyperFrames は Apache-2.0 です。GSAP は npm から独自のライセンスのもとでインストールされます。Remotion は個人および従業員3人以下の企業は無料で、それを超える場合は企業ライセンスが必要です。

## コントリビュート

Issue や Pull Request を歓迎します。新しいスタイル、テンプレート、言語リスト、エンジンの改善などをお寄せください。最初に [CONTRIBUTING.md](../../CONTRIBUTING.md) をお読みください。

---

<div align="center">

Made by <a href="https://www.instagram.com/aykutucesai/">Aykut Üçeş</a> · <a href="https://x.com/Aykutuces">@Aykutuces</a>

</div>
