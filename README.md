# Uygulamalı Kriptoloji ve Kriptanaliz

Modern kriptografinin matematiksel çekirdeğini, Python & Go pratiklerini ve zafiyet/kriptanaliz senaryolarını birleştiren açık kaynak Türkçe web kitabı.

Canlı Yayın: [https://ytalharabaci.github.io/uygulamali-kriptoloji/](https://ytalharabaci.github.io/uygulamali-kriptoloji/)

---

## 7 Modüllü Kitap Mimarisi

* **Modül I: Kriptolojinin Temelleri ve Matematiksel Altyapı:** Kerckhoffs prensibi, Shannon kusursuz gizliliği, One-Time Pad, modüler aritmetik, Genişletilmiş Öklid, asal sayılar, Fermat/Euler teoremleri, DLP ve CSPRNG.
* **Modül II: Klasik Şifreleme ve Kriptanaliz Teknikleri:** Sezar, Atbash, Vigenère, Playfair, Scytale, Enigma makinesi, harf frekans analizi, Ki-Kare testi, Kasiski ve Friedman testleri.
* **Modül III: Simetrik Kriptografi ve Blok Şifreleyiciler:** Akış şifreleyiciler (ChaCha20, LFSR, RC4 zaafları), Feistel ağları (DES/3DES), SPN mimarisi, AES derinlemesine analiz ($GF(2^8)$ sonlu alan matematiği), çalışma modları (ECB, CBC, CTR, AEAD: AES-GCM, ChaCha20-Poly1305) ve Padding Oracle exploitleri.
* **Modül IV: Asimetrik Kriptografi ve Anahtar Değişimi:** Diffie-Hellman protokolü, MitM analizi, Mükemmel İleri Gizlilik (PFS), RSA mimarisi, PKCS#1 OAEP dolgusu, Wiener ve Fermat çarpanlara ayırma saldırıları, Eliptik Eğriler (ECC, ECDH, ECDSA, Curve25519/X25519, Ed25519).
* **Modül V: Kriptografik Özetler, Bütünlük ve Dijital İmzalar:** Tek yönlülük, çakışma direnci, MD5/SHA-1 kırılması, SHA-2, Keccak (SHA-3 sünger mimarisi), HMAC, zamanlama saldırıları (Timing Attacks), Sony PS3 k-reuse felaketi ve Merkle Ağaçları.
* **Modül VI: Güvenli Ağ ve Sistem Protokolleri (Gerçek Dünya):** X.509 PKI mimarisi, Certificate Transparency, TLS 1.3 el sıkışması ve 0-RTT riskleri, SSH-2 ve IPsec tünelleri, JWT kriptografik açıkları (`alg: none`, Key Confusion) ve Argon2id parola güvenliği.
* **Modül VII: İleri Düzey Paradigmalar ve Kriptolojinin Geleceği:** Kuantum Sonrası Kriptografi (PQC - Shor ve Grover tehditleri, Kafes/Lattice matematiği, NIST ML-KEM/Kyber ve ML-DSA/Dilithium), Sıfır Bilgi İspatları (ZKP, zk-SNARKs), Tam Homomorfik Şifreleme (FHE, Paillier) ve Blokzincir/PoW temelleri.

---

## Yerel Geliştirme

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Üretim derlemesi (Production Build)
npm run build
```

## Lisans

Bu çalışma [CC-BY-4.0](LICENSE) ile lisanslanmıştır.

