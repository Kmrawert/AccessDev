require("dotenv").config();
const apikey = '##';
    fs = require('fs');
var db = require("../models");
var jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
let token;
sgMail.setApiKey('##');

module.exports = function(app) {
    // Get all examples      
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
<<<<<<< HEAD
    app.post("/api/gigs", function(req, res) {
=======
    app.post("/api/gigs", function (req, res) {
        const {token} = req.cookies;
        var decoded = jwt.verify(token, 'grabbygig');
>>>>>>> 5023124885bad6074292fa2430e87253a3705e79
        const gigs = db.Gigs;
        let band;
        const { title, date, location, money, genre, description, instrument } = req.body;
        if (instrument > 1) {
            band = instrument.join(', ');
        } else {
            band = instrument;
        }
<<<<<<< HEAD
        gigs.create({ title, date, location, money, genre, description, instrument: band })
            .then(data => {
                res.redirect('/');
                console.log(data);
=======
        db.User.findOne({ where: { email: decoded.email } }).then(user =>{
            gigs.create({ title, date, location, money, genre, description, instrument: band, UserId: user.get('id')})
                .then(data => {
                    res.redirect('/');
                    console.log(data);
    
                })
>>>>>>> 5023124885bad6074292fa2430e87253a3705e79

        })
    });
    app.post("/api/giggrab", function (req, res) {
        const {token} = req.cookies;
        let TalentId;
        let TalentName;
        var decoded = jwt.verify(token, 'grabbygig');
        const gigs = db.Gigs;
        const { UserId} = req.body;
        db.User.findOne({ where: { email: decoded.email} }).then( talent =>{
                TalentId= talent.id;
                TalentName = talent.name;

            db.User.findOne({ where: { id: UserId } }).then(user =>{
                console.log(user.email);
                console.log(decoded.email);
                const msg = {
                    to: user.email,
                    from: decoded.email,
                    subject: `${TalentName} wants the gig!`,
                    text: `Hey, Lemme grab that Gig! see my profile at http://www.giggrab.com/${TalentId}! `
                  };
                  sgMail.send(msg);
                  console.log('message sent');
                res.status(204).end();
    
            })

        })
    });

    // Create a new user
    app.post("/api/signup", function(req, res) {
        const userData = req.body;
        userData.name = userData.name.trim().toLowerCase();
        userData.email = userData.email.trim().toLowerCase();
        // hashing the password
        userData.password = hash(userData.password.trim());
        db.User.findOne({ where: { email: userData.email } })
            .then(function(userResponce) {
                if (userResponce !== null) {
                    throw new Error("This user already exist!")
                }

                return db.User.create(userData)
            })
            .then(function(data) {
                console.log('user', data);

                token = jwt.sign({ email: data.dataValues.email }, 'grabbygig');
                res.cookie('token', token).json(data.dataValues);

            })
            .catch(function(error) {
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
        console.log(userData.password);

        //const token = createToken(userData)
        db.User.findOne({ where: { email: userData.email } })
            .then(function(userResponce) {
                if (userResponce === null) {
                    throw new Error("user is not found")
                }
                console.log("keep on eye", userResponce)
                    // function that compares password  
                comparePassword(userResponce.dataValues.password, userData.password);
                token = jwt.sign({ email: userResponce.email }, 'grabbygig');
                res.cookie('token', token).status(204).end();

            })
            .catch(function(error) {
                console.log("login error", error)
                res.status(500).json({
                    message: error.message
                })
            })

    });

<<<<<<< HEAD


    // Create a new example
    app.post("/api/profile", function(req, res) {
=======
    app.post("/api/profile", function (req, res) {
<<<<<<< HEAD
>>>>>>> dd8ce49b035c9df2e65dd0e7878dbb21c3526152
=======
        let band;
>>>>>>> 5023124885bad6074292fa2430e87253a3705e79
        const { image, name, location, instrument, bio, YouTubeLinks, UserId } = req.body;
        if (instrument > 1) {
             band = instrument.join(', ');
        } else {
            band = instrument;
        }
        console.log(image);
        db.User.update({ image, name, location, instrument: band, bio, YouTubeLinks }, { where: { id: UserId } }).then(function(dbProfile) {
            res.redirect('/home');
        });
    });

    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {
        db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
            res.json(dbExample);
        });
    });
    app.get("/api/editprofile/:id", function(req, res) {
        db.talent.findOne({}).then(function(dbEditProfile) {
            res.json(dbEditProfile);
        });
    });
};

const createHash = require('crypto').createHash


// hash password using sha256
function hash(str) {
    const hash = createHash('sha256')
    hash.update(str)
    return hash.digest('hex')
}

// function that compares password 
function comparePassword(originalPassword, password) {
    if (originalPassword !== password) {
        throw new Error("Invalid credentials")
    }
};