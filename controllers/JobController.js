const JobService = require("../services/concrete/JobService");
const jobService = new JobService();

exports.createJob = async (req, res, next) => {
  try {
    const job = await jobService.create(req.body);
    res.status(201).json({
      success: true,
      data: job,
      message: "İş başarıyla oluşturuldu"
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getAll();
    res.json({
      success: true,
      data: jobs,
      count: jobs.length
    });
  } catch (err) {
    next(err);
  }
};

exports.getJobById = async (req, res, next) => {
  try {
    const job = await jobService.getById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "İş bulunamadı"
      });
    }
    res.json({
      success: true,
      data: job
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllJobsByMusteriId = async (req, res, next) => {
  try {
    const jobs = await jobService.getAllByMusteriId(req.params.musteriId);
    res.json({
      success: true,
      data: jobs,
      count: jobs.length
    });
  } catch (err) {
    next(err);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const job = await jobService.update(req.params.id, req.body);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "İş bulunamadı"
      });
    }
    res.json({
      success: true,
      data: job,
      message: "İş başarıyla güncellendi"
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const deleted = await jobService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "İş bulunamadı"
      });
    }
    res.json({
      success: true,
      message: "İş başarıyla silindi"
    });
  } catch (err) {
    next(err);
  }
};

