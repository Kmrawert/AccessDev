require("dotenv").config();
const apikey = 'sgPassword = process.env.SENDGRID_API_KEY;';
fsPassword = process.env.FS_SECRET_KEY;
    fs = require('fs');
var db = require("../models");
var jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
let token;
var password = process.env.krakenAPI_Secret;
sgPassword = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sgPassword);

module.exports = function (app) {
    // Get all examples     
    app.get("/api/gigs/:id", function (req, res) {
        db.Gigs.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (post) {
            res.json(post);
        });
    });
    app.get("/api/users/:id", function (req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (post) {
            res.json(post);
        });
    });

    // Create a new example
    app.post("/api/gigs", function (req, res) {
        const {token} = req.cookies;
        var decoded = jwt.verify(token, 'grabbygig');
        const gigs = db.Gigs;
        let band;
        let name;
        let id;
        const { title, date, location, money, genre, description, instrument } = req.body;
        console.log(instrument);
        if (Array.isArray(instrument)) {
            band = instrument.join(', ');
        } else {
            band = instrument;
        }
        db.User.findOne({ where: { email: decoded.email } }).then(user =>{
            name= user.name;
            id=user.id;
            gigs.create({ title, date, location, money, genre, description, instrument: band, UserId: user.get('id')} )
                .then(data => {
                    db.Event.create({Status:`${name} just posted a Gig!`, GigsId: data.id, UserId: id })
                    res.redirect('/');
                    console.log(data);
    
                })

        })
    });
    app.post("/api/giggrab/:id", function (req, res) {
        const {token} = req.cookies;
        const {id} = req.params;
        let TalentId;
        let TalentName;
        var decoded = jwt.verify(token, 'grabbygig');
        const { UserId} = req.body;
        db.User.findOne({ where: { email: decoded.email} }).then( talent =>{
                TalentId= talent.id;
                TalentName = talent.name;
                
                db.User.findOne({ where: { id: UserId } }).then(user =>{
                db.Event.create({Status:`${TalentName} wants to Grab a Gig! from ${user.name}`, open: 0,  GigsId: id,  UserId: TalentId }) 
                console.log(user.email);
                console.log(decoded.email);
                const msg = {
                    to: user.email,
                    from: decoded.email,
                    subject: `${TalentName} wants the gig!`,
                    text: `Hey, Lemme grab that Gig! see my profile at https://giggrab.herokuapp.com/users/${TalentName} ! `
                  };
                  sgMail.send(msg);
                  console.log('message sent');
                res.status(204).end();
    
            })

        })
    });

    // Create a new user
    app.post("/api/signup", function (req, res) {
        const userData = req.body;
        userData.name = userData.name.trim().toLowerCase();
        userData.email = userData.email.trim().toLowerCase();
        // hashing the password
        userData.password = hash(userData.password.trim());
        db.User.findOne({ where: { email: userData.email } })
            .then(function (userResponce) {
                if (userResponce !== null) {
                    throw new Error("This user already exist!")
                }

                return db.User.create(userData)
            })
            .then(function (data) {
                console.log('user', data);
               
                res.json(data.dataValues);

            })
            .catch(function (error) {
                console.log("login error", error)
                res.status(500).json({
                    message: error.message
                })
            })
    });

    // login existing user
    app.post("/api/login", function (req, res) {
        const userData = req.body;
        userData.email = userData.email.trim().toLowerCase();
        userData.password = hash(userData.password.trim());
        console.log(userData.password);

        //const token = createToken(userData)
        db.User.findOne({ where: { email: userData.email } })
            .then(function (userResponce) {
                if (userResponce === null) {
                    throw new Error("user is not found")
                }
                console.log("keep on eye", userResponce)
                // function that compares password  
                comparePassword(userResponce.dataValues.password, userData.password);
                token = jwt.sign({ email: userResponce.email }, 'grabbygig');
                res.cookie('token', token).json(userResponce);

            })
            .catch(function (error) {
                console.log("login error", error)
                res.status(500).json({
                    message: error.message
                })
            })

    });



    // Create a new example
    app.post("/api/profile", function (req, res) {
        let band;
        const { image, name, location, instrument, bio, YouTubeLinks, UserId } = req.body;
        
        if (instrument > 1) {
             band = instrument.join(', ');
        } else {
            band = instrument;
        }
        console.log(image);
        db.User.update({ image, name, location, instrument: band, bio, YouTubeLinks},{where: {id: UserId}}).then(function (dbProfile) {
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

const createHash = require('crypto').createHash


// hash password using sha256
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
