validatorMiddleware = require('./validator/expressOpenApiValidator');
module.exports = app => {
    const tagImage = require("./controller/tag.image.controller");
  
    var router = require("express").Router();
    // Upload image with tag
    router.post("/upload-blob", validatorMiddleware.validator.validate('post', '/upload-blob') ,tagImage.uploadImageBlob);
    router.post("/upload-bucket", validatorMiddleware.validator.validate('post', '/upload-bucket') , tagImage.uploadImageBucket);
    
  
    app.use("/api/image", router);
    app.use((err, req, res, next) => {
      response={};
      if (
        err.message &&
        err.message.toString().indexOf('Error while validating request') !== -1
      ) {
        response.error = err.message;
        response.statusCode = 422;
        response.statusMsg = 'Unprocessable Entity';
      }
      else{
        response.error = err.message;
        response.statusCode = 500;
        response.statusMsg = 'Internal Server Error!!';
      }
    
      res.status(response.statusCode).send(response);
    });
  };