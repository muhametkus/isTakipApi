# API Kullanım Örnekleri

Bu dosya, API endpoint'lerini test etmek için örnek istekler içerir.

## 📋 İçindekiler
1. [Müşteri İşlemleri](#müşteri-i̇şlemleri)
2. [İş İşlemleri](#i̇ş-i̇şlemleri)
3. [Ödeme İşlemleri](#ödeme-i̇şlemleri)
4. [Kullanıcı İşlemleri](#kullanıcı-i̇şlemleri)

---

## Müşteri İşlemleri

### 1. Yeni Müşteri Oluşturma

**Endpoint:** `POST /api/customers`

```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "adSoyad": "Mehmet Demir",
    "telefon": "05551234567",
    "mail": "mehmet.demir@example.com",
    "adres": "Atatürk Cad. No:123 Kadıköy, İstanbul"
  }'
```

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "adSoyad": "Mehmet Demir",
    "telefon": "05551234567",
    "mail": "mehmet.demir@example.com",
    "adres": "Atatürk Cad. No:123 Kadıköy, İstanbul",
    "kayitTarihi": "2025-10-11T10:30:00.000Z",
    "createdAt": "2025-10-11T10:30:00.000Z",
    "updatedAt": "2025-10-11T10:30:00.000Z"
  },
  "message": "Müşteri başarıyla oluşturuldu"
}
```

### 2. Tüm Müşterileri Listeleme

**Endpoint:** `GET /api/customers`

```bash
curl http://localhost:3000/api/customers
```

### 3. ID'ye Göre Müşteri Getirme

**Endpoint:** `GET /api/customers/:id`

```bash
curl http://localhost:3000/api/customers/123e4567-e89b-12d3-a456-426614174000
```

### 4. Müşteri Güncelleme

**Endpoint:** `PUT /api/customers/:id`

```bash
curl -X PUT http://localhost:3000/api/customers/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{
    "telefon": "05559876543",
    "adres": "Yeni Adres Bilgisi"
  }'
```

### 5. Müşteri Silme

**Endpoint:** `DELETE /api/customers/:id`

```bash
curl -X DELETE http://localhost:3000/api/customers/123e4567-e89b-12d3-a456-426614174000
```

---

## İş İşlemleri

### 1. Yeni İş Oluşturma (Montaj)

**Endpoint:** `POST /api/jobs`

```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "musteriId": "123e4567-e89b-12d3-a456-426614174000",
    "isTuru": "Montaj",
    "olculerJson": {
      "genislik": 150,
      "yukseklik": 200,
      "derinlik": 50,
      "malzeme": "MDF",
      "renk": "Beyaz"
    },
    "ozelNot": "Müşteri evde olmayacak, kapıcıya teslim edilsin."
  }'
```

### 2. Yeni İş Oluşturma (Tamir)

```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "musteriId": "123e4567-e89b-12d3-a456-426614174000",
    "isTuru": "Tamir",
    "olculerJson": {
      "bozukParca": "Menteşe",
      "adet": 2
    },
    "ozelNot": "Acil tamir gerekiyor."
  }'
```

### 3. Yeni İş Oluşturma (Bakım)

```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "musteriId": "123e4567-e89b-12d3-a456-426614174000",
    "isTuru": "Bakim",
    "ozelNot": "Yıllık bakım"
  }'
```

### 4. Yeni İş Oluşturma (Tasarım)

```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "musteriId": "123e4567-e89b-12d3-a456-426614174000",
    "isTuru": "Tasarim",
    "olculerJson": {
      "oda": "Yatak Odası",
      "stil": "Modern",
      "butce": "10000-15000 TL"
    },
    "ozelNot": "3D görselleştirme isteniyor"
  }'
```

### 5. Tüm İşleri Listeleme

**Endpoint:** `GET /api/jobs`

```bash
curl http://localhost:3000/api/jobs
```

### 6. ID'ye Göre İş Getirme

**Endpoint:** `GET /api/jobs/:id`

```bash
curl http://localhost:3000/api/jobs/987e6543-e21b-12d3-a456-426614174000
```

### 7. Müşteriye Ait İşleri Listeleme

**Endpoint:** `GET /api/jobs/customer/:musteriId`

```bash
curl http://localhost:3000/api/jobs/customer/123e4567-e89b-12d3-a456-426614174000
```

### 8. İş Güncelleme

**Endpoint:** `PUT /api/jobs/:id`

```bash
curl -X PUT http://localhost:3000/api/jobs/987e6543-e21b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{
    "ozelNot": "İş tamamlandı, müşteri memnun"
  }'
```

### 9. İş Silme

**Endpoint:** `DELETE /api/jobs/:id`

```bash
curl -X DELETE http://localhost:3000/api/jobs/987e6543-e21b-12d3-a456-426614174000
```

---

## Ödeme İşlemleri

### 1. Yeni Ödeme Oluşturma (Nakit)

**Endpoint:** `POST /api/payments`

```bash
curl -X POST http://localhost:3000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "musteriId": "123e4567-e89b-12d3-a456-426614174000",
    "odemeTuru": "Nakit",
    "tutar": 5000.00,
    "not": "Peşin ödeme",
    "odemeAlanKullanici": "Ali Yılmaz",
    "kalanTutar": 0
  }'
```

### 2. Yeni Ödeme Oluşturma (Kredi Kartı)

```bash
curl -X POST http://localhost:3000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "musteriId": "123e4567-e89b-12d3-a456-426614174000",
    "odemeTuru": "KrediKarti",
    "tutar": 2000.50,
    "not": "İlk taksit",
    "odemeAlanKullanici": "Ayşe Demir",
    "kalanTutar": 3000.00
  }'
```

### 3. Yeni Ödeme Oluşturma (Havale)

```bash
curl -X POST http://localhost:3000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "musteriId": "123e4567-e89b-12d3-a456-426614174000",
    "odemeTuru": "Havale",
    "tutar": 1500.00,
    "not": "İkinci taksit",
    "odemeAlanKullanici": "Mehmet Kaya",
    "kalanTutar": 1500.00
  }'
```

### 4. Yeni Ödeme Oluşturma (Çek)

```bash
curl -X POST http://localhost:3000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "musteriId": "123e4567-e89b-12d3-a456-426614174000",
    "odemeTuru": "Cek",
    "tutar": 1500.00,
    "not": "Son taksit, çek vadesi 30 gün",
    "odemeAlanKullanici": "Fatma Öz",
    "kalanTutar": 0
  }'
```

### 5. Ödemeyi İşe Bağlama

**Endpoint:** `POST /api/payments/link`

```bash
curl -X POST http://localhost:3000/api/payments/link \
  -H "Content-Type: application/json" \
  -d '{
    "odemeId": "456e7890-e89b-12d3-a456-426614174000",
    "isId": "987e6543-e21b-12d3-a456-426614174000"
  }'
```

### 6. Tüm Ödemeleri Listeleme

**Endpoint:** `GET /api/payments`

```bash
curl http://localhost:3000/api/payments
```

### 7. ID'ye Göre Ödeme Getirme

**Endpoint:** `GET /api/payments/:id`

```bash
curl http://localhost:3000/api/payments/456e7890-e89b-12d3-a456-426614174000
```

### 8. Müşteriye Ait Ödemeleri Listeleme

**Endpoint:** `GET /api/payments/customer/:musteriId`

```bash
curl http://localhost:3000/api/payments/customer/123e4567-e89b-12d3-a456-426614174000
```

### 9. Ödeme Güncelleme

**Endpoint:** `PUT /api/payments/:id`

```bash
curl -X PUT http://localhost:3000/api/payments/456e7890-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{
    "kalanTutar": 500.00,
    "not": "Kalan tutar güncellendi"
  }'
```

### 10. Ödeme Silme

**Endpoint:** `DELETE /api/payments/:id`

```bash
curl -X DELETE http://localhost:3000/api/payments/456e7890-e89b-12d3-a456-426614174000
```

---

## Kullanıcı İşlemleri

### 1. Yeni Kullanıcı Oluşturma

**Endpoint:** `POST /api/users`

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "ad": "Ahmet",
    "soyad": "Yılmaz",
    "email": "ahmet.yilmaz@example.com"
  }'
```

### 2. Tüm Kullanıcıları Listeleme

**Endpoint:** `GET /api/users`

```bash
curl http://localhost:3000/api/users
```

### 3. ID'ye Göre Kullanıcı Getirme

**Endpoint:** `GET /api/users/:id`

```bash
curl http://localhost:3000/api/users/789e0123-e89b-12d3-a456-426614174000
```

### 4. Kullanıcı Güncelleme

**Endpoint:** `PUT /api/users/:id`

```bash
curl -X PUT http://localhost:3000/api/users/789e0123-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "yeni.email@example.com"
  }'
```

### 5. Kullanıcı Silme

**Endpoint:** `DELETE /api/users/:id`

```bash
curl -X DELETE http://localhost:3000/api/users/789e0123-e89b-12d3-a456-426614174000
```

---

## 🎯 Örnek Senaryo: Tam İş Akışı

### Adım 1: Müşteri Oluştur

```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "adSoyad": "Zeynep Kaya",
    "telefon": "05551112233",
    "mail": "zeynep.kaya@example.com",
    "adres": "Bağdat Cad. No:45 Kadıköy, İstanbul"
  }'
```

**Dönen customer ID'yi kaydedin:** `123e4567-e89b-12d3-a456-426614174000`

### Adım 2: İş Oluştur

```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "musteriId": "123e4567-e89b-12d3-a456-426614174000",
    "isTuru": "Montaj",
    "olculerJson": {
      "oda": "Oturma Odası",
      "dolap": "Ankastre Dolap",
      "genislik": 300,
      "yukseklik": 240
    },
    "ozelNot": "Hafta sonu montaj yapılacak"
  }'
```

**Dönen job ID'yi kaydedin:** `987e6543-e21b-12d3-a456-426614174000`

### Adım 3: Ödeme Oluştur (Peşinat)

```bash
curl -X POST http://localhost:3000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "musteriId": "123e4567-e89b-12d3-a456-426614174000",
    "odemeTuru": "KrediKarti",
    "tutar": 3000.00,
    "not": "Peşinat ödemesi (%50)",
    "odemeAlanKullanici": "Ali Veli",
    "kalanTutar": 3000.00
  }'
```

**Dönen payment ID'yi kaydedin:** `456e7890-e89b-12d3-a456-426614174000`

### Adım 4: Ödemeyi İşe Bağla

```bash
curl -X POST http://localhost:3000/api/payments/link \
  -H "Content-Type: application/json" \
  -d '{
    "odemeId": "456e7890-e89b-12d3-a456-426614174000",
    "isId": "987e6543-e21b-12d3-a456-426614174000"
  }'
```

### Adım 5: İkinci Ödeme (Kalan)

```bash
curl -X POST http://localhost:3000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "musteriId": "123e4567-e89b-12d3-a456-426614174000",
    "odemeTuru": "Nakit",
    "tutar": 3000.00,
    "not": "Kalan ödeme (Teslimatta alındı)",
    "odemeAlanKullanici": "Ali Veli",
    "kalanTutar": 0
  }'
```

### Adım 6: Müşteri Detaylarını Görüntüle

```bash
curl http://localhost:3000/api/customers/123e4567-e89b-12d3-a456-426614174000
```

**Yanıt müşteriyle birlikte tüm işleri ve ödemeleri içerecek**

---

## 🧪 Hata Senaryoları

### 1. Geçersiz Email

```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "adSoyad": "Test User",
    "telefon": "05551234567",
    "mail": "invalid-email",
    "adres": "Test Address"
  }'
```

**Beklenen Yanıt:** 400 Bad Request
```json
{
  "success": false,
  "message": "Validation hatası",
  "errors": [
    {
      "field": "mail",
      "message": "Geçerli bir e-posta adresi giriniz"
    }
  ]
}
```

### 2. Geçersiz UUID

```bash
curl http://localhost:3000/api/customers/invalid-uuid
```

**Beklenen Yanıt:** 400 Bad Request

### 3. Geçersiz İş Türü

```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "musteriId": "123e4567-e89b-12d3-a456-426614174000",
    "isTuru": "InvalidType"
  }'
```

**Beklenen Yanıt:** 400 Bad Request

### 4. Var Olmayan Müşteri

```bash
curl http://localhost:3000/api/customers/00000000-0000-0000-0000-000000000000
```

**Beklenen Yanıt:** 404 Not Found

---

## 📊 Postman Collection

Bu istekleri Postman'de kullanmak için:

1. Postman'i açın
2. "Import" butonuna tıklayın
3. Bu örnekleri JSON formatında import edin
4. Environment variables ayarlayın:
   - `base_url`: http://localhost:3000
   - `customer_id`: müşteri ID'si
   - `job_id`: iş ID'si
   - `payment_id`: ödeme ID'si

---

## 🔍 Tips

1. **UUID'leri Kaydedin**: Her POST isteğinden dönen ID'leri kaydedin
2. **İlişkileri Kontrol Edin**: GET isteklerinde include ilişkilerini inceleyin
3. **Validation Test Edin**: Hatalı verilerle istek atarak validasyonu test edin
4. **Swagger UI Kullanın**: http://localhost:3000/api-docs adresinden interaktif test yapın

---

**Not:** Tüm örneklerdeki UUID'ler sample değerlerdir. Gerçek kullanımda kendi oluşturduğunuz kayıtların UUID'lerini kullanın.

