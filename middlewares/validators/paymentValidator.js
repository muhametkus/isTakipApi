const { body, param } = require("express-validator");
const PaymentType = require("../../enums/paymentType");

exports.createPaymentValidator = [
  body("musteriId")
    .notEmpty()
    .withMessage("Müşteri ID zorunludur")
    .isUUID()
    .withMessage("Geçerli bir UUID formatı giriniz"),
  body("odemeTuru")
    .notEmpty()
    .withMessage("Ödeme türü zorunludur")
    .isIn(Object.values(PaymentType))
    .withMessage(`Ödeme türü şunlardan biri olmalıdır: ${Object.values(PaymentType).join(", ")}`),
  body("tutar")
    .notEmpty()
    .withMessage("Tutar zorunludur")
    .isDecimal()
    .withMessage("Tutar sayısal değer olmalıdır"),
  body("not")
    .optional()
    .isString()
    .withMessage("Not metin olmalıdır"),
  body("odemeAlanKullanici")
    .optional()
    .isString()
    .withMessage("Ödeme alan kullanıcı metin olmalıdır"),
  body("kalanTutar")
    .optional()
    .isDecimal()
    .withMessage("Kalan tutar sayısal değer olmalıdır"),
];

exports.updatePaymentValidator = [
  param("id")
    .isUUID()
    .withMessage("Geçerli bir UUID formatı giriniz"),
  body("musteriId")
    .optional()
    .isUUID()
    .withMessage("Geçerli bir UUID formatı giriniz"),
  body("odemeTuru")
    .optional()
    .isIn(Object.values(PaymentType))
    .withMessage(`Ödeme türü şunlardan biri olmalıdır: ${Object.values(PaymentType).join(", ")}`),
  body("tutar")
    .optional()
    .isDecimal()
    .withMessage("Tutar sayısal değer olmalıdır"),
  body("not")
    .optional()
    .isString()
    .withMessage("Not metin olmalıdır"),
  body("odemeAlanKullanici")
    .optional()
    .isString()
    .withMessage("Ödeme alan kullanıcı metin olmalıdır"),
  body("kalanTutar")
    .optional()
    .isDecimal()
    .withMessage("Kalan tutar sayısal değer olmalıdır"),
];

exports.linkPaymentToJobValidator = [
  body("odemeId")
    .notEmpty()
    .withMessage("Ödeme ID zorunludur")
    .isUUID()
    .withMessage("Geçerli bir UUID formatı giriniz"),
  body("isId")
    .notEmpty()
    .withMessage("İş ID zorunludur")
    .isUUID()
    .withMessage("Geçerli bir UUID formatı giriniz"),
];

exports.idValidator = [
  param("id")
    .isUUID()
    .withMessage("Geçerli bir UUID formatı giriniz"),
];

exports.musteriIdValidator = [
  param("musteriId")
    .isUUID()
    .withMessage("Geçerli bir UUID formatı giriniz"),
];

