---
title: "3.1 Akış Şifreleyiciler: LFSR, RC4 ve ChaCha20"
description: "Akış şifreleyici prensipleri, LFSR zaafları, RC4 önyargıları ve modern ARX mimarisiyle ChaCha20 tasarımı."
---

Akış şifreleyiciler (*Stream Ciphers*), veriyi sabit boyutlu bloklara bölmek yerine tek tek bit veya bayt düzeyinde, tıpkı sonsuz bir anahtar akışı (Keystream) üreterek şifreleyen yüksek performanslı simetrik sistemlerdir.

---

## 1. Teorik Sezgi & Matematik

Akış şifreleyicilerin çalışma mantığı sözde-rastgele bir anahtar akışı ($S$) üreterek bunu açık metinle ($P$) XOR'lamaktır:

$$C_i = P_i \oplus S_i$$
$$P_i = C_i \oplus S_i$$

### 1. LFSR (Linear Feedback Shift Register)

Donanımda transistör seviyesinde kolayca uygulanabilen en basit üreteçlerdir. Belirli hücrelerin (taps) XOR'lanarak yeni bit olarak sisteme beslenmesiyle çalışır. 
* **Matematiksel Zaaflar:** Lineer oldukları için, $2L$ bitlik çıktı gözlemlendiğinde **Berlekamp-Massey algoritması** ile tüm polinom ve gizli durum çözülebilir. Kriptografide tek başlarına kullanılamazlar.

### 2. RC4 (Rivest Cipher 4) ve Zaafları

Ron Rivest tarafından 1987'de tasarlanan RC4, 256 baytlık bir permütasyon tablosu ($S$) üzerinde çalışır.
* **KSA (Key Scheduling Algorithm):** Anahtardan başlangıç tablosunu üretir.
* **PRGA (Pseudo-Random Generation Algorithm):** Her adımda iki indis ($i, j$) güncelleyerek tablodaki elemanları takas eder ve çıktı baytı üretir.
* **Tasarım Kusuru:** Çıktının ilk birkaç yüz baytında belirli baytların (özellikle ikinci baytın sıfır olma olasılığı $1/128$) istatistiksel önyargısı (*bias*) vardır. **FMS saldırısı** ile WEP kablosuz ağ anahtarları bu önyargı sayesinde kırılmıştır. Günümüzde TLS ve SSH standartlarından tamamen yasaklanmıştır (RFC 7465).

### 3. Modern Standart: ChaCha20 (ARX Mimarisi)

Daniel J. Bernstein (DJB) tarafından Salsa20'nin geliştirilmiş hali olarak tasarlanan ChaCha20; S-Box veya donanım tabloları kullanmaz. Yalnızca 3 temel işlemle çalışır: **Toplama (Add), Döndürme (Rotate), Dışlayıcı Veya (XOR)** $\rightarrow$ **ARX**.

ChaCha20 durumu, $4 \times 4$'lük bir 32-bit tamsayı matrisidir (toplam 512 bit):
* 4 kelime: Sabit sabitler (*"expand 32-byte k"*)
* 8 kelime: 256-bit Gizli Anahtar
* 1 kelime: 32-bit Blok Sayacı
* 3 kelime: 96-bit Tek Seferlik Sayı (*Nonce*)

```mermaid
flowchart TD
    subgraph ChaCha20 Matrisi (16 Kelime / 512 Bit)
        C0["Sabit 0"] --- C1["Sabit 1"] --- C2["Sabit 2"] --- C3["Sabit 3"]
        K0["Key 0"] --- K1["Key 1"] --- K2["Key 2"] --- K3["Key 3"]
        K4["Key 4"] --- K5["Key 5"] --- K6["Key 6"] --- K7["Key 7"]
        Cnt["Sayaç"] --- N0["Nonce 0"] --- N1["Nonce 1"] --- N2["Nonce 2"]
    end

    ChaCha20 Matrisi --> QR["20 Tur Çeyrek Tur (Quarter Round: ARX)"]
    QR --> Add["Orijinal Durum ile Matris Toplamı"]
    Add --> Keystream["64 Bayt Keystream Bloğu"]
    Keystream --> XOR["Açık Metin ile XOR (C = P ⊕ Keystream)"]
```

---

## 2. Gerçek Hayat Mimarisi

* **Mobil ve IoT Güvenliği:** AES donanım hızlandırması (AES-NI) bulunmayan ARM işlemcili telefonlarda ve gömülü cihazlarda ChaCha20, AES'e göre 3-4 kat daha hızlı çalışır ve pil tüketimini ciddi oranda azaltır.
* **Protokol Standartları:** WireGuard VPN protokolü yalnızca ChaCha20-Poly1305 kullanır. Google Chrome ve Android, TLS 1.3 bağlantılarında donanım desteği olmayan istemciler için varsayılan olarak ChaCha20'yi müzakere eder.

---

## 3. Uygulamalı Kod Örneği: Go ile ChaCha20 Çeyrek Tur (Quarter Round)

ChaCha20'nin tüm kriptografik difüzyonunu sağlayan çekirdek `QuarterRound` fonksiyonunun Go implementasyonu:

```go
package main

import (
	"fmt"
	"math/bits"
)

// QuarterRound ChaCha20'nin temel ARX dönüşüm adımıdır
func QuarterRound(a, b, c, d *uint32) {
	// a += b; d ^= a; d <<<= 16
	*a += *b
	*d ^= *a
	*d = bits.RotateLeft32(*d, 16)

	// c += d; b ^= c; b <<<= 12
	*c += *d
	*b ^= *c
	*b = bits.RotateLeft32(*b, 12)

	// a += b; d ^= a; d <<<= 8
	*a += *b
	*d ^= *a
	*d = bits.RotateLeft32(*d, 8)

	// c += d; b ^= c; b <<<= 7
	*c += *d
	*b ^= *c
	*b = bits.RotateLeft32(*b, 7)
}

func main() {
	var a uint32 = 0x11111111
	var b uint32 = 0x22222222
	var c uint32 = 0x33333333
	var d uint32 = 0x44444444

	fmt.Printf("[*] Başlangıç: a=%08x, b=%08x, c=%08x, d=%08x\n", a, b, c, d)
	QuarterRound(&a, &b, &c, &d)
	fmt.Printf("[+] 1. Tur QR : a=%08x, b=%08x, c=%08x, d=%08x\n", a, b, c, d)
}
```

---

## 4. Güvenlik & Kriptanaliz Notu

> [!CAUTION]
> **ChaCha20'de Nonce Tekrarı (Nonce Reuse) Ölümcüldür**
> Akış şifreleyicilerde aynı anahtar ve aynı *Nonce* ile iki farklı mesaj şifrelenirse ($C_1 = M_1 \oplus S$ ve $C_2 = M_2 \oplus S$); saldırgan iki metni XOR'layarak anahtar akışını ($S$) yok eder:
> $$C_1 \oplus C_2 = M_1 \oplus M_2$$
> 96-bitlik Nonce uzayında rastgele seçim yapılırsa, Doğum Günü Paradoksu gereği $\approx 2^{48}$ pakette bir çarpışma riski doğar. Bu nedenle yüksek hacimli bağlantılarda **XChaCha20** (192-bit genişletilmiş nonce) kullanılmalıdır.
