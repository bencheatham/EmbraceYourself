
module.exports = {

  errorLogger: function (error, req, res, next) {

   console.log(error.stack);
   next(error);
  },

  errorHandler: function (error, req, res, next) {

    res.status(500).send({error: error.message}); 
  }

  //as many as we need go here...

}