const CustomerService = require("../services/concrete/CustomerService");
const customerService = new CustomerService();

exports.createCustomer = async (req, res, next) => {
  try {
    const customer = await customerService.create(req.body);
    res.status(201).json({
      success: true,
      data: customer,
      message: "Müşteri başarıyla oluşturuldu"
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await customerService.getAll();
    res.json({
      success: true,
      data: customers,
      count: customers.length
    });
  } catch (err) {
    next(err);
  }
};

exports.getCustomerById = async (req, res, next) => {
  try {
    const customer = await customerService.getById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Müşteri bulunamadı"
      });
    }
    res.json({
      success: true,
      data: customer
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const customer = await customerService.update(req.params.id, req.body);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Müşteri bulunamadı"
      });
    }
    res.json({
      success: true,
      data: customer,
      message: "Müşteri başarıyla güncellendi"
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const deleted = await customerService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Müşteri bulunamadı"
      });
    }
    res.json({
      success: true,
      message: "Müşteri başarıyla silindi"
    });
  } catch (err) {
    next(err);
  }
};

