---
title: "Uygulamalı Kriptoloji"
description: "Soyut formüllere boğulmadan algoritmaların matematiksel çekirdeğini, Python & Go pratiklerini ve kriptanaliz senaryolarını birleştiren açık kaynak Türkçe web kitabı."
template: splash
hero:
  tagline: "Soyut formüllere boğulmadan modern algoritmaların matematiksel çekirdeğini, Python & Go pratiklerini ve gerçek dünya kriptanaliz senaryolarını birleştiren kapsamlı başucu kaynağı."
  image:
    file: ../../assets/hero_visual.webp
  actions:
    - text: Kitaba Başla (Modül I)
      link: /uygulamali-kriptoloji/01-kriptolojinin-temelleri-ve-matematiksel-altyapi/01-kriptoloji-ve-guvenlik-modelleri/
      icon: right-arrow
      variant: primary
    - text: GitHub'da İncele
      link: https://github.com/ytalharabaci/uygulamali-kriptoloji
      icon: external
      variant: minimal
---

<div class="hero-grid-section">

### Neden Bu Kitap?

Kriptoloji, sadece soyut teoremler ve karmaşık matematik ispatları yığını olmadığı gibi; yalnızca kütüphane çağırmaktan ibaret bir yazılım rutini de değildir. Bu kitap; **Kerckhoffs Prensibi'nden kuantum sonrası kafes matematiğine (PQC)**, **AES SubBytes dönüşümlerinden Padding Oracle istismarlarına**, **Curve25519 eliptik eğrilerinden sıfır bilgi ispatlarına (ZKP)** kadar tüm kritik süreçleri 4 adımlı standart bir pedagojiyle ele alır:

1. **Teorik Sezgi & Matematik:** Konunun ortaya çıkış nedeni, arkasındaki sadeleştirilmiş sayı teorisi ve formüller.
2. **Gerçek Hayat Mimarisi:** Algoritmanın TLS 1.3, SSH, WireGuard, Signal ve blokzincir ağlarındaki yeri.
3. **Uygulamalı Kod Örneği:** Go ve Python ile sıfırdan yazılmış temiz, çalıştırılabilir ve açıklamalı implementasyonlar.
4. **Güvenlik & Kriptanaliz Notu:** Yaygın geliştirici zaafları (sabit IV, ECB kullanımı, zamanlama açıkları) ve saldırı yüzeyi analizleri.

</div>

---

### Kitabın 7 Temel Modülü

<div class="modules-overview-grid">

* **Modül I: Kriptolojinin Temelleri ve Matematiksel Altyapı**
  * Modüler aritmetik, Genişletilmiş Öklid, Fermat & Euler teoremleri, DLP ve CSPRNG rastgelelik mimarisi.
* **Modül II: Klasik Şifreleme ve Kriptanaliz Teknikleri**
  * Sezar, Vigenère, Enigma makinesi, frekans analizi, Kasiski & Friedman testleri.
* **Modül III: Simetrik Kriptografi ve Blok Şifreleyiciler**
  * Akış şifreleyiciler (ChaCha20), Feistel (DES) ve SPN, AES derinlemesine analiz ($GF(2^8)$), AEAD (GCM, Poly1305) ve Padding Oracle exploitleri.
* **Modül IV: Asimetrik Kriptografi ve Anahtar Değişimi**
  * Diffie-Hellman, PFS, RSA matematiği ve saldırıları (Wiener, small e), Eliptik Eğriler (ECC, ECDH, ECDSA, Curve25519, Ed25519).
* **Modül V: Kriptografik Özetler, Bütünlük ve Dijital İmzalar**
  * SHA-2, SHA-3 Sünger mimarisi, HMAC zamanlama yan kanal saldırıları, Sony PS3 k-reuse felaketi ve Merkle Ağaçları.
* **Modül VI: Güvenli Ağ ve Sistem Protokolleri (Gerçek Dünya)**
  * X.509 PKI mimarisi, TLS 1.3 el sıkışması, SSH/IPsec, JWT anahtar karışıklığı zafiyetleri ve Argon2id parola güvenliği.
* **Modül VII: İleri Düzey Paradigmalar ve Kriptolojinin Geleceği**
  * Kuantum Sonrası Kriptografi (ML-KEM/Kyber, ML-DSA/Dilithium), Sıfır Bilgi İspatları (ZKP, zk-SNARKs), Homomorfik Şifreleme (FHE) ve Kripto Para/Blokzincir temelleri.

</div>

---

```mermaid
flowchart TD
    subgraph M1 ["Modül I: Temeller & Matematik"]
        A1["Modüler Aritmetik & Öklid"] --> A2["Asal Sayılar & Fermat/Euler"]
        A2 --> A3["Entropi & CSPRNG"]
    end

    subgraph M2 ["Modül II: Klasik Kriptanaliz"]
        B1["Sezar, Vigenère & Enigma"] --> B2["Frekans & Kasiski Analizi"]
    end

    subgraph M3 ["Modül III: Simetrik Kriptografi"]
        C1["Akış (ChaCha20)"] --> C2["Blok (AES / SPN)"]
        C2 --> C3["Modlar & AEAD (GCM)"]
        C3 --> C4["Padding Oracle Saldırısı"]
    end

    subgraph M4 ["Modül IV: Asimetrik Kriptografi"]
        D1["Diffie-Hellman & PFS"] --> D2["RSA & Wiener Açığı"]
        D2 --> D3["Eliptik Eğriler (ECC/X25519)"]
    end

    subgraph M5 ["Modül V: Özetler & İmzalar"]
        E1["SHA-2 / SHA-3"] --> E2["HMAC & Zamanlama Saldırıları"]
        E2 --> E3["Dijital İmzalar (Ed25519) & Merkle"]
    end

    subgraph M6 ["Modül VI: Gerçek Dünya Protokolleri"]
        F1["PKI / X.509 Zinciri"] --> F2["TLS 1.3 El Sıkışması"]
        F2 --> F3["JWT Zafiyetleri & Argon2id"]
    end

    subgraph M7 ["Modül VII: Gelecek Paradigmaları"]
        G1["PQC (ML-KEM / Kyber)"] --> G2["Sıfır Bilgi İspatları (ZKP)"]
        G2 --> G3["FHE & Blokzincir / PoW / PoS"]
    end

    M1 --> M2 --> M3 --> M4 --> M5 --> M6 --> M7
```
