var scr_data;

function hideAll() {
	$("#close_btn").show();
	$("iframe#swf").contents().find('#swf').css('visibility', 'hidden');
}
function showAll() {
	$("#close_btn").hide();
	$("iframe#pw").hide().attr("src","");
	$("iframe#swf").contents().find('#swf').css('visibility', 'visible');
	getFlash().updateData();
}
function addGold(){
	//hideAll();
	//var sid=getSID();
	//$("iframe#pw").show().attr("src","https://api.paymentwall.com/api/subscription/?key=776fa5ef447ccfc2d4d9c4ecf38b52d1&uid="+sid+"&widget=p10_2&pingback_url=http://"+location.host+"/pw-success.html");
    alert('This payment method temporarily unavailable!');
}
function addGoldItem(item_id){
	hideAll();
	var sid=getSID();
	$("iframe#pw").show().attr("src","robox_payment/"+item_id+"-"+Math.floor(Math.random()*1000000)+"-"+sid);
}

function addFriend(description,image_url){
	
	if(!description)description=page_description;
	if(!image_url)image_url='http://fgh.space/images/logo256.png';

	//FB SHARE BTN
	var fb_invite_btn_url='https://www.facebook.com/dialog/feed?'
		fb_invite_btn_url+='app_id='+FB_APPID
		fb_invite_btn_url+='&redirect_uri='+encodeURIComponent('https://'+location.host)
		fb_invite_btn_url+='&link='+encodeURIComponent('https://'+location.host)
		fb_invite_btn_url+='&name='+encodeURIComponent(page_title)
		fb_invite_btn_url+='&description='+encodeURIComponent(description)
		fb_invite_btn_url+='&picture='+encodeURIComponent(image_url)
    //Twitter SHARE BTN
    var gp_invite_btn_url='https://plus.google.com/share?'
        gp_invite_btn_url+='url='+encodeURIComponent('https://'+location.host)
        gp_invite_btn_url+='&hl='+lang
	//Twitter SHARE BTN
	var tw_invite_btn_url='https://twitter.com/share?'
		tw_invite_btn_url+='text='+encodeURIComponent(description)
        tw_invite_btn_url+='&url='+encodeURIComponent('https://'+location.host)
        tw_invite_btn_url+='&counturl='+encodeURIComponent('https://'+location.host)
    //VK SHARE BTN
    var vk_invite_btn_url
        vk_invite_btn_url='http://vk.com/share.php?'
        vk_invite_btn_url+='url='+encodeURIComponent('https://'+location.host)
        vk_invite_btn_url+='&title='+encodeURIComponent(page_title)
        vk_invite_btn_url+='&description='+encodeURIComponent(description)
        vk_invite_btn_url+='&image='+encodeURIComponent(image_url)
	//Odnoklasniki SHARE BTN
	var ok_invite_btn_url='http://connect.ok.ru/dk?st.cmd=WidgetSharePreview'
		ok_invite_btn_url+='&st.shareUrl='+encodeURIComponent('https://'+location.host)
    //MailRu SHARE BTN
    var ml_invite_btn_url='http://connect.mail.ru/share?'
        ml_invite_btn_url+='url='+encodeURIComponent('https://'+location.host)
        ml_invite_btn_url+='&title='+encodeURIComponent(page_title)
        ml_invite_btn_url+='&description='+encodeURIComponent(description)
        ml_invite_btn_url+='&imageurl='+encodeURIComponent(image_url)
	
	var invite_btn_url;
	
	if(social=='fb'){
		invite_btn_url=fb_invite_btn_url;
	}else if(social=='gp'){
		invite_btn_url=gp_invite_btn_url;
        //$('#invite_gp').click();
	}else if(social=='tw'){
		invite_btn_url=tw_invite_btn_url;
	}else if(social=='vk'){
		invite_btn_url=vk_invite_btn_url;
	}else if(social=='ok'){
        invite_btn_url=ok_invite_btn_url;
    }else if(social=='ml'){
        invite_btn_url=ml_invite_btn_url;
    }
	if(invite_btn_url)
	    window.open(invite_btn_url, '_blank');
}

function uploadImage(data){
	scr_data=data
	if(social=='vk'){
		chkAlbumsVK();
	}else{
		getFlash().flashCrtImage('');
	}
	
	var inst=scr_data['inst']
	var lvl=scr_data['lvl']
	var song_title=scr_data['song_title']
	var song_artist=scr_data['song_artist']
	var score=scr_data['score']
	var note_streak=scr_data['note_streak']
	var note_per=scr_data['note_per']

    var caption='';
	caption=song_artist+' - '+song_title+' ('+note_per+') \n';
	caption+=inst+' / '+lvl;
	//caption+=+score+' / '+note_streak+'\n';
    if(social=='fb' || social=='vk' || social=='ml') {
        addFriend(caption, 'http://' + location.host + '/last_screen/' + user_id + '.jpg?r=' + Math.random())
    }else if(social=='gp'){
        window.open('ajax/gp_screen.php?caption='+encodeURIComponent(caption)+'&img='+encodeURIComponent('last_screen/' + user_id + '.jpg'), '_blank');
    }else if(social=='tw'){
        caption=shorten(song_artist+' - '+song_title,85)+' ('+note_per+')\n';
        caption+=inst+' / '+lvl;
        caption+='\n#fghgame ' + location.host;
        window.open('ajax/tw_screen.php?caption='+encodeURIComponent(caption)+'&img='+encodeURIComponent('last_screen/' + user_id + '.jpg'), '_blank');
    }else if(social=='ok'){
        alert(not_available)
    }
}
function chkAlbumsVK(){
	var albumID=0
	//chk curent album list
	VK.Api.call('photos.getAlbums',{owner_id: social_id},function(data){
		if(data.response){
			for(i=0;i<data.response.length;i++){
				if(data.response[i].title=="Flash Guitar Hero"){
					albumID=data.response[i].aid
					crtImageVK(albumID)
					return;
					}
			}
			if(albumID==0){
				//create new FGH album
				VK.Api.call('photos.createAlbum',{title:'Flash Guitar Hero',description:'http://fgh.space'},function(data){
					if(data.response){
						albumID=data.response.aid
						crtImageVK(albumID)
					}
				})
			}
		}
	})
}
function crtImageVK(albumID){
	//upload image to VK
	VK.Api.call('photos.getUploadServer',{aid:albumID},function(data){
		if(data.response){
			var upload_url=data.response.upload_url
			getFlash().flashCrtImage(upload_url);
		}
	})
	}
		
function saveImage(data){
	if(social=='vk'){
		VK.Api.call('photos.save',data,function(data){
			if(data.response){
				addCaptionVK(data.response[0].pid,data.response[0].owner_id)
			}
		})
	}
}
function addCaptionVK(pid,owner_id){
	var inst=scr_data['inst']
	var lvl=scr_data['lvl']
	var song_title=scr_data['song_title']
	var song_artist=scr_data['song_artist']
	var score=scr_data['score']
	var note_streak=scr_data['note_streak']
	var note_per=scr_data['note_per']

	var caption='';
	caption+=song_artist+' - '+song_title+' ('+note_per+')\n';
	caption+=inst+' / '+lvl+'\n';
	//caption+=+score+' / '+note_streak+'\n';
	caption+='http://fgh.space';
	VK.Api.call('photos.edit',{uid:owner_id,pid:pid,caption:caption},function(data){})
}