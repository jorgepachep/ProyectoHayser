var CookieHandler = {
	SetCookie: function(cookieName,cookieValue,cookieExpirationDate){
		var cookieDetails = {
			CookieValue:cookieValue,
			cookieExpirationDate:cookieExpirationDate
		};
		var jsonStringObject = JSON.stringify(cookieDetails);

		localStorage.setItem(cookieName,jsonStringObject);
	},
	GetCookie: function(cookieName){
		usersRegisteredString = localStorage.getItem(cookieName);
		if(usersRegisteredString == null){
			return;
		}
		usersRegistered=JSON.parse(usersRegisteredString);
		if(new Date(usersRegistered.cookieExpirationDate) > new Date()){
			return usersRegistered.CookieValue;
		}
	},
	DeleteCookie:function(cookieName){
		localStorage.removeItem(cookieName);
	}
}