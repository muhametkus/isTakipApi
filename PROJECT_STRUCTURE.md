# İş Takip API - Proje Yapısı

## 📁 Tam Proje Ağacı

```
isTakipApi/
│
├── 📄 app.js                          # Ana uygulama dosyası
├── 📄 swagger.js                      # Swagger/OpenAPI yapılandırması
├── 📄 package.json                    # NPM bağımlılıkları ve scriptler
├── 📄 package-lock.json               # Bağımlılık kilidi
├── 📄 .env.example                    # Örnek çevre değişkenleri
├── 📄 README.md                       # Proje dokümantasyonu
├── 📄 IMPLEMENTATION_SUMMARY.md       # Uygulama özeti
├── 📄 API_EXAMPLES.md                 # API kullanım örnekleri
├── 📄 PROJECT_STRUCTURE.md            # Bu dosya
│
├── 📂 config/                         # Yapılandırma dosyaları
│   └── db.js                          # Sequelize veritabanı bağlantısı
│
├── 📂 enums/                          # Enum tanımlamaları
│   ├── jobType.js                     # İş türü enum (Montaj, Tamir, vb.)
│   └── paymentType.js                 # Ödeme türü enum (Nakit, Kredi Kartı, vb.)
│
├── 📂 entities/                       # Veri modelleri (Sequelize)
│   ├── associations.js                # Model ilişkileri
│   ├── customerEntity.js              # Müşteri modeli
│   ├── jobEntity.js                   # İş/Sipariş modeli
│   ├── paymentEntity.js               # Ödeme modeli
│   ├── paymentJobEntity.js            # Ödeme-İş junction tablosu
│   └── userEntity.js                  # Kullanıcı modeli
│
├── 📂 repositories/                   # Veri erişim katmanı
│   ├── 📂 abstract/                   # Repository interface'leri
│   │   ├── ICustomerRepository.js     # Müşteri repository interface
│   │   ├── IJobRepository.js          # İş repository interface
│   │   ├── IPaymentRepository.js      # Ödeme repository interface
│   │   └── IUserRepository.js         # Kullanıcı repository interface
│   │
│   └── 📂 concrete/                   # Repository implementasyonları
│       ├── CustomerRepository.js      # Müşteri repository
│       ├── JobRepository.js           # İş repository
│       ├── PaymentRepository.js       # Ödeme repository
│       └── UserRepository.js          # Kullanıcı repository
│
├── 📂 services/                       # İş mantığı katmanı
│   ├── 📂 abstract/                   # Service interface'leri
│   │   ├── ICustomerService.js        # Müşteri service interface
│   │   ├── IJobService.js             # İş service interface
│   │   ├── IPaymentService.js         # Ödeme service interface
│   │   └── IUserService.js            # Kullanıcı service interface
│   │
│   └── 📂 concrete/                   # Service implementasyonları
│       ├── CustomerService.js         # Müşteri service
│       ├── JobService.js              # İş service
│       ├── PaymentService.js          # Ödeme service
│       └── UserService.js             # Kullanıcı service
│
├── 📂 controllers/                    # HTTP istek yöneticileri
│   ├── CustomerController.js          # Müşteri controller
│   ├── JobController.js               # İş controller
│   ├── PaymentController.js           # Ödeme controller
│   └── UserController.js              # Kullanıcı controller
│
├── 📂 middlewares/                    # Middleware fonksiyonları
│   ├── errorHandler.js                # Merkezi hata yakalama
│   ├── validate.js                    # Validasyon middleware
│   │
│   └── 📂 validators/                 # Validasyon kuralları
│       ├── customerValidator.js       # Müşteri validasyonları
│       ├── jobValidator.js            # İş validasyonları
│       └── paymentValidator.js        # Ödeme validasyonları
│
├── 📂 routes/                         # API route'ları
│   ├── customerRoutes.js              # Müşteri endpoint'leri
│   ├── jobRoutes.js                   # İş endpoint'leri
│   ├── paymentRoutes.js               # Ödeme endpoint'leri
│   └── userRoutes.js                  # Kullanıcı endpoint'leri
│
└── 📂 node_modules/                   # NPM bağımlılıkları (git'de değil)
```

## 🏗️ Katmanlar ve Sorumluluklar

### 1️⃣ Entity Layer (Varlık Katmanı)
**Lokasyon:** `entities/`

**Sorumluluk:**
- Veritabanı tablolarını temsil eder
- Sequelize model tanımlamaları
- İlişkilerin (associations) tanımlanması
- Veri şeması ve validasyonları

**Dosyalar:**
- `customerEntity.js` - Müşteri tablosu
- `jobEntity.js` - İş tablosu
- `paymentEntity.js` - Ödeme tablosu
- `paymentJobEntity.js` - Many-to-many junction table
- `associations.js` - Model ilişkileri

### 2️⃣ Repository Layer (Veri Erişim Katmanı)
**Lokasyon:** `repositories/`

**Sorumluluk:**
- Veritabanı CRUD işlemleri
- Sequelize query'leri
- İlişkili veri çekme (include)
- Veri kalıcılığı

**Patern:**
- Abstract (Interface) + Concrete (Implementation)
- Dependency Injection için hazır
- Test edilebilir yapı

**Metodlar:**
- `create(data)` - Yeni kayıt oluştur
- `getAll()` - Tüm kayıtları getir
- `getById(id)` - ID'ye göre getir
- `update(id, data)` - Güncelle
- `delete(id)` - Sil
- Özel metodlar (örn: `getAllByMusteriId()`)

### 3️⃣ Service Layer (İş Mantığı Katmanı)
**Lokasyon:** `services/`

**Sorumluluk:**
- İş kurallarının uygulanması
- Veri dönüşümleri
- Karmaşık iş süreçleri
- Repository'leri kullanma

**Patern:**
- Abstract (Interface) + Concrete (Implementation)
- Repository'lere bağımlı
- Controller'dan çağrılır

**Örnek İş Mantığı:**
- Fiyat hesaplamaları
- İş durumu kontrolü
- Ödeme doğrulamaları
- İstatistik hesaplamaları

### 4️⃣ Controller Layer (Sunum Katmanı)
**Lokasyon:** `controllers/`

**Sorumluluk:**
- HTTP isteklerini karşılama
- Request parsing
- Response oluşturma
- HTTP status code yönetimi
- Service'leri çağırma

**Standart Yanıt Formatı:**
```javascript
// Başarılı
{
  success: true,
  data: {...},
  message: "İşlem başarılı"
}

// Hata
{
  success: false,
  message: "Hata mesajı",
  errors: [...]
}
```

### 5️⃣ Route Layer (Yönlendirme Katmanı)
**Lokasyon:** `routes/`

**Sorumluluk:**
- Endpoint tanımlamaları
- HTTP method mapping (GET, POST, PUT, DELETE)
- Middleware zinciri
- Swagger annotations
- Validasyon middleware'i

**Route Yapısı:**
```javascript
router.post("/", 
  createValidator,     // Validasyon
  validate,            // Validasyon middleware
  controller.create    // Controller metodu
);
```

### 6️⃣ Middleware Layer
**Lokasyon:** `middlewares/`

**Sorumluluk:**
- Validasyon
- Hata yakalama
- Authentication (gelecek)
- Logging (gelecek)

**Validasyon:**
- `express-validator` kullanımı
- Field bazlı kurallar
- Custom validasyonlar

**Error Handling:**
- Sequelize hatalarını yakalama
- HTTP hata kodları
- Hata mesajlarını sanitize etme

### 7️⃣ Enum Layer
**Lokasyon:** `enums/`

**Sorumluluk:**
- Sabit değer tanımlamaları
- Tip güvenliği
- Validasyon için referans

**Enum'lar:**
```javascript
// jobType.js
{
  MONTAJ: "Montaj",
  TAMIR: "Tamir",
  BAKIM: "Bakim",
  TASARIM: "Tasarim"
}

// paymentType.js
{
  NAKIT: "Nakit",
  KREDI_KARTI: "KrediKarti",
  HAVALE: "Havale",
  CEK: "Cek"
}
```

### 8️⃣ Configuration Layer
**Lokasyon:** `config/`

**Sorumluluk:**
- Veritabanı bağlantısı
- Environment variables
- Uygulama ayarları

## 🔄 Veri Akışı

### Okuma İşlemi (GET)
```
1. HTTP Request → 2. Route → 3. Validation → 4. Controller
                                                    ↓
8. HTTP Response ← 7. Format ← 6. Service ← 5. Repository
                                    ↓
                              Database Query
```

### Yazma İşlemi (POST/PUT)
```
1. HTTP Request → 2. Route → 3. Validation → 4. Controller
                                                    ↓
                                              5. Service
                                                    ↓
                                        6. Business Logic
                                                    ↓
                                              7. Repository
                                                    ↓
                                            8. Database
                                                    ↓
9. HTTP Response ← Format ← Controller ← Service ← Saved
```

### Hata Durumu
```
Any Layer → Error → Error Handler Middleware → Formatted Error Response
```

## 📊 İlişki Diyagramı

```
┌─────────────┐
│  Customer   │
│  (Müşteri)  │
└──────┬──────┘
       │
       │ 1:N (hasMany)
       │
       ├────────────────────┐
       │                    │
       ▼                    ▼
┌─────────────┐      ┌─────────────┐
│     Job     │      │   Payment   │
│    (İş)     │      │   (Ödeme)   │
└──────┬──────┘      └──────┬──────┘
       │                    │
       │         N:M        │
       └─────────┬──────────┘
                 │
                 ▼
         ┌──────────────┐
         │  PaymentJob  │
         │  (Junction)  │
         └──────────────┘
```

## 🎯 Tasarım Prensipleri

### SOLID Prensipleri

1. **Single Responsibility (Tek Sorumluluk)**
   - Her sınıf tek bir sorumluluğa sahip
   - Controller → HTTP yönetimi
   - Service → İş mantığı
   - Repository → Veri erişimi

2. **Open/Closed (Açık/Kapalı)**
   - Abstract interface'ler genişletmeye açık
   - Concrete implementasyonlar değişikliğe kapalı

3. **Liskov Substitution**
   - Concrete class'lar interface'lerini tam implement eder
   - Polymorphism için hazır

4. **Interface Segregation**
   - Her entity'nin kendi interface'i var
   - Gereksiz metod zorlaması yok

5. **Dependency Inversion**
   - Controller → Service (interface)
   - Service → Repository (interface)
   - Üst seviye modüller alt seviyeye bağımlı değil

### DRY (Don't Repeat Yourself)
- Ortak validasyon kuralları
- Tekrar kullanılabilir repository metodları
- Merkezi error handling
- Standart response format

### Separation of Concerns
- Her katman kendi sorumluluğuna odaklanır
- Bağımsız test edilebilir
- Kolay bakım ve genişletme

## 📦 Dosya İsimlendirme Kuralları

### Controllers
- Pattern: `{Entity}Controller.js`
- Örnek: `CustomerController.js`
- PascalCase kullanımı

### Services
- Pattern: `{Entity}Service.js` veya `I{Entity}Service.js`
- Örnek: `CustomerService.js`, `ICustomerService.js`
- PascalCase kullanımı

### Repositories
- Pattern: `{Entity}Repository.js` veya `I{Entity}Repository.js`
- Örnek: `CustomerRepository.js`, `ICustomerRepository.js`
- PascalCase kullanımı

### Routes
- Pattern: `{entity}Routes.js`
- Örnek: `customerRoutes.js`
- camelCase kullanımı

### Entities
- Pattern: `{entity}Entity.js`
- Örnek: `customerEntity.js`
- camelCase kullanımı

### Validators
- Pattern: `{entity}Validator.js`
- Örnek: `customerValidator.js`
- camelCase kullanımı

## 🔌 Port ve Endpoint'ler

### Uygulama
- **Port:** 3000 (varsayılan)
- **Base URL:** `http://localhost:3000`

### API Endpoint'leri

#### Customers
- `POST   /api/customers` - Yeni müşteri
- `GET    /api/customers` - Tüm müşteriler
- `GET    /api/customers/:id` - Müşteri detayı
- `PUT    /api/customers/:id` - Müşteri güncelle
- `DELETE /api/customers/:id` - Müşteri sil

#### Jobs
- `POST   /api/jobs` - Yeni iş
- `GET    /api/jobs` - Tüm işler
- `GET    /api/jobs/:id` - İş detayı
- `GET    /api/jobs/customer/:musteriId` - Müşteri işleri
- `PUT    /api/jobs/:id` - İş güncelle
- `DELETE /api/jobs/:id` - İş sil

#### Payments
- `POST   /api/payments` - Yeni ödeme
- `POST   /api/payments/link` - Ödemeyi işe bağla
- `GET    /api/payments` - Tüm ödemeler
- `GET    /api/payments/:id` - Ödeme detayı
- `GET    /api/payments/customer/:musteriId` - Müşteri ödemeleri
- `PUT    /api/payments/:id` - Ödeme güncelle
- `DELETE /api/payments/:id` - Ödeme sil

#### Users
- `POST   /api/users` - Yeni kullanıcı
- `GET    /api/users` - Tüm kullanıcılar
- `GET    /api/users/:id` - Kullanıcı detayı
- `PUT    /api/users/:id` - Kullanıcı güncelle
- `DELETE /api/users/:id` - Kullanıcı sil

### Dokümantasyon
- **Swagger UI:** `http://localhost:3000/api-docs`

## 🔧 NPM Scripts

```json
{
  "start": "node app.js",      // Production
  "dev": "nodemon app.js"      // Development (hot reload)
}
```

## 📚 Bağımlılıklar

### Production Dependencies
```json
{
  "express": "^5.1.0",              // Web framework
  "sequelize": "^6.37.7",           // ORM
  "pg": "^8.16.3",                  // PostgreSQL driver
  "pg-hstore": "^2.3.4",            // PostgreSQL hstore serializer
  "express-validator": "^7.2.1",    // Validasyon
  "dotenv": "^16.4.5",              // Environment variables
  "swagger-jsdoc": "^6.2.8",        // Swagger dokümantasyonu
  "swagger-ui-express": "^5.0.1"    // Swagger UI
}
```

### Development Dependencies
```json
{
  "nodemon": "^3.1.10"  // Hot reload
}
```

## 🌐 Environment Variables

```env
# Database
DB_NAME=userdb
DB_USER=postgres
DB_PASSWORD=1234
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres

# Server
PORT=3000
NODE_ENV=development
```

## 📈 Ölçeklenebilirlik

### Yatay Ölçekleme
- Stateless API tasarımı
- Load balancer eklemeye hazır
- Database connection pooling

### Dikey Ölçekleme
- Katmanlı mimari
- Cache layer eklenebilir
- Queue system eklenebilir

### Mikroservis Dönüşümü
- Her entity kendi servisi olabilir
- API Gateway eklenebilir
- Event-driven architecture'a geçiş kolay

## 🎓 Best Practices Uygulandı

✅ **Katmanlı Mimari** - Separation of Concerns
✅ **SOLID Prensipleri** - Temiz kod
✅ **DRY** - Kod tekrarından kaçınma
✅ **Repository Pattern** - Veri erişim soyutlaması
✅ **Dependency Injection** - Gevşek bağlılık
✅ **Error Handling** - Merkezi hata yönetimi
✅ **Validation** - Giriş doğrulama
✅ **API Documentation** - Swagger/OpenAPI
✅ **Environment Config** - .env kullanımı
✅ **Consistent Naming** - İsimlendirme kuralları
✅ **RESTful Design** - REST standartları
✅ **Async/Await** - Modern JavaScript
✅ **UUID** - Güvenli ID'ler
✅ **Relationships** - İlişkisel veri modeli

---

**Bu yapı production-ready, bakımı kolay ve genişletilebilir bir API sağlar!** 🚀

