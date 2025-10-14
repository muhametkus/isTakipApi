const PaymentService = require("../services/concrete/PaymentService");
const paymentService = new PaymentService();

exports.createPayment = async (req, res, next) => {
  try {
    const payment = await paymentService.create(req.body);
    res.status(201).json({
      success: true,
      data: payment,
      message: "Ödeme başarıyla oluşturuldu"
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllPayments = async (req, res, next) => {
  try {
    const payments = await paymentService.getAll();
    res.json({
      success: true,
      data: payments,
      count: payments.length
    });
  } catch (err) {
    next(err);
  }
};

exports.getPaymentById = async (req, res, next) => {
  try {
    const payment = await paymentService.getById(req.params.id);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Ödeme bulunamadı"
      });
    }
    res.json({
      success: true,
      data: payment
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllPaymentsByMusteriId = async (req, res, next) => {
  try {
    const payments = await paymentService.getAllByMusteriId(req.params.musteriId);
    res.json({
      success: true,
      data: payments,
      count: payments.length
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePayment = async (req, res, next) => {
  try {
    const payment = await paymentService.update(req.params.id, req.body);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Ödeme bulunamadı"
      });
    }
    res.json({
      success: true,
      data: payment,
      message: "Ödeme başarıyla güncellendi"
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePayment = async (req, res, next) => {
  try {
    const deleted = await paymentService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Ödeme bulunamadı"
      });
    }
    res.json({
      success: true,
      message: "Ödeme başarıyla silindi"
    });
  } catch (err) {
    next(err);
  }
};

exports.linkPaymentToJob = async (req, res, next) => {
  try {
    const { odemeId, isId } = req.body;
    const link = await paymentService.linkPaymentToJob(odemeId, isId);
    res.status(201).json({
      success: true,
      data: link,
      message: "Ödeme işe başarıyla bağlandı"
    });
  } catch (err) {
    next(err);
  }
};

