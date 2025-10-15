# CORS Kurulum ve Sorun Giderme Kılavuzu

## 🔧 Yapılan Değişiklikler

### 1. CORS Konfigürasyonu Güncellendi (`app.js`)

```javascript
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  exposedHeaders: ['Content-Length', 'X-JSON'],
  credentials: false,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Preflight requests için OPTIONS method handler
app.options('*', cors());
```

### 2. Swagger UI İyileştirildi

- `tryItOutEnabled: true` - API'yi Swagger üzerinden test edebilme
- `supportedSubmitMethods` - Tüm HTTP methodlarına destek
- Health check endpoint eklendi: `/health`

### 3. Production Server Eklendi (`swagger.js`)

```javascript
servers: [
  {
    url: "http://localhost:3000",
    description: "Development server",
  },
  {
    url: "http://e80wggwoc44owgo4c0ckkc88.89.252.153.218.sslip.io",
    description: "Production server",
  },
]
```

## 🚀 Canlıya Alma Adımları

### 1. Sunucuyu Yeniden Başlatın

```bash
# Sunucuyu durdurun (Ctrl+C)
# Yeniden başlatın
npm start
# veya development modunda
npm run dev
```

### 2. Swagger UI'da Server Seçimi

1. Swagger UI'a gidin: `http://e80wggwoc44owgo4c0ckkc88.89.252.153.218.sslip.io/api-docs`
2. En üstteki **"Servers"** dropdown menüsünü bulun
3. **"Production server"** seçeneğini seçin
4. Artık API çağrıları doğru sunucuya gidecektir

### 3. Health Check Testi

Önce sunucunun çalıştığını doğrulayın:

```bash
curl http://e80wggwoc44owgo4c0ckkc88.89.252.153.218.sslip.io/health
```

Beklenen yanıt:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-10-15T12:00:00.000Z"
}
```

## 🔍 CORS Sorun Giderme

### Hata: "Failed to fetch"

**Sebepler:**

1. ✅ **Server seçimi yanlış** - Swagger UI'da doğru serveri seçtiğinizden emin olun
2. ✅ **Sunucu çalışmıyor** - `/health` endpoint'ini kontrol edin
3. ✅ **CORS headers eksik** - Artık düzeltildi
4. ⚠️ **HTTPS/HTTP karışıklığı** - Her iki tarafta da HTTP veya HTTPS olmalı

### Hata: "CORS policy: No 'Access-Control-Allow-Origin' header"

Bu hata artık gelmemeli çünkü:
- `origin: '*'` tüm domain'lere izin veriyor
- `app.options('*', cors())` preflight requestleri doğru handle ediyor

### Tarayıcı Console Kontrolleri

1. Tarayıcıda F12 ile Developer Tools'u açın
2. **Network** tab'ına gidin
3. Bir API çağrısı yapın
4. Request Headers'da şunları kontrol edin:
   - `Origin: http://...`
5. Response Headers'da şunları kontrol edin:
   - `Access-Control-Allow-Origin: *`
   - `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS`

## 🎯 Test Senaryosu

### 1. Swagger UI'dan Test

1. Swagger'a gidin
2. Server olarak "Production server" seçin
3. `/api/customers` endpoint'ini deneyin
4. "Try it out" butonuna tıklayın
5. "Execute" butonuna tıklayın

### 2. Manuel CORS Testi

JavaScript Console'dan:

```javascript
fetch('http://e80wggwoc44owgo4c0ckkc88.89.252.153.218.sslip.io/api/customers')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

## ⚙️ Gelişmiş Konfigürasyon (Opsiyonel)

### Specific Origins (Daha Güvenli)

Eğer sadece belirli domainlere izin vermek isterseniz:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://e80wggwoc44owgo4c0ckkc88.89.252.153.218.sslip.io',
    // Diğer güvenilir domainler
  ],
  credentials: true, // Cookie kullanıyorsanız
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
}));
```

### Environment Variables

Farklı ortamlar için `.env` dosyası kullanın:

```env
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000,http://example.com
```

## 📝 Notlar

- **Güvenlik:** Production'da `origin: '*'` kullanmak güvenlik riski oluşturabilir. API'niz public ise sorun değil.
- **Credentials:** Cookie veya authentication kullanıyorsanız `credentials: true` yapın ve specific origin belirtin.
- **HTTPS:** Production'da HTTPS kullanmanız önerilir.

## 🆘 Hala Sorun mu Var?

1. Sunucu loglarını kontrol edin
2. Network tab'da request/response detaylarına bakın
3. Browser cache'i temizleyin (Ctrl+Shift+Delete)
4. Farklı bir browser'da deneyin
5. `/health` endpoint'inin çalıştığından emin olun

## ✅ Kontrol Listesi

- [ ] Sunucu yeniden başlatıldı mı?
- [ ] `/health` endpoint yanıt veriyor mu?
- [ ] Swagger UI'da doğru server seçili mi?
- [ ] Browser console'da CORS hatası var mı?
- [ ] Network tab'da `Access-Control-Allow-Origin` header'ı var mı?

