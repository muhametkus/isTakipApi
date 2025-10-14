const express = require("express");
const router = express.Router();
const jobController = require("../controllers/JobController");
const { createJobValidator, updateJobValidator, idValidator, musteriIdValidator } = require("../middlewares/validators/jobValidator");
const validate = require("../middlewares/validate");

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: İş/Sipariş yönetimi API'leri
 */

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Yeni iş oluştur
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobInput'
 *     responses:
 *       201:
 *         description: İş başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Validation hatası
 */
router.post("/", createJobValidator, validate, jobController.createJob);

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Tüm işleri listele
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: İş listesi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.get("/", jobController.getAllJobs);

/**
 * @swagger
 * /api/jobs/customer/{musteriId}:
 *   get:
 *     summary: Müşteriye ait tüm işleri listele
 *     tags: [Jobs]
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
 *         description: İş listesi
 */
router.get("/customer/:musteriId", musteriIdValidator, validate, jobController.getAllJobsByMusteriId);

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: ID'ye göre iş getir
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: İş ID'si
 *     responses:
 *       200:
 *         description: İş bulundu
 *       404:
 *         description: İş bulunamadı
 */
router.get("/:id", idValidator, validate, jobController.getJobById);

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: İş güncelle
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: İş ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobInput'
 *     responses:
 *       200:
 *         description: İş güncellendi
 *       404:
 *         description: İş bulunamadı
 */
router.put("/:id", updateJobValidator, validate, jobController.updateJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: İş sil
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: İş ID'si
 *     responses:
 *       200:
 *         description: İş silindi
 *       404:
 *         description: İş bulunamadı
 */
router.delete("/:id", idValidator, validate, jobController.deleteJob);

module.exports = router;

