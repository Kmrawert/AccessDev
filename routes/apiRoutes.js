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
const secret = "";

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
        const { title, date, location, money, genre, description, instrument } = req.body;
        if (instrument > 1) {
            let band = instrument.join(', ');
        } else {
            band = instrument[0];
        }
        gigs.create({ title, date, location, money, genre, description, instrument: band })
            .then(data => {
                res.redirect('/');
                console.log(data);

            })
    });

    // Sign up route
    app.post("/api/signup", function(req, res) {
        const userData = req.body;
        userData.name = userData.name.trim().toLowerCase();
        userData.email = userData.email.trim().toLowerCase();
        userData.password = hash(secret, userData.password.trim());
        // const { name } = req.body;
        console.log(userData);
        db.User.create(userData)
            .then(function() {
                // res.cookie('username', name);
                res.status(204).end();

            })
            .catch(function(error) {
                res.status(500).json(error)
            })
    });

    app.post("/api/login", function(req, res) {
        const userData = req.body;

        userData.email = userData.email.trim().toLowerCase();
        userData.password = hash(secret, userData.password.trim());
        res.json(userData);
        console.log(userData);
        const token = createToken(userData)

        // here jwy.sign(...)
        // db.User.create(userData)
        //     .then(function() {
        //         // res.cookie('username', name);
        //         res.status(204).end();

        //     })
        //     .catch(function(error) {
        //         res.status(500).json(error)
        //     })
    });

    // Create a new example
    app.post("/api/profile", function(req, res) {

        db.talent.create(req.body).then(function(dbProfile) {
            res.json(dbProfile);
            var opts = {
                file: fs.createReadStream('file.jpg'),
                wait: true
            };
            kraken.upload(opts, function(err, data) {
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

function hash(secret, text) {
    return text;

}


function createToken(userData) {
    return 'ghfhgfhgfjhgf'
}