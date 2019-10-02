//import { json } from "sequelize/types";

var loginForm = document.getElementById("login-form");
console.log(loginForm);

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log('login is working')

    // set login
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    console.log(email.value, password.value);

    const data = {
        email: email.value,
        password: password.value,
    }
    const url = "/api/login"

    // ajax call to post data to the server
    $.post(url, data, function(res) {
        console.log("it's login in", res)
            // fix the route for login --> goes home page

        // window.localStorage.setItem("token", res.token);
        window.location = '/home'


    }).fail(function(error) {
        console.log(error)
        alert(error.responseJSON.message);
    })
});

//TO DO
// implement log out functionality
// token session