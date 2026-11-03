<div align="center">

# motionforge

**コーディングエージェントがコードで書く、モーションデザイン動画。**

作りたい動画を伝えてください。エージェントがフックと台本を書き、ナレーションに合わせて一語ずつタイミングを取り、2D と 3D のシーンを組み、レンダリングし、あなたに見せる前に自分で仕上がりをチェックします。

[English](../../README.md) · [Türkçe](README.tr.md) · [Español](README.es.md) · [Português (BR)](README.pt-BR.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [हिन्दी](README.hi.md)

![license](https://img.shields.io/badge/license-MIT-C8F53A?style=flat-square) ![agents](https://img.shields.io/badge/agents-Claude%20Code%20%C2%B7%20Codex%20%C2%B7%20Cursor-111317?style=flat-square) ![styles](https://img.shields.io/badge/styles-100-111317?style=flat-square) ![3D](https://img.shields.io/badge/3D-three.js-111317?style=flat-square) ![languages](https://img.shields.io/badge/languages-10-111317?style=flat-square)

<img src="../media/hero.gif" alt="3D プレゼンター、フライトルートの弧を描く地球儀、クリエイターのリール、サッカーの戦術ボード、製品のターンテーブル。すべて motionforge でレンダリング" width="900">

</div>

---

## 主な特長

| | |
|---|---|
| **20 カテゴリ・100 スタイル** | クリエイター、EC、不動産、サッカー、ドキュメンタリー、教育、テック、金融、フード、フィットネス、旅行、イベント、ニュース、ビジネス、ゲーム、キッズ、ファッション、自動車、アートディレクション、非営利団体。各スタイルは、配色、書体、レイアウト、モーション、編集のリズム、サウンド、代表的なシーンまでを定めた完全な仕様です。 |
| **three.js による 3D シーン** | 製品のターンテーブル、フライトルートの弧を描く地球儀、徒歩圏の円を示す街、自動で組み上がる家、サッカーの戦術ピッチ、3D グラフ。決定論的で、フレーム単位で正確、オフラインでレンダリングします。 |
| **話すキャラクターとアバター** | コードで作った 3D プレゼンター、またはあなたの写真やイラストを話すパペットに。口の動きはナレーションに合わせて動きます。標準では無料・ローカル。キーを接続すれば、fal.ai、Wiro、ローカルのリップシンクモデルも使えます。 |
| **台本から納品まで** | 10 言語の禁止フレーズリストに沿ったフックと台本、単語単位のタイミング、字幕、ラウドネス、コンタクトシート、そして納品前の独立したレビュー役。 |
| **同意なしに課金しない** | 有料の呼び出し（音声、動画、リップシンク）はすべて、何を生成するかと見積もり費用を先に示し、確認を待ちます。キーは環境変数からのみ読み込みます。 |

## 仕組み

たとえばこう入力します：

> 不動産アカウント用に、この物件を紹介する 45 秒のリールを作って。周辺地図、3D 間取り図、私の声、字幕付きで。

motionforge は決まった工程を経て、チェック済みの MP4 に仕上げます：

| 工程 | 内容 |
|---|---|
| **ブリーフ** | エージェントが依頼内容を一文で確認し、足りない情報（フォーマット、長さ、言語、音声）だけを質問します。 |
| **フックと台本** | 2〜3 案のフック、話すテンポに合わせた台本、あなたが確認すべき事実の主張リスト。統計のねつ造も、ありがちな「AI っぽい言い回し」も使いません。 |
| **音声** | あなた自身の録音、ローカルの TTS モデル、または費用を承認したうえで、あなたのキーを使う有料 TTS。 |
| **タイミング** | 単語単位のタイムスタンプで、タイトル、ロゴ、字幕が話される単語にぴったり合います。 |
| **スタイルとブランド** | ライブラリのスタイルに、あなたの `brand.json`（色、フォント、ロゴ、ウォーターマーク、アウトロ）を組み合わせます。 |
| **シーン** | どのフレームにもシークできる決定論的なコード。標準は HyperFrames（HTML + GSAP、3D は three.js）、より適している場合は Remotion や canvas エンジン。 |
| **QA** | コンタクトシート、テキストのはみ出しとセーフエリアの確認、読了時間、ラウドネス、リップシンクのずれ、そして制作過程を見ていない新しいコンテキストのレビュー役。 |
| **納品** | 9:16 / 1:1 / 16:9 の MP4、カバー画像、字幕、投稿用の説明文。修正はタイムコードで指定：「0:12 のタイトルを変えて」。 |

## スタイルライブラリ

<p align="center"><img src="../media/styles-categories.gif" alt="motionforge の 20 スタイルのアニメーションプレビュー" width="720"></p>

使うアカウントの種類ごとにまとめた 100 のルック。カテゴリごとにいくつか紹介します：

| カテゴリ | スタイル（例） |
|---|---|
| クリエイター・個人ブランド | `creator-reels-dark`, `talking-head-pop`, `podcast-clip-studio`, `vlog-film-diary`, `cinematic-quote` |
| EC・製品 | `product-hero-turntable`, `flash-sale`, `unboxing-pop`, `ugc-testimonial`, `before-after-split` |
| 不動産・地図 | `map-flyover-pins`, `floorplan-draw-on`, `neighborhood-guide`, `listing-tour-cards`, `luxury-estate` |
| サッカー・スポーツ | `matchday-graphics`, `tactics-board`, `player-stat-card`, `transfer-breaking`, `telestrator-replay` |
| ドキュメンタリー・ストーリーテリング | `archival-newsreel`, `true-crime-board`, `history-map-campaign`, `interview-doc`, `cosmos-scale` |
| 教育、テック、金融、ニュース、フード、旅行、イベント、ファッション… | 全カタログを参照 |

全スタイルを 1 行ずつ紹介したカタログ：[skills/style-library/styles/README.md](../../skills/style-library/styles/README.md)。

## 3D シーン

<p align="center"><img src="../media/3d.gif" alt="6 つの 3D テンプレート：製品ターンテーブル、地球儀、街のピン、家の組み立て、戦術ピッチ、棒グラフ" width="600"></p>

HyperFrames エンジン用の three.js レイヤーです。3D キャンバスは HTML テキストの下に置かれ、各フレームは時間だけから計算され（時計も乱数も使いません）、すべてヘッドレス Chrome でオフラインレンダリングされます。自分の GLB モデルを持ち込むことも、内蔵のプロシージャルオブジェクトを使うこともできます。詳細：[engines/hyperframes/three](../../engines/hyperframes/three/README.md)。

| テンプレート | 用途 |
|---|---|
| `product-turntable-3d` | 製品発表、ライティングした台座上でのスペック表示 |
| `globe-arcs-3d` | 旅行ルート、グローバルチーム、歴史とニュース |
| `city-pin-3d` | 物件の所在地、周辺施設、徒歩時間 |
| `house-build-3d` | 物件紹介、リフォーム、部屋ごとの面積 |
| `pitch-tactics-3d` | サッカー分析：ランニング、パス、プレスのゾーン |
| `bars-3d` | 成長や比較、出典を画面に表示 |

## 顔出しなし・UGC 動画

<p align="center"><img src="../media/avatars.gif" alt="3D プレゼンターのキャラクターと、写真から作った話すアバター" width="540"></p>

カメラに映りたくないクリエイターや、UGC 風の広告を作るブランド向けです。[`faceless-ugc`](../../skills/faceless-ugc/SKILL.md) スキルには 4 つのルートがあります：

| ルート | できること | 費用 |
|---|---|---|
| **顔出しなし** | キネティック字幕、B ロール、画面収録、手元だけ・製品だけのフォーマット | 無料 |
| **3D キャラクター** | `character-3d`：コードで作ったプレゼンター。5 つのプリセット（クリエイター、教師、シェフ、コーチ、アナリスト）があり、キューに合わせてまばたき、ジェスチャー、表情を付けます | 無料 |
| **写真アバター** | `photo-avatar`：あなたの写真やイラストを 2.5D のパペットに。あご、口の中、頭の揺れ、呼吸、まばたき | 無料 |
| **AI アバター** | fal.ai、Wiro、または自分の GPU で動かすリップシンクモデルによる、画像から動画の生成とリップシンク（`tools/avatar`） | 有料。ドライランでの見積もりと、あなたの承認が先 |

口の動きはナレーションから算出し（`tools/mouth_curve.py`）、どのルートも最後にリップシンクのずれをチェックします（`tools/avatar/sync_check.py`）。実在の人物のアバターには本人の同意が必要で、広告に登場する AI プレゼンターはその旨を明示します。

## インストール

### Claude Code（プラグイン）

```text
/plugin marketplace add aykutucesai/motionforge
/plugin install motionforge@motionforge
```

あとは動画を依頼するだけです。`motion-director` スキルが引き継ぎます。

### Codex、Cursor、その他のエージェント

```bash
git clone https://github.com/aykutucesai/motionforge
```

エージェントに [`AGENTS.md`](../../AGENTS.md) を読ませてください。各スキルは正確なコマンドを書いたプレーンな Markdown なので、ファイルを読んでシェルを実行できるエージェントならそのまま従えます。

### 必要環境

- Node.js 18+（22 推奨）と ffmpeg
- Python 3.10+ と numpy
- 任意：`faster-whisper`（単語タイミング）、`rembg`（切り抜き）、`fonttools`（グリフチェック）、`mediapipe`（顔のランドマーク）、`fal-client`（fal.ai）、Playwright Chromium

エージェントがジョブの最初にこれらを確認し、何をインストールすべきかを具体的に伝えます。

## プロンプト例

```text
このナレーション（voice.mp3）を 9:16 のリールにして。キネティック字幕、ダークなスタイルで、私が挙げる製品にはすべて本物のロゴを使って。
```
```text
このスピーカーの 30 秒の製品動画を作って。3D ターンテーブルとスペック表示を 3 つ。私のブランドキットを使って。
```
```text
このカウンターを 3D のピッチで解説して：パス 3 本、ランニング 1 回、そしてゴール。マッチデースタイルで。
```
```text
顔は出したくない。メガネに緑のパーカーの 3D プレゼンターを作って、この台本を読ませて。
```
```text
ソフトウェア代の節約について、スペイン語でフック案を 3 つと 70 秒の台本を書いて。音声はまだ生成しないで。
```

## 構成

```
motionforge/
├─ AGENTS.md                 すべてのエージェントの入口
├─ skills/
│  ├─ motion-director/       ワークフロー全体と承認ゲート
│  ├─ script-and-hooks/      フック、台本、主張リスト、禁止フレーズ（10 言語）
│  ├─ voice-and-timing/      同意制の TTS、単語タイミング、字幕、ラウドネス
│  ├─ style-library/         20 カテゴリ・100 スタイル、各スタイルに STYLE.md
│  ├─ brand-kit/             brand.json：色、フォント、ロゴ、ウォーターマーク、アウトロ
│  ├─ faceless-ugc/          顔出しなしフォーマット、キャラクター、アバター、リップシンク、UGC 広告フォーマット
│  └─ qa-review/             チェック + 独立したレビュー役
├─ engines/
│  ├─ hyperframes/           標準エンジン（HTML + GSAP、Apache-2.0）
│  │  └─ three/              3D レイヤー：ステージ、ライト、オービット、3D の点に追従するラベル
│  ├─ remotion/              任意の React エンジン + キット
│  └─ canvas/                手描き風・プロシージャルなルック用の frame = f(t) ページ
├─ templates/                すぐ使える 16 シーン：2D 8 本、3D 6 本、character-3d、photo-avatar
├─ examples/styles/          スタイルプレビューの元になったシーン
└─ tools/                    単語タイミング、口の動きカーブ、アバター CLI、同期チェック、切り抜き、
                             ラウドネス、コンタクトシート、テキストチェック、書き出し、カバーのセーフエリア
```

全テンプレートのアニメーション：[templates/README.md](../../templates/README.md)。

## 原則

1. **標準で無料。** 標準エンジンの HyperFrames は Apache-2.0、three.js は MIT です。Remotion と有料 API は任意です（[ライセンス](../LICENSING.md)を参照）。
2. **決定論的。** すべてのフレームは時間の関数です。同じ入力なら同じ動画になります。
3. **同意なしに課金しない。** エージェントは先に費用を伝えて待ちます。
4. **誠実なコンテンツ。** 出典が必要な主張はリストにしてお渡しします。モック画面、サンプルデータ、AI プレゼンターは明示します。
5. **納品前に必ずチェック。** QA に未解決の不合格項目があれば、動画は納品しません。

## 言語

スキルの指示はエージェント向けに英語で書かれています。エージェントはあなたの言語で会話し、台本、字幕、画面上のテキストは動画の言語で書きます。フックのパターンと禁止フレーズリストは、次の言語でネイティブに用意しています：

English · Türkçe · Español · Português (Brasil) · Français · Deutsch · 简体中文 · 日本語 · 한국어 · हिन्दी

## ライセンス

motionforge は [MIT ライセンス](../../LICENSE) で公開しています。独自のライセンスを持つサードパーティのツールを呼び出すため、[THIRD_PARTY.md](../../THIRD_PARTY.md) と、平易な言葉で書いたガイド [docs/LICENSING.md](../LICENSING.md) を参照してください。要点：HyperFrames は Apache-2.0、three.js は MIT、GSAP は独自ライセンスのもと npm からインストールします。Remotion は個人と従業員 3 名以下の企業は無料で、それを超える場合は企業ライセンスが必要です。地図データは Natural Earth（パブリックドメイン）と OpenStreetMap（ODbL、クレジット表記が必要）を使用しています。

## コントリビュート

Issue やプルリクエストを歓迎します：新しいスタイル、テンプレート、3D シーン、言語リスト、エンジンの改善など。まず [CONTRIBUTING.md](../../CONTRIBUTING.md) をお読みください。

---

<div align="center">

制作：<a href="https://www.instagram.com/aykutucesai/">Aykut Üçeş</a> · <a href="https://x.com/Aykutuces">@Aykutuces</a>

</div>
