let openSignInDim = document.getElementById('open-sign-in-dim');
let openSignInButton = document.getElementById('open-sign-in-button');
let signInBox = document.getElementById('login-box');
let createAccountBox = document.getElementById('create-account-box');
let gotoCreateButton = document.getElementById('goto-create-button');
let gotoLogInButton = document.getElementById('goto-login-button');
let loginEscapeButtons = document.getElementsByClassName('login-escape-button');

function openSignInByClick(){
	if (openSignInButton) openSignInButton.addEventListener('click', function(){
		signInBox.style.display = "flex";
		openSignInDim.style.display = "block";
		console.log("hihi"); 
		}, false);
}

function switchToCreateAccountByClick(){
	if (gotoCreateButton) gotoCreateButton.addEventListener('click', function(){
		signInBox.style.display = "none";
		createAccountBox.style.display = "flex";
		}, false);
}

function switchToLogInByClick(){
	if (gotoLogInButton) gotoLogInButton.addEventListener('click', function(){
		createAccountBox.style.display = "none";
		signInBox.style.display = "flex";
		}, false);
}

function turnOffLoginAndCreateAccountBoxByClick(){
	for(let i = 0, n = loginEscapeButtons.length; i < n; i++){
		loginEscapeButtons[i].addEventListener('click', function(){
			signInBox.style.display = "none";
			createAccountBox.style.display = "none";
			openSignInDim.style.display = "none";
		})
	}
}
openSignInByClick();
switchToCreateAccountByClick();
switchToLogInByClick();
turnOffLoginAndCreateAccountBoxByClick();
