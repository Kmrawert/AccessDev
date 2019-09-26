require("dotenv").config();
var Kraken = require('kraken'),
var fs = require('fs');
var db = require("../models");
var password = process.env.krakenAPI_Secret;
var krakenAPI = process.env.krakenAPI_Key;
var kraken = new Kraken({
   api_key: password,
   api_secret: krakenAPI
});

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

   // Create a new example
   app.post("/api/profile", function(req, res) {
    db.talent.create(req.body).then(function(dbProfile) {
      res.json(dbProfile);
      var opts = {
        file: fs.createReadStream('file.jpg'),
        wait: true
     };
     kraken.upload(opts, function (err, data) {
        if (err) {
            console.log('Failed. Error message: %s', err);
        } else {
            console.log('Success. Optimized image URL: %s', data.kraked_url);
        }
     });
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
