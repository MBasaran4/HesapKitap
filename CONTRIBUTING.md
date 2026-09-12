# Katkıda Bulunma Kılavuzu (Contributing Guide)

HesapKitap projesine katkıda bulunmak istediğiniz için teşekkür ederiz! Bu belge, projeye katkı sunma sürecini hızlı, şeffaf ve verimli hale getirmek için hazırlanmıştır.

---

## Başlangıç Adımları

1. **Depoyu Fork'layın:**
   GitHub üzerinden bu depoyu kendi hesabınıza çatallayın (`Fork`).

2. **Yerel Ortama Klonlayın:**
   ```bash
   git clone https://github.com/<kullanici-adiniz>/HesapKitap.git
   cd HesapKitap
   ```

3. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

4. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```
   Tarayıcınızda `http://localhost:5173/` adresine giderek projeyi çalıştırabilirsiniz.

---

## Dal (Branch) İsimlendirme Önerileri

Geliştirmelerinizi yaparken açıklayıcı dal isimleri kullanmanız önerilir:

- `feature/<ozellik-adi>`: Yeni bir özellik veya hesaplayıcı eklerken (ör. `feature/kredi-hesaplama`)
- `fix/<hata-tanimi>`: Bir hatayı düzeltirken (ör. `fix/bmr-validation-bug`)
- `docs/<belge-adi>`: Dokümantasyon güncellemelerinde (ör. `docs/update-readme`)
- `refactor/<alan>`: Yeniden yapılandırma çalışmalarında (ör. `refactor/input-components`)

---

## Geliştirme Standartları

Değişiklik yaparken lütfen aşağıdaki ilkelere özen gösteriniz:

1. **Hesaplayıcı Şablonu:** Yeni bir hesaplayıcı ekliyorsanız, mevcut [`CalculatorLayout`](src/components/calculator/CalculatorLayout.jsx), [`InputField`](src/components/common/InputField.jsx) ve [`ResultCard`](src/components/common/ResultCard.jsx) bileşenlerini kullanarak tutarlı sayfa yapısını koruyun.
2. **Doğrulama ve Kenar Durumları:** Kullanıcı girdilerini mutlaka doğrulayın (boşluk, negatif sayılar, sıfır, mantıksız aralıklar). Arayüzde `NaN` veya `Infinity` oluşmasına izin vermeyin.
3. **Erişilebilirlik (A11y):** Semantik HTML etiketleri kullanın; etiket ve girdi kimliklerini (`htmlFor` / `id`) bağlayın.
4. **Tema Uyumu:** Açık ve koyu modlarda okunabilirliği bozabilecek sert kodlanmış (hardcoded) renkler kullanmaktan kaçının; `index.css` içindeki CSS değişkenlerini tercih edin.
5. **Gereksiz Bağımlılıklar:** Projeye gerekmedikçe büyük veya harici UI kütüphaneleri eklemeyin.

---

## Kod Denetimi ve Derleme

Pull Request açmadan önce yerel ortamınızda mutlaka şu komutları çalıştırın ve hatasız tamamlandıklarından emin olun:

```bash
# Kod standartları denetimi
npm run lint

# Üretim derlemesi testi
npm run build
```

---

## Commit ve Çekme İsteği (Pull Request)

1. Anlaşılır ve özet commit mesajları kullanınız (Örn: `feat: yeni hacim formülü eklendi`, `fix: takvim artık yıl kontrolü düzeltildi`).
2. Değişikliklerinizi kendi deponuza gönderin:
   ```bash
   git push origin feature/<ozellik-adi>
   ```
3. GitHub üzerinde ana depoya yönelik bir **Pull Request** açın.
4. PR şablonundaki kontrol listesini (`Checklist`) doldurun ve varsa arayüz değişikliklerine ait ekran görüntüleri ekleyin.
