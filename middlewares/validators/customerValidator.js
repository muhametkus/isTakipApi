const { body, param } = require("express-validator");

exports.createCustomerValidator = [
  body("adSoyad")
    .notEmpty()
    .withMessage("Ad Soyad zorunludur")
    .isString()
    .withMessage("Ad Soyad metin olmalıdır"),
  body("telefon")
    .notEmpty()
    .withMessage("Telefon zorunludur")
    .isString()
    .withMessage("Telefon metin olmalıdır"),
  body("mail")
    .notEmpty()
    .withMessage("E-posta zorunludur")
    .isEmail()
    .withMessage("Geçerli bir e-posta adresi giriniz"),
  body("adres")
    .notEmpty()
    .withMessage("Adres zorunludur")
    .isString()
    .withMessage("Adres metin olmalıdır"),
];

exports.updateCustomerValidator = [
  param("id")
    .isUUID()
    .withMessage("Geçerli bir UUID formatı giriniz"),
  body("adSoyad")
    .optional()
    .isString()
    .withMessage("Ad Soyad metin olmalıdır"),
  body("telefon")
    .optional()
    .isString()
    .withMessage("Telefon metin olmalıdır"),
  body("mail")
    .optional()
    .isEmail()
    .withMessage("Geçerli bir e-posta adresi giriniz"),
  body("adres")
    .optional()
    .isString()
    .withMessage("Adres metin olmalıdır"),
];

exports.idValidator = [
  param("id")
    .isUUID()
    .withMessage("Geçerli bir UUID formatı giriniz"),
];

