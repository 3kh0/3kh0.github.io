function check() {
    console.log("Checking this page... Please wait.")
    var domain = document.domain; // grab domain
    console.log("Domain: " + domain) // log domain
    if (domain == "3kh0.github.io") {
        console.log("This page is on the 3kh0.github.io domain!")
        var referrer = document.referrer; // grab referrer
        console.log("Referrer: " + referrer) // log referrer
        if (referrer != "") { 
            // this prevents (almost) any embed!
            document.write("<h1>Hello gamers! Please go <a href='https://3kh0.github.io/'>here</a> for better games.</h1><h3>Site-owners, if you are confused on why this happened, please read <a href='https://github.com/3kh0/3kh0.github.io/wiki/Note-to-people-stealing-my-games'>this</a>.</h3>");
            console.log("Sorry, this page was embeded, and that is not allowed!")
        }
    } else {
        // this will run if the script is run on a domain different to 3kh0.github.io
        document.write("<h1>Hello gamers! Please go <a href='https://3kh0.github.io/'>here</a> for better games.</h1><h3>Site-owners, if you are confused on why this happened, please read <a href='https://github.com/3kh0/3kh0.github.io/wiki/Note-to-people-stealing-my-games'>this</a>.</h3>");
        console.log("Sorry, but this code is copyrighted so you can not just yoink it! Want to have this game on your site? Read this: https://github.com/3kh0/3kh0.github.io/wiki/Note-to-people-stealing-my-games")
    }
    console.log("The check is complete! You can use check(); to run it again if you wish.")
}

// These functions can be used for debug purposes
function msg() {
    document.write("<h1>Hello gamers! Please go <a href='https://3kh0.github.io/'>here</a> for better games.</h1><h3>Site-owners, if you are confused on why this happened, please read <a href='https://github.com/3kh0/3kh0.github.io/wiki/Note-to-people-stealing-my-games'>this</a>.</h3>");
    console.log("Done! :)")
}
function getReferrer() {
    var referrer = document.referrer; // grab referrer
    console.log("Referrer: " + referrer) // log referrer
}
function getDomain() {
    var domain = document.domain; // grab domain
    console.log("Domain: " + domain) // log domain
}