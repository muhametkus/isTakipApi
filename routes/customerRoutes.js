const express = require("express");
const router = express.Router();
const customerController = require("../controllers/CustomerController");
const { createCustomerValidator, updateCustomerValidator, idValidator } = require("../middlewares/validators/customerValidator");
const validate = require("../middlewares/validate");

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Müşteri yönetimi API'leri
 */

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Yeni müşteri oluştur
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerInput'
 *     responses:
 *       201:
 *         description: Müşteri başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Validation hatası
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", createCustomerValidator, validate, customerController.createCustomer);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Tüm müşterileri listele
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Müşteri listesi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.get("/", customerController.getAllCustomers);

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: ID'ye göre müşteri getir
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Müşteri ID'si
 *     responses:
 *       200:
 *         description: Müşteri bulundu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Müşteri bulunamadı
 */
router.get("/:id", idValidator, validate, customerController.getCustomerById);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Müşteri güncelle
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Müşteri ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerInput'
 *     responses:
 *       200:
 *         description: Müşteri güncellendi
 *       404:
 *         description: Müşteri bulunamadı
 */
router.put("/:id", updateCustomerValidator, validate, customerController.updateCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Müşteri sil
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Müşteri ID'si
 *     responses:
 *       200:
 *         description: Müşteri silindi
 *       404:
 *         description: Müşteri bulunamadı
 */
router.delete("/:id", idValidator, validate, customerController.deleteCustomer);

module.exports = router;

