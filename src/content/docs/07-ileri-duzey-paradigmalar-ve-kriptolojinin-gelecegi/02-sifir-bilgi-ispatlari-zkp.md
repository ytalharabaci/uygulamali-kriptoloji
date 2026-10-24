---
title: "7.2 Sıfır Bilgi İspatları (ZKP)"
description: "Zero-Knowledge Proofs (ZKP), Ali Baba Mağarası sezgisi, Fiat-Shamir dönüşümü, zk-SNARKs ve gizlilik odaklı kimlik doğrulama."
---

1985 yılında Shafi Goldwasser, Silvio Micali ve Charles Rackoff tarafından ortaya atılan **Sıfır Bilgi İspatları (*Zero-Knowledge Proofs - ZKP*)**, kriptografinin en büyüleyici paradokslarından birini çözer:

> *"Bir sırrı bildiğinizi veya bir iddianın doğru olduğunu, sırrın kendisi hakkında karşı tarafa **tek bir bit bile sızdırmadan** kanıtlayabilir misiniz?"*

---

## 1. Teorik Sezgi & Matematik

Bir ispat mekanizmasının ZKP sayılabilmesi için 3 matematiksel aksiyomu sağlaması şarttır:

1. **Completeness (Doğruluk):** Eğer iddia doğruysa ve ispatlayan (*Prover*) dürüstse, dürüst bir doğrulayıcı (*Verifier*) her zaman ikna olur.
2. **Soundness (Güvenilirlik):** Eğer iddia yanlışsa, hiçbir hilekar ispatlayan doğrulayıcıyı ikna edemez (aldatma olasılığı $2^{-k}$ seviyesine hızla düşer).
3. **Zero-Knowledge (Sıfır Bilgi):** İspat süreci sonunda doğrulayıcı, iddianın doğruluğu dışında gizli sır hakkında sıfır ek bilgi edinir.

### Ali Baba'nın Garip Mağarası Sezgisi

Dairesel bir mağaranın iki koridoru ($A$ ve $B$) ortada kilitli sihirli bir kapıyla ayrılır. Kapı yalnızca gizli bir parolayla açılır. 
* Alice parolayı bildiğini Bob'a kanıtlamak istiyor ancak parolayı Bob'a söylemek istemiyor.
* **Protokol:**
  1. Alice mağaraya girer ve Bob görmeden rastgele $A$ veya $B$ yolunu seçer.
  2. Bob mağaranın girişine gelir ve Alice'e seslenir: *"A koridorundan dışarı çık!"*
  3. Eğer Alice parolayı biliyorsa kapıyı açıp Bob'un istediği yoldan daima çıkabilir. Parolayı bilmiyorsa Bob'un sesleneceği yolu önceden tahmin etme şansı yalnızca $\%50$'dir.
  4. Bu deney 40 kez tekrarlandığında Alice'in parolayı bilmeden şans eseri başarma olasılığı $(\frac{1}{2})^{40} \approx 10^{-12}$'ye düşer. Bob Alice'in parolayı bildiğinden kesinlikle emin olur, ancak parola hakkında tek bir harf bile öğrenmemiştir!

```mermaid
sequenceDiagram
    autonumber
    actor Alice (İspatlayan: Prover)
    actor Bob (Doğrulayıcı: Verifier)

    Alice->>Alice: Mağarada rastgele A veya B koridoruna git
    Bob->>Alice: Meydan Okuma (Challenge): "B koridorundan çık!"
    Alice->>Bob: Parolayla kapıyı açıp B'den çıkar
    Note over Alice,Bob: 40 tur tekrarlandığında hile olasılığı sıfıra iner (Soundness)
```

### Etkileşimsiz İspatlar: Fiat-Shamir Dönüşümü

Etkileşimli ispatlarda doğrulayıcının anlık rastgele sorular (*challenge*) sorması gerekir. **Fiat-Shamir Sezgisi**, doğrulayıcının meydan okumasını kriptografik bir özet fonksiyonuyla ($e = H(Taahhüt \parallel Mesaj)$) değiştirerek protokolü tek adımlı ve etkileşimsiz (**NIZK**) hale getirir.

---

## 2. Gerçek Hayat Mimarisi: zk-SNARKs ve zk-STARKs

* **zk-SNARKs (*Zero-Knowledge Succinct Non-Interactive Argument of Knowledge*):** İspat boyutları son derece küçük (birkaç yüz bayt) ve milisaniyeler içinde doğrulanabilir ZK yapılarıdır.
* **zk-STARKs:** Eliptik eğrilere ihtiyaç duymadan, yalnızca güvenli özet fonksiyonlarıyla çalışan, kuantum dirençli ve güvenilir bir kurulum (*trusted setup*) gerektirmeyen şeffaf ispat mimarisidir.
* **Kimlik Doğrulama:** Dijital kimliklerde kullanıcı kimlik numarasını, adresini veya tam doğum tarihini ifşa etmeden sunucuya *"18 yaşından büyüğüm"* veya *"Bu ülkenin vatandaşıyım"* ispatı sunabilir (**Zero-Knowledge Identity**).

---

## 3. Uygulamalı Kod Örneği: Python ile Ayrık Logaritma Sıfır Bilgi İspatı (Schnorr Protokolü)

Aşağıdaki kod; Alice'in $y = g^x \pmod p$ denkleminde gizli $x$ değerini bilmeden Bob'a bildiğini kanıtladığı **Schnorr ZKP** protokolüdür.

```python
import hashlib
import random

# Açık Grup Parametreleri (Küçük asal model)
P = 1000000007
G = 5

def sha256_int(*args) -> int:
    h = hashlib.sha256("".join(str(x) for x in args).encode()).hexdigest()
    return int(h, 16) % P

# Alice'in Sırrı: x, Açık Anahtarı: y
secret_x = 421337
public_y = pow(G, secret_x, P)

# 1. Aşama: Alice rastgele bir v değeri seçer ve taahhüt (commitment) üretir
v = random.randint(1, P - 2)
commitment_t = pow(G, v, P)

# 2. Aşama: Fiat-Shamir Dönüşümü (Etkileşimsiz Challenge: e = H(G, y, t))
challenge_e = sha256_int(G, public_y, commitment_t)

# 3. Aşama: Alice yanıt üretir: r = v - e * x mod (P-1)
response_r = (v - challenge_e * secret_x) % (P - 1)

# İspat Paketi: (commitment_t, response_r)
# 4. Aşama: Bob İspatı Doğrular: t == g^r * y^e mod P mi?
left_side = commitment_t
right_side = (pow(G, response_r, P) * pow(public_y, challenge_e, P)) % P

print(f"[+] Açık Anahtar (y)    : {public_y}")
print(f"[+] Taahhüt (t)         : {commitment_t}")
print(f"[+] Meydan Okuma (e)    : {challenge_e}")
print(f"[+] Yanıt (r)           : {response_r}")
print(f"[✓] Bob İspatı Onayladı : {left_side == right_side}")
assert left_side == right_side
```

---

## 4. Güvenlik & Kriptanaliz Notu

> [!WARNING]
> **Güvenilir Kurulum (Trusted Setup) Toksik Atıkları**
> İlk nesil zk-SNARK sistemleri (örneğin Groth16), sistemin başlangıcında ortak referans dizisi (*CRS*) oluşturmak için tek seferlik gizli parametreler üretilmesini gerektirir. 
> Bu gizli parametreler kurulumdan sonra imha edilmezse (**"Toksik Atık - Toxic Waste"**), anahtarları elinde tutan kişi sahte ispatlar üreterek sistemi çökertebilir. Modern araştırmalar bu riski taşımayan **STARKs, Bulletproofs ve Halo2** mimarilerine yönelmiştir.

