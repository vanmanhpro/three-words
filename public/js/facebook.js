function statusChangeCallback(response) {
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI();
    turnOffLoginBox();
  } else {
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function () {
  FB.init({
    appId: '709969695863741',
    cookie: true,  // enable cookies to allow the server to access 
    // the session
    xfbml: true,  // parse social plugins on this page
    version: 'v2.10' // use graph api version 2.10
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
};

// Load the SDK asynchronously
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

let currentUser;
let smallUrl;
function testAPI() {
  FB.api('/me', function (userInfo) {
    // console.log(userInfo);
    currentUser = userInfo;
    // console.log(currentUser);
    smallUrl = currentUser.smallUrl;
    document.getElementById("ava-tiny").src = `https://graph.facebook.com/${currentUser.id}/picture?width=15`;
    document.getElementById("headbar-name-user").textContent += `Hi, ${currentUser.name}`;
    document.getElementById("ava-tiny").style.display = "";
    document.getElementById("headbar-name-user").display = "";
    $.ajax({ type: "post", url: "/user/createAccount", data: userInfo })
      .done((data) => {
        currentUser = data;
      })
  });
}

function logoutFB() {
  FB.logout(function(response) {
    // Person is now logged out
    // console.log("logout");
    turnOffLogOutBox();
  });
}

function turnOffLoginBox() {
  document.getElementById("open-sign-in-button").style.display = "none";
  document.getElementById("sign-out-button").style.display = "flex";
  document.getElementById("login-box").style.display = "none";
}

function turnOffLogOutBox(){
  document.getElementById("sign-out-button").style.display = "none";
  document.getElementById("open-sign-in-button").style.display = "flex";
  document.getElementById("login-box").style.display = ""; 
  document.getElementById("ava-tiny").style.display = "none";
  document.getElementById("headbar-name-user").style.display = "none";
}
