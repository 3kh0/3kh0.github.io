function initializeFireBase(){
	// Your web app's Firebase configuration
	var firebaseConfig = {
	apiKey: "AIzaSyBPrAfspM9RFxuNuDtSyaOZ5YRjDBNiq5I",
	authDomain: "1v1.lol",
	databaseURL: "https://justbuild-cdb86.firebaseio.com",
	projectId: "justbuild-cdb86",
	storageBucket: "justbuild-cdb86.appspot.com",
	messagingSenderId: "93158914000",
	appId: "1:93158914000:web:e73a8b453338ab7c"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
}

function initializeFireBaseDev(){
	// Your web app's Firebase configuration
	var firebaseConfig = {
	apiKey: "AIzaSyANZ0SDhqoc62msSooQFs3SEb4XbC7gvk4",
	authDomain: "dev.1v1.lol",
	databaseURL: "https://dev1v1.firebaseio.com",
	projectId: "dev1v1",
	storageBucket: "dev1v1.appspot.com",
	messagingSenderId: "90097883404",
	appId: "1:90097883404:android:0931a7bbf3e74f2b9a5129"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
}