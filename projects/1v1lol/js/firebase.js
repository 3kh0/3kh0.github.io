window.firebaseLoaded = true;

function initializeFireBase() {
	var hostname = window.location.hostname;

	if(hostname.indexOf("dev1v1") >= 0 || hostname.indexOf("dev.1v1") >= 0 || hostname.indexOf("test1v1") >= 0 || hostname.indexOf("test.1v1") >= 0 || hostname.indexOf("localhost") >= 0) {
		initializeFireBaseDev();
	} 
	else if(hostname.indexOf("rc.1v1") >= 0){
		initializeFireBaseRC();
	}
	else{
		initializeFireBaseProd();
	}
}

function initializeFireBaseProd(){
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

function initializeFireBaseRC(){
	// Your web app's Firebase configuration
	var firebaseConfig = {
	  apiKey: "AIzaSyA1H3OsFttu-57p0f7mXxUdgJ2Y0iHZRJg",
	  authDomain: "rcfunctions1v1.firebaseapp.com",
	  projectId: "rcfunctions1v1",
	  storageBucket: "rcfunctions1v1.appspot.com",
	  messagingSenderId: "896755136685",
	  appId: "1:896755136685:web:1ccd8f30abdce578dbee24"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);	
}