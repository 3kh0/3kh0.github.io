var msg = "<h1>Hello gamers! Please go <a href='https://3kh0.github.io/'>here</a> for better games.</h1><h3>Site-owners, if you are confused on why this happened, please read <a href='https://github.com/3kh0/3kh0.github.io/wiki/Note-to-people-stealing-my-games'>this</a>.</h3><h5>If you are going to report this, please say it was Error 800.</h5><p>Was this site supposed to work? <a href='https://github.com/3kh0/3kh0.github.io/issues'>Please report it</a>!</p>";

const good = ["3kh0.github.io", "google.com", "github.com", "cms.instructure.com", "3kh0.vercel.app", "3kh0.netlify.app", "3kh0-git-tms-3kh0.vercel.app"]; // this will be converted into another file when I have the time.

function check() {
    console.log("This page is being checked. This should not take long")
    var domain = document.domain;
    var adC = good.includes(domain);
    if (adC = true) {
        var referrerFull = document.referrer;
        var referrer = referrerFull.replace('http://',"").replace('https://',"").split(/[/?#]/)[0];
        var arC = good.includes(referrer);
        if (arC = false) {
            document.write(msg);
            console.error("R error");
        }
    } else {
        document.write(msg);
        console.error("D error");
    }
    console.log("The check is complete! You can use check(); to run it again if you wish.");
}

// These functions can be used for debug purposes
function writeMsg() {
    document.write(msg);
    console.log("Sucess! :)")
}
function getReferrer() {
    var referrerFull = document.referrer;
    console.log("Referrer: " + referrerFull);
    var referrer = referrerFull.replace('http://',"").replace('https://',"").split(/[/?#]/)[0];
    console.log("Referrer host: " + referrer);
}
function getDomain() {
    var domain = document.domain;
    console.log("Domain: " + domain);
}
