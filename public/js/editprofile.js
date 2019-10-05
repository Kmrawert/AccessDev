require("dotenv").config();
fsPassword = process.env.FS_SECRET_KEY;
const apikey = fsPassword;
var fileInput = document.querySelector('#fileInput');
const linkName = document.querySelector('#linkName');
const name = document.querySelector('#profilename');
const UserId = document.querySelector('#UserId');

const client = filestack.init(apikey);


let UserData = window.localStorage.getItem('UserData');
let ParseData  = JSON.parse(UserData);
console.log(ParseData);
name.value= ParseData.name;
UserId.value = ParseData.id;

editButton= document.querySelector('#editProfile')
editButton.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log('click');
   
    $.get("/api/editprofile")
    console.log(data)

    // ajax call to post data to the server
    $.post(url, data, function(res) {
        console.log("it's login in", res)
        window.location = '/home'

    }).fail(function(error) {
        console.log(error)
        alert(error.responseJSON.message);
    })
});