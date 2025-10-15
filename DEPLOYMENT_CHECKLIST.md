# 🚀 Canlı Deployment Kontrol Listesi

## Yapılan Değişiklikler (15 Ekim 2025)

### 🔧 CORS Sorunu Çözüldü

#### Sorun
- Swagger UI'dan production sunucuda API çağrıları yapılırken CORS hatası alınıyordu
- "Failed to fetch" hatası görülüyordu
- Local'de çalışıyor, production'da çalışmıyordu

#### Çözüm

**1. app.js - Gelişmiş CORS Konfigürasyonu**
```javascript
// Ek headers eklendi
allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
exposedHeaders: ['Content-Length', 'X-JSON']
preflightContinue: false
optionsSuccessStatus: 204

// Preflight requests için explicit handler
app.options('*', cors());
```

**2. app.js - Health Check Endpoint Eklendi**
```javascript
GET /health
Yanıt: { success: true, message: "Server is running", timestamp: "..." }
```

**3. swagger.js - Production Server Tanımlandı**
```javascript
servers: [
  { url: "http://localhost:3000", description: "Development server" },
  { url: "http://e80wggwoc44owgo4c0ckkc88.89.252.153.218.sslip.io", description: "Production server" }
]
```

**4. app.js - Swagger UI İyileştirmeleri**
```javascript
swaggerOptions: {
  tryItOutEnabled: true,
  displayRequestDuration: true,
  supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch']
}
```

## 📋 Deployment Adımları

### 1. Sunucuda Değişiklikleri Çekin

```bash
# SSH ile sunucuya bağlanın
ssh user@server

# Proje dizinine gidin
cd /path/to/isTakipApi

# Git pull
git pull origin main

# Bağımlılıkları güncelleyin (gerekirse)
npm install
```

### 2. Sunucuyu Yeniden Başlatın

```bash
# PM2 kullanıyorsanız
pm2 restart isTakipApi

# veya direkt node
npm start

# veya systemd service
sudo systemctl restart istakip-api
```

### 3. Health Check Testi

```bash
curl http://e80wggwoc44owgo4c0ckkc88.89.252.153.218.sslip.io/health
```

Beklenen: `{"success":true,"message":"Server is running","timestamp":"..."}`

### 4. Swagger UI Testi

1. Tarayıcıda açın: http://e80wggwoc44owgo4c0ckkc88.89.252.153.218.sslip.io/api-docs
2. Üst kısımda "Servers" dropdown'ını bulun
3. "Production server" seçin
4. Herhangi bir endpoint'te "Try it out" → "Execute" yapın
5. ✅ CORS hatası olmadan yanıt almalısınız

## 🧪 Test Senaryoları

### Test 1: Health Check
```bash
curl -i http://e80wggwoc44owgo4c0ckkc88.89.252.153.218.sslip.io/health
```

Kontrol edin:
- Status Code: 200
- Header: `Access-Control-Allow-Origin: *`
- Body: Valid JSON

### Test 2: GET Customers
```bash
curl -i -X GET \
  http://e80wggwoc44owgo4c0ckkc88.89.252.153.218.sslip.io/api/customers \
  -H "Content-Type: application/json"
```

Kontrol edin:
- CORS headers mevcut
- JSON response

### Test 3: OPTIONS Preflight
```bash
curl -i -X OPTIONS \
  http://e80wggwoc44owgo4c0ckkc88.89.252.153.218.sslip.io/api/customers \
  -H "Origin: http://example.com" \
  -H "Access-Control-Request-Method: POST"
```

Kontrol edin:
- Status Code: 204
- Header: `Access-Control-Allow-Origin: *`
- Header: `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS`

### Test 4: Swagger UI'dan POST
1. Swagger UI'a gidin
2. `/api/customers` POST endpoint'ini bulun
3. "Try it out" tıklayın
4. Örnek data girin:
```json
{
  "adSoyad": "Test Müşteri",
  "telefon": "05551234567",
  "mail": "test@example.com",
  "adres": "Test Adres"
}
```
5. "Execute" tıklayın
6. ✅ Başarılı response almalısınız (201 Created)

## ⚠️ Bilinen Sorunlar ve Çözümleri

### Sorun: Swagger'da hala CORS hatası

**Çözüm:**
1. Sayfayı yenileyin (Ctrl+F5)
2. Server dropdown'dan "Production server" seçtiğinizden emin olun
3. Browser cache'i temizleyin

### Sorun: 404 Not Found

**Çözüm:**
1. URL'in doğru olduğundan emin olun
2. Sunucunun çalıştığını kontrol edin: `/health`
3. Route'ların doğru tanımlı olduğunu kontrol edin

### Sorun: 500 Internal Server Error

**Çözüm:**
1. Sunucu loglarını kontrol edin
2. Database bağlantısını kontrol edin
3. Environment variables'ları kontrol edin

## 🔐 Güvenlik Notları

### Şu Anki Durum: Open CORS
```javascript
origin: '*'  // Tüm domainlere açık
```

**Avantajlar:**
- Herhangi bir frontend'den erişilebilir
- Test ve geliştirme kolay
- Public API için uygun

**Dezavantajlar:**
- Daha az güvenli
- Rate limiting önerilir

### Gelecek İyileştirmeler (Opsiyonel)

1. **Specific Origins:**
```javascript
origin: [
  'http://yourdomain.com',
  'https://yourdomain.com'
]
```

2. **Rate Limiting:**
```bash
npm install express-rate-limit
```

3. **API Key Authentication:**
```bash
npm install helmet
```

4. **HTTPS:**
- SSL sertifikası edinin (Let's Encrypt)
- HTTP'den HTTPS'e redirect

## 📊 Monitoring

### Log Kontrolleri

```bash
# PM2 logs
pm2 logs isTakipApi

# Systemd logs
journalctl -u istakip-api -f

# Node.js direkt
# Console çıktısını kontrol edin
```

### Başarılı Başlatma Logları

```
✅ PostgreSQL bağlantısı başarılı, tablolar senkronize edildi.
🚀 Server running on port 3000
📚 API Documentation: http://localhost:3000/api-docs
```

## ✅ Son Kontrol Listesi

Deployment tamamlandı mı?

- [ ] Git pull yapıldı
- [ ] npm install çalıştırıldı (gerekirse)
- [ ] Sunucu yeniden başlatıldı
- [ ] `/health` endpoint çalışıyor
- [ ] Swagger UI açılıyor
- [ ] Swagger'da "Production server" seçili
- [ ] GET request CORS hatası vermiyor
- [ ] POST request CORS hatası vermiyor
- [ ] Database bağlantısı çalışıyor
- [ ] Sunucu logları normal görünüyor

## 📞 Destek

Sorun devam ederse:

1. **Browser Console** (F12) loglarını kontrol edin
2. **Network Tab**'da request/response detaylarına bakın
3. **Sunucu logları**nı inceleyin
4. Bu dosyadaki test senaryolarını tek tek deneyin

---

**Son Güncelleme:** 15 Ekim 2025  
**Durum:** ✅ CORS sorunu çözüldü, production'a hazır

