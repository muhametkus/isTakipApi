const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "İş Takip API",
      version: "1.0.0",
      description: "İş Takip API Dokümantasyonu",
      contact: {
        name: "Muhammet Kuş",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["ad", "soyad", "email"],
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Kullanıcı ID (UUID)",
              example: "123e4567-e89b-12d3-a456-426614174000",
            },
            ad: {
              type: "string",
              description: "Kullanıcı adı",
              example: "Ahmet",
            },
            soyad: {
              type: "string",
              description: "Kullanıcı soyadı",
              example: "Yılmaz",
            },
            email: {
              type: "string",
              format: "email",
              description: "Kullanıcı e-posta adresi",
              example: "ahmet.yilmaz@example.com",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Oluşturulma tarihi",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Güncellenme tarihi",
            },
          },
        },
        UserInput: {
          type: "object",
          required: ["ad", "soyad", "email"],
          properties: {
            ad: {
              type: "string",
              description: "Kullanıcı adı",
              example: "Ahmet",
            },
            soyad: {
              type: "string",
              description: "Kullanıcı soyadı",
              example: "Yılmaz",
            },
            email: {
              type: "string",
              format: "email",
              description: "Kullanıcı e-posta adresi",
              example: "ahmet.yilmaz@example.com",
            },
          },
        },
        Customer: {
          type: "object",
          required: ["adSoyad", "telefon", "mail", "adres"],
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Müşteri ID (UUID)",
              example: "123e4567-e89b-12d3-a456-426614174000",
            },
            adSoyad: {
              type: "string",
              description: "Müşteri ad soyad",
              example: "Mehmet Demir",
            },
            telefon: {
              type: "string",
              description: "Telefon numarası",
              example: "05551234567",
            },
            mail: {
              type: "string",
              format: "email",
              description: "E-posta adresi",
              example: "mehmet@example.com",
            },
            adres: {
              type: "string",
              description: "Adres",
              example: "İstanbul, Türkiye",
            },
            kayitTarihi: {
              type: "string",
              format: "date-time",
              description: "Kayıt tarihi",
            },
          },
        },
        CustomerInput: {
          type: "object",
          required: ["adSoyad", "telefon", "mail", "adres"],
          properties: {
            adSoyad: {
              type: "string",
              description: "Müşteri ad soyad",
              example: "Mehmet Demir",
            },
            telefon: {
              type: "string",
              description: "Telefon numarası",
              example: "05551234567",
            },
            mail: {
              type: "string",
              format: "email",
              description: "E-posta adresi",
              example: "mehmet@example.com",
            },
            adres: {
              type: "string",
              description: "Adres",
              example: "İstanbul, Türkiye",
            },
          },
        },
        Job: {
          type: "object",
          required: ["musteriId", "isTuru"],
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "İş ID (UUID)",
            },
            musteriId: {
              type: "string",
              format: "uuid",
              description: "Müşteri ID",
            },
            isTuru: {
              type: "string",
              description: "İş türü (serbest metin)",
              example: "iç oda kapısı",
            },
            olculerJson: {
              type: "array",
              description: "Detaylı ölçü bilgileri (array of objects)",
              items: {
                type: "object",
                properties: {
                  olcu: { type: "string", example: "207 x 75" },
                  kasaGenisligi: { type: "number", example: 15 },
                  model: { type: "string", example: "h-fuga" },
                  camliMi: { type: "boolean", example: false },
                  adet: { type: "number", example: 3 },
                  adetFiyati: { type: "number", example: 7000 },
                  paraBirimi: { type: "string", example: "TRY" },
                  ozelNot: { type: "string", example: "standart olsun" }
                }
              },
              example: [
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
            },
            isDurumu: {
              type: "string",
              description: "İş durumu",
              example: "ödeme bekleniyor",
            },
            ozelNot: {
              type: "string",
              description: "Özel not",
              example: "Acil iş",
            },
          },
        },
        JobInput: {
          type: "object",
          required: ["musteriId", "isTuru"],
          properties: {
            musteriId: {
              type: "string",
              format: "uuid",
              description: "Müşteri ID",
            },
            isTuru: {
              type: "string",
              description: "İş türü (serbest metin)",
              example: "iç oda kapısı",
            },
            olculerJson: {
              type: "array",
              description: "Detaylı ölçü bilgileri (array of objects)",
              items: {
                type: "object",
                properties: {
                  olcu: { type: "string", example: "207 x 75" },
                  kasaGenisligi: { type: "number", example: 15 },
                  model: { type: "string", example: "h-fuga" },
                  camliMi: { type: "boolean", example: false },
                  adet: { type: "number", example: 3 },
                  adetFiyati: { type: "number", example: 7000 },
                  paraBirimi: { type: "string", example: "TRY" },
                  ozelNot: { type: "string", example: "standart olsun" }
                }
              },
            },
            isDurumu: {
              type: "string",
              description: "İş durumu",
              example: "ödeme bekleniyor",
            },
            ozelNot: {
              type: "string",
              description: "Özel not",
              example: "Acil iş",
            },
          },
        },
        Payment: {
          type: "object",
          required: ["musteriId", "odemeTuru", "tutar"],
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Ödeme ID (UUID)",
            },
            musteriId: {
              type: "string",
              format: "uuid",
              description: "Müşteri ID",
            },
            odemeTuru: {
              type: "string",
              enum: ["Nakit", "KrediKarti", "Havale", "Cek"],
              description: "Ödeme türü",
              example: "Nakit",
            },
            tutar: {
              type: "number",
              format: "decimal",
              description: "Ödeme tutarı",
              example: 1500.50,
            },
            odemeTarihi: {
              type: "string",
              format: "date-time",
              description: "Ödeme tarihi",
            },
            not: {
              type: "string",
              description: "Not",
              example: "İlk taksit",
            },
            odemeAlanKullanici: {
              type: "string",
              description: "Ödemeyi alan kullanıcı",
              example: "Ali Veli",
            },
            kalanTutar: {
              type: "number",
              format: "decimal",
              description: "Kalan tutar",
              example: 500.00,
            },
          },
        },
        PaymentInput: {
          type: "object",
          required: ["musteriId", "odemeTuru", "tutar"],
          properties: {
            musteriId: {
              type: "string",
              format: "uuid",
              description: "Müşteri ID",
            },
            odemeTuru: {
              type: "string",
              enum: ["Nakit", "KrediKarti", "Havale", "Cek"],
              description: "Ödeme türü",
              example: "Nakit",
            },
            tutar: {
              type: "number",
              format: "decimal",
              description: "Ödeme tutarı",
              example: 1500.50,
            },
            not: {
              type: "string",
              description: "Not",
              example: "İlk taksit",
            },
            odemeAlanKullanici: {
              type: "string",
              description: "Ödemeyi alan kullanıcı",
              example: "Ali Veli",
            },
            kalanTutar: {
              type: "number",
              format: "decimal",
              description: "Kalan tutar",
              example: 500.00,
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              type: "object",
              description: "Yanıt verisi",
            },
            message: {
              type: "string",
              description: "Başarı mesajı",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              description: "Hata mesajı",
            },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Hata mesajı",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Routes dosyalarındaki swagger yorumlarını okur
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };

