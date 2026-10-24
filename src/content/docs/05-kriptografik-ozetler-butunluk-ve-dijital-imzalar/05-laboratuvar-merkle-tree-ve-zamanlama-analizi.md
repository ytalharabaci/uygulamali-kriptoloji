---
title: "5.5 Laboratuvar: Merkle Tree ve Zamanlama Analizi"
description: "Python ile dinamik Merkle Ağacı oluşturucu ve güvensiz HMAC karşılaştırmalarında mikrosaniye zamanlama sızıntısını ölçen simülasyon."
---

Bu laboratuvarda; iki pratik saldırı ve savunma senaryosunu kodlayacağız:
1. Büyük veri kümeleri için dinamik bir **Merkle Ağacı Doğrulayıcısı**.
2. Erken çıkan (`==`) güvensiz dize karşılaştırmalarını istismar eden **Zamanlama Yan Kanal (Timing Attack) Simülasyonu**.

---

## 1. Laboratuvar Kodu: Zamanlama Yan Kanalı Simülasyonu

Aşağıdaki Python kodu; sunucunun güvensiz karşılaştırma fonksiyonundaki nano/mikrosaniye seviyesindeki gecikmeleri istatistiksel ortalamalarla analiz ederek doğru imza baytlarını nasıl adım adım tespit ettiğini modeller.

```python
import hmac
import hashlib
import time

class VulnerableAuthServer:
    def __init__(self, secret_key: bytes):
        self._secret = secret_key

    def _insecure_compare(self, a: bytes, b: bytes) -> bool:
        """Kasıtlı olarak bayt eşleştikçe yapay gecikme ekleyen güvensiz karşılaştırıcı."""
        if len(a) != len(b):
            return False
        for byte_a, byte_b in zip(a, b):
            if byte_a != byte_b:
                return False
            # Gerçek CPU önbellek ve bellek gecikmesini simüle eden mikrosaniye bekleme
            time.sleep(0.0005) # 500 mikrosaniye
        return True

    def verify(self, message: bytes, signature: bytes) -> bool:
        real_mac = hmac.new(self._secret, message, hashlib.sha256).digest()
        return self._insecure_compare(real_mac, signature)


def timing_attack_demo(server: VulnerableAuthServer, message: bytes, target_bytes_to_leak: int = 4):
    """Zaman farklarını ölçerek HMAC imzasının ilk N baytını deşifre eden araç."""
    print(f"\n[*] ZAMANLAMA YAN KANAL SALDIRISI BAŞLATILIYOR ({target_bytes_to_leak} Bayt)")
    print("-" * 65)

    known_bytes = []
    
    for byte_index in range(target_bytes_to_leak):
        best_guess = None
        longest_time = -1

        for candidate in range(256):
            # Test imzası oluştur: bilinenler + aday + geri kalanı sıfır
            test_sig = bytes(known_bytes + [candidate] + [0] * (32 - len(known_bytes) - 1))

            start_t = time.perf_counter()
            server.verify(message, test_sig)
            elapsed = time.perf_counter() - start_t

            if elapsed > longest_time:
                longest_time = elapsed
                best_guess = candidate

        known_bytes.append(best_guess)
        print(f"[+] Bayt {byte_index:2d} Çözüldü: 0x{best_guess:02X} | Gecikme: {longest_time*1000:.3f} ms")

    print(f"\n[✓] Başarıyla Sızdırılan İmza Ön-Eki: {bytes(known_bytes).hex()}")


if __name__ == "__main__":
    secret_token = b"super-secret-key-42"
    server = VulnerableAuthServer(secret_token)
    msg = b"User: admin, Action: grant_all"

    # İlk 4 baytı sızdırma demosu
    timing_attack_demo(server, msg, target_bytes_to_leak=3)
```

---

## 2. Güvenlik & Kriptanaliz Notu

> [!NOTE]
> **Ağ Jitter'ına Karşı İstatistiksel Örnekleme**
> Gerçek dünyada internet trafiğindeki paket gecikmeleri (jitter) tek bir ölçümü yanıltabilir. Gerçek kriptanalistler her aday bayt için sunucuya 50-100 kez istek gönderir ve standart sapmayı filtreleyerek medyan süreleri karşılaştırır. 
> Yazılım geliştirici olarak tek ve kesin kural: **Kriptografik karşılaştırmalarda erken çıkışlı döngü asla yazmayın; daima `crypto/subtle` veya `hmac.compare_digest` kullanın.**

