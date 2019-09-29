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

    // post data to the server
    $.post(url, data, function(error) {
        if (error) {
            console.error(error)
        } else {
            console.log("it's login in")
            window.location = '/home'
        }
    });

});