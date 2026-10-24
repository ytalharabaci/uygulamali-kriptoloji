# 🤝 Katkıda Bulunma Rehberi

Bu projeye katkıda bulunmak istediğiniz için teşekkür ederiz! **Uygulamalı Kriptoloji** web kitabı, tamamen açık kaynaklı bir topluluk projesidir. Türkiye'deki Türkçe teknik kriptoloji, matematiksel temel ve kriptanaliz kaynak açığını kapatmak amacıyla geliştirilen bu başucu kaynağını hep birlikte daha da ileriye taşıyabiliriz.

Aşağıda, projeye nasıl katkı sağlayabileceğinize dair adım adım yönergeler yer almaktadır.

---

## 🚀 Hızlı Katkı (Web Üzerinden)

Küçük imla hataları, harf düzeltmeleri veya ufak düzenlemeler için bilgisayarınıza hiçbir geliştirme ortamı kurmanıza gerek yoktur:

1. Web kitabında okumakta olduğunuz herhangi bir sayfanın en altına gidin.
2. **"Sayfayı düzenle"** (*Edit this page*) bağlantısına tıklayın.
3. Bu bağlantı sizi doğrudan GitHub üzerindeki ilgili markdown (.md) dosyasına yönlendirecektir.
4. Düzenleme kalem simgesine tıklayarak değişikliklerinizi yapın ve doğrudan tarayıcı üzerinden bir **Pull Request (PR)** oluşturun.

---

## 💻 Gelişmiş Katkı (Yerel Ortamda)

Rehbere yeni algoritma analizleri eklemek, Go/Python kod örneklerini zenginleştirmek veya yapısal iyileştirmeler yapmak için yerel ortamınızı kurabilirsiniz:

### 1. Fork & Klonlama
1. GitHub deposunun sağ üst köşesindeki **"Fork"** butonuna tıklayarak projeyi kendi hesabınıza kopyalayın.
2. Kendi çatalınızı (fork) bilgisayarınıza klonlayın:
   ```bash
   git clone https://github.com/[KULLANICI-ADINIZ]/uygulamali-kriptoloji.git
   cd uygulamali-kriptoloji
   ```

### 2. Geliştirme Ortamı
1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Yerel geliştirme sunucusunu çalıştırın:
   ```bash
   npm run dev
   ```
3. Tarayıcınızda `http://localhost:4321/uygulamali-kriptoloji/` adresini açarak yaptığınız değişiklikleri anlık (*hot-reload*) olarak gözlemleyin.

### 3. Değişiklikleri Yapma
1. Değişiklikleriniz için anlamlı bir isme sahip yeni bir branch oluşturun:
   ```bash
   git checkout -b ozellik/modul-X-iyilestirme
   ```
2. `src/content/docs/` dizini altındaki ilgili markdown (.md) dosyalarını düzenleyin veya yeni dosyalar ekleyin.

### 4. Yerel Derleme Testi
Pull Request açmadan önce projenin sorunsuz derlendiğinden emin olun:
```bash
npm run build
```
Bu komut, tüm sayfaların, görsel optimizasyonlarının ve arama indeksinin (Pagefind) hatasız oluşturulduğunu teyit eder.

### 5. Commit & Push
1. Değişikliklerinizi ekleyin ve commit mesajınızı yazın (*Conventional Commits* standardını öneririz):
   ```bash
   git add .
   git commit -m "docs(ecc): add Curve25519 scalar multiplication benchmarks"
   git push origin ozellik/modul-X-iyilestirme
   ```
2. GitHub üzerinden ana depoya yönelik bir **Pull Request** açın.

---

## 📜 Yazım ve Biçimlendirme Kuralları

* **Teknik & Matematiksel Sezgi:** Matematiksel teoremler sadeleştirilmiş formüllerle ve pratik bağlamıyla sunulmalı; boğucu ispatlar yerine algoritmik mantığa odaklanılmalıdır.
* **Uygulamalı Kod Blokları:** Tüm kod örnekleri (Python veya Go) çalıştırılabilir, açıklamalı ve standart kütüphaneleri referans alan bir yapıda olmalıdır.
* **Kriptanaliz & Zafiyet:** Sadece "nasıl çalışır" değil, "nasıl istismar edilir ve nasıl önlenir" (örneğin CBC Padding Oracle, timing attacks, Wiener attack) boyutu vurgulanmalıdır.
* **Uyarı Kutuları (Asides):** Starlight yerel asides formatı kullanılmalıdır (`:::note`, `:::tip`, `:::caution[Başlık]`, `:::danger`).
* **Kaynak Gösterme:** Kullanılan dış standartlar (RFC, NIST FIPS, IACR ePrint) sayfa sonunda açıkça referans verilmelidir.

Katkılarınız için şimdiden teşekkür ederiz!

