const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/PaymentController");
const { createPaymentValidator, updatePaymentValidator, linkPaymentToJobValidator, idValidator, musteriIdValidator } = require("../middlewares/validators/paymentValidator");
const validate = require("../middlewares/validate");

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Ödeme yönetimi API'leri
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Yeni ödeme oluştur
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentInput'
 *     responses:
 *       201:
 *         description: Ödeme başarıyla oluşturuldu
 *       400:
 *         description: Validation hatası
 */
router.post("/", createPaymentValidator, validate, paymentController.createPayment);

/**
 * @swagger
 * /api/payments/link:
 *   post:
 *     summary: Ödemeyi işe bağla
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - odemeId
 *               - isId
 *             properties:
 *               odemeId:
 *                 type: string
 *                 format: uuid
 *               isId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Ödeme işe başarıyla bağlandı
 */
router.post("/link", linkPaymentToJobValidator, validate, paymentController.linkPaymentToJob);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Tüm ödemeleri listele
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Ödeme listesi
 */
router.get("/", paymentController.getAllPayments);

/**
 * @swagger
 * /api/payments/customer/{musteriId}:
 *   get:
 *     summary: Müşteriye ait tüm ödemeleri listele
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: musteriId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Müşteri ID'si
 *     responses:
 *       200:
 *         description: Ödeme listesi
 */
router.get("/customer/:musteriId", musteriIdValidator, validate, paymentController.getAllPaymentsByMusteriId);

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: ID'ye göre ödeme getir
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Ödeme ID'si
 *     responses:
 *       200:
 *         description: Ödeme bulundu
 *       404:
 *         description: Ödeme bulunamadı
 */
router.get("/:id", idValidator, validate, paymentController.getPaymentById);

/**
 * @swagger
 * /api/payments/{id}:
 *   put:
 *     summary: Ödeme güncelle
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Ödeme ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentInput'
 *     responses:
 *       200:
 *         description: Ödeme güncellendi
 *       404:
 *         description: Ödeme bulunamadı
 */
router.put("/:id", updatePaymentValidator, validate, paymentController.updatePayment);

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     summary: Ödeme sil
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Ödeme ID'si
 *     responses:
 *       200:
 *         description: Ödeme silindi
 *       404:
 *         description: Ödeme bulunamadı
 */
router.delete("/:id", idValidator, validate, paymentController.deletePayment);

module.exports = router;

