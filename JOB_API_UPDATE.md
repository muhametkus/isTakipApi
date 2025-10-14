# İş (Job) API - Güncelleme Dokümantasyonu

## 🔄 Yapılan Değişiklikler

### 1. İş Türü (isTuru) - Enum Kaldırıldı

**ÖNCE:**
```javascript
isTuru: {
  type: DataTypes.ENUM(["Montaj", "Tamir", "Bakim", "Tasarim"]),
  allowNull: false,
}
```

**SONRA:**
```javascript
isTuru: {
  type: DataTypes.STRING,  // Serbest metin
  allowNull: false,
}
```

**Avantajları:**
- ✅ Esnek iş türü tanımlama
- ✅ Müşteri özelinde iş türleri (örn: "iç oda kapısı", "dış kapı", "pencere")
- ✅ Enum güncelleme problemi yok

### 2. İş Durumu (isDurumu) - Yeni Alan

```javascript
isDurumu: {
  type: DataTypes.STRING,
  allowNull: true,
  defaultValue: "ödeme bekleniyor",
}
```

**Kullanım Örnekleri:**
- "ödeme bekleniyor"
- "üretimde"
- "montaj bekliyor"
- "tamamlandı"
- "iptal edildi"

### 3. Ölçüler (olculerJson) - Detaylı Yapı

**ÖNCE:**
```json
{
  "genislik": 100,
  "yukseklik": 200
}
```

**SONRA:**
```json
[
  {
    "olcu": "207 x 75",
    "kasaGenisligi": 15,
    "model": "h-fuga",
    "camliMi": false,
    "adet": 3,
    "adetFiyati": 7000,
    "paraBirimi": "TRY",
    "ozelNot": "standart olsun"
  },
  {
    "olcu": "210 x 85",
    "kasaGenisligi": 13,
    "model": "h-fuga",
    "camliMi": true,
    "adet": 2,
    "adetFiyati": 4500,
    "paraBirimi": "TRY",
    "ozelNot": "antrasit renk"
  }
]
```

**Avantajları:**
- ✅ Birden fazla ürün/ölçü
- ✅ Her ürün için ayrı fiyatlandırma
- ✅ Detaylı ürün özellikleri
- ✅ Esnek JSON yapısı

## 📋 Yeni API Formatı

### ✅ İş Oluşturma (POST /api/jobs)

**Endpoint:** `POST /api/jobs`

**Request Body:**
```json
{
  "musteriId": "89031690-9516-4155-8caf-4e055e05ecf9",
  "isTuru": "iç oda kapısı",
  "olculerJson": [
    {
      "olcu": "207 x 75",
      "kasaGenisligi": 15,
      "model": "h-fuga",
      "camliMi": false,
      "adet": 3,
      "adetFiyati": 7000,
      "paraBirimi": "TRY",
      "ozelNot": "standart olsun"
    },
    {
      "olcu": "210 x 85",
      "kasaGenisligi": 13,
      "model": "h-fuga",
      "camliMi": true,
      "adet": 2,
      "adetFiyati": 4500,
      "paraBirimi": "TRY",
      "ozelNot": "antrasit renk"
    }
  ],
  "isDurumu": "ödeme bekleniyor",
  "ozelNot": "acil iş, camlı 2 kapı antrasit rengi olacak."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "b10cc096-a8b8-4ffd-b461-8c06668a5257",
    "musteriId": "89031690-9516-4155-8caf-4e055e05ecf9",
    "isTuru": "iç oda kapısı",
    "olculerJson": [
      {
        "olcu": "207 x 75",
        "kasaGenisligi": 15,
        "model": "h-fuga",
        "camliMi": false,
        "adet": 3,
        "adetFiyati": 7000,
        "paraBirimi": "TRY",
        "ozelNot": "standart olsun"
      },
      {
        "olcu": "210 x 85",
        "kasaGenisligi": 13,
        "model": "h-fuga",
        "camliMi": true,
        "adet": 2,
        "adetFiyati": 4500,
        "paraBirimi": "TRY",
        "ozelNot": "antrasit renk"
      }
    ],
    "isDurumu": "ödeme bekleniyor",
    "ozelNot": "acil iş, camlı 2 kapı antrasit rengi olacak.",
    "createdAt": "2025-10-11T13:12:05.121Z",
    "updatedAt": "2025-10-11T13:12:05.121Z"
  },
  "message": "İş başarıyla oluşturuldu"
}
```

## 🎯 Kullanım Örnekleri

### Örnek 1: Kapı İşi

```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "musteriId": "89031690-9516-4155-8caf-4e055e05ecf9",
    "isTuru": "iç oda kapısı",
    "olculerJson": [
      {
        "olcu": "207 x 75",
        "kasaGenisligi": 15,
        "model": "h-fuga",
        "camliMi": false,
        "adet": 3,
        "adetFiyati": 7000,
        "paraBirimi": "TRY",
        "ozelNot": "standart olsun"
      }
    ],
    "isDurumu": "ödeme bekleniyor",
    "ozelNot": "Acil iş"
  }'
```

### Örnek 2: Pencere İşi

```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "musteriId": "89031690-9516-4155-8caf-4e055e05ecf9",
    "isTuru": "pencere",
    "olculerJson": [
      {
        "olcu": "120 x 150",
        "kanatSayisi": 2,
        "camTipi": "double cam",
        "renk": "beyaz",
        "adet": 5,
        "adetFiyati": 3500,
        "paraBirimi": "TRY",
        "ozelNot": "Sineklik dahil"
      }
    ],
    "isDurumu": "üretimde",
    "ozelNot": "2 hafta içinde teslim"
  }'
```

### Örnek 3: Dolap İşi

```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "musteriId": "89031690-9516-4155-8caf-4e055e05ecf9",
    "isTuru": "mutfak dolabı",
    "olculerJson": [
      {
        "konum": "Üst dolap",
        "olcu": "300 x 70 x 35",
        "kapiSayisi": 6,
        "malzeme": "MDF",
        "renk": "lake beyaz",
        "adetFiyati": 15000,
        "paraBirimi": "TRY"
      },
      {
        "konum": "Alt dolap",
        "olcu": "300 x 85 x 60",
        "kapiSayisi": 8,
        "cekmeceliMi": true,
        "malzeme": "MDF",
        "renk": "lake beyaz",
        "adetFiyati": 20000,
        "paraBirimi": "TRY"
      }
    ],
    "isDurumu": "ödeme bekleniyor",
    "ozelNot": "Tezgah dahil değil"
  }'
```

## 📊 olculerJson Alan Yapısı

`olculerJson` alanı **array of objects** formatındadır ve tamamen esnektir. İşletme ihtiyacına göre özelleştirilebilir.

### Önerilen Alanlar:

#### Genel Alanlar:
- `olcu` (string) - Ölçü bilgisi (örn: "207 x 75")
- `adet` (number) - Adet
- `adetFiyati` (number) - Birim fiyat
- `paraBirimi` (string) - Para birimi (TRY, USD, EUR)
- `ozelNot` (string) - Ürün özel notu

#### Kapı İşleri İçin:
- `kasaGenisligi` (number) - Kasa genişliği (cm)
- `model` (string) - Kapı modeli
- `camliMi` (boolean) - Camlı mı?
- `kilit` (string) - Kilit tipi
- `govde` (string) - Gövde malzemesi

#### Pencere İşleri İçin:
- `kanatSayisi` (number) - Kanat sayısı
- `camTipi` (string) - Cam tipi
- `renk` (string) - Renk
- `sineklik` (boolean) - Sineklik var mı?
- `profil` (string) - Profil tipi

#### Mobilya İşleri İçin:
- `konum` (string) - Konum (üst/alt/orta)
- `kapiSayisi` (number) - Kapı sayısı
- `cekmeceliMi` (boolean) - Çekmeceli mi?
- `malzeme` (string) - Malzeme
- `renk` (string) - Renk

## 🔍 İş Sorgulama

### Tüm İşleri Getir

```bash
curl http://localhost:3000/api/jobs
```

### ID'ye Göre İş Getir (İlişkilerle Birlikte)

```bash
curl http://localhost:3000/api/jobs/b10cc096-a8b8-4ffd-b461-8c06668a5257
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "b10cc096-a8b8-4ffd-b461-8c06668a5257",
    "isTuru": "iç oda kapısı",
    "olculerJson": [...],
    "isDurumu": "ödeme bekleniyor",
    "customer": {
      "id": "89031690-9516-4155-8caf-4e055e05ecf9",
      "adSoyad": "Muhammet KUS",
      "telefon": "05536962054",
      "mail": "muhametkus@gmail.com"
    },
    "payments": []
  }
}
```

### Müşteriye Ait İşleri Getir

```bash
curl http://localhost:3000/api/jobs/customer/89031690-9516-4155-8caf-4e055e05ecf9
```

## 📝 Validasyon Kuralları

### Zorunlu Alanlar:
- ✅ `musteriId` - UUID formatında
- ✅ `isTuru` - String (boş olamaz)

### Opsiyonel Alanlar:
- `olculerJson` - Array veya Object
- `isDurumu` - String (varsayılan: "ödeme bekleniyor")
- `ozelNot` - String

## 🎨 Frontend Entegrasyonu

### React/Vue Örneği:

```javascript
const createJob = async (jobData) => {
  const response = await fetch('http://localhost:3000/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      musteriId: selectedCustomer.id,
      isTuru: "iç oda kapısı",
      olculerJson: [
        {
          olcu: "207 x 75",
          kasaGenisligi: 15,
          model: "h-fuga",
          camliMi: false,
          adet: 3,
          adetFiyati: 7000,
          paraBirimi: "TRY",
          ozelNot: "standart olsun"
        }
      ],
      isDurumu: "ödeme bekleniyor",
      ozelNot: "Acil iş"
    })
  });
  
  const result = await response.json();
  return result;
};
```

## 💡 Best Practices

### 1. Fiyat Hesaplama
```javascript
// Frontend'de toplam fiyat hesaplama
const calculateTotal = (olculerJson) => {
  return olculerJson.reduce((total, item) => {
    return total + (item.adet * item.adetFiyati);
  }, 0);
};
```

### 2. Para Birimi Dönüşümü
```javascript
// Para birimi formatı
const formatCurrency = (amount, currency = 'TRY') => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency
  }).format(amount);
};
```

### 3. İş Durumu Takibi
```javascript
// İş durumu enum (frontend)
const JobStatus = {
  WAITING_PAYMENT: "ödeme bekleniyor",
  IN_PRODUCTION: "üretimde",
  WAITING_INSTALLATION: "montaj bekliyor",
  COMPLETED: "tamamlandı",
  CANCELLED: "iptal edildi"
};
```

## 🔒 Güvenlik Notları

1. **Input Validation**: Her zaman backend'de validasyon yapın
2. **SQL Injection**: Sequelize ORM otomatik koruma sağlar
3. **XSS Prevention**: JSON formatında veri saklama güvenlidir
4. **Authorization**: Gelecekte JWT token eklenebilir

## 📚 Swagger Dokümantasyonu

Güncel API dokümantasyonu:
```
http://localhost:3000/api-docs
```

## 🔄 Migration Notları

**Önemli:** Enum'dan String'e geçiş için veritabanı tablosunu yeniden oluşturmanız gerekir.

```javascript
// Geliştirme ortamında
sequelize.sync({ force: true })

// Production'da migration scriptleri kullanın
```

## ✅ Test Senaryoları

### Test 1: Basit İş Oluşturma
```json
{
  "musteriId": "valid-uuid",
  "isTuru": "test işi",
  "isDurumu": "test"
}
```

### Test 2: Detaylı Ölçülerle İş
```json
{
  "musteriId": "valid-uuid",
  "isTuru": "kapı montajı",
  "olculerJson": [
    {
      "olcu": "200 x 80",
      "adet": 1,
      "adetFiyati": 5000
    }
  ]
}
```

### Test 3: Çoklu Ürün
```json
{
  "musteriId": "valid-uuid",
  "isTuru": "kapı ve pencere",
  "olculerJson": [
    { "tip": "kapı", "adet": 2, "adetFiyati": 5000 },
    { "tip": "pencere", "adet": 3, "adetFiyati": 3000 }
  ]
}
```

---

**Son Güncelleme:** 11 Ekim 2025  
**API Version:** 1.1.0  
**Breaking Changes:** ✅ Enum kaldırıldı, isDurumu eklendi

