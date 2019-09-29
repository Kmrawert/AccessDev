var sumbitForm = document.getElementById("submit-form");
console.log(sumbitForm);

sumbitForm.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("it's signing up")

    // get the inputs

    const preferredName = document.getElementById("preferredName");
    const email = document.getElementById("email");
    const phoneNumber = document.getElementById("phoneNumber");
    const password = document.getElementById("password");
    console.log(preferredName.value, email.value, phoneNumber.value, password.value);

    const data = {
        name: preferredName.value,
        email: email.value,
        password: password.value,
        phone: phoneNumber.value

    }
    const url = "/api/signup"

    // post data to the server
    $.post(url, data, function(error) {
        if (error) {
            console.error(error)
        } else {
            console.log("it's signing up")
            window.location = '/profile'
        }
    });

});