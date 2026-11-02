<div align="center">

# motionforge

**Vídeos de motion design escritos em código pelo seu agente de programação.**

Descreva o vídeo. Seu agente escreve o gancho e o roteiro, sincroniza cada palavra com a narração, monta as cenas, renderiza e revisa o próprio trabalho antes de você ver o resultado.

[English](../../README.md) · [Türkçe](README.tr.md) · [Español](README.es.md) · [Português (BR)](README.pt-BR.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [हिन्दी](README.hi.md)

![license](https://img.shields.io/badge/license-MIT-C8F53A?style=flat-square) ![agents](https://img.shields.io/badge/agents-Claude%20Code%20%C2%B7%20Codex%20%C2%B7%20Cursor-111317?style=flat-square) ![engine](https://img.shields.io/badge/default%20engine-HyperFrames-111317?style=flat-square) ![languages](https://img.shields.io/badge/languages-10-111317?style=flat-square)

</div>

---

## O que ele faz

Você digita algo como:

> Faça um reel vertical de 60 segundos sobre as 5 ferramentas gratuitas que eu uso todo dia. Estilo escuro, minha voz, legendas.

O motionforge transforma isso em um MP4 revisado, passando por um conjunto fixo de etapas:

| Etapa | O que acontece |
|---|---|
| **Briefing** | O agente resume seu pedido em uma frase e pergunta só o que está faltando (formato, duração, idioma, voz). |
| **Gancho e roteiro** | 2–3 opções de gancho, um roteiro com ritmo de fala e uma lista das afirmações factuais que você deve conferir. Nada de estatísticas inventadas. Nada de "frases de IA" prontas (listas de frases proibidas em 10 idiomas). |
| **Voz** | Use sua própria chave de TTS (ElevenLabs, OpenAI) ou um modelo local. O agente informa o custo e espera o seu "sim" antes de qualquer chamada paga. |
| **Sincronia** | Marcações de tempo por palavra extraídas da narração, para que cada título, logo e legenda entre exatamente na palavra que está sendo falada. |
| **Estilo e marca** | Escolha um visual da biblioteca de estilos e aplique o seu `brand.json` (cores, fontes, logo, marca d'água, encerramento). |
| **Cenas** | Construídas como código determinístico, em que dá para pular para qualquer instante: HyperFrames (HTML + GSAP) por padrão, Remotion ou um motor canvas quando eles se encaixam melhor. |
| **QA** | Folhas de contato, verificação de texto estourando e de área segura, tempo de leitura na tela, loudness e um revisor crítico com contexto novo, que não escreveu as cenas. |
| **Entrega** | MP4 em 9:16 / 1:1 / 16:9, uma imagem de capa, legendas e a descrição do post. Ajustes pela minutagem: "troque o título em 0:12". |

## Instalação

### Claude Code (plugin)

```text
/plugin marketplace add aykutucesai/motionforge
/plugin install motionforge@motionforge
```

Depois é só pedir um vídeo. A skill `motion-director` assume a partir daí.

### Codex, Cursor e outros agentes

```bash
git clone https://github.com/aykutucesai/motionforge
```

Abra a pasta (ou adicione ao seu projeto) e aponte o agente para o [`AGENTS.md`](../../AGENTS.md). Cada skill é Markdown simples com os comandos exatos, então qualquer agente que consiga ler arquivos e rodar comandos no shell consegue seguir.

### Requisitos

- Node.js 18+ (recomendado 22) e ffmpeg
- Python 3.10+
- Opcional: `faster-whisper` (tempos por palavra), `rembg` (recorte de quem fala para a câmera), `fonttools` (verificação de glifos), Playwright Chromium

O agente verifica tudo isso no início de cada trabalho e diz exatamente o que você precisa instalar.

## Experimente estes prompts

```text
Transforme esta narração (voice.mp3) em um reel 9:16. Legendas cinéticas, estilo escuro e logos reais de cada produto que eu citar.
```
```text
Faça um clipe de lançamento de 30 segundos para o meu app a partir destas 4 capturas de tela. Use o meu kit de marca.
```
```text
Escreva 3 opções de gancho e um roteiro de 70 segundos em espanhol sobre como economizar com software. Ainda não gere o áudio.
```
```text
Aqui está um clipe de 10 segundos meu na minha mesa. Use os primeiros 5 segundos como abertura e os últimos 5 como encerramento, com gráficos no meio.
```

## O que vem no repositório

```
motionforge/
├─ AGENTS.md                 ponto de entrada para qualquer agente
├─ skills/
│  ├─ motion-director/       o fluxo completo e suas etapas de aprovação
│  ├─ script-and-hooks/      ganchos, roteiros, lista de afirmações, frases proibidas (10 idiomas)
│  ├─ voice-and-timing/      TTS só com consentimento, tempos por palavra, legendas, loudness
│  ├─ style-library/         20 visuais, um STYLE.md para cada
│  ├─ brand-kit/             brand.json: cores, fontes, logos, marca d'água, encerramento
│  └─ qa-review/             verificações + revisor crítico independente
├─ engines/
│  ├─ hyperframes/           motor padrão (HTML + GSAP, Apache-2.0)
│  ├─ remotion/              motor React opcional + kit
│  └─ canvas/                páginas frame = f(t) para visuais desenhados à mão e procedurais
├─ templates/                cenas prontas: título cinético, legendas, contador, navegador, celular, chat, checklist, capa
└─ tools/                    tempos por palavra, recorte, loudness, folha de contato, verificação de texto, exportação, área segura da capa
```

## Princípios

1. **Gratuito para todos por padrão.** O motor padrão, HyperFrames, é Apache-2.0. O Remotion é opcional (veja [Licenciamento](../LICENSING.md)).
2. **Determinístico.** Cada quadro é uma função do tempo. Mesma entrada, mesmo vídeo.
3. **Nada pago sem consentimento.** O agente informa o custo antes.
4. **Conteúdo honesto.** Afirmações que precisam de fonte são listadas para você; telas simuladas são sinalizadas.
5. **Revisado antes da entrega.** Se o QA tiver uma falha em aberto, o vídeo não é entregue.

## Idiomas

As instruções das skills são escritas em inglês, para os agentes. O agente conversa com você no seu idioma e escreve roteiros, legendas e textos na tela no idioma do vídeo. Os padrões de gancho e as listas de frases proibidas foram escritos diretamente em cada um destes idiomas:

English · Türkçe · Español · Português (Brasil) · Français · Deutsch · 简体中文 · 日本語 · 한국어 · हिन्दी

## Licenciamento

O motionforge é distribuído sob a [Licença MIT](../../LICENSE). Ele chama ferramentas de terceiros que mantêm suas próprias licenças; veja [THIRD_PARTY.md](../../THIRD_PARTY.md) e o guia em linguagem simples em [docs/LICENSING.md](../LICENSING.md). Resumindo: o HyperFrames é Apache-2.0; o GSAP é instalado pelo npm sob a própria licença; o Remotion é gratuito para pessoas físicas e empresas com até 3 funcionários e exige uma licença empresarial acima disso.

## Como contribuir

Issues e pull requests são bem-vindos: novos estilos, templates, listas de idiomas, melhorias nos motores. Leia o [CONTRIBUTING.md](../../CONTRIBUTING.md) antes.

---

<div align="center">

Made by <a href="https://www.instagram.com/aykutucesai/">Aykut Üçeş</a> · <a href="https://x.com/Aykutuces">@Aykutuces</a>

</div>
