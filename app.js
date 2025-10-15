const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const jobRoutes = require("./routes/jobRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const { swaggerUi, swaggerDocs } = require("./swagger");
const errorHandler = require("./middlewares/errorHandler");

// Initialize associations
require("./entities/associations");

const app = express();

// CORS middleware - tüm origin'lere ve methodlara izin ver
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

app.use(express.json()); // Express 5'te body-parser dahili

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// Swagger UI için özel CORS ve CSP ayarları
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    tryItOutEnabled: true,
    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
  },
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "İş Takip API Docs"
}));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/payments", paymentRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize
  .sync() // { force: true } sadece geliştirme sırasında kullanın
  .then(() => {
    console.log("✅ PostgreSQL bağlantısı başarılı, tablolar senkronize edildi.");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ DB bağlantı hatası:", err);
    process.exit(1);
  });
