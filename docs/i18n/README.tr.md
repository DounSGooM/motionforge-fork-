<div align="center">

# motionforge

**Kodlama ajanının kodla yazdığı motion design videoları.**

Videoyu anlat. Ajanın kancayı ve metni yazar, her kelimeyi seslendirmeye göre zamanlar, 2D ve 3D sahneleri kurar, render alır ve sana göstermeden önce kendi işini kontrol eder.

[English](../../README.md) · [Türkçe](README.tr.md) · [Español](README.es.md) · [Português (BR)](README.pt-BR.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [हिन्दी](README.hi.md)

![license](https://img.shields.io/badge/license-MIT-C8F53A?style=flat-square) ![agents](https://img.shields.io/badge/agents-Claude%20Code%20%C2%B7%20Codex%20%C2%B7%20Cursor-111317?style=flat-square) ![styles](https://img.shields.io/badge/styles-100-111317?style=flat-square) ![3D](https://img.shields.io/badge/3D-three.js-111317?style=flat-square) ![languages](https://img.shields.io/badge/languages-10-111317?style=flat-square)

<img src="../media/hero.gif" alt="3D sunucu, uçuş rotalı dünya küresi, içerik üreticisi reel'i, futbol taktik tahtası ve dönen ürün sahnesi; hepsi motionforge ile render edildi" width="900">

</div>

---

## Öne çıkanlar

| | |
|---|---|
| **20 kategoride 100 stil** | İçerik üreticileri, e-ticaret, emlak, futbol, belgesel, eğitim, teknoloji, finans, yemek, fitness, seyahat, etkinlik, haber, iş dünyası, oyun, çocuk, moda, otomotiv, sanat yönetimi ve sivil toplum. Her stil eksiksiz bir tanımdır: renk paleti, tipografi, yerleşim, hareket, kurgu ritmi, ses ve imza sahneler. |
| **three.js ile 3D sahneler** | Dönen kaide üzerinde ürünler, uçuş rotalı dünya küresi, yürüme mesafesi halkalarıyla şehir, kendi kendini inşa eden ev, futbol taktik sahası, 3D grafikler. Deterministik, kare hassasiyetinde, çevrimdışı render. |
| **Konuşan karakterler ve avatarlar** | Koddan kurulmuş bir 3D sunucu ya da konuşan bir kuklaya dönüşen kendi fotoğrafın veya çizimin. Ağız hareketleri seslendirmeyi takip eder. Varsayılan olarak ücretsiz ve yerel. Anahtar bağladığında isteğe bağlı olarak fal.ai, Wiro ya da yerel dudak senkronu modelleri. |
| **Metinden teslime** | 10 dilde yasaklı ifade listeleriyle kanca ve metin, kelime düzeyinde zamanlama, altyazı, ses yüksekliği, kontak sayfaları ve teslimden önce bağımsız bir eleştirmen. |
| **Onayın olmadan ücretli işlem yok** | Her ücretli çağrı (ses, video, dudak senkronu) önce ne üreteceğini ve tahmini maliyeti gösterir, sonra bekler. Anahtarlar yalnızca senin ortam değişkenlerinden okunur. |

## Nasıl çalışır

Şöyle bir şey yazıyorsun:

> Emlak hesabım için bu daire hakkında 45 saniyelik bir reel yap. Mahallenin haritası, 3D kat planı, benim sesim, altyazılar.

motionforge bunu sabit aşamalardan geçirerek kontrol edilmiş bir MP4'e dönüştürür:

| Aşama | Ne olur |
|---|---|
| **Brief** | Ajan isteğini tek cümleyle özetler ve yalnızca eksik olanı sorar (format, süre, dil, ses). |
| **Kanca ve metin** | 2–3 kanca seçeneği, konuşma temposuna göre yazılmış bir metin ve doğrulaman için olgusal iddiaların listesi. Uydurma istatistik yok, hazır "yapay zekâ kalıpları" yok. |
| **Ses** | Kendi kaydın, yerel bir TTS modeli ya da maliyeti onayladıktan sonra kendi anahtarınla ücretli bir TTS. |
| **Zamanlama** | Kelime düzeyinde zaman damgaları; böylece her başlık, logo ve altyazı söylendiği kelimeye oturur. |
| **Stil ve marka** | Kütüphaneden bir stil ve senin `brand.json` dosyan (renkler, fontlar, logo, filigran, kapanış). |
| **Sahneler** | İstenen kareye atlanabilen, deterministik kod: varsayılan olarak HyperFrames (HTML + GSAP, 3D için three.js), daha uygun olduğunda Remotion ya da canvas motoru. |
| **QA** | Kontak sayfaları, taşan metin ve güvenli alan kontrolleri, okuma süresi, ses yüksekliği, dudak senkronu kayması ve yapım sürecini hiç görmemiş, temiz bağlamlı bir eleştirmen. |
| **Teslim** | 9:16 / 1:1 / 16:9 MP4, kapak görseli, altyazılar ve paylaşım açıklaması. Revizyonlar zaman koduyla: "0:12'deki başlığı değiştir". |

## Stil kütüphanesi

<p align="center"><img src="../media/styles-categories.gif" alt="20 motionforge stilinin animasyonlu önizlemeleri" width="720"></p>

Onları kullanan hesap türüne göre gruplanmış 100 görünüm. Her kategoriden birkaç örnek:

| Kategori | Stiller (örnekler) |
|---|---|
| İçerik üreticileri ve kişisel markalar | `creator-reels-dark`, `talking-head-pop`, `podcast-clip-studio`, `vlog-film-diary`, `cinematic-quote` |
| E-ticaret ve ürünler | `product-hero-turntable`, `flash-sale`, `unboxing-pop`, `ugc-testimonial`, `before-after-split` |
| Emlak ve haritalar | `map-flyover-pins`, `floorplan-draw-on`, `neighborhood-guide`, `listing-tour-cards`, `luxury-estate` |
| Futbol ve spor | `matchday-graphics`, `tactics-board`, `player-stat-card`, `transfer-breaking`, `telestrator-replay` |
| Belgesel ve hikâye anlatımı | `archival-newsreel`, `true-crime-board`, `history-map-campaign`, `interview-doc`, `cosmos-scale` |
| Eğitim, teknoloji, finans, haber, yemek, seyahat, etkinlik, moda… | tam kataloğa bak |

Her stil için tek satırlık açıklamayla tam katalog: [skills/style-library/styles/README.md](../../skills/style-library/styles/README.md).

## 3D sahneler

<p align="center"><img src="../media/3d.gif" alt="Altı 3D şablon: dönen ürün, dünya küresi, şehir pini, inşa edilen ev, taktik sahası, çubuk grafik" width="600"></p>

HyperFrames motoru için bir three.js katmanı. 3D tuval HTML metnin altında durur, her kare yalnızca zamandan hesaplanır (saat yok, rastgelelik yok) ve her şey headless Chrome'da çevrimdışı render edilir. Kendi GLB modelini getir ya da yerleşik prosedürel nesneleri kullan. Ayrıntılar: [engines/hyperframes/three](../../engines/hyperframes/three/README.md).

| Şablon | Ne için kullanılır |
|---|---|
| `product-turntable-3d` | ürün lansmanları, ışıklı kaide üzerinde teknik özellik etiketleri |
| `globe-arcs-3d` | seyahat rotaları, dünyaya dağılmış ekipler, tarih ve haber |
| `city-pin-3d` | mülkün konumu, çevredeki olanaklar ve yürüme süreleri |
| `house-build-3d` | ilanlar, tadilatlar, oda oda metrekareler |
| `pitch-tactics-3d` | futbol analizi: koşular, paslar, pres bölgeleri |
| `bars-3d` | büyüme ve karşılaştırmalar, kaynak ekranda |

## Yüzsüz ve UGC videolar

<p align="center"><img src="../media/avatars.gif" alt="3D sunucu karakteri ve konuşan fotoğraf avatarı" width="540"></p>

Kamera karşısına geçmek istemeyen içerik üreticileri ve UGC tarzı reklam yapan markalar için. [`faceless-ugc`](../../skills/faceless-ugc/SKILL.md) skill'i dört yol sunar:

| Yol | Ne alırsın | Maliyet |
|---|---|---|
| **Yüz yok** | kinetik altyazılar, b-roll, ekran kayıtları, yalnızca el ya da yalnızca ürün gösteren formatlar | ücretsiz |
| **3D karakter** | `character-3d`: beş hazır ayarlı (içerik üreticisi, öğretmen, şef, koç, analist) ve koddan kurulmuş bir sunucu; işaretlere göre göz kırpar, jest ve mimik yapar | ücretsiz |
| **Fotoğraf avatarı** | `photo-avatar`: fotoğrafın ya da illüstrasyonun 2.5D bir kukla olarak: çene, ağız içi, baş salınımı, nefes, göz kırpma | ücretsiz |
| **Yapay zekâ avatarı** | fal.ai, Wiro ya da kendi GPU'nda çalışan bir dudak senkronu modeliyle görüntüden videoya üretim ve dudak senkronu (`tools/avatar`) | ücretli; önce deneme çalıştırmasıyla (dry-run) maliyet tahmini, sonra senin onayın |

Ağız hareketi seslendirmeden üretilir (`tools/mouth_curve.py`) ve her yol bir dudak senkronu kayma kontrolüyle biter (`tools/avatar/sync_check.py`). Gerçek kişilerin avatarları için o kişinin onayı gerekir; reklamlardaki yapay zekâ sunucuları açıkça belirtilir.

## Kurulum

### Claude Code (eklenti)

```text
/plugin marketplace add aykutucesai/motionforge
/plugin install motionforge@motionforge
```

Sonra bir video iste. `motion-director` skill'i işi devralır.

### Codex, Cursor ve diğer ajanlar

```bash
git clone https://github.com/aykutucesai/motionforge
```

Ajanı [`AGENTS.md`](../../AGENTS.md) dosyasına yönlendir. Her skill, kesin komutlar içeren düz bir Markdown dosyasıdır; dosya okuyup kabuk komutu çalıştırabilen her ajan bunları izleyebilir.

### Gereksinimler

- Node.js 18+ (22 önerilir) ve ffmpeg
- numpy kurulu Python 3.10+
- İsteğe bağlı: `faster-whisper` (kelime zamanlamaları), `rembg` (dekupe), `fonttools` (glif kontrolleri), `mediapipe` (yüz noktaları), `fal-client` (fal.ai), Playwright Chromium

Ajan her işin başında bunları kontrol eder ve tam olarak neyi kurman gerektiğini söyler.

## Bu istemleri dene

```text
Bu seslendirmeyi (voice.mp3) 9:16 bir reel'e dönüştür. Kinetik altyazılar, koyu stil, bahsettiğim her ürün için gerçek logolar.
```
```text
Bu hoparlör için 3D dönen kaide ve üç teknik özellik etiketiyle 30 saniyelik bir ürün videosu yap. Marka kitimi kullan.
```
```text
Bu kontratağı 3D sahada anlat: üç pas, bir koşu, sonra gol. Maç günü stili.
```
```text
Yüzümü göstermek istemiyorum. Bu metni okuyan, gözlüklü ve yeşil kapüşonlu bir 3D sunucu yap.
```
```text
Yazılımda tasarruf üzerine İspanyolca 3 kanca seçeneği ve 70 saniyelik bir metin yaz. Henüz ses üretme.
```

## İçinde neler var

```
motionforge/
├─ AGENTS.md                 her ajan için giriş noktası
├─ skills/
│  ├─ motion-director/       tüm iş akışı ve onay kapıları
│  ├─ script-and-hooks/      kancalar, metinler, iddia listesi, yasaklı ifadeler (10 dil)
│  ├─ voice-and-timing/      onaya bağlı TTS, kelime zamanlamaları, altyazı, ses yüksekliği
│  ├─ style-library/         20 kategoride 100 stil, her biri için bir STYLE.md
│  ├─ brand-kit/             brand.json: renkler, fontlar, logolar, filigran, kapanış
│  ├─ faceless-ugc/          yüzsüz formatlar, karakterler, avatarlar, dudak senkronu, UGC reklam formatları
│  └─ qa-review/             kontroller + bağımsız eleştirmen
├─ engines/
│  ├─ hyperframes/           varsayılan motor (HTML + GSAP, Apache-2.0)
│  │  └─ three/              3D katman: sahne, ışıklar, yörünge, 3D noktaları izleyen etiketler
│  ├─ remotion/              isteğe bağlı React motoru + kit
│  └─ canvas/                el çizimi ve prosedürel görünümler için kare = f(t) sayfaları
├─ templates/                16 hazır sahne: 8'i 2D, 6'sı 3D, character-3d, photo-avatar
├─ examples/styles/          stil önizlemelerinin arkasındaki sahneler
└─ tools/                    kelime zamanlamaları, ağız eğrisi, avatar CLI, senkron kontrolü, dekupe,
                             ses yüksekliği, kontak sayfası, metin kontrolü, dışa aktarma, kapak güvenli alanı
```

Tüm şablonlar animasyonlu haliyle: [templates/README.md](../../templates/README.md).

## İlkeler

1. **Varsayılan olarak ücretsiz.** Varsayılan motor HyperFrames, Apache-2.0 lisanslıdır; three.js MIT lisanslıdır. Remotion ve ücretli API'ler isteğe bağlıdır (bkz. [Lisans](../LICENSING.md)).
2. **Deterministik.** Her kare zamanın bir fonksiyonudur. Aynı girdi, aynı video.
3. **Onay olmadan ücretli işlem yok.** Ajan önce maliyeti söyler ve bekler.
4. **Dürüst içerik.** Kaynak gerektiren iddialar senin için listelenir; temsili ekranlar, örnek veriler ve yapay zekâ sunucuları açıkça belirtilir.
5. **Teslimden önce kontrol.** QA'de çözülmemiş bir hata varsa video teslim edilmez.

## Diller

Skill talimatları ajanlar için İngilizce yazılmıştır. Ajan seninle senin dilinde konuşur; metinleri, altyazıları ve ekran yazılarını videonun dilinde yazar. Kanca kalıpları ve yasaklı ifade listeleri şu dillerde, doğrudan o dilde hazırlanmıştır:

English · Türkçe · Español · Português (Brasil) · Français · Deutsch · 简体中文 · 日本語 · 한국어 · हिन्दी

## Lisans

motionforge [MIT Lisansı](../../LICENSE) ile yayımlanır. Kendi lisanslarını koruyan üçüncü taraf araçları çağırır; bkz. [THIRD_PARTY.md](../../THIRD_PARTY.md) ve sade dille yazılmış rehber [docs/LICENSING.md](../LICENSING.md). Kısaca: HyperFrames Apache-2.0; three.js MIT; GSAP kendi lisansıyla npm'den kurulur; Remotion bireyler ve en fazla 3 çalışanı olan şirketler için ücretsizdir, daha büyük şirketler için şirket lisansı gerekir. Harita verileri Natural Earth (kamu malı) ve OpenStreetMap'ten (ODbL, kaynak gösterilmesi gerekir) gelir.

## Katkıda bulunma

Issue ve pull request'lere açığız: yeni stiller, şablonlar, 3D sahneler, dil listeleri, motor iyileştirmeleri. Önce [CONTRIBUTING.md](../../CONTRIBUTING.md) dosyasını oku.

---

<div align="center">

Geliştiren: <a href="https://www.instagram.com/aykutucesai/">Aykut Üçeş</a> · <a href="https://x.com/Aykutuces">@Aykutuces</a>

</div>
