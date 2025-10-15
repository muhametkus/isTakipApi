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

// CORS middleware
app.use(cors());

app.use(express.json()); // Express 5'te body-parser dahili

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
