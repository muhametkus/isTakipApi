const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  // Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation hatası",
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // Sequelize unique constraint error
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      success: false,
      message: "Bu kayıt zaten mevcut",
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // Sequelize foreign key constraint error
  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      success: false,
      message: "İlişkili kayıt bulunamadı",
    });
  }

  // Sequelize database error
  if (err.name === "SequelizeDatabaseError") {
    return res.status(500).json({
      success: false,
      message: "Veritabanı hatası",
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Sunucu hatası",
  });
};

module.exports = errorHandler;

