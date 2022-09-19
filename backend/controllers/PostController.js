const Model = require("../models/PostModel");

class Controller {
  getCount(req, res, next) {
    Model.find().count(function (err, response) {
      if (err) console.log(err);
      res.status(200).send({
        success: true,
        response,
      });
    });
  }

  getAllPaginate(req, res, next) {
    const { page } = req.body;
    Model.find()
      .sort({ time: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec((err, response) => {
        if (err) return next(err);
        res.status(200).send({
          success: true,
          response,
        });
      });
  }

  getAll(req, res, next) {
    Model.find()
      .sort({ time: -1 })
      .exec((err, response) => {
        if (err) return next(err);
        res.status(200).send({
          success: true,
          response,
        });
      });
  }

  getbyId(req, res, next) {
    let { id } = req.params;
    Model.findOne({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({
        success: true,
        response,
      });
    });
  }

  post(req, res, next) {
    let body = req.body;
    let doc = new Model(body);
    doc.save((err, response) => {
      if (err) return next(err);
      res.status(200).send({
        success: true,
        response,
      });
    });
  }

  put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    Model.updateOne(
      { _id: id },
      {
        $set: body,
      },
      (err, response) => {
        if (err) return next(err);
        res.status(200).send({
          success: true,
          response,
        });
      }
    );
  }

  delete(req, res, next) {
    let { id } = req.params;
    Model.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({
        success: true,
        response,
      });
    });
  }
}

const controller = new Controller();
module.exports = controller;
