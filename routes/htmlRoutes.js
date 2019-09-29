var db = require("../models");
var cookieParser = require('cookie-parser');

module.exports = function(app) {
    // app.use(cookieParser())
    app.get('/', function(req, res) {
            res.redirect('/home');
        })
        // Load main content page
    app.get("/home", function(req, res) {
        db.Gigs.findAll({}).then(function(gigs) {
            let posts = {
                gigs: gigs
            }
            res.render("home", posts);
            console.log(posts);
        });
    });
    // Load Profile Creation page
    app.get("/profile", function(req, res) {
        // console.log(req.cookies);
        res.render("profile", {});

    });
    app.get("/giftgig", function(req, res) {
        res.render("giftgig", {});

    });

    // Login page
    app.get("/login", function(req, res) {
        res.render("login", {});
    });

    // Sign up page 
    app.get("/signup", function(req, res) {
        res.render("signup", {});
    })

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