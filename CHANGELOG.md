# Değişiklik Günlüğü (Changelog)

Bu belgedeki tüm önemli değişiklikler [Keep a Changelog](https://keepachangelog.com/tr/1.0.0/) ilkelerine ve [Semantic Versioning](https://semver.org/lang/tr/) standartlarına uygun olarak belgelenmektedir.

---

## [Unreleased]

### Added
- **Çoklu Dil (i18n) Desteği:** Türkçe (`tr`) ve İngilizce (`en`) tam dil desteği React Context (`LanguageContext`) ve dinamik parametre interpolasyonu ile sıfır harici paket bağımlılığıyla eklendi.
- **Duyarlı Dil Seçici:** Masaüstü navigasyon çubuğu ve mobil çekmece menü içerisine erişilebilir `TR | EN` seçici entegre edildi; dil tercihi `localStorage` üzerinden kalıcı hale getirildi.
- **Tam Sayfa ve Hesaplayıcı Yerelleştirmesi:** Ana sayfa, 404 sayfası, ortak bileşenler ve 6 hesaplayıcının tüm girdi, etiket, birim, doğrulama uyarısı ve dinamik formül sonuçları iki dilde eşitlendi.
- **Dinamik Belge Niteliği:** `<html lang="...">`, sayfa başlığı ve meta açıklaması seçilen dile göre anlık olarak güncellenecek şekilde yapılandırıldı.
- **Hesaplayıcı Konsolidasyonu:** Bağımsız 6 farklı hesaplayıcı deposu (`BoyKiloEndeks`, `MetabolizmaHesap`, `AlanHesaplama`, `HacimHesap`, `YasHesaplama`, `vizeFinalHesap`) tek bir modern React + Vite tek sayfa uygulaması (SPA) altında birleştirildi.
- **Kategorize Edilmiş Ana Sayfa:** Hesaplayıcılar Sağlık, Matematik, Zaman ve Eğitim kategorileri altında organize edildi.
- **Paylaşılan Bileşen Sistemi:**
  - `CalculatorLayout`: Tüm hesaplayıcılar için standartlaştırılmış kart, başlık ve bilgi kutusu şablonu.
  - `InputField`: Birim desteği, dinamik hata mesajları ve erişilebilir etiket-girdi eşleştirmesi.
  - `RadioGroup`: Semantik fieldset/legend ve modern buton-radyo seçim grubu.
  - `ResultCard`: `aria-live="polite"` ekran okuyucu uyumlu anlık sonuç kartı.
  - `SubmitButton`: Tutarlı hesaplama ve sıfırlama aksiyon butonu.
- **Duyarlı Gezinme (Navbar):** Masaüstü yatay menü ve mobil cihazlar için sağdan açılan hamburger çekmece (drawer) menüsü.
- **Tema Sistemi (Dark / Light):** CSS değişkenleri ve `localStorage` kalıcılığı ile anlık tema geçişi.
- **Kapsamlı Girdi Doğrulama:**
  - Sınır dışı, boş veya negatif değerlerin engellenmesi.
  - Takvim kontrolleri (30 çeken aylarda 31. gün, artık yıl dışı 29 Şubat ve gelecek tarihlerin engellenmesi).
  - Arayüzde `NaN` veya `Infinity` oluşmasını önleyen korumalar.
- **Açık Kaynak Dokümantasyonu & Şablonlar:**
  - `README.md`, `LICENSE` (MIT), `CONTRIBUTING.md`, `SECURITY.md`.
  - GitHub Issue şablonları (`bug_report.md`, `feature_request.md`, `config.yml`).
  - GitHub Pull Request şablonu (`pull_request_template.md`).
  - GitHub Actions CI iş akışı (`ci.yml`: `npm ci`, `npm run lint`, `npm run build`).

### Changed
- Proje bağımlılıkları temizlendi; gereksiz Next.js kaldırıldı, `@vercel/speed-insights/react` ve `react-router-dom` entegre edildi.
- Hacim hesaplamasında kare piramit formülü doğrulandı ($\frac{a^2 \times h}{3}$) ve sonuç etiketi düzeltildi.
- Yaş hesaplama sayfasında 50KB'lık statik takvim dizi kodları kaldırılarak dinamik ve hassas tarih farkı algoritmasına geçildi.

### Removed
- Dağınık ve mükerrer CSS dosyaları temizlendi; merkezi `index.css` tasarım token'ları ile yeniden yapılandırıldı.
- Kullanılmayan bileşenler ve eski şablon dosyaları kaldırıldı.
