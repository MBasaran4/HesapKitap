# Güvenlik Politikası (Security Policy)

HesapKitap projesinde kullanıcı güvenliği ve açık kaynak kod kalitesi öncelikli değerlerimizdendir.

---

## Veri İşleme ve Gizlilik

HesapKitap, tamamen **istemci taraflı (client-side)** çalışan bir web uygulamasıdır:
- Kullanıcıların girdiği hiçbir veri (boy, kilo, doğum tarihi, sınav notları vb.) herhangi bir sunucuya iletilmez, kaydedilmez veya üçüncü taraflarla paylaşılmaz.
- Tüm matematiksel hesaplamalar kullanıcının kendi tarayıcısında anlık olarak yürütülür.
- Yalnızca kullanıcının tema tercihi (açık/koyu mod) yerel tarayıcı hafızasında (`localStorage`) saklanır.

---

## Güvenlik Açığı Bildirimi (Reporting a Vulnerability)

Projede potansiyel bir güvenlik açığı veya zafiyet tespit ettiyseniz, lütfen aşağıdaki yönergeleri izleyiniz:

1. **Herkese Açık Issue Açmayınız:** Güvenlik açıklarının kötüye kullanımını önlemek amacıyla, zafiyet detaylarını lütfen genel GitHub Issue alanında paylaşmayınız.
2. **Özel Zafiyet Bildirimi (GitHub Private Vulnerability Reporting):**
   - Deponun [Security sekmesi](https://github.com/MBasaran4/HesapKitap/security) altında bulunan **"Report a vulnerability"** (Zafiyet bildir) butonunu kullanarak güvenli ve gizli bir bildirim oluşturabilirsiniz.
   - Bu yöntem, bildirimin yalnızca depo yöneticisi tarafından incelenmesini ve kamuya açıklanmadan önce güvenle giderilmesini sağlar.

Bildiriminiz incelendikten sonra en kısa sürede geri dönüş yapılacak ve gerekli düzeltmeler yapılarak sürüm yayınlanacaktır.
