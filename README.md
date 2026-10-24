# 🔐 Uygulamalı Kriptoloji

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Turkish](https://img.shields.io/badge/Language-Turkish-red.svg)](#)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-WELCOME-brightgreen.svg?style=for-the-badge)](#-katkıda-bulunma)
[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)
[![Astro 7](https://img.shields.io/badge/Astro-7.3-orange.svg)](https://astro.build)

> **🎯 Soyut formüllere boğulmadan modern algoritmaların matematiksel çekirdeğini, Python & Go pratiklerini ve gerçek dünya kriptanaliz senaryolarını birleştiren açık kaynak Türkçe başucu rehberi.**

---

## 📖 Proje Hakkında

Bu **açık kaynaklı** teknik web kitabı, kriptografik mekanizmaları, algoritmaların arkasındaki matematiksel temelleri ve gerçek dünya güvenlik/zafiyet analizlerini kavramak isteyen yazılım geliştiriciler, güvenlik mühendisleri ve siber güvenlik araştırmacıları için hazırlanmıştır.

Soyut teoremler ve boğucu ispatlar yerine bu çalışma, **matematiksel sezgiyi doğrudan Python ve Go ile çalışan kod blokları, saldırı simülasyonları ve protokol analizleriyle** birleştirir.

* **💻 Altyapı:** Astro 7 & Starlight (Modern ve Hızlı Web Arayüzü, Content Layer API)
* **🌍 Dil:** %100 Türkçe
* **🔍 Arama:** Pagefind ile tam entegre, anlık yerel arama desteği
* **🤝 Katkı:** Herkese açık ve Pull Request odaklı topluluk projesi

---

## 📑 Müfredat ve İçindekiler

Rehber, matematiksel sezgi ve pratik mühendislik dengesiyle ilerleyen **7 ana modül** ve **35 alt bölümden** oluşur:

| Bölüm | Konu / Kapsanan Temel Başlıklar | Durum |
| :--- | :--- | :---: |
| **01. Kriptolojinin Temelleri ve Matematiksel Altyapı** | • Kriptoloji ve Güvenlik Modelleri (Kerckhoffs Prensibi, Shannon Kusursuz Gizliliği, OTP)<br>• Modüler Aritmetik ve Sayılar Teorisi (Genişletilmiş Öklid, Modüler Ters)<br>• Asal Sayılar, Fermat'nın Küçük Teoremi ve Euler Totient Fonksiyonu<br>• Rastgelelik, Entropi Kaynakları ve CSPRNG Mimarisi (`crypto/rand`, `/dev/urandom`)<br>• Laboratuvar: Python ile Modüler Aritmetik Hesaplayıcı ve CSPRNG Entropi Test Aracı | ✅ Yayında |
| **02. Klasik Şifreleme ve Kriptanaliz Teknikleri** | • Tarihsel Şifreleme Yöntemleri (Sezar, Atbash, Vigenère, Playfair)<br>• Enigma Makinesi Mimarisi ve Rotor Mekanizması Analizi<br>• Harf Frekans Analizi ve Dil İstatistikleri (Ki-Kare Uygunluk Testi)<br>• Kasiski İncelemesi ve Friedman Testi ile Anahtar Uzunluğu Tespiti<br>• Laboratuvar: Python ile Otomatik Frekans Analizi ve Vigenère Çözücü | ✅ Yayında |
| **03. Simetrik Kriptografi ve Blok Şifreleyiciler** | • Akış Şifreleyiciler (LFSR, RC4 Zaafları, ChaCha20 Mimarisi)<br>• Feistel Ağları (DES/3DES) ve SPN (Substitution-Permutation Network)<br>• AES Derinlemesine Analiz (SubBytes, ShiftRows, MixColumns, $GF(2^8)$ Sonlu Alanı)<br>• Blok Çalışma Modları (ECB Penguen Zafiyeti, CBC, CTR) ve AEAD (AES-GCM)<br>• Laboratuvar: Basitleştirilmiş AES-128 ve CBC Padding Oracle Saldırısı | ✅ Yayında |
| **04. Asimetrik Kriptografi ve Anahtar Değişimi** | • Diffie-Hellman Protokolü, Ayrık Logaritma Problemi ve PFS (Forward Secrecy)<br>• RSA Mimarisi, Anahtar Üretimi ve Matematiksel Temeller ($p, q, n, e, d$)<br>• RSA Kriptanalizi (Wiener Saldırısı, Küçük e ve OAEP Dolgusu)<br>• Eliptik Eğri Kriptografisi (ECC, Nokta Toplama, ECDH, ECDSA)<br>• Modern Güvenli Eğriler: Curve25519 (X25519) ve Ed25519 | ✅ Yayında |
| **05. Kriptografik Özetler, Bütünlük ve Dijital İmzalar** | • Özet Fonksiyonları, Tek Yönlülük, Çakışma Direnci ve Avalanche Etkisi<br>• MD5/SHA-1 Kırılması, SHA-2 ve Keccak (SHA-3 Sünger Mimarisi)<br>• Mesaj Doğrulama Kodları (MAC/HMAC) ve Zamanlama Yan Kanal Saldırıları<br>• Dijital İmzalar (RSA-PSS, Ed25519) ve Sony PS3 k-reuse Faciası<br>• Merkle Ağaçları (Merkle Trees) ve Blok Düzeyinde Veri Bütünlüğü | ✅ Yayında |
| **06. Güvenli Ağ ve Sistem Protokolleri** | • Açık Anahtar Altyapısı (PKI), X.509 Zincir Doğrulama ve Certificate Transparency<br>• TLS 1.3 Protokol Anatomisi, 1-RTT / 0-RTT El Sıkışması ve Şifre Süitleri<br>• SSH ve IPsec Protokol Mimarisi (Anahtar Değişimi, Host Keys ve ESP Tünelleri)<br>• Kimlik ve Web Güvenliğinde Kriptografik Zafiyetler (JWT `alg: none`, Key Confusion)<br>• Parola Güvenliği ve Anahtar Türetme Fonksiyonları (PBKDF2, bcrypt, Argon2id) | ✅ Yayında |
| **07. İleri Düzey Paradigmalar ve Gelecek** | • Kuantum Sonrası Kriptografi (PQC, Shor/Grover Tehdidi, Kafes Matematiği, ML-KEM, ML-DSA)<br>• Sıfır Bilgi İspatları (ZKP, zk-SNARKs Mimarisi ve Ali Baba Mağarası)<br>• Tam Homomorfik Şifreleme (FHE, Paillier ve Bulut Gizliliği)<br>• Kripto Para ve Blokzincir Kriptografik Protokolleri (PoW, PoS, BIP-32/39)<br>• Laboratuvar: Kyber (ML-KEM) ile Kuantum Güvenli Anahtar Kapsülleme | ✅ Yayında |

---

## 🚀 Hızlı Başlangıç (Yerel Geliştirme)

Bu projeyi bilgisayarınızda çalıştırmak ve anlık değişiklikleri görüntülemek için aşağıdaki adımları izleyebilirsiniz.

### 📋 Gereksinimler
* [Node.js](https://nodejs.org/) (v22.12.0 veya üzeri)
* npm (Node.js ile otomatik olarak yüklenir)

### ⚡ Kurulum ve Çalıştırma
```bash
# 1. Projeyi klonlayın
git clone https://github.com/ytalharabaci/uygulamali-kriptoloji.git
cd uygulamali-kriptoloji

# 2. Bağımlılıkları yükleyin
npm install

# 3. Yerel geliştirme sunucusunu başlatın
npm run dev
```

Ardından tarayıcınızda `http://localhost:4321/uygulamali-kriptoloji/` adresine giderek kitabı anlık (*hot-reload*) olarak görüntüleyebilirsiniz.

### 🏗️ Canlıya Derleme (Production Build)
```bash
npm run build
```
Oluşturulan statik web sitesi `dist/` klasörüne derlenir ve GitHub Actions ile GitHub Pages üzerinde otomatik olarak yayınlanır.

---

## 🤝 Katkıda Bulunma

Bu rehberin gelişmesi ve güncel kalması kriptoloji ve güvenlik topluluğunun katkılarına bağlıdır. Her türlü katkı (imla düzeltmeleri, yeni algoritma analizleri, Go/Python kod örnekleri, saldırı senaryoları vb.) son derece değerlidir.

* **💡 Hızlı Katkı:** Okuduğunuz herhangi bir sayfanın en altında bulunan **"Sayfayı düzenle"** (*Edit this page*) butonuna tıklayarak doğrudan tarayıcı üzerinden Pull Request gönderebilirsiniz.
* **📂 Detaylı Katkı Süreci:** Detaylı katkı yönergeleri ve commit standartları için lütfen **[Katkı Rehberi (CONTRIBUTING.md)](CONTRIBUTING.md)** dosyasını inceleyin.

---

## 📊 Proje İstatistikleri

* **🏗️ Yapı:** 7 Modül, 35 Alt Bölüm (Teknik Markdown Dokümanları)
* **💻 Kod Örnekleri:** Go ve Python uygulamalı temiz implementasyonlar ve laboratuvarlar
* **🔍 Arama Motoru:** Pagefind ile tam entegre, anlık yerel arama desteği
* **🔧 CI/CD:** GitHub Actions ile otomatik derleme ve yayınlama

---

## 📜 Lisans

Bu proje **Creative Commons Attribution 4.0 International (CC BY 4.0)** lisansı altında korunmaktadır. Lisans metninin tamamı için [LICENSE](LICENSE) dosyasına bakın.
* ✅ **Serbest Kullanım:** Ticari kullanım, eğitim amaçlı kullanım, uyarlama ve yeniden dağıtım tamamen serbesttir.
* 📝 **Tek Koşul:** Orijinal esere atıfta bulunulması gerekmektedir.

```text
"Uygulamalı Kriptoloji" by Yusuf Talha ARABACI 
is licensed under CC BY 4.0
Kaynak: https://github.com/ytalharabaci/uygulamali-kriptoloji
```

---

## ✍️ Yazar ve İletişim

**Yusuf Talha ARABACI**
* 🐙 GitHub: [@ytalharabaci](https://github.com/ytalharabaci)
* 💼 LinkedIn: [yusufarbc](https://www.linkedin.com/in/yusufarbc/)

---

**🌟 Gelin, Türkiye'nin kriptoloji ve siber güvenlik literatürünü birlikte büyütelim!**
