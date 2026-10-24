---
title: "5.1 Kriptografik Özet Fonksiyonları ve Çakışma Direnci"
description: "Tek yönlülük, çakışma direnci, MD5/SHA-1'in kırılması, Merkle-Damgård mimarisi ve SHA-3 Keccak sünger yapısı."
---

Kriptografik özet fonksiyonları (*Cryptographic Hash Functions*), herhangi bir uzunluktaki girdiyi ($M$) alıp sabit uzunlukta deterministik bir parmak izine ($h = H(M)$) dönüştüren, tersi alınamaz matematiksel tek yönlü filtrelerdir.

---

## 1. Teorik Sezgi & Matematik

Bir özet fonksiyonunun kriptografik olarak güvenli sayılabilmesi için 3 temel şartı sağlaması gerekir:

1. **Pre-image Resistance (Tek Yönlülük):** Verilen bir özet değeri $h$ için $H(m) = h$ koşulunu sağlayan bir $m$ mesajı bulmak hesaplama açısından imkansız olmalıdır ($O(2^n)$ karmaşıklık).
2. **Second Pre-image Resistance (İkinci Çakışma Direnci):** Verilen bir $m_1$ mesajı için, aynı özeti veren farklı bir $m_2$ mesajı ($H(m_1) = H(m_2)$ ve $m_1 \neq m_2$) bulmak imkansız olmalıdır ($O(2^n)$ karmaşıklık).
3. **Collision Resistance (Çakışma Direnci):** Önceden belirlenmemiş herhangi iki farklı mesajın aynı özeti üretmesi ($H(m_1) = H(m_2)$) imkansız olmalıdır.

### Doğum Günü Paradoksu ve Çakışma Sınırı

Bir odadaki 23 kişiden en az ikisinin doğum gününün aynı olma olasılığı %50'nin üzerindedir. Kriptografide de $n$-bitlik bir özet fonksiyonunda rastgele iki mesajın çakışmasını bulmak $2^n$ değil, sadece **$2^{n/2}$** deneme gerektirir. 
* Bu nedenle 128-bitlik MD5'in çakışma direnci yalnızca $2^{64}$ işlem gücündedir (modern donanımlarla dakikalar sürer).

### Merkle-Damgård Mimarisi vs. Keccak (SHA-3) Sünger Yapısı

* **Merkle-Damgård (MD5, SHA-1, SHA-2):** Mesaj bloklara bölünür ve bir sıkıştırma fonksiyonuyla ($f$) ardışık olarak işlenir: $h_i = f(h_{i-1}, M_i)$.
  * **Kusuru:** **Boyut Uzatma Saldırısına (Length Extension Attack)** açıktır. Yalnızca $H(M)$'yi bilen bir saldırgan, $M$'nin içeriğini bilmese dahi $H(M \parallel \text{padding} \parallel \text{ek\_veri})$ değerini hesaplayabilir.
* **Keccak / SHA-3 (Sünger Mimarisi):** Sabit durum matrisi (1600 bit) önce mesaj bloklarını içerisine çeker (**Absorbing Fazı**), ardından permütasyon adımlarından sonra istenilen uzunlukta özet çıktısı dışarı sıkılır (**Squeezing Fazı**). Boyut uzatma saldırılarına karşı doğal olarak bağışıktır.

```mermaid
flowchart LR
    subgraph Merkle-Damgård (SHA-2)
        IV["IV"] --> F1["f"]
        M1["Blok 1"] --> F1
        F1 --> F2["f"]
        M2["Blok 2"] --> F2
        F2 --> Output1["Hash Çıktısı"]
    end

    subgraph Sünger Mimarisi (SHA-3 Keccak)
        S1["Durum (1600 bit)"] --> Absorb["Absorbing (XOR + Permütasyon f)"]
        DataIn["Mesaj Blokları"] --> Absorb
        Absorb --> Squeeze["Squeezing (Çıktı Sıkma)"]
        Squeeze --> Output2["Değişken Hash Çıktısı"]
    end
```

---

## 2. Gerçek Hayat Mimarisi: MD5 ve SHA-1'in Çöküşü

* **MD5:** 2004 yılında Wang Xiaoyun tarafından diferansiyel kriptanaliz ile teorik olarak çökertilmiş, 2008'de araştırmacılar sahte bir CA kök sertifikası üreterek tüm web PKI altyapısını kandırmıştır.
* **SHA-1 (SHAttered - 2017):** Google ve CWI Amsterdam araştırmacıları, aynı SHA-1 özetine sahip ancak içerikleri tamamen farklı iki geçerli PDF belgesi üreterek SHA-1'i pratikte tarihe gömmüştür.
* **Modern Standart:** Günümüzde dijital imzalarda ve blokzincirlerde en az **SHA-256**, **SHA-512** veya **SHA3-256** kullanılmalıdır.

---

## 3. Uygulamalı Kod Örneği: Python ile Çığ Etkisi (Avalanche Effect) Analizi

Çığ etkisi; girdideki tek bir bitlik değişimin özet çıktısındaki bitlerin yaklaşık %50'sini değiştirmesi zorunluluğudur.

```python
import hashlib

def bit_difference(h1: bytes, h2: bytes) -> int:
    """İki özet arasındaki farklı bit sayısını (Hamming Mesafesi) hesaplar."""
    diff = 0
    for b1, b2 in zip(h1, h2):
        diff += bin(b1 ^ b2).count('1')
    return diff

msg1 = b"Kriptoloji 2026 Guvenlik Raporu"
# Yalnızca son harfi küçük 'u' yerine 'v' yaparak 1 bit değiştiriyoruz:
msg2 = b"Kriptoloji 2026 Guvenlik Raporv"

hash1 = hashlib.sha256(msg1).digest()
hash2 = hashlib.sha256(msg2).digest()

total_bits = 256
diff_bits = bit_difference(hash1, hash2)
percent = (diff_bits / total_bits) * 100

print(f"[+] SHA-256 (Mesaj 1): {hash1.hex()}")
print(f"[+] SHA-256 (Mesaj 2): {hash2.hex()}")
print(f"[+] Toplam Bit Boyutu   : {total_bits} bit")
print(f"[+] Değişen Bit Sayısı  : {diff_bits} bit ({percent:.2f}%)")
assert 40.0 <= percent <= 60.0
print("[✓] İdeal Çığ Etkisi Doğrulandı (~%50 bit değişimi)")
```

---

## 4. Güvenlik & Kriptanaliz Notu

> [!WARNING]
> **Özet Fonksiyonlarını Parola Saklamak İçin Kullanmayın!**
> SHA-256 veya SHA-3 donanımda ve GPU'larda son derece hızlı çalışmak üzere optimize edilmiştir (modern bir RTX 4090 saniyede on milyarlarca SHA-256 hesaplayabilir). 
> Parola güvenliği için hızlı özet fonksiyonları değil; kaba kuvvet saldırılarını yavaşlatan, bellek-sert (*memory-hard*) **KDF (Argon2id, bcrypt, scrypt)** algoritmaları kullanılmalıdır (Bkz: Modül 6.5).
