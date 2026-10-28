# atakanozturk.net

Derleme gerektirmeyen statik site. Klasörü olduğu gibi Netlify'a yüklemen yeterli.

## Yayın
Site GitHub Pages üzerinden yayınlanıyor. `main` dalına yapılan her değişiklik birkaç dakika içinde atakanozturk.net'e yansır.
Formlar bir sunucuya kayıt yapmaz: ziyaretçi gönder'e basınca WhatsApp, bilgileri yazılmış bir mesajla açılır.

## Neyi nereden değiştiririm?
| Ne | Dosya |
|---|---|
| Telefon, Instagram, e-posta, adres, yetki belgesi no, deneyim | `assets/config.js` (boş bıraktığın alan sitede görünmez) |
| İlanlar | `data/listings.json` |
| Mahalle notları ve m² fiyatları | `data/mahalleler.json` (boş alanlar gösterilmez) |
| Müşteri yorumları | `data/yorumlar.json` (boşken bölüm gizli) |
| Portre fotoğrafı | `img/portre.jpg` olarak koy, kendiliğinden görünür |

### İlan eklemek
`data/listings.json` içine bir blok daha ekle:
```json
{
  "no": "041",
  "ornek": false,
  "durum": "satilik",
  "baslik": "Kısa ve somut bir başlık",
  "mahalle": "Şirinevler",
  "oda": "3+1",
  "m2": 120,
  "kat": "3. kat / 5",
  "binaYasi": 10,
  "fiyat": 9500000,
  "aidat": 1000,
  "isinma": "Doğalgaz kombi",
  "tapu": "Kat mülkiyeti",
  "esyali": false,
  "aciklama": "Evi birkaç cümleyle anlat.",
  "fotograflar": ["img/ilan-041-1.jpg", "img/ilan-041-2.jpg"]
}
```
- `durum`: `satilik` ya da `kiralik` (kiralıkta fiyat aylık yazılır)
- Fotoğraf yoksa `[]` bırak; sitede kat planı çizimi görünür.
- Fotoğrafları `img/` klasörüne koy, en fazla ~1600 px genişlikte ve JPG/WebP olsun.
- Gerçek ilanları girince örnek ilanları sil (`"ornek": true` olanlar).
- Yeni ilan ekleyince `sitemap.xml`'e de `https://atakanozturk.net/ilan.html?no=041` satırını ekle.

## Kontrol etmen gerekenler
- `kvkk.html` genel bir şablon. Yayına almadan önce bir hukukçuya göz attır.
- Mahalle notlarını kendi gözlemlerinle doldur; şu an yalnızca birkaç mahallede kısa not var.
