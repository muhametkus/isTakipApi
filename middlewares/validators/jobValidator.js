const { body, param } = require("express-validator");

exports.createJobValidator = [
  body("musteriId")
    .notEmpty()
    .withMessage("Müşteri ID zorunludur")
    .isUUID()
    .withMessage("Geçerli bir UUID formatı giriniz"),
  body("isTuru")
    .notEmpty()
    .withMessage("İş türü zorunludur")
    .isString()
    .withMessage("İş türü metin olmalıdır"),
  body("olculerJson")
    .optional()
    .custom((value) => {
      if (Array.isArray(value) || typeof value === 'object') {
        return true;
      }
      throw new Error("Ölçüler JSON formatında (array veya object) olmalıdır");
    }),
  body("isDurumu")
    .optional()
    .isString()
    .withMessage("İş durumu metin olmalıdır"),
  body("ozelNot")
    .optional()
    .isString()
    .withMessage("Özel not metin olmalıdır"),
];

exports.updateJobValidator = [
  param("id")
    .isUUID()
    .withMessage("Geçerli bir UUID formatı giriniz"),
  body("musteriId")
    .optional()
    .isUUID()
    .withMessage("Geçerli bir UUID formatı giriniz"),
  body("isTuru")
    .optional()
    .isString()
    .withMessage("İş türü metin olmalıdır"),
  body("olculerJson")
    .optional()
    .custom((value) => {
      if (Array.isArray(value) || typeof value === 'object') {
        return true;
      }
      throw new Error("Ölçüler JSON formatında (array veya object) olmalıdır");
    }),
  body("isDurumu")
    .optional()
    .isString()
    .withMessage("İş durumu metin olmalıdır"),
  body("ozelNot")
    .optional()
    .isString()
    .withMessage("Özel not metin olmalıdır"),
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

