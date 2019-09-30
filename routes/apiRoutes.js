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

    // Create a new user
    app.post("/api/signup", function(req, res) {
        const userData = req.body;
        userData.name = userData.name.trim().toLowerCase();
        userData.email = userData.email.trim().toLowerCase();
        // hashing the password
        userData.password = hash(userData.password.trim());
        // const { name } = req.body;
        console.log(userData);
        db.User.findOne({ where: { email: userData.email } })
            .then(function(userResponce) {
                if (userResponce !== null) {
                    throw new Error("This user already exist!")
                }
                return db.User.create(userData)
            })
            .then(function() {
                // res.cookie('username', name);
                res.status(204).end();

            }).catch(function(error) {
                console.log("login error", error)
                res.status(500).json({
                    message: error.message
                })
            })
    });

    // login existing user
    app.post("/api/login", function(req, res) {
        const userData = req.body;
        userData.email = userData.email.trim().toLowerCase();
        userData.password = hash(userData.password.trim());
        console.log(userData);
        //const token = createToken(userData)

        db.User.findOne({ where: { email: userData.email } })
            .then(function(userResponce) {
                if (userResponce === null) {
                    throw new Error("user is not found")
                }
                console.log("keep on eye", userResponce)
                    // function that compares password  
                comparePassword(userResponce.dataValues.password, userData.password);
                const token = createToken(userResponce.dataValues);
                res.status(200).json({
                    token: token,
                    userData: userResponce.dataValues
                });

            })
            .catch(function(error) {
                console.log("login error", error)
                res.status(500).json({
                    message: error.message
                })
            })

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

const createHash = require('crypto').createHash


// hash a string using sha256
function hash(str) {
    const hash = createHash('sha256')
    hash.update(str)
    return hash.digest('hex')
}

// create a session token
function createToken(userData) {
    return 'ghfhgfhgfjhgf'
}

// function that compares password 
function comparePassword(originalPassword, password) {
    if (originalPassword !== password) {
        throw new Error("Invalid credentials")
    }
};