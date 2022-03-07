var isPPAPI = true;
var type = 'application/x-shockwave-flash';
var mimeTypes = navigator.mimeTypes;

var alreadyInit=false;

document.domain=document.domain;

if (browserName=="Firefox" || browserName=="Safari"){
	isPPAPI=false;
}

console.log("isPPAPI "+isPPAPI);

//////////////////////

function gotoExport(){
	window.location = "/export";
}

function setFlash(obj){
	swfObj=obj;
}

function getFlash() {
	return swfObj;
} 

//FB LOGIN
function authFBProc(data){
    if(alreadyInit)return;
    if (data.status == 'connected') {
    	$.post('ajax/social_login.php' ,{social_type: 'fb', USER_ID:getSID()}, procLogin,'json');
    }else{
		show_err(lang=='ru'?'Ошибка доступа!':'Access error!');
		blockLoginBtns(false);
	}
}

//Google+ INIT
function GPInit() {
    console.log('gp api init');
    $('#gp_signin_btn').addClass('active');
}

//Google+ LOGIN
function GPLogin(event) {
  gapi.auth.authorize({	client_id: GP_APPID, 
  						scope: ['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/plus.media.upload'],
						response_type: 'code',
						immediate: false}, authGPProc);
  return false;
}

function authGPProc(data) {
    if(alreadyInit)return;
	if (data['code']) {
		$.post('ajax/social_login.php' ,{social_type: 'gp', code: data['code'], USER_ID:getSID()}, procLogin,'json');
	}else{
		show_err(lang=='ru'?'Ошибка доступа!':'Access error!');
		blockLoginBtns(false);
	}
}

//TW LOGIN
function TWlogin(){
	var w = 580;
	var h = 500;
	var left = (screen.width/2)-(w/2);
  	var top = (screen.height/2)-(h/2);
	window.open('ajax/tw_login.php?uid='+getSID(), 'popup', 'width='+w+', height='+h+', top='+top+', left='+left);
}
document.authTWProc = function(){
    if(alreadyInit)return;
	$.post('ajax/social_login.php' ,{social_type: 'tw', USER_ID:getSID()}, procLogin,'json');
}

//OK LOGIN
function OKlogin(){
    var w = 580;
    var h = 500;
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    window.open('ajax/ok_login.php?uid='+getSID(), 'popup', 'width='+w+', height='+h+', top='+top+', left='+left);
}
document.authOKProc = function(){
    if(alreadyInit)return;
    $.post('ajax/social_login.php' ,{social_type: 'ok', USER_ID:getSID()}, procLogin,'json');
}

//VK LOGIN
function authVKProc(data){
    if(alreadyInit)return;
    if (data.session) {
        $.post('ajax/social_login.php' ,{social_type: 'vk', USER_ID:getSID()}, procLogin,'json');
    }else{
		console.log(data)
		show_err(lang=='ru'?'Ошибка доступа!':'Access error!');
		blockLoginBtns(false);
	}
}

//MAIL LOGIN
function authMLProc(data){
    if(alreadyInit)return;
    if (data.oid) {
        $.post('ajax/social_login.php' ,{social_type: 'ml', data: data, USER_ID:getSID()}, procLogin,'json');
    }else{
		show_err(lang=='ru'?'Ошибка доступа!':'Access error!');
		blockLoginBtns(false);
	}
}

//ULOGIN
function uLoginProc(token){
	console.log(token);
    $.post('ajax/social_login.php' ,{social_type: 'ulogin', token: token, USER_ID:getSID()}, procLogin,'json');
}

function procLogin(data){
	console.log(data);
	 if (data.status == 'success') {
		social=data.social;
		social_id=data.social_id;
		user_id=data.user_id;
		init();
	}else{
		show_err(lang=='ru'?'Ошибка доступа!':'Access error!');
		blockLoginBtns(false);
	}
}
function init(){
    alreadyInit=true
    $("#swf_place").append('<iframe id="swf" src="menu.html" frameborder=0 width=800 height=600></iframe>');
	$("#signin").hide();
	//$("iframe#swf").show().attr("src","menu.html");
}

function blockLoginBtns(block){
 $('#intro .button').each(function(){
	 if(block){
		$(this).css('opacity',0.2)
		$(this).removeClass('active');
	 }else{
         if(!$(this).hasClass('disabled')) {
             $(this).stop(true);
             $(this).removeAttr("style");
             $(this).addClass('active');
         }
	}
	})
}

function show_err(text){
    $('#error_message').html(text);
}

function shorten(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
        ret = ret.substr(0,maxLength-3) + "...";
    }
    return ret;
}
	
$(function(){
	var _gaq = [['_setAccount', 'UA-55176939-1'], ['_trackPageview']]; 

	//actions
	 $('.group_btn').click(function(){
        var link=$(this).attr('link');
        window.open(link,'_blank');
    })
	
	 $('#close_btn').click(showAll);
	 
	 $('#intro .button').on('click',function(){
		 if(!$(this).hasClass('disabled')){
			 blockLoginBtns(true);
			 $(this).css('opacity',1);
			 var activeBtn=$(this);
			 function loop(){
				activeBtn.fadeTo(500,0.5).fadeTo(500,1,function(){loop()});
			 }
			 loop();
		 }
	});
	$('#en_lng').on('click',function(){
		$.cookie('lang', 'en');
		window.location.href = "/old.php";
	});
	$('#ru_lng').on('click',function(){
		$.cookie('lang', 'ru');
		window.location.href = "/old.php";
	});

	/*
    $(document).on('click', '.ulogin-button-facebook', function(e){
        FB.login(function(response){
            if (response.status === 'connected') {
                console.log(response);
            } else {
                console.log('The person is not logged into your webpage or we are unable to tell.');
            }
        });
	});
	*/
    uLogin.setStateListener("uLogin", "ready", function(){
        console.log("uLogin: popup is closed");
        var $fb_btn=$("<div class=\"ulogin-button-facebook\" onClick=\"FB.login(authFBProc)\" data-uloginbutton=\"facebook\" role=\"button\" title=\"Facebook\" style=\"margin: 0px 10px 10px 0px; padding: 0px; outline: none; border: none; border-radius: 0px; cursor: pointer; float: left; position: relative; display: inherit; width: 32px; height: 32px; left: 0px; top: 0px; box-sizing: content-box; background: url(&quot;https://ulogin.ru/version/3.0/img/providers-32-flat.png?version=img.3.0.1&quot;) 0px -138px / 32px no-repeat;\"></div>");
        $('.ulogin-buttons-container').prepend($fb_btn);
        $('.ulogin-buttons-container').css('width','252px');
    });
});