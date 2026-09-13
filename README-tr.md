[🇬🇧 English](README.md) | [🇹🇷 Türkçe](README-tr.md)

# 🧮 HesapKitap

**HesapKitap**, günlük yaşam, sağlık, matematik, zaman ve eğitim alanlarında kullanılabilecek pratik hesaplama araçlarını tek bir web uygulamasında bir araya getiren, React tabanlı modern bir hesaplama platformudur.

Proje; istemci tarafında çalışan hesaplamalar ve temiz, modüler bir mimari ile **basit, hızlı, duyarlı ve erişilebilir** bir kullanıcı deneyimi sunmaya odaklanır.

<p align="center">
  <a href="https://hesap-kitap.vercel.app">
    <strong>🌐 Canlı Demo</strong>
  </a>
</p>

---

## ✨ Özellikler

* 📱 **Duyarlı Arayüz** — Mobil, tablet, dizüstü bilgisayar ve büyük ekranlar için tasarlanmıştır.
* 🌙 **Koyu & Açık Tema** — Tema tercihini `localStorage` kullanarak kalıcı olarak saklar.
* ⚡ **İstemci Taraflı Hesaplamalar** — Sunucu isteklerine ihtiyaç duymadan anında sonuç verir.
* ✅ **Girdi Doğrulama** — Boş, geçersiz, negatif ve izin verilen aralık dışındaki değerleri kontrol eder.
* ♿ **Erişilebilirlik** — Anlamsal HTML, erişilebilir form kontrolleri, klavye ile gezinme ve ekran okuyucu desteği.
* 🧭 **SPA Gezinme** — React Router ile sorunsuz istemci taraflı yönlendirme.
* 🧩 **Modüler Mimari** — Yeniden kullanılabilir bileşenler ve düzenli hesaplayıcı modülleri.
* 🛡️ **Hata Yönetimi** — `NaN` ve `Infinity` gibi geçersiz matematiksel sonuçlara karşı koruma.

---

## 🧮 Hesaplayıcılar

HesapKitap şu anda **4 kategori altında 6 hesaplayıcı** içermektedir:

| Kategori     | Hesaplayıcı                      | Açıklama                                                                                   |
| ------------ | -------------------------------- | ------------------------------------------------------------------------------------------ |
| 🩺 Sağlık    | **Vücut Kitle İndeksi (BMI)**    | Vücut Kitle İndeksini hesaplar ve ideal kilo aralığı sunar.                                |
| 🩺 Sağlık    | **Bazal Metabolizma Hızı (BMR)** | Aktivite seviyesine göre Bazal Metabolizma Hızını ve günlük kalori ihtiyacını tahmin eder. |
| 📐 Matematik | **Alan Hesaplayıcı**             | Dikdörtgen, üçgen ve dairelerin alanını hesaplar.                                          |
| 📦 Matematik | **Hacim Hesaplayıcı**            | Küp, prizma, silindir, koni, küre ve kare piramidin hacmini hesaplar.                      |
| ⏱️ Zaman     | **Yaş Hesaplayıcı**              | Yaş farkını, yaşanılan toplam gün sayısını ve yaklaşan doğum günü geri sayımını hesaplar.  |
| 🎓 Eğitim    | **Not Hesaplayıcı**              | Sınav ortalamalarını, geçmek için gereken final notunu ve hedef notları hesaplar.          |

---

## 🛠️ Teknoloji Altyapısı

* **React** — Kullanıcı arayüzü ve bileşen mimarisi
* **Vite** — Geliştirme ortamı ve build aracı
* **React Router DOM** — İstemci taraflı yönlendirme
* **React Icons** — Arayüz ikonları
* **Vanilla CSS** — Duyarlı tasarımlar, tasarım değişkenleri ve yeniden kullanılabilir stiller
* **Vercel** — Deployment, analiz ve performans takibi

---

## 🚀 Başlangıç

### Gereksinimler

Sisteminizde **Node.js** ve **npm** yüklü olduğundan emin olun.

### Kurulum

Repository'yi klonlayın:

```bash
git clone https://github.com/MBasaran4/HesapKitap.git
```

Proje klasörüne gidin:

```bash
cd HesapKitap
```

Bağımlılıkları yükleyin:

```bash
npm install
```

Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Uygulama, Vite tarafından sağlanan yerel URL üzerinden erişilebilir olacaktır.

### Production Build

Production build oluşturun:

```bash
npm run build
```

Production build'i yerel olarak önizleyin:

```bash
npm run preview
```

---

## 📁 Proje Yapısı

```text
HesapKitap/
├── public/
├── src/
│   ├── components/
│   │   ├── calculator/
│   │   ├── common/
│   │   └── layout/
│   ├── context/
│   ├── pages/
│   │   ├── education/
│   │   ├── health/
│   │   ├── mathematics/
│   │   └── time/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .github/
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE
└── package.json
```

Proje; **yeniden kullanılabilir bileşenler, bağımsız hesaplayıcı sayfaları, ortak stiller ve merkezi uygulama durumu** etrafında yapılandırılmıştır. Bu yapı, gelecekte yeni hesaplayıcıların projeye eklenmesini kolaylaştırır.

---

## 🤝 Katkıda Bulunma

Katkılar, öneriler ve geliştirmeler memnuniyetle karşılanır.

Katkıda bulunma kuralları için [CONTRIBUTING.md](CONTRIBUTING.md) dosyasına göz atabilirsiniz.

Bir güvenlik sorunu keşfederseniz [SECURITY.md](SECURITY.md) dosyasını inceleyebilirsiniz.

---

## 📄 Lisans

Bu proje **MIT Lisansı** ile lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına göz atabilirsiniz.

---

<p align="center">
  React ⚛️ ile geliştirildi
</p>

<p align="center">
  <a href="https://hesap-kitap.vercel.app">Canlı Demo</a>
  ·
  <a href="https://github.com/MBasaran4/HesapKitap">Repository</a>
</p>
