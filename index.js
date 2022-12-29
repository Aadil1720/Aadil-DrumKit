
var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfDrumButtons; i++) {

  document.querySelectorAll(".drum")[i].addEventListener("click", function() {

    var buttonInnerHTML = this.innerHTML;

    makeSound(buttonInnerHTML);

    buttonAnimation(buttonInnerHTML);

  });

}

document.addEventListener("keypress", function(event) {

  makeSound(event.key);

  buttonAnimation(event.key);

});


function makeSound(key) {

  switch (key) {
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio('sounds/tom-3.mp3');
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio('sounds/tom-4.mp3');
      tom4.play();
      break;

    case "j":
      var snare = new Audio('sounds/snare.mp3');
      snare.play();
      break;

    case "k":
      var crash = new Audio('sounds/crash.mp3');
      crash.play();
      break;

    case "l":
      var kick = new Audio('sounds/kick-bass.mp3');
      kick.play();
      break;


    default: console.log(key);

  }
}


function buttonAnimation(currentKey) {

  var activeButton = document.querySelector("." + currentKey);

  activeButton.classList.add("pressed");

  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100); // 100=time in milliseconds

}
//Back End developing...
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const { get } = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})
app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }

        }]
    };
    const jsonData = JSON.stringify(data);
    //const url = "https://us14.api.mailchimp.com/3.0/lists/2fcac78278"

    const url = "https://us14.api.mailchimp.com/3.0/lists/2fcac78278"
    const options = {
        method: "POST",
        auth: "Y Star:f28ee951aeab66b0725898c843bc7959-us14"
    }
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/index.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    })
    request.write(jsonData);
    request.end();
});
app.post("/failure", function (req, res) {
    res.redirect("/")
})
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000.")
})