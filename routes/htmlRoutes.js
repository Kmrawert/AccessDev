var db = require("../models");
var jwt = require('jsonwebtoken');

// middleware 
module.exports = function(app) {
    const checktoken = (req, res, next) => {
        const { token } = req.cookies;
        if (token) {
            next();
        } else {
            res.redirect('/login');
        }
    }
    app.get("/login", function(req, res) {
        // delete cookies
        res.clearCookie("token");

        res.render("login", {});
    });

    // Sign up page 
    app.get("/signup", function(req, res) {
        res.render("signup", {});
    })


    // app.use(cookieParser())
    app.get('/', checktoken, function(req, res) {
            res.redirect('/home');
        })
        // Load main content page
    app.get("/home", checktoken, function(req, res) {
        const { token } = req.cookies;
        var decoded = jwt.verify(token, 'grabbygig');
        console.log(decoded.email);
        db.User.findOne({ where: { email: decoded.email } }).then(user => {

            console.log(user);
            db.Gigs.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then(function(gigs) {
                let posts = { gigs, user }
                res.render("home", posts);
            });
        })

    });
    app.get("/talentpool", checktoken, function (req, res) {
        const { token } = req.cookies;
        let looker;
        var decoded = jwt.verify(token, 'grabbygig');
        console.log(decoded.email);
        db.User.findOne({ where: { email: decoded.email } }).then(user =>{
            looker = user;
            console.log(user);
            db.User.findAll({}).then(function (talent) {
                let data = {looker, talent}
                res.render("talentpool", data);
            });
        })

    });
    // Load Profile Creation page
    app.get("/profile", checktoken, function(req, res) {
        // console.log(req.cookies);
        const { token } = req.cookies;
        // var decoded = jwt.verify(token, 'grabbygig');
        db.User.findOne({ where: { email: "kmrawert@yahoo.com"} }).then(user =>{
            console.log(user);
            db.Talent.findOne({where: {id: user.id}}).then(result =>{
                res.render("profile", {profileData: result});
                console.log(result);
            })
        })
        // res.render("profile", {});

    });
    // Load Edit Profile Page
    app.get("/editprofile", function(req, res) {
        // console.log(req.cookies);
        res.render("editprofile", {});
    });

    app.get("/giftgig", checktoken, function(req, res) {
        res.render("giftgig", {});

    });

    // Login page

    // Load example page and pass in an example by id
    app.get("/example/:id", function(req, res) {
        db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
            res.render("example", {
                example: dbExample
            });
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });


};