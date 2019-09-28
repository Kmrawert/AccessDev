require("dotenv").config();
var Kraken = require('kraken'),
fs = require('fs');
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
  app.get("/api/gigs/:id", function(req, res) {
    db.Gigs.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(post) {
      res.json(post);
    });
  });

  // Create a new example
  app.post("/api/gigs", function(req, res) {
   const gigs = db.Gigs;
   const {title, date, location, money, genre, description, instrument}= req.body;
   if(instrument > 1){
     let band = instrument.join(', ');
   }else{
     band = instrument[0];
   }
   gigs.create({title, date, location, money, genre, description, instrument: band }).then(data =>{
     res.redirect('/');
     console.log(data);

   })
  });

   // Create a new example
   app.post("/api/profile", function(req, res) {
    const {image,name, location, instrument, bio, YouTubeLinks } = req.body;
    if(instrument > 1){
      let band = instrument.join(', ');
    }else{
      band = instrument[0];
    }
    db.Talent.create({image,name, location, instrument: band, bio, YouTubeLinks}).then(function(dbProfile) {
      res.json(dbProfile).redirect('/');
    //     var opts = {
    //        file: fs.createReadStream(image),
    //        wait: true
    //     };
    //  kraken.upload(opts, function (err, data) {
    //     if (err) {
    //         console.log('Failed. Error message: %s', err);
    //     } else {
    //         console.log('Success. Optimized image URL: %s', data.kraked_url);
    //     }
    //  });
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
