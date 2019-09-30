require("dotenv").config();
var Kraken = require('kraken'),
    fs = require('fs');
var db = require("../models");
let token;
var jwt = require('jsonwebtoken');
var password = process.env.krakenAPI_Secret;
var krakenAPI = process.env.krakenAPI_Key;
var kraken = new Kraken({
    api_key: password,
    api_secret: krakenAPI
});

module.exports = function (app) {
    // Get all examples
        app.post("/api/signup", function (req, res) {
            const userData = req.body;
            const { name } = req.body;
            console.log(userData);
            db.User.create(userData)
                .then(function () {
                    // res.cookie('username', name);
                    res.status(204).end();
    
                })
                .catch(function (error) {
                    res.status(500).json(error)
                })
        });
      
    app.get("/api/gigs/:id", function (req, res) {
        db.Gigs.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (post) {
            res.json(post);
        });
    });

    // Create a new example
    app.post("/api/gigs", function (req, res) {
        const gigs = db.Gigs;
        const { title, date, location, money, genre, description, instrument } = req.body;
        if (instrument > 1) {
            let band = instrument.join(', ');
        } else {
            band = instrument[0];
        }
        gigs.create({ title, date, location, money, genre, description, instrument: band }).then(data => {
            res.redirect('/');
            console.log(data);

        })
    });

    // Sign up route
    app.post("/api/login", (req,res) =>{
        let {email, password} = req.body;
        let userData = {
            email: email.trim().toLowerCase(),
            password: password.trim()
            }
        // token = jwt.sign({ email: userData.email }, 'grabbygig');
        res.status(204).end();
        })
     
        
    // Create a new example
    app.post("/api/profile", function (req, res) {
        const { image, name, location, instrument, bio, YouTubeLinks } = req.body;
        if (instrument > 1) {
            let band = instrument.join(', ');
        } else {
            band = instrument[0];
        }
        console.log(image);
        db.Talent.create({ image, name, location, instrument: band, bio, YouTubeLinks }).then(function (dbProfile) {
            res.redirect('/home');
        });
    });

    // Delete an example by id
    app.delete("/api/examples/:id", function (req, res) {
        db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
            res.json(dbExample);
        });
    });
};



