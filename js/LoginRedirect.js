var loginUserCookie = "loggedUser";
var logginUrl = "login.html";
var usersRegistered = [];

var cookie = CookieHandler.GetCookie(loginUserCookie);
var LogginHandler = {};

var actualLocation = window.location.toString();

if(cookie == null && !actualLocation.includes("login.html")){
	window.location=logginUrl;
}
else if(cookie != null && actualLocation.includes("login.html"))
{
	window.location="index.html";
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

$(document).ready(function(){
	LogginHandler.RegisterUser = function(username,password,repassword){
		if(password == repassword){
			var user = {
				UserName:username,
				PassWord:password
			}
			;
			if(usersRegistered.length == 0){
				usersRegisteredString = localStorage.getItem("usersLogged");
				if(usersRegisteredString != null && usersRegisteredString !=""){
					usersRegistered=JSON.parse(usersRegisteredString);
				}
			}
			usersRegistered.push(user);
			var jsonStirngObject = JSON.stringify(usersRegistered);
			localStorage.setItem("usersLogged",jsonStirngObject);
			LogginHandler.LogginUser(username,password);
		}
	};

	LogginHandler.LogginUser=function(username,password){
		;
		usersRegisteredString = localStorage.getItem("usersLogged");
		if(usersRegisteredString == null){
			return;
		}
		usersRegistered=JSON.parse(usersRegisteredString);

		var actualUser = usersRegistered.filter(function(user){
			if(username == user.UserName && password == user.PassWord){
				return user;
			}
		});
		if(actualUser == null || actualUser.length == 0){
			return;
		}

		var date = new Date();
		var dateString = date.addDays(1);
		CookieHandler.SetCookie(loginUserCookie,"true",dateString);
		window.location="index.html";
	}

	LogginHandler.LogoutUser=function(username){
		CookieHandler.DeleteCookie(loginUserCookie);
		window.location=logginUrl;
	}
});