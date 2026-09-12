# HesapKitap

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://hesap-kitap.vercel.app/)

HesapKitap, günlük yaşam, sağlık, matematik, zaman ve eğitim alanlarında sık kullanılan hesaplama işlemlerini tek bir modern web uygulaması altında birleştiren React tabanlı bir hesaplama platformudur.

Kullanıcı dostu arayüzü, anlık istemci taraflı hesaplama altyapısı, kapsamlı girdi doğrulamaları ve erişilebilir bileşen mimarisi ile günlük hesaplama ihtiyaçlarına hızlı ve güvenilir çözümler sunar.

---

## Canlı Demo / Live Demo

Uygulamayı tarayıcınızda deneyimlemek için:
👉 **[https://hesap-kitap.vercel.app](https://hesap-kitap.vercel.app/)**

---

## Özellikler / Features

- **Duyarlı ve Modern Arayüz (Responsive UI):** Mobil (375px), tablet (768px), dizüstü (1024px) ve geniş ekran (1440px) boyutlarında kusursuz görüntüleme.
- **Karanlık ve Aydınlık Tema (Dark / Light Theme):** CSS değişkenleri tabanlı, göz yormayan, kalıcı (`localStorage`) tema desteği.
- **İstemci Taraflı Hesaplama (Client-Side Computation):** Sunucu gecikmesi olmadan, anında sonuç üreten yüksek performanslı mimari.
- **Kapsamlı Girdi Doğrulama (Input Validation):** Boş, sıfır, negatif veya geçersiz aralıktaki girdileri yakalayan koruma mekanizmaları.
- **Türkçe Hata Mesajları:** Anlaşılır, kullanıcıyı yönlendiren net geri bildirimler.
- **`NaN` ve `Infinity` Koruması:** Geçersiz matematiksel işlemlerin arayüzde bozulma yaratmasını önleyen kontroller.
- **Erişilebilir Form Kontrolleri (A11y):** Semantik HTML etiketleri, etiket-girdi eşleştirmeleri ve ekran okuyucu uyumluluğu (`aria-live="polite"`).
- **Klavye Odak Desteği:** Klavye ile rahat gezinme sağlayan belirgin odak (`:focus-visible`) göstergeleri.
- **Mobil Menü ve Çekmece:** Mobil cihazlarda kolay navigasyon sağlayan hamburger menü ve arka plan kaplaması.
- **Kategorize Edilmiş Hesaplayıcılar:** Sağlık, matematik, zaman ve eğitim alanlarına göre düzenlenmiş modüler yapı.
- **React Router Gezintisi:** Sayfa yenilenmesine gerek kalmadan akıcı tek sayfa uygulaması (SPA) deneyimi.

---

## Hesaplayıcılar / Calculators

Platform bünyesinde 4 kategoride 6 temel hesaplayıcı yer almaktadır:

| Kategori | Hesaplayıcı | Rota (Route) | Açıklama |
| :--- | :--- | :--- | :--- |
| **Sağlık** | **Boy-Kilo Endeksi (BKİ)** | `/saglik/boy-kilo-endeksi` | DSÖ standartlarına göre vücut kitle endeksi ve ideal kilo aralığı hesabı. |
| **Sağlık** | **Metabolizma Hızı (BMR)** | `/saglik/metabolizma-hizi` | Harris-Benedict denklemi ve aktivite düzeyine göre günlük kalori ihtiyacı hesabı. |
| **Matematik** | **Alan Hesaplama** | `/matematik/alan-hesaplama` | Dikdörtgen, üçgen ve daire için adım adım geometrik alan hesabı. |
| **Matematik** | **Hacim Hesaplama** | `/matematik/hacim-hesaplama` | Küp, prizma, silindir, koni, küre ve kare piramit için 3B hacim hesabı. |
| **Zaman** | **Yaş Hesaplama** | `/zaman/yas-hesaplama` | Artık yıl ve ay takvimine dayalı gün, ay, yıl farkı, toplam yaşanan gün ve sonraki doğum günü geri sayımı. |
| **Eğitim** | **Vize-Final Not Hesaplama** | `/egitim/vize-final-hesaplama` | Çoklu vize ortalaması, final notu, üniversite geçme barajı ve hedeflenen not için gereken final skoru hesabı. |

---

## Kullanılan Teknolojiler / Technologies

- **[React 18.3.1](https://react.dev/):** Kullanıcı arayüzü ve bileşen mimarisi
- **[Vite 5.4.0](https://vitejs.dev/):** Hızlı geliştirme ortamı ve optimize edilmiş üretim derleyicisi
- **[React Router DOM 6.26.0](https://reactrouter.com/):** İstemci taraflı sayfa yönlendirme ve dinamik rotalama
- **[React Icons 5.3.0](https://react-icons.github.io/react-icons/):** Vektörel arayüz ikonları
- **[Vercel Speed Insights & Analytics](https://vercel.com/docs/speed-insights):** Gerçek kullanıcı performansı ve hız izleme
- **Modern Vanilla CSS:** Tasarım token'ları, CSS değişkenleri, esnek kutular (Flexbox) ve ızgaralar (Grid)

---

## Proje Yapısı / Project Structure

```text
HesapKitap/
├── public/
│   └── HK.svg                          # Uygulama logosu / favicon
├── src/
│   ├── components/
│   │   ├── calculator/
│   │   │   ├── CalculatorLayout.jsx    # Ortak hesaplayıcı sayfa iskeleti
│   │   │   └── CalculatorLayout.css
│   │   ├── common/
│   │   │   ├── InputField.jsx / .css   # Standart etiketli input bileşeni
│   │   │   ├── RadioGroup.jsx / .css   # Erişilebilir radyo seçim grubu
│   │   │   ├── ResultCard.jsx / .css   # Canlı sonuç gösterim kartı
│   │   │   └── SubmitButton.jsx / .css # Standart hesapla/sıfırla butonu
│   │   └── layout/
│   │       ├── Layout.jsx              # Ana yerleşim kapsayıcısı
│   │       ├── Navbar.jsx              # Gezinme çubuğu ve mobil menü
│   │       └── Navbar.css
│   ├── context/
│   │   └── ThemeContext.jsx            # Tema (Dark/Light) sağlayıcısı
│   ├── pages/
│   │   ├── education/
│   │   │   ├── GradePage.jsx / .css    # Vize-Final sayfası
│   │   ├── health/
│   │   │   ├── BmiPage.jsx / .css      # BKİ sayfası
│   │   │   └── BmrPage.jsx / .css      # BMR sayfası
│   │   ├── mathematics/
│   │   │   ├── AreaPage.jsx / .css     # Alan hesaplama sayfası
│   │   │   └── VolumePage.jsx / .css   # Hacim hesaplama sayfası
│   │   ├── time/
│   │   │   ├── AgePage.jsx / .css      # Yaş hesaplama sayfası
│   │   ├── HomePage.jsx / .css         # Kategorize edilmiş ana sayfa
│   │   └── NotFoundPage.jsx            # 404 sayfası
│   ├── styles/
│   │   └── calculators.css             # Genel hesaplayıcı ortak stilleri
│   ├── utils/
│   │   └── helpers.js                  # Takvim ve biçimlendirme fonksiyonları
│   ├── App.jsx                         # Rota tanımları
│   ├── index.css                       # Global stiller, tema değişkenleri
│   └── main.jsx                        # Uygulama giriş noktası
├── index.html                          # HTML5 şablonu ve SEO etiketleri
├── package.json                        # Bağımlılıklar ve scriptler
└── vite.config.js                      # Vite yapılandırması
```

---

## Kurulum ve Başlangıç / Getting Started

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

### Gereksinimler

- [Node.js](https://nodejs.org/) (v18 veya daha yeni sürüm önerilir)
- npm veya yarn

### Adımlar

1. **Depoyu klonlayın:**
   ```bash
   git clone https://github.com/MBasaran4/HesapKitap.git
   ```

2. **Proje dizinine girin:**
   ```bash
   cd HesapKitap
   ```

3. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

4. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

Tarayıcınızda `http://localhost:5173/` adresine giderek uygulamayı görüntüleyebilirsiniz.

---

## Kullanılabilir Komutlar / Available Scripts

| Komut | Açıklama |
| :--- | :--- |
| `npm run dev` | Yerel geliştirme sunucusunu başlatır (Vite). |
| `npm run build` | Projeyi üretim için optimize edilmiş statik dosyalara derler (`dist/`). |
| `npm run lint` | ESLint ile kod standartlarını ve olası hataları denetler. |
| `npm run preview` | Üretim derlemesini yerel olarak test etmek için önizleme sunucusunu açar. |

---

## Doğrulama ve Erişilebilirlik / Validation & Accessibility

Platform, ürün kalitesini ve kullanıcı deneyimini en üst düzeyde tutmak amacıyla kapsamlı kontroller içerir:

- **Girdi Doğrulama:**
  - Boş veya eksik alan kontrolleri
  - Sınır dışı değerler (ör. boy için 50-250 cm, kilo için 20-350 kg)
  - Negatif ölçü ve boyutların engellenmesi
  - Geçersiz takvim günleri (ör. 30 çeken aylarda 31. gün, artık yıl dışı 29 Şubat)
  - Bugünden ileri tarihli doğum tarihlerinin engellenmesi
  - Sınav notu (0-100) ve etki yüzdeleri toplamı (%100) doğrulamaları
- **Erişilebilirlik (A11y):**
  - Doğru etiket-girdi (`htmlFor` / `id`) ilişkilendirmeleri
  - Radyo seçenekleri için semantik `<fieldset>` ve `<legend>` kullanımı
  - Klavye kullanıcıları için belirgin `:focus-visible` stilleri
  - Dinamik hesaplama sonuçlarının ekran okuyuculara seslendirilmesi için `aria-live="polite"` desteği

---

## Tema Desteği / Theme Support

HesapKitap, açık (light) ve koyu (dark) tema desteği sunar:
- Gezinme çubuğundaki tema düğmesi üzerinden anlık geçiş yapılabilir.
- Kullanıcının tema tercihi `localStorage` üzerinde saklanır ve sayfalar arası gezintide korunur.
- Tema değişkenleri CSS Custom Properties (`--bg-color`, `--card-bg`, `--text-color`, `--card-border` vb.) aracılığıyla yönetildiği için renk uyumsuzlukları engellenmiştir.

---

## Ekran Görüntüleri / Screenshots

> *Arayüz ekran görüntüleri ve önizleme görselleri gelecek güncellemelerde bu bölüme eklenecektir.*

---

## Yol Haritası / Roadmap

- [ ] GitHub Actions ile sürekli entegrasyon (CI) iş akışları (lint ve build kontrolü)
- [ ] Hesaplama fonksiyonları için otomatik birim testleri (Vitest / React Testing Library)
- [ ] Yeni hesaplayıcı modülleri (Finans: Kredi faiz hesabı, KDV hesaplama)
- [ ] PWA (Progressive Web App) desteği ile çevrimdışı çalışabilirlik
- [ ] Çoklu dil desteği (İngilizce / Türkçe)

---

## Katkıda Bulunma / Contributing

Katkılarınız projeyi daha iyi hale getirmek için değerlidir:

1. Bu depoyu Fork'layın (`Fork`).
2. Yeni bir özellik dalı (feature branch) oluşturun:
   ```bash
   git checkout -b feature/yeni-ozellik
   ```
3. Değişikliklerinizi commit'leyin:
   ```bash
   git commit -m "feat: yeni ozellik eklendi"
   ```
4. Dalınızı uzak depoya gönderin:
   ```bash
   git push origin feature/yeni-ozellik
   ```
5. Bir Çekme İsteği (Pull Request) açın.

---

## Lisans / License

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. Detaylar için [`LICENSE`](LICENSE) dosyasına göz atabilirsiniz.

Copyright (c) 2026 **MBasaran4**
