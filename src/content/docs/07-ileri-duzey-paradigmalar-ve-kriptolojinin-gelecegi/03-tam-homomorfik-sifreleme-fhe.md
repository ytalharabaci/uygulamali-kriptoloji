---
title: "7.3 Tam Homomorfik Şifreleme (FHE)"
description: "Kriptografinin kutsal kasesi: Veriyi deşifre etmeden şifreli halde işleme, Craig Gentry'nin Bootstrapping devrimi ve gizli bulut hesaplama."
---

Klasik şifreleme sistemlerinde verinin bir sunucuda işlenebilmesi için (örneğin yapay zeka analizi, veritabanı sorgusu) verinin RAM'de açık metin haline getirilmesi şarttır; bu da bulut sağlayıcısının veya bellek okuyabilen bir saldırganın tüm veriyi görmesine yol açar. **Tam Homomorfik Şifreleme (*Fully Homomorphic Encryption - FHE*)**, verinin **asla ve hiçbir aşamada deşifre edilmeden** üzerinde doğrudan matematiksel işlemler yapılmasına imkan tanır.

---

## 1. Teorik Sezgi & Matematik

Homomorfik bir şifreleme sisteminde, şifreli metinler üzerinde tanımlı özel işlemler ($\oplus_{enc}, \otimes_{enc}$), açık metinler üzerindeki toplama ve çarpma işlemlerine denk düşer:

$$D_K(E_K(m_1) \oplus_{enc} E_K(m_2)) = m_1 + m_2$$
$$D_K(E_K(m_1) \otimes_{enc} E_K(m_2)) = m_1 \cdot m_2$$

### Homomorfizm Seviyeleri

1. **Kısmi Homomorfik (PHE):** Yalnızca tek bir işlemi destekler.
   * **RSA / ElGamal:** Yalnızca çarpmayı destekler: $E(m_1) \cdot E(m_2) = (m_1 \cdot m_2)^e \pmod n$.
   * **Paillier Şifrelemesi:** Yalnızca toplamayı destekler: $E(m_1) \cdot E(m_2) = g^{m_1 + m_2} r^n \pmod{n^2}$.
2. **Bir Dereceye Kadar Homomorfik (SWHE):** Sınırlı sayıda toplama ve az sayıda çarpma yapılabilir.
3. **Tam Homomorfik Şifreleme (FHE):** 2009 yılında Stanford'da **Craig Gentry** tarafından çözülmüştür. Hem toplama hem de çarpma kapılarının sınırsız sayıda kombinasyonuyla **herhangi bir keyfi algoritmayı şifreli olarak çalıştırma** yeteneğidir.

```mermaid
flowchart TD
    Data["Hassas Veri (m1, m2)"] --> Enc["İstemci Tarafında Şifreleme"]
    Enc --> CipherData["Şifreli Veri: C1, C2"]
    CipherData --> Cloud["Güvenilmeyen Bulut / AI Sunucusu"]
    
    subgraph Bulut Tarafı (Veri Asla Çözülmez)
        Cloud --> Eval["FHE Hesaplama: C_sonuc = C1 ⊗ C2 ⊕ C1"]
    end
    
    Eval --> Ret["Şifreli Sonuç (C_sonuc)"]
    Ret --> Client["İstemci Kendi Anahtarıyla Çözer"]
    Client --> Dec["Açık Sonuç = m1 * m2 + m1"]
```

### Gürültü Problemi ve Bootstrapping

FHE kafes şifrelemesinde her şifreli metin küçük bir matematiksel gürültü (*noise*) içerir. 
* Toplama işlemi gürültüyü az artırır, ancak **çarpma işlemi gürültüyü karesel olarak büyütür**.
* Gürültü belirli bir eşiği aşarsa şifreli metin bozulur ve deşifre edilemez.
* **Craig Gentry'nin Dehası (Bootstrapping):** Gürültü eşiğe yaklaştığında sunucu, deşifreleme algoritmasını yine FHE içinde çalıştırarak şifreli metnin gürültüsünü sıfırlar (*Recryption*). Bu sayede sonsuz derinlikte devreler çalıştırılabilir.

---

## 2. Gerçek Hayat Mimarisi: Gizli Bulut Hesaplama (Confidential AI)

* **Tıbbi Teşhis ve DNA Analizi:** Bir hasta genetik verilerini yerel bilgisayarında FHE ile şifreler ve buluttaki bir kanser tespit AI modeline yükler. Model veriyi tek bir an bile çözmeden şifreli DNA üzerinde milyonlarca matris çarpımı yapar ve şifreli bir teşhis üretir. Sonucu yalnızca hastanın kendisi açabilir; ne bulut ne de model sağlayıcısı hastanın DNA'sını göremez.
* **Finansal Dolandırıcılık Tespiti:** Farklı rakip bankalar müşteri gizliliğini ihlal etmeden kara para aklama ağlarını ortak bir havuzda FHE ile sorgulayabilir.

---

## 3. Uygulamalı Kod Örneği: Python ile Paillier Toplamsal Homomorfizm Simülasyonu

Aşağıdaki kod; şifreli iki sayının bulut tarafından çözülmeden toplanıp istemci tarafından deşifre edilmesini modeller (Paillier prensibi: $E(m_1) \cdot E(m_2) \pmod{n^2} = E(m_1 + m_2)$).

```python
import math

class SimplePaillier:
    def __init__(self, p: int, q: int):
        self.n = p * q
        self.nsq = self.n * self.n
        self.g = self.n + 1
        self.lam = (p - 1) * (q - 1)
        # mu = (L(g^lam mod n^2))^-1 mod n
        self.mu = pow(self.lam, -1, self.n)

    def encrypt(self, m: int, r: int = 42) -> int:
        """c = g^m * r^n mod n^2"""
        c1 = pow(self.g, m, self.nsq)
        c2 = pow(r, self.n, self.nsq)
        return (c1 * c2) % self.nsq

    def decrypt(self, c: int) -> int:
        """m = L(c^lam mod n^2) * mu mod n"""
        u = pow(c, self.lam, self.nsq)
        l = (u - 1) // self.n
        return (l * self.mu) % self.n

    def add_encrypted(self, c1: int, c2: int) -> int:
        """Sunucu şifreli metinleri çarparak açık metinleri toplamış olur!"""
        return (c1 * c2) % self.nsq

# Test
p, q = 61, 53
paillier = SimplePaillier(p, q)

sayi1 = 1500  # Örneğin Alice'in maaşı
sayi2 = 2500  # Örneğin Bob'un maaşı

c1 = paillier.encrypt(sayi1, r=17)
c2 = paillier.encrypt(sayi2, r=23)

print(f"[+] Şifreli C1: {c1}")
print(f"[+] Şifreli C2: {c2}")

# BULUT İŞLEMİ (Anahtar olmadan doğrudan şifreli toplama):
c_toplam = paillier.add_encrypted(c1, c2)
print(f"[+] Bulutta Şifreli Toplam (C1 * C2 mod n^2): {c_toplam}")

# İSTEMCİ TARAFINDA ÇÖZÜM:
sonuc = paillier.decrypt(c_toplam)
print(f"[✓] Çözülen Toplam Değer: {sonuc}")
assert sonuc == (sayi1 + sayi2)
```

---

## 4. Güvenlik & Kriptanaliz Notu

:::note[Hesaplama ve Bellek Maliyeti Darboğazı]
FHE teorik olarak devrimsel olsa da, pratikte standart CPU'lara göre **$1.000$ ile $100.000$ kat daha yavaş** çalışır ve şifreli metin boyutları megabaytlarca şişer. Intel, AMD ve DARPA şu an donanım seviyesinde FHE hızlandırıcı çipler (ASIC) geliştirmektedir.
:::

