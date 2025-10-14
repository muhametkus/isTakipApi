# İş Takip API

Modern ve ölçeklenebilir bir iş takip sistemi API'si. Node.js, Express, PostgreSQL ve Sequelize ORM kullanılarak geliştirilmiştir.

## 📋 Özellikler

- **Temiz Mimari**: Katmanlı mimari (Controllers, Services, Repositories)
- **CRUD İşlemleri**: Müşteri, İş ve Ödeme yönetimi
- **İlişkisel Veri Modeli**: One-to-Many ve Many-to-Many ilişkiler
- **Validasyon**: Express-validator ile giriş doğrulama
- **Hata Yönetimi**: Merkezi hata yakalama middleware'i
- **API Dokümantasyonu**: Swagger/OpenAPI 3.0
- **UUID**: Tüm kayıtlar için GUID/UUID primary key

## 🏗️ Proje Yapısı

```
isTakipApi/
├── config/
│   └── db.js                      # Veritabanı bağlantısı
├── controllers/
│   ├── CustomerController.js       # Müşteri controller
│   ├── JobController.js           # İş controller
│   ├── PaymentController.js       # Ödeme controller
│   └── UserController.js          # Kullanıcı controller
├── entities/
│   ├── associations.js            # Model ilişkileri
│   ├── customerEntity.js          # Müşteri modeli
│   ├── jobEntity.js               # İş modeli
│   ├── paymentEntity.js           # Ödeme modeli
│   ├── paymentJobEntity.js        # Junction table
│   └── userEntity.js              # Kullanıcı modeli
├── enums/
│   ├── jobType.js                 # İş türü enum
│   └── paymentType.js             # Ödeme türü enum
├── middlewares/
│   ├── errorHandler.js            # Hata yakalama
│   ├── validate.js                # Validasyon middleware
│   └── validators/
│       ├── customerValidator.js   # Müşteri validasyonları
│       ├── jobValidator.js        # İş validasyonları
│       └── paymentValidator.js    # Ödeme validasyonları
├── repositories/
│   ├── abstract/
│   │   ├── ICustomerRepository.js
│   │   ├── IJobRepository.js
│   │   ├── IPaymentRepository.js
│   │   └── IUserRepository.js
│   └── concrete/
│       ├── CustomerRepository.js
│       ├── JobRepository.js
│       ├── PaymentRepository.js
│       └── UserRepository.js
├── routes/
│   ├── customerRoutes.js          # Müşteri routes
│   ├── jobRoutes.js               # İş routes
│   ├── paymentRoutes.js           # Ödeme routes
│   └── userRoutes.js              # Kullanıcı routes
├── services/
│   ├── abstract/
│   │   ├── ICustomerService.js
│   │   ├── IJobService.js
│   │   ├── IPaymentService.js
│   │   └── IUserService.js
│   └── concrete/
│       ├── CustomerService.js
│       ├── JobService.js
│       ├── PaymentService.js
│       └── UserService.js
├── .env.example                   # Örnek çevre değişkenleri
├── app.js                         # Ana uygulama dosyası
├── package.json
└── swagger.js                     # API dokümantasyonu
```

## 🚀 Kurulum

### Gereksinimler

- Node.js (v18 veya üzeri)
- PostgreSQL (v12 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın veya indirin**

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **PostgreSQL veritabanını oluşturun**
```sql
CREATE DATABASE userdb;
```

4. **Çevre değişkenlerini ayarlayın**
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
DB_NAME=userdb
DB_USER=postgres
DB_PASSWORD=1234
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
PORT=3000
NODE_ENV=development
```

5. **Uygulamayı başlatın**

Development modunda:
```bash
npm run dev
```

Production modunda:
```bash
npm start
```

## 📚 API Dokümantasyonu

Swagger UI'a erişim:
```
http://localhost:3000/api-docs
```

## 🎯 Veri Modeli

### Müşteri (Customer)
- `id` (UUID) - Primary key
- `adSoyad` (String) - Müşteri adı soyadı
- `telefon` (String) - Telefon numarası
- `mail` (String) - E-posta adresi (unique)
- `adres` (String) - Adres
- `kayitTarihi` (Date) - Kayıt tarihi

**İlişkiler:**
- HasMany: İş (Job)
- HasMany: Ödeme (Payment)

### İş (Job)
- `id` (UUID) - Primary key
- `musteriId` (UUID) - Foreign key → Müşteri
- `isTuru` (Enum) - İş türü: Montaj, Tamir, Bakim, Tasarim
- `olculerJson` (JSON) - Ölçüler
- `ozelNot` (Text) - Özel notlar

**İlişkiler:**
- BelongsTo: Müşteri (Customer)
- ManyToMany: Ödeme (Payment) through PaymentJob

### Ödeme (Payment)
- `id` (UUID) - Primary key
- `musteriId` (UUID) - Foreign key → Müşteri
- `odemeTuru` (Enum) - Ödeme türü: Nakit, KrediKarti, Havale, Cek
- `tutar` (Decimal) - Ödeme tutarı
- `odemeTarihi` (Date) - Ödeme tarihi
- `not` (Text) - Notlar
- `odemeAlanKullanici` (String) - Ödemeyi alan kullanıcı
- `kalanTutar` (Decimal) - Kalan tutar

**İlişkiler:**
- BelongsTo: Müşteri (Customer)
- ManyToMany: İş (Job) through PaymentJob

### PaymentJob (Junction Table)
- `odemeId` (UUID) - Foreign key → Ödeme
- `isId` (UUID) - Foreign key → İş

## 🔌 API Endpoints

### Müşteriler (Customers)
- `POST /api/customers` - Yeni müşteri oluştur
- `GET /api/customers` - Tüm müşterileri listele
- `GET /api/customers/:id` - ID'ye göre müşteri getir
- `PUT /api/customers/:id` - Müşteri güncelle
- `DELETE /api/customers/:id` - Müşteri sil

### İşler (Jobs)
- `POST /api/jobs` - Yeni iş oluştur
- `GET /api/jobs` - Tüm işleri listele
- `GET /api/jobs/:id` - ID'ye göre iş getir
- `GET /api/jobs/customer/:musteriId` - Müşteriye ait işleri listele
- `PUT /api/jobs/:id` - İş güncelle
- `DELETE /api/jobs/:id` - İş sil

### Ödemeler (Payments)
- `POST /api/payments` - Yeni ödeme oluştur
- `POST /api/payments/link` - Ödemeyi işe bağla
- `GET /api/payments` - Tüm ödemeleri listele
- `GET /api/payments/:id` - ID'ye göre ödeme getir
- `GET /api/payments/customer/:musteriId` - Müşteriye ait ödemeleri listele
- `PUT /api/payments/:id` - Ödeme güncelle
- `DELETE /api/payments/:id` - Ödeme sil

### Kullanıcılar (Users)
- `POST /api/users` - Yeni kullanıcı oluştur
- `GET /api/users` - Tüm kullanıcıları listele
- `GET /api/users/:id` - ID'ye göre kullanıcı getir
- `PUT /api/users/:id` - Kullanıcı güncelle
- `DELETE /api/users/:id` - Kullanıcı sil

## 📝 Örnek İstekler

### Müşteri Oluşturma
```json
POST /api/customers
{
  "adSoyad": "Mehmet Demir",
  "telefon": "05551234567",
  "mail": "mehmet@example.com",
  "adres": "İstanbul, Türkiye"
}
```

### İş Oluşturma
```json
POST /api/jobs
{
  "musteriId": "123e4567-e89b-12d3-a456-426614174000",
  "isTuru": "Montaj",
  "olculerJson": {
    "genislik": 100,
    "yukseklik": 200
  },
  "ozelNot": "Acil iş"
}
```

### Ödeme Oluşturma
```json
POST /api/payments
{
  "musteriId": "123e4567-e89b-12d3-a456-426614174000",
  "odemeTuru": "Nakit",
  "tutar": 1500.50,
  "not": "İlk taksit",
  "odemeAlanKullanici": "Ali Veli",
  "kalanTutar": 500.00
}
```

### Ödemeyi İşe Bağlama
```json
POST /api/payments/link
{
  "odemeId": "123e4567-e89b-12d3-a456-426614174000",
  "isId": "987e6543-e21b-12d3-a456-426614174000"
}
```

## 🛡️ Güvenlik ve Doğrulama

- Tüm girişler express-validator ile doğrulanır
- UUID formatı kontrolü
- Email formatı kontrolü
- Enum değer kontrolü
- Required alan kontrolü
- Foreign key constraint kontrolü

## 🎨 Mimari Prensipler

- **SOLID Prensipleri**: Single Responsibility, Open/Closed, Interface Segregation
- **DRY (Don't Repeat Yourself)**: Kod tekrarından kaçınma
- **Separation of Concerns**: Katmanlı mimari
- **Dependency Injection**: Bağımlılık enjeksiyonu
- **Abstract Repository Pattern**: Soyut repository deseni

## 🔧 Teknolojiler

- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **Sequelize** - ORM
- **PostgreSQL** - İlişkisel veritabanı
- **Swagger/OpenAPI** - API dokümantasyonu
- **Express Validator** - Validasyon
- **UUID** - Unique identifier

## 📦 Bağımlılıklar

```json
{
  "express": "^5.1.0",
  "sequelize": "^6.37.7",
  "pg": "^8.16.3",
  "pg-hstore": "^2.3.4",
  "express-validator": "^7.2.1",
  "dotenv": "^16.4.5",
  "swagger-jsdoc": "^6.2.8",
  "swagger-ui-express": "^5.0.1"
}
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

ISC

## 👨‍💻 Geliştirici

Muhammet Kuş

## 📧 İletişim

Sorularınız için issue açabilirsiniz.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

