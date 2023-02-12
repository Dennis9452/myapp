/*var debug;
$(document).ready(function(){
	if(SystemInfo.serverEnv == "staging" || SystemInfo.serverEnv == "dev") {
		debug = Trace.getInstance();
		debug.init();
		debug.isActivity = true;
		debug.isVisible = true;
	}
});

window.onerror = function(errorMsg, url, lineNumber, colNo, error){
	if(SystemInfo.serverEnv == "staging") {
		if(typeof(debug) !== "undefined"){
			debug.log("---- Error ----");
			debug.log(errorMsg);
			debug.log(url);
			debug.log(lineNumber);
			//debug.log((error.stack.toString));
			debug.log("---------------");
		}
	}
};
*/

var urlParse = UrlParse();
var urlQS = urlParse.getQuerys();
var contentType = getContentTypeByUrl();
var _backpage = PageManager.getVodPath() + "?type=" + contentType;
var dialogService;
var autoPlay = false;
var focusEposide = "";

var Tracking = window.TRACKING();

var TraTracking = window.TRACKING(TrackingEventCategory, null, {content_type : contentType}).setTransitional();


(function(){
	var requestGetDetail = $.Deferred();
	requestGetDetail.promise();
	LiTVAPI.Vod.getDetail(urlQS.id, function(isSuccess, response, options){
//		console.log(response.programInfo.liads);
		if(isSuccess){
			var temp = {"block_ad": {"adobj_sampling": [],"element_id": [],"element_sampling": 1,"filling": -1,"min_interval": 0,"partobj_ratio": 10,"req_timeshift": 0,"rewind": 0},"comm_ad": {"adobj_sampling": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],"element_id": [["EmptyMC"],["EmptyMC"],["EmptyMC"],["EmptyMC"],["EmptyMC"],["EmptyMC"],["EmptyMC"],["EmptyMC"],["EmptyMC"],["EmptyMC"]],"element_sampling": 0,"filling": -1,"min_interval": 0,"partobj_ratio": 10,"req_timeshift": 0,"rewind": 0},"content_pool": {"adobj_sampling": [],"element_id": [],"element_sampling": 1,"filling": -1,"min_interval": 0,"partobj_ratio": 10,"req_timeshift": 0,"rewind": 0},"created_at": "2020-05-12 09:52:30","elements": {"EmptyMC": {"click_through": "","data": "","duration": 0,"exclusive": false,"id": "EmptyMC","media_type": "video","position": "MC","purchase_url": "","schema": "empty","space_id": "EmptyMC","title": "empty","unit_id": "13000008","users": "All"},"ams00059455": {"click_through": "","data": "android_20161021_titlesponsor_movie_litv.png","duration": 0,"exclusive": false,"id": "ams00059455","media_type": "image","position": "TR","purchase_url": "","schema": "litv","space_id": "ams00059455","title": "LiTV_logo","unit_id": "13000001","users": "All"},"ams00059462": {"click_through": "","data": "vod39428-000000M001_1500K","duration": 4,"exclusive": false,"id": "ams00059462","media_type": "video","position": "MC","purchase_url": "","schema": "litv","space_id": "ams00059462","title": "jingle_cns_drama","unit_id": "13000021","users": "All"},"ams00059463": {"click_through": "","data": "vod39488-000000M001_1500K","duration": 4,"exclusive": false,"id": "ams00059463","media_type": "video","position": "MC","purchase_url": "","schema": "litv","space_id": "ams00059463","title": "jingle_cns_drama2","unit_id": "13000021","users": "All"},"ams00006953SS01001": {"id": "ams00006953SS01001","unit_id": "1000002|1|1|1","users": "Free","media_type": "video","schema": "ima_dfp","space_id": "ams00006953SS01001","data": "https://pubads.g.doubleclick.net/gampad/ads?iu=/76486173/litv_webtv/litv_webtv_vodch_1&description_url=https://www.litv.tv/channel/introduction.do&tfcd=0&npa=0&sz=640x360&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=[timestamp]","duration": 30,"position": "MC","click_through": "","purchase_url": "https://www.litv.tv/purchase/subscribePackage.do?id=ALL&package_id=W00005&payment=CREDIT","title": "web_drama_pr|fb_web_drama_pr_mt","exclusive": false},"ams00006953SS01002": {"id": "ams00006953SS01002","unit_id": "1000002|1|2|1","users": "Free","media_type": "video","schema": "ima_dfp","space_id": "ams00006953SS01002","data": "https://ib.adnxs.com/ptv?id=18781401&vwidth=[playerwidth]&vheight=[playerheight]&appid=com.litv.webtv&aopenudid={request.deviceId}&ua=Dalvik%2F2.1.0%20%28Linux%3B%20U%3B%20Android%207.0%3B%20BRAVIA%204K%20GB%20Build%2FNRD91N.S139%29","duration": 30,"position": "MC","click_through": "","purchase_url": "https://www.litv.tv/purchase/subscribePackage.do?id=ALL&package_id=W00005&payment=CREDIT","title": "web_drama_pr|fb_web_drama_pr_mt","exclusive": false},"ams00006953SS01003": {"id": "ams00006953SS01003","unit_id": "1000004|1|1|1","users": "Free","media_type": "video","schema": "ima_dfp","space_id": "ams00006953SS01003","data": "https://pubads.g.doubleclick.net/gampad/ads?iu=/76486173/litv_webtv/litv_webtv_vodch_1&description_url=https://www.litv.tv/channel/introduction.do&tfcd=0&npa=0&sz=640x360&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=[timestamp]","duration": 30,"position": "MC","click_through": "","purchase_url": "https://www.litv.tv/purchase/subscribePackage.do?id=ALL&package_id=W00005&payment=CREDIT","title": "web_drama_pr|fb_web_drama_pr_mt","exclusive": false},"ams00006953SS01004": {"id": "ams00006953SS01004","unit_id": "1000004|1|2|1","users": "Free","media_type": "video","schema": "ima_dfp","space_id": "ams00006953SS01003","data": "https://pubads.g.doubleclick.net/gampad/ads?iu=/76486173/litv_webtv/litv_webtv_vodch_1&description_url=https://www.litv.tv/channel/introduction.do&tfcd=0&npa=0&sz=640x360&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=[timestamp]","duration": 30,"position": "MC","click_through": "","purchase_url": "https://www.litv.tv/purchase/subscribePackage.do?id=ALL&package_id=W00005&payment=CREDIT","title": "web_drama_pr|fb_web_drama_pr_mt","exclusive": false}},"end_ad": {"adobj_sampling": [],"element_id": [],"element_sampling": 1,"filling": -1,"min_interval": 0,"partobj_ratio": 10,"req_timeshift": 0,"rewind": 0},"environment": "production","exit_ad": {"adobj_sampling": [],"element_id": [],"element_sampling": 1,"filling": -1,"min_interval": 0,"partobj_ratio": 10,"req_timeshift": 0,"rewind": 0},"house_ad": {"adobj_sampling": [],"element_id": [],"element_sampling": 0,"filling": -1,"min_interval": 0,"partobj_ratio": 6,"req_timeshift": 0,"rewind": 0},"jingle": {"adobj_sampling": [0, 0],"element_id": [["ams00059462"],["ams00059463"]],"element_sampling": 1,"filling": -1,"min_interval": 0,"partobj_ratio": 10,"req_timeshift": 0,"rewind": 0},"logo_bl": {"adobj_sampling": [],"element_id": [],"element_sampling": 1,"filling": -1,"min_interval": 0,"partobj_ratio": 10,"req_timeshift": 0,"rewind": 0},"logo_br": {"adobj_sampling": [],"element_id": [],"element_sampling": 1,"filling": -1,"min_interval": 0,"partobj_ratio": 10,"req_timeshift": 0,"rewind": 0},"logo_tl": {"adobj_sampling": [],"element_id": [],"element_sampling": 1,"filling": -1,"min_interval": 0,"partobj_ratio": 10,"req_timeshift": 0,"rewind": 0},"logo_tr": {"adobj_sampling": [0],"element_id": [["ams00059455"]],"element_sampling": 1,"filling": -1,"min_interval": 0,"partobj_ratio": 10,"req_timeshift": 0,"rewind": 0},"midrolls": {"adobj_sampling": [["ams00006953SS01003", "ams00006953SS01004"]],"element_id": [0],"element_sampling": 0,"filling": -1,"min_interval": 480,"partobj_ratio": 10,"req_timeshift": -4,"rewind": -8},"pause_ad": {"adobj_sampling": [],"element_id": [],"element_sampling": 1,"filling": -1,"min_interval": 0,"partobj_ratio": 10,"req_timeshift": 0,"rewind": 0},"pin_ad": {"adobj_sampling": [],"element_id": [],"element_sampling": 1,"filling": -1,"min_interval": 0,"partobj_ratio": 10,"req_timeshift": 0,"rewind": 0},"postrolls": {"adobj_sampling": [],"element_id": [],"element_sampling": 0,"filling": -1,"min_interval": 0,"partobj_ratio": 10,"req_timeshift": -4,"rewind": -8},"prerolls": {"adobj_sampling": [["ams00006953SS01001", "ams00006953SS01002"]],"element_id": [0],"element_sampling": 0,"filling": -1,"min_interval": 0,"partobj_ratio": 10,"req_timeshift": -4,"rewind": -8},"version": "3.1.0"}
			var data = response;
			response.programInfo.liads = {
					"block_ad": {
						"adobj_sampling": [],
						"element_id": [],
						"element_sampling": 1,
						"filling": -1,
						"min_interval": 0,
						"partobj_ratio": 10,
						"req_timeshift": 0,
						"rewind": 0
					},
					"comm_ad": {
						"adobj_sampling": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						"element_id": [
							["EmptyMC"],
							["EmptyMC"],
							["EmptyMC"],
							["EmptyMC"],
							["EmptyMC"],
							["EmptyMC"],
							["EmptyMC"],
							["EmptyMC"],
							["EmptyMC"],
							["EmptyMC"]
						],
						"element_sampling": 0,
						"filling": -1,
						"min_interval": 0,
						"partobj_ratio": 10,
						"req_timeshift": 0,
						"rewind": 0
					},
					"content_pool": {
						"adobj_sampling": [],
						"element_id": [],
						"element_sampling": 1,
						"filling": -1,
						"min_interval": 0,
						"partobj_ratio": 10,
						"req_timeshift": 0,
						"rewind": 0
					},
					"created_at": "2020-05-12 09:52:30",
					"elements": {
						"EmptyMC": {
							"click_through": "",
							"data": "",
							"duration": 0,
							"exclusive": false,
							"id": "EmptyMC",
							"media_type": "video",
							"position": "MC",
							"purchase_url": "",
							"schema": "empty",
							"space_id": "EmptyMC",
							"title": "empty",
							"unit_id": "13000008",
							"users": "All"
						},
						"ams00090060SS01391":{
							"click_through": "",
							"data": "https://ads.adaptv.advertising.com/a/h/vQ7AmeuYApy4s2u8ItCPIpNHwuZLUIXZjW7KIHNLMxc=?cb=[CACHE_BREAKER]&app_bundle=com.js.litv.home&app_storeurl=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.js.litv.home&appName=com.js.litv.home&a.ua=[useragent]&deviceid=[puid]&lmt=0&eov=eov",
							"duration": 30,
							"exclusive": false,
							"id": "ams00090060SS01391",
							"media_type": "video",
							"position": "MC",
							"purchase_url": "",
							"schema": "ima_aol",
							"space_id": "ams00090060SS01391",
							"title": "webtv_vodch_mr_slot2_預設群組|aol_ctv_webtv_vodch_2",
							"unit_id": "5000004|2|1|3",
							"users": "All"
						},
						"ams00059455": {
							"click_through": "",
							"data": "android_20161021_titlesponsor_movie_litv.png",
							"duration": 0,
							"exclusive": false,
							"id": "ams00059455",
							"media_type": "image",
							"position": "TR",
							"purchase_url": "",
							"schema": "litv",
							"space_id": "ams00059455",
							"title": "LiTV_logo",
							"unit_id": "13000001",
							"users": "All"
						},
						"ams00059462": {
							"click_through": "",
							"data": "vod39428-000000M001_1500K",
							"duration": 4,
							"exclusive": false,
							"id": "ams00059462",
							"media_type": "video",
							"position": "MC",
							"purchase_url": "",
							"schema": "litv",
							"space_id": "ams00059462",
							"title": "jingle_cns_drama",
							"unit_id": "13000021",
							"users": "All"
						},
						"ams00059463": {
							"click_through": "",
							"data": "vod39488-000000M001_1500K",
							"duration": 4,
							"exclusive": false,
							"id": "ams00059463",
							"media_type": "video",
							"position": "MC",
							"purchase_url": "",
							"schema": "litv",
							"space_id": "ams00059463",
							"title": "jingle_cns_drama2",
							"unit_id": "13000021",
							"users": "All"
						},
						"ams00006953SS01001": {
							"id": "ams00006953SS01001",
							"unit_id": "1000002|1|1|1",
							"users": "Free",
							"media_type": "video",
							"schema": "ima_dfp",
							"space_id": "ams00006953SS01001",
							"data": "https://pubads.g.doubleclick.net/gampad/ads?iu=%2F76486173%2Flitv_webtv%2Flitv_webtv_vodch_1&description_url=https%3A%2F%2Fwww.litv.tv%2Fchannel%2Fintroduction.do&tfcd=0&npa=0&sz=640x360&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=[timestamp]",
							"duration": 30,
							"position": "MC",
							"click_through": "",
							"purchase_url": "https://www.litv.tv/purchase/subscribePackage.do?id=ALL&package_id=W00005&payment=CREDIT",
							"title": "web_drama_pr|fb_web_drama_pr_mt",
							"exclusive": false
						},
						"ams00006953SS01002": {
							"id": "ams00006953SS01002",
							"unit_id": "1000002|1|2|1",
							"users": "Free",
							"media_type": "video",
							"schema": "ima_dfp",
							"space_id": "ams00006953SS01002",
							"data": 
								// "https://ads.adaptv.advertising.com/a/h/vQ7AmeuYApx+SyOOeNhaHNoSuG7VkpE0?cb=[CACHE_BREAKER&app_bundle=com.litv.webtv&appName=com.litv.webtv&a.ip=[IPADDRESS]&a.ua=Mozilla%2F5.0%28Opentv5%3B%20Linux%20mips%29%20AppleWebKit%2F538.15%28KHTML%2C%20like%20Gecko%29Version%2F8.0%20Safari%2F538.15%20OTV%20WebKit%2F1.1&dvc_sid=[DVC_SID]&deviceid=[DEVICEID]&b.content_iab=[IAB_CONTENT_CATEGORIES]&lmt=[LMT]&lat=[LATITUDE]&lon=[LONGITUDE]&eov=eov",
								"https://ib.adnxs.com/ptv?id=18781401&vwidth=[playerwidth]&vheight=[playerheight]&appid=com.litv.webtv&aopenudid={request.deviceId}&ua=Dalvik%2F2.1.0%20%28Linux%3B%20U%3B%20Android%207.0%3B%20BRAVIA%204K%20GB%20Build%2FNRD91N.S139%29",
							"duration": 30,
							"position": "MC",
							"click_through": "",
							"purchase_url": "https://www.litv.tv/purchase/subscribePackage.do?id=ALL&package_id=W00005&payment=CREDIT",
							"title": "web_drama_pr|fb_web_drama_pr_mt",
							"exclusive": false
						},
						"ams00006953SS01003": {
							"id": "ams00006953SS01003",
							"unit_id": "1000004|1|1|1",
							"users": "Free",
							"media_type": "video",
							"schema": "ima_dfp",
							"space_id": "ams00006953SS01003",
							"data": 
								"https://ads.adaptv.advertising.com/a/h/vQ7AmeuYApx+SyOOeNhaHNoSuG7VkpE0?cb=[CACHE_BREAKER]&app_bundle=com.litv.webtv&appName=com.litv.webtv&a.ip=[IPADDRESS]&a.ua=Mozilla%2F5.0%28Opentv5%3B%20Linux%20mips%29%20AppleWebKit%2F538.15%28KHTML%2C%20like%20Gecko%29Version%2F8.0%20Safari%2F538.15%20OTV%20WebKit%2F1.1&dvc_sid=[DVC_SID]&deviceid=[DEVICEID]&b.content_iab=[IAB_CONTENT_CATEGORIES]&lmt=[LMT]&lat=[LATITUDE]&lon=[LONGITUDE]&eov=eov",
//								"https://pubads.g.doubleclick.net/gampad/ads?iu=/76486173/litv_webtv/litv_webtv_vodch_1&description_url=https://www.litv.tv/channel/introduction.do&tfcd=0&npa=0&sz=640x360&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=[timestamp]",
							"duration": 30,
							"position": "MC",
							"click_through": "",
							"purchase_url": "https://www.litv.tv/purchase/subscribePackage.do?id=ALL&package_id=W00005&payment=CREDIT",
							"title": "web_drama_pr|fb_web_drama_pr_mt",
							"exclusive": false
						},
						"ams00006953SS01004": {
							"id": "ams00006953SS01004",
							"unit_id": "1000004|1|2|1",
							"users": "Free",
							"media_type": "video",
							"schema": "ima_dfp",
							"space_id": "ams00006953SS01003",
							"data": "https://pubads.g.doubleclick.net/gampad/ads?iu=/76486173/litv_webtv/litv_webtv_vodch_1&description_url=https://www.litv.tv/channel/introduction.do&tfcd=0&npa=0&sz=640x360&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=[timestamp]",
							"duration": 30,
							"position": "MC",
							"click_through": "",
							"purchase_url": "https://www.litv.tv/purchase/subscribePackage.do?id=ALL&package_id=W00005&payment=CREDIT",
							"title": "web_drama_pr|fb_web_drama_pr_mt",
							"exclusive": false
						}
					},
					"end_ad": {
						"adobj_sampling": [],
						"element_id": [],
						"element_sampling": 1,
						"filling": -1,
						"min_interval": 0,
						"partobj_ratio": 10,
						"req_timeshift": 0,
						"rewind": 0
					},
					"environment": "production",
					"exit_ad": {
						"adobj_sampling": [],
						"element_id": [],
						"element_sampling": 1,
						"filling": -1,
						"min_interval": 0,
						"partobj_ratio": 10,
						"req_timeshift": 0,
						"rewind": 0
					},
					"house_ad": {
						"adobj_sampling": [],
						"element_id": [],
						"element_sampling": 0,
						"filling": -1,
						"min_interval": 0,
						"partobj_ratio": 6,
						"req_timeshift": 0,
						"rewind": 0
					},
					"jingle": {
						"adobj_sampling": [0, 0],
						"element_id": [
							["ams00059462"],
							["ams00059463"]
						],
						"element_sampling": 1,
						"filling": -1,
						"min_interval": 0,
						"partobj_ratio": 10,
						"req_timeshift": 0,
						"rewind": 0
					},
					"logo_bl": {
						"adobj_sampling": [],
						"element_id": [],
						"element_sampling": 1,
						"filling": -1,
						"min_interval": 0,
						"partobj_ratio": 10,
						"req_timeshift": 0,
						"rewind": 0
					},
					"logo_br": {
						"adobj_sampling": [],
						"element_id": [],
						"element_sampling": 1,
						"filling": -1,
						"min_interval": 0,
						"partobj_ratio": 10,
						"req_timeshift": 0,
						"rewind": 0
					},
					"logo_tl": {
						"adobj_sampling": [],
						"element_id": [],
						"element_sampling": 1,
						"filling": -1,
						"min_interval": 0,
						"partobj_ratio": 10,
						"req_timeshift": 0,
						"rewind": 0
					},
					"logo_tr": {
						"adobj_sampling": [0],
						"element_id": [
							["ams00059455"]
						],
						"element_sampling": 1,
						"filling": -1,
						"min_interval": 0,
						"partobj_ratio": 10,
						"req_timeshift": 0,
						"rewind": 0
					},
					"midrolls": {
						"adobj_sampling": [0],
						"element_id": [
							["ams00090060SS01391"]
						],
						"element_sampling": 0,
						"filling": -1,
						"min_interval": 480,
						"partobj_ratio": 10,
						"req_timeshift": -4,
						"rewind": -8
					},
					"pause_ad": {
						"adobj_sampling": [],
						"element_id": [],
						"element_sampling": 1,
						"filling": -1,
						"min_interval": 0,
						"partobj_ratio": 10,
						"req_timeshift": 0,
						"rewind": 0
					},
					"pin_ad": {
						"adobj_sampling": [],
						"element_id": [],
						"element_sampling": 1,
						"filling": -1,
						"min_interval": 0,
						"partobj_ratio": 10,
						"req_timeshift": 0,
						"rewind": 0
					},
					"postrolls": {
						"adobj_sampling": [],
						"element_id": [],
						"element_sampling": 0,
						"filling": -1,
						"min_interval": 0,
						"partobj_ratio": 10,
						"req_timeshift": -4,
						"rewind": -8
					},
					"prerolls": {
						"adobj_sampling": [0,0],
						"element_id": [
							["ams00090060SS01391"]
							// ["ams00006953SS01004"]
						],
						"element_sampling": 0,
						"filling": -1,
						"min_interval": 0,
						"partobj_ratio": 10,
						"req_timeshift": -4,
						"rewind": -8
					},
					"version": "3.1.0"
				}
			console.log(response.programInfo.liads);
			requestGetDetail.resolve(response);
		}else{
			//Error handle
			$(document).ready(function(){
				if(!dialogService) dialogService = new DialogService();
				dialogService.alert("應用程式發生錯誤", "可能是網路或伺服器問題，請檢查網路連線，如仍有疑慮請電洽客服：(02)7707-0708", responseError2Message(response), "確認", function(){
					backToVOD();
				}).setBtnActive(0);
                TraTracking.event(null, TrackingEventAction.ERROR, "DATA_LOST|0x9061|get detail fail");
                TraTracking.event(null, TrackingEventAction.DIALOG, "ERROR");
			});
		}
	});
	
	$(document).ready(function(){
		$clamp(document.getElementById("viSecondaryMark"), {clamp: 2});
		//Preparation
		document.addEventListener("keydown", backOnNoReady);
		//Load and Build
		$.when(requestGetDetail).done(function(detail){
			document.removeEventListener("keydown", backOnNoReady);
			pageInit(detail);
		});
        publishPageReady();
	});
})();

seriesItem.prototype = new GeneralListItemBase();
function seriesItem(data){
	var el = document.createElement("a");
	el.innerText = data.name;
	this.name = data.name;
	this.videoType = data.videoType;
	this.contentId = data.contentId;
	
	this.element = el;
}

function pageInit(detail){
	var programInfo = detail.programInfo;
	var extraMenu = detail.extraMenu;
	var relatedProgram = detail.relatedProgram;
	var isSeries = detail.isSeries;
	var seriesTree = detail.seriesTree;
	var episodeSelector = null;
	var episodeBrowseHost = null;
	var waitForPlay = false;
	var cdnInfo = new CdnInfo("vodCdnInfo");

	if (window.referrer.indexOf("player") === -1 && window.referrer.indexOf("purchase") === -1){
		var eventLabel = programInfo.title + "|" +  programInfo.countries + "|" + urlQS.brc;
		Tracking.event(programInfo.contentType, "click", eventLabel);
	}
	
	//---------- Declare ----------//
	var loading = new Loading();
	
	if(!dialogService) dialogService = new DialogService();
	
	var setLoginStatus = function(success, notAjax){
		if(success){
			if(!notAjax){
				ParentalControl.update();
				updateInfo(programInfo.contentId);
			}
			var defaultBtnTitle = "影片播放";
			if(isSeries && seriesTree && seriesTree.episodeList && seriesTree.currentInfo){
				if (focusEposide) {
					defaultBtnTitle = "播放" + focusEposide;
				}else{
					var dimension1 = parseLookId(seriesTree.currentInfo.lookSeason);
					var dimension2 = parseLookId(seriesTree.currentInfo.lookEpisode);
					
					var ep = seriesTree.episodeList[dimension1][dimension2];
					if(ep.videoType == "B"){//B:花絮  T:預告
						defaultBtnTitle = "播放花絮";
					}else if(ep.videoType == "T"){
						defaultBtnTitle = "播放預告";
					}else{
						defaultBtnTitle = "播放" + ep.name;
					}
					
				}
			}
			
			menu.setButton(0,{ menuId: "play", title: defaultBtnTitle, extra:{} });
			if (autoPlay) {
				play();
			}
			
			function parseLookId(look){
				var i = parseInt(look,10);
				if(isNaN(i) || i < 0) i = 0;
				return i;
			}
		}
	};

//	var changeVideo = function(index){
//		if(!vodFocus || !vodData){
//			console.error("Fail to change video: missing necessary data.")
//			return;
//		}
//		if(index < 0){ index = vodData.length - 1; }
//		else if(index > vodData.length - 1){ index = 0; }
//		if(vodData[index] && vodData[index].contentId){
//			vodFocus.vodCurrent = index;
//			sessionStorage.setItem("vodFocus",JSON.stringify(vodFocus));
//			//location.href = location.pathname + "?id=" + vodData[vodFocus.vodCurrent].contentId + "&brc=" + urlQS.brc;
//			PageManager.goPage(location.pathname, {"id":vodData[vodFocus.vodCurrent].contentId, "brc" : urlQS.brc});
//		}
//	};
	
	var handlHlsError = function(category, code, message){
		var errorObj = {};
		if(typeof(code) === "undefined" || code == null) {
			code = "0x9061"; //general
		}
		errorObj.code = code;
		errorObj.message = message;
		
		switch(code){
			case "42000075":
				if(AccountInfo.isAuthenticated){
					handlePurchase(true);
				}else{
					LoginPopup.enable(SystemInfo.projectNum, setLoginStatus);
                    TraTracking.event(null, TrackingEventAction.DIALOG, "LOGIN");
				}
				break;
			case "42000087":
				dialogService.alert("","本服務僅限台澎金馬地區觀看，<br />目前沒有授權您的地區使用，請見諒！<br />如果您已是台澎金馬地區用戶，請洽客服：(02)7707-0708","確定").setBtnActive(0);
                TraTracking.event(null, TrackingEventAction.ERROR, "GET_HLS|42000087");
                TraTracking.event(null, TrackingEventAction.DIALOG, "ERROR");
				break;
			case "42000040":
				dialogService.alert("LiTV 提醒您","因您目前已登入其他裝置播放影片，系統將自動關閉此裝置影片之播放。","確定").setBtnActive(0);
                TraTracking.event(null, TrackingEventAction.ERROR, "GET_HLS|42000040");
                TraTracking.event(null, TrackingEventAction.DIALOG, "ERROR");
				break;
			case "42000025": case "42000026": case "42000076": 
				AccountInfo.logout();
				if(SystemInfo.bindingDevice == true){
					dialogService.alert("系統異常", "系統資料異常，請再試一次，若錯誤仍舊存在，請電洽客服：(02)7707-0708", responseError2Message(errorObj), "確定", function(){
						PageManager.goHome();
					}).setBtnActive(0);
				}else{
					dialogService.alert("系統異常","系統資料異常，請重新登入後再試，若錯誤仍舊存在，請電洽客服：(02)7707-0708", responseError2Message(errorObj), "重新登入", function(){
						LoginPopup.enable(SystemInfo.projectNum, setLoginStatus);
						TraTracking.event(null, TrackingEventAction.DIALOG, "LOGIN");
					}).setBtnActive(0);
				}
                TraTracking.event(null, TrackingEventAction.ERROR, "GET_HLS|" + code);
                TraTracking.event(null, TrackingEventAction.DIALOG, "ERROR");
				break;
			case "0x9061":
				dialogService.alert("應用程式發生錯誤","可能是網路或伺服器問題，請檢查網路連線，如仍有疑慮請電洽客服：(02)7707-0708。", responseError2Message(errorObj), "確定").setBtnActive(0);
                TraTracking.event(null, TrackingEventAction.ERROR, category + "|" + code + (message ? ("|" + message) : ""));
                TraTracking.event(null, TrackingEventAction.DIALOG, "ERROR");
				break;
			default :
				dialogService.alert("應用程式發生錯誤","可能是網路或伺服器問題，請檢查網路連線，如仍有疑慮請電洽客服：(02)7707-0708", responseError2Message(errorObj), "確定").setBtnActive(0);
                TraTracking.event(null, TrackingEventAction.ERROR, category + "|" + code + (message ? ("|" + message) : ""));
                TraTracking.event(null, TrackingEventAction.DIALOG, "ERROR");
				break;
		}
		
	};

	var getHlsUrlXhr = null;
	var getHlsurlPara = null;
	var play = function(){
		if(episodeSelector != null && episodeSelector.getCurrentObj() != null){
			if(episodeSelector.getCurrentObj().contentId != programInfo.contentId){
				waitForPlay = true;
				return;
			}
		}
		
		var pi = programInfo;
		if(!pi){
			dialogService.alert("應用程式發生錯誤","無法取得播放資訊，可能是網路或伺服器問題，請檢查網路連線。","確定").setBtnActive(0);
            TraTracking.event(null, TrackingEventAction.ERROR, "DATA_LOST|0x9061|programInfo missing");
            TraTracking.event(null, TrackingEventAction.DIALOG, "ERROR");
			return;
		}

		if(pi.chargeMode == "X"){
			dialogService.alert("目前本片已下架","","確定").setBtnActive(0);
            TraTracking.event(null, TrackingEventAction.ERROR, "CONTENT|0x95CD|off the shelf");
            TraTracking.event(null, TrackingEventAction.DIALOG, "ERROR");
			return;
		}
		
		if(!pi.assetsInfo){
			dialogService.alert("應用程式發生錯誤","無法取得播放資訊，可能是網路或伺服器問題，請檢查網路連線。","確定").setBtnActive(0);
            TraTracking.event(null, TrackingEventAction.ERROR, "DATA_LOST|0x9061|assetsInfo missing");
            TraTracking.event(null, TrackingEventAction.DIALOG, "ERROR");
			return;
		};

		if( !(pi.assetsInfo.copyright instanceof Array) || !inArray(pi.assetsInfo.copyright,"TV")){
			dialogService.alert("無法播放","此影片版權限於 " + pi.assetsInfo.copyright.join(" , "),"確定").setBtnActive(0);
            TraTracking.event(null, TrackingEventAction.ERROR, "CONTENT|0x983D|copyright issue");
            TraTracking.event(null, TrackingEventAction.DIALOG, "ERROR");
			return;
		}
		
		ParentalControl.determine(pi.assetsInfo.ratingWeight, pi.assetsInfo.parentalControlId, function(result){
			if(result == true){
				playCore();
			}else{
				return;
			}
		});
		
        function searchLookIndex(){
            var _targetContentId = pi.contentId;
            
            for(var i = 0, ln = seriesTree.episodeList.length; i < ln; i++){
                var _seasonList = seriesTree.episodeList[i];
                for(var j = 0, ln2 = _seasonList.length; j < ln2; j++){
                    var _episodeList = _seasonList[j];
                    if(_episodeList.contentId == _targetContentId){
                        return {
                            lookSeason : i,
                            lookEpisode : j
                        };
                    }
                }
            }
        }
        
		function playCore(){
            var lookSeason = null;
            var lookEpisode = null;
            if(pi.isSeries == true){
                var lookInfo = searchLookIndex();
                lookSeason = lookInfo.lookSeason;
                lookEpisode = lookInfo.lookEpisode;
            }
            
			var todo = function(response){
				var obj = {
					assetsInfo : pi.assetsInfo,
					title: (pi.isSeries) ? pi.title + " " + seriesTree.episodeList[lookSeason||0][lookEpisode||0].name : pi.title,
					name: programInfo.title,
					description: pi.description,
					url: response.fullpath,
					sessionId : response.sessionId,
					playAds : response.playAds,
					contentId: pi.contentId,
					contentType: pi.contentType,
					seriesId: pi.seriesId,
					isSeries: isSeries,
					season: pi.season,
					episode: pi.episode,
					videoType : pi.videoType,
					groupId : pi.groupId,
					lookSeason: lookSeason,
					lookEpisode: lookEpisode,
					seriesTree : seriesTree,
					bookmark : response.bookmark.timestamp,
					liads: pi.liads,
					packageInfo: searchPackage(pi.packageInfo),
					countriesInfo: pi.countriesInfo,
					genresInfo: pi.genresInfo,
					timeline: pi.timeline,
					midrollTimeCodes: pi.midroll.timeCodes,
					countries:pi.countries
				};
				
				sessionStorage.removeItem("vodinfo");
				sessionStorage.setItem("vodinfo",JSON.stringify(obj));

				PageManager.goVodPlayer();
			};
			
			var getHlsUrl = function(){
				if(getHlsUrlXhr == null){
					var para = null;
					if(getHlsurlPara == null){
						para = {assetsId : pi.assetsInfo.assetsId, seriesId : pi.seriesId, season : pi.season, episode : pi.episode, videoType : pi.videoType, groupId : pi.groupId};
					}else{
						para = getHlsurlPara;
						getHlsurlPara = null;
					}
					getHlsUrlApi(para);
				}else{
					getHlsurlPara = {assetsId : pi.assetsInfo.assetsId, seriesId : pi.seriesId, season : pi.season, episode : pi.episode, videoType : pi.videoType, groupId : pi.groupId};
				}
				
				function getHlsUrlApi(para){
                    TraTracking.eventTime(null, TrackingEventAction.GET_HLS, para.assetsId);
					getHlsUrlXhr = LiTVAPI.Vod.getHlsUrl(para.assetsId, para.seriesId, para.season, para.episode, para.videoType, para.groupId, cdnInfo.getCdn(), cdnInfo.getVersion(), function(isSuccess, response, options, xhr){
						if(getHlsUrlXhr != xhr) return;
						getHlsUrlXhr = null;
						
						if(getHlsurlPara != null){
							getHlsUrl();
						}else{
							if(isSuccess){
								cdnInfo.update(response.cdnInfoVer);
								if(!response.errorCode) {
                                    TraTracking.eventTimeEnd(null, TrackingEventAction.GET_HLS);
									todo(response);
								} else{
                                    TraTracking.eventTimeEnd(null, TrackingEventAction.GET_HLS, para.assetsId + "|fail");
									handlHlsError("GET_HLS", response.errorCode, response.errorMessage);
								}
							} else {
								var errorObj = {
									code: response.errorCode,
									message: response.errorMessage
								}
                                TraTracking.eventTimeEnd(null, TrackingEventAction.GET_HLS, para.assetsId + "|fail");
								dialogService.alert("應用程式發生錯誤","可能是網路或伺服器問題，請檢查網路連線。", responseError2Message(errorObj), "確定").setBtnActive(0);
                                TraTracking.event(null, TrackingEventAction.ERROR, "GET_HLS|" + response.errorCode);
                                TraTracking.event(null, TrackingEventAction.DIALOG, "ERROR");
							}
						}
					});
				}
				
			}

			if(SystemInfo.bindingDevice == true && AccountInfo.isAuthenticated == false){
				handlePurchase(true);
				return;
			}
			
			if(pi.chargeMode == "F"){
				getHlsUrl();
				return;
			}

			if(AccountInfo.isAuthenticated == false){
				LoginPopup.enable(SystemInfo.projectNum, setLoginStatus);
				TraTracking.event(null, TrackingEventAction.DIALOG, "LOGIN");
				return;
			}

			getHlsUrl();
		}
	};

	if(urlQS.category_id){
		_backpage += ("&menuId=" + urlQS.category_id + ((urlQS.id || "") && ("&id=" + urlQS.id)));
	}
	
	if(urlQS.brc){
		setUpLocateTitle(decodeURIComponent(urlQS.brc), true);
	}else if(urlQS.category_id){
		LiTVAPI.Vod.getCategory(contentType, function(isSuccess, response, options){
			var locateTitle = "";
            if(isSuccess && response.contentType && response.menu){
				locateTitle = (response.menu.filter(function(item){
                    return item.menuId == urlQS.category_id;
                })[0] || {}).title;
			}
			setUpLocateTitle(locateTitle || "編輯推薦", true);
        });
	}else{
		setUpLocateTitle("編輯推薦", true);
	}

    // if(urlQS.brc){
	// 	setUpLocateTitle(decodeURIComponent(urlQS.brc), true);
    // }else if(urlQS.category_id){
    //     LiTVAPI.Vod.getCategory(contentType, function(isSuccess, response, options){
	// 		var locateTitle = "";
    //         if(isSuccess && response.contentType && response.menu){
	// 			locateTitle = (response.menu.filter(function(item){
    //                 return item.menuId == urlQS.category_id;
    //             })[0] || {}).title || "&nbsp;";
    //         }else{
	// 			locateTitle = "&nbsp;";
	// 		}
	// 		setUpLocateTitle(locateTitle, true);
    //     });
    //     _backpage += ("&menuId=" + urlQS.category_id + ((urlQS.id || "") && ("&id=" + urlQS.id)));
    // }else{
	// 	setUpLocateTitle("&nbsp;", true);
	// }

	var videoInfo = document.getElementById("videoInfo");

	//---------- Push Data ----------//

	var getProgramInfoReq = null;
	function updateInfo(contentId){
		function callback(isSuccess, response, options, xhr){
			if(getProgramInfoReq != xhr) return;
			if(isSuccess){
				programInfo = response;
				setVideoData(programInfo);
			}
			getProgramInfoReq = null;
		}
		getProgramInfoReq = LiTVAPI.Vod.getProgramInfo(contentId, callback, null, 3, null, loading.hide);
	}
	
	var setVideoData = function(data){
		//Poster
		document.getElementById("detailPoster").style.backgroundImage = "url("+data.picture+")";
		if (showPostBanner(data.posterBanner) !== "") {
			document.getElementById("posterLabel").classList.add(showPostBanner(data.posterBanner));
		}
		
		//FreeTag
		if (showFreeTag(data.posterBanner) !== "") {
			document.getElementById("detailVodFreeTag").classList.remove("hide");
		} else {
			document.getElementById("detailVodFreeTag").classList.add("hide");
		}

		//PostInfo
		var scoreBox = document.getElementById("scoreBox");
		if(data.visual.score){
			scoreBox.innerHTML="";
			scoreBox.appendChild(StarRating(data.score));
			var scoreEl = document.getElementById("scoreNumber");
			scoreEl.innerText = data.score;
		} else{
			if(scoreBox){
				scoreBox.parentNode.removeChild(scoreBox);
				scoreBox = null;
				var scoreEl = document.getElementById("scoreNumber");
				scoreEl.parentNode.removeChild(scoreEl);
				scoreEl = null;
			}
		}
		var offShelfDateEl = document.getElementById("relatedGExpiryDate");
		var packageTipEl = document.getElementById("packageTip");
		
		packageTipEl.innerText = data.packageTip;
		//--- for CNS Demo ---------//
		// if(SystemInfo.serverEnv == "staging" && SystemInfo.projectNum == "LTCNS00"){
		// 	packageTipEl.innerHTML = "免費試用期間全集數播放<br>第一集免費看(試用期滿未續訂用戶)";
		// }
		//--------------------------//
		
		if(data.offShelfDate != null && data.offShelfDate != ""){
			offShelfDateEl.innerText = "下架日 " + data.offShelfDate;
			offShelfDateEl.classList.remove("hide");
		}else{
			offShelfDateEl.classList.add("hide");
		}

		//Title
		document.getElementById("viTitle").innerHTML = data.title;
		document.getElementById("viSecondaryMark").innerHTML = data.secondaryMark;

		//Detail
		var detailEls = videoInfo.querySelectorAll(".detailItem");
		detailEls[0].innerText = data.originalDate || "";
		detailEls[1].innerText = data.releaseYear || "";

		var ratingContent = (data.ratingInfo || {}).name || "";
		if (ratingContent)  { ratingContent = "<div class='detailRatingIcon'></div>" + ratingContent }
		detailEls[2].innerHTML = ratingContent;
		detailEls[2].dataset.rating = (data.ratingInfo || {}).age;
		detailEls[3].innerText = data.filmLength || "";
		detailEls[4].innerText = data.subtitleLanguages || "";
		detailEls[5].innerText = data.countries || "";
		detailEls[6].innerText = data.pronunciation || "";
		detailEls[7].innerText = data.genres || "";
		detailEls[8].innerText = data.parentalControlDescription || "";
		detailEls[9].innerText = data.description || "";
		detailEls[10].innerText = data.awards || "";
		
		//Sponsor
		var sponsorLogo = document.getElementById("sponsorLogo");
		if(data.provider && data.provider.logo){
			sponsorLogo.style.backgroundImage = "url("+data.provider.logo+")";
			sponsorLogo.style.display = "table-cell";
		}else{
			sponsorLogo.style.display = "none";
		}

		//Staff
		credits = data.credits;
		var staffEl = document.getElementById("staffSection");
		$(staffEl).empty();
		var fragment = document.createDocumentFragment();
		for (var i = 0, imax = credits.length; i < imax; i++) {
			var group = document.createElement("div");
			group.classList.add("staffList");

			var title = document.createElement("div");
			title.classList.add("staffTitle");
			title.innerText = credits[i].type;

			var list = document.createElement("div");
			list.classList.add("listName");

			for (var j = 0, jmax = credits[i].list.length; j < jmax; j++) {
				var item = document.createElement("div");
				item.innerText = credits[i].list[j].name;
				list.appendChild(item);
			}

			title = group.appendChild(title);
			list = group.appendChild(list);
			group = fragment.appendChild(group);
		}
		staffEl.appendChild(fragment);
		$(fragment).empty();
		group = title = list = fragment = null;
		document.getElementById("rightContent").classList.remove("hide");
		
		if (data.description === LineHeightAdjust.getDescription() && data.awards === LineHeightAdjust.getAwards()) {
			//skip
		} else {
			LineHeightAdjust.setDescription(data.description);
			LineHeightAdjust.setAwards(data.awards);
			LineHeightAdjust.adjust();
		}
		
		firstLook();
	};
	
	setTimeout(function(){
		setVideoData(programInfo);
	},10);	

	//---------- Create component ----------//

	var gli;
	var dialogService = new DialogService();

	var setGLIFocus = function(instance){
		if(instance instanceof GeneralList && gli != instance && instance.getAmount() > 0){
			if(gli){ gli.unActive(); }
			gli = instance;
			gli.active();
			
			if(instance == relatedG){
				RelateTitle.show(gli.getCurrentObj());
			}
		}
	};

	//Clock
	var clocki = new DigitalClock(document.getElementById("digiclock"),30);

	//RelatedG
	var relatedGBoxEl = document.getElementById("relatedGBox");
	var relatedGContentEl = document.getElementById("relatedGContent");
	var relatedGPaginationEl = {
		prev : document.getElementById("vodRelatedGPrev"),
		next : document.getElementById("vodRelatedGNext"),
		current : document.getElementById("vodRelatedGPCurrent"),
		count : document.getElementById("vodRelatedGPCount")
	};
	var relatedG;
	var relatedGOnPageChange = function(pagination){
		relatedGPaginationEl.prev.style.display = (pagination.current > 1) ? "block" : "none";
		relatedGPaginationEl.next.style.display = (pagination.current < pagination.last) ? "block" : "none";
		relatedGPaginationEl.current.innerText = pagination.current;
		relatedGPaginationEl.count.innerText = pagination.last;
	};
	var RelateTitle = (function(){
		var selectedTitle = document.getElementById("relatedGTitle");
		var displayCountF = document.getElementById("relatedGDisplayCount");
		var ratingF = document.getElementById("relatedGRating");
		
		function show(newObj){
			selectedTitle.innerHTML = newObj.completeTitle;
			var selectedTitleChilds = selectedTitle.childNodes;
			var selectedTitleColor = window.getComputedStyle(selectedTitleChilds[selectedTitleChilds.length - 1]).getPropertyValue("color");
			if(selectedTitleColor){
				selectedTitle.style.color = selectedTitleColor;
			}
			
			displayCountF.innerText = newObj.displayCount || "";
			
            if (newObj.rating.age == null) {
                ratingF.classList.add("hide");
            }else{
                ratingF.classList.remove("hide");
                ratingF.dataset.rating = newObj.rating.age;
                ratingF.innerText = newObj.rating.name || "";
			}
			
		}
		
		function hide(){
			selectedTitle.innerHTML = "";
			displayCountF.innerText = "";
			ratingF.classList.add("hide");
			ratingF.innerText = "";
		}
		return{
			show : show,
			hide : hide
		}
	}());
	var relatedGOnFocusChange = function(oldObj,newObj){
		RelateTitle.show(newObj);
	};
	var relatedGOnItemClick = function(obj){
        TraTracking.event(null, TrackingEventAction.GOTO_DETAIL, "related");
		PageManager.goPage(location.pathname, {"id":obj.contentId, "type":programInfo.contentType, "brc":"推薦影片"}, true);
	};
	var createRelatedG = function(){
		relatedG = new GeneralList(VideoItem,relatedGContentEl,relatedGBoxEl,relatedProgram.related_G,{ col:4, row:2 });
		relatedGOnPageChange(relatedG.getPagination());
		relatedG.show();
		
		relatedG.addEventListener(GeneralListEvent.FOCUS_CHANGED,relatedGOnFocusChange);
		relatedG.addEventListener(GeneralListEvent.ITEM_CLICK,relatedGOnItemClick);
		relatedG.addEventListener(GeneralListEvent.PAGE_CHANGED,relatedGOnPageChange);
	};

	//Main Menu
	var menuJson = [
		{ menuId: "play", title: "影片播放", extra:{}},
		{ menuId: "select", title: "選擇集數", extra:{}},
		{ menuId: "credits", title: "演職員表", extra:{}}
	];
	if(!isSeries){ menuJson.splice(1,1); }

	for (var i = 0; i < extraMenu.length; i++) {
		menuJson.push(extraMenu[i]);
	}
	menuJson.push({ menuId: "back", title: "回上一頁", extra:{}});

	var menuBoxEl = document.getElementById("menuBox");
	var menuContentEl = document.getElementById("menuContent");
	var dateExpired = document.getElementById("dateExpired");
	
	var menu = new GeneralList(MenuItem_a,menuContentEl,menuBoxEl,menuJson,{ col:1, row:9 });
	if(AccountInfo.isAuthenticated){
		setLoginStatus(true, true);
	}

	var menuOnFocusChange = function(oldObj,newObj){
        changeUrl(urlParse.changeQuery("menuId", newObj.menuId).getHref());
		if(newObj.menuId == "back"){
			return;
		}
		if(newObj.menuId == "related_G"){
			if(!relatedG){ createRelatedG(); }
			document.getElementById("vodMainContent").classList.add("hide");
			document.getElementById("vodRelatedContent").classList.remove("hide");
			dateExpired.classList.add("hide");
			return;
		}
		if(newObj.menuId != "related_G"){
			dateExpired.classList.remove("hide");
		}

		document.getElementById("vodRelatedContent").classList.add("hide");
		document.getElementById("episodes").classList.add("hide");
		document.getElementById("staffSection").classList.add("hide");
		document.getElementById("vodMainContent").classList.remove("hide");
		document.getElementById("videoInfo").classList.remove("hide");
		document.getElementById("postInfo").classList.remove("hide");
		switch(newObj.menuId){
			case "credits":
				document.getElementById("videoInfo").classList.add("hide");
				document.getElementById("staffSection").classList.remove("hide");
				break;
			case "select":
				document.getElementById("episodes").classList.remove("hide");
				document.getElementById("postInfo").classList.add("hide");
				break;
		}
	};

	var menuOnItemClick = function(obj){
		switch(obj.menuId){
			case "back":
				PageManager.goPage(_backpage);
				break;
			case "play":
				var currentObj = menu.getCurrentObj();
				if(currentObj && currentObj.menuId != "play"){ break; }
                TraTracking.event(null, TrackingEventAction.GOTO_PLAY, "BUTTON");
				play();
				break;
			case "related_G":
				setGLIFocus(relatedG); 
				break;
			case "select":
				setGLIFocus(episodeSelector); 
				break;
		}
		menu.setActive(obj.element.dataset.listindex);
	};
	
	//Episode Selector
	if(isSeries && seriesTree){
		var updateSeriesTree = new UpdateSeriesTree();
		episodeBrowseHost = new BrowseHost();
		episodeBrowseHost.addEventListener(BrowseHostEvent.ON_BROWSE, function(){
            TraTracking.event(null, TrackingEventAction.BROWSE_EPISODE);
		});

		var episodeSelectorBoxEl = document.getElementById("episodeSelectorBox");
		var episodeSelectorContentEl = document.getElementById("episodeSelectorContent");
		var episodeSelectorPaginationEl = {
			prev : document.getElementById("episodeSelectorPrev"),
			next : document.getElementById("episodeSelectorNext")
		};
		
		episodeSelector = new GeneralList(seriesItem,episodeSelectorContentEl,episodeSelectorBoxEl,seriesTree.episodeList[seriesTree.currentInfo.lookSeason],{ col:1, row:10 });
		episodeSelector.setActive(seriesTree.currentInfo.lookEpisode);

		var seasonSelectorBoxEl = document.getElementById("seasonSelectorBox");
		var seasonSelectorContentEl = document.getElementById("seasonSelectorContent");
		var seasonSelectorPaginationEl = {
			prev : document.getElementById("seasonSelectorPrev"),
			next : document.getElementById("seasonSelectorNext")
		};
		var seasonSelector = new GeneralList(seriesItem,seasonSelectorContentEl,seasonSelectorBoxEl,seriesTree.seasonList,{ col:1, row:10 });
		seasonSelector.setActive(seriesTree.currentInfo.lookSeason);

		var episodeSelectorTimer;
		var episodeSelectorRequest;
		var episodeSelectorOnFocusChange = function(oldObj,newObj){
			if(episodeSelectorRequest){ episodeSelectorRequest.abort(); }
			if(episodeSelectorTimer){ clearTimeout(episodeSelectorTimer); }
			var todo = function(isSuccess, response, options, xhr){
				if(xhr !== episodeSelectorRequest) return;
				if(isSuccess){
					programInfo = response;
                    changeUrl(urlParse.changeQuery("id", programInfo.contentId).getHref());
					setVideoData(programInfo);
					
					if(newObj.videoType == "B"){//B:花絮  T:預告
						focusEposide = "花絮";
					}else if(newObj.videoType == "T"){
						focusEposide = "預告";
					}else{
						focusEposide = newObj.name;
					}
					
					if(AccountInfo.isAuthenticated){
						menu.setButton(0,"播放" + focusEposide);
					}
					
					if(waitForPlay == true){
						waitForPlay = false;
						play();
					}
				} else {
					//TODO error handle
				}
			};
			episodeSelectorTimer = setTimeout(function(){
				episodeBrowseHost.request();
				loading.show();
				episodeSelectorRequest = LiTVAPI.Vod.getProgramInfo(newObj.contentId, todo, null, 3, null, loading.hide);
			},300);
		};

		var episodeSelectorOnItemClick = function(obj){
			if(gli != episodeSelector){ setGLIFocus(episodeSelector); }
			if(gli.getCurrentIndex() == obj.element.dataset.listindex){
                TraTracking.event(null, TrackingEventAction.GOTO_PLAY, "EPISODE");
				play();
			} else{
				episodeSelector.setActive(obj.element.dataset.listindex);
			}
		};

		var episodeSelectorOnPageChange = function(pagination){
			episodeSelectorPaginationEl.prev.style.display = (pagination.current > 1 || seasonSelector.getCurrentIndex() > 0) ? "block" : "none";
			episodeSelectorPaginationEl.next.style.display = (pagination.current < pagination.last || !seasonSelector.isLast()) ? "block" : "none";
		};
		episodeSelectorOnPageChange(episodeSelector.getPagination());
		
		var episodeSelectorOnActive = function(){
			episodeBrowseHost.active(true);
		};
		
		var episodeSelectorOnUnActive = function(){
			episodeBrowseHost.active(false);
		};

		var seasonSelectorOnFocusChange = function(oldObj,newObj){
			episodeSelector.update(seriesTree.episodeList[newObj.element.dataset.listindex]);
            episodeSelector.setActiveByField("contentId", programInfo.contentId);
			episodeSelectorOnPageChange(episodeSelector.getPagination());
		};

		var seasonSelectorOnPageChange = function(pagination){
			seasonSelectorPaginationEl.prev.style.display = (pagination.current > 1) ? "block" : "none";
			seasonSelectorPaginationEl.next.style.display = (pagination.current < pagination.last) ? "block" : "none";
		};
		seasonSelectorOnPageChange(seasonSelector.getPagination());

		var seasonSelectorOnItemClick = function(obj){
			if(gli != seasonSelector){ setGLIFocus(seasonSelector); }
			seasonSelector.setActive(obj.element.dataset.listindex);
		};

		var episodeSelectorPrev = function(){
			if(gli != episodeSelector){ setGLIFocus(episodeSelector); }
			if(gli.isFirst() && !seasonSelector.isFirst()){
				seasonSelector.prev();
				gli.setActive(gli.getConfig().amount-1);
			} else{
				gli.prev();
			}
		};

		var episodeSelectorNext = function(){
			if(gli != episodeSelector){ setGLIFocus(episodeSelector); }
			if(gli.isLast() && !seasonSelector.isLast()){
				seasonSelector.next();
				gli.setActive(0);
			} else{
				gli.next();
			}
		};

		var episodeSelectorPageup = function(){
			if(gli != episodeSelector){ setGLIFocus(episodeSelector); }
			if(gli.getPagination().current == 1 && !seasonSelector.isFirst()){
				seasonSelector.prev();
				gli.setActive(gli.getConfig().amount-1);
			} else{
				gli.pageup();
			}
		};

		var episodeSelectorPagedown = function(){
			if(gli != episodeSelector){ setGLIFocus(episodeSelector); }
			if(gli.getPagination().current == gli.getPagination().last && !seasonSelector.isLast()){
				seasonSelector.next();
				gli.setActive(0);
			} else{
				gli.pagedown();
			}
		};

		episodeSelector.addEventListener(GeneralListEvent.FOCUS_CHANGED,episodeSelectorOnFocusChange);
		episodeSelector.addEventListener(GeneralListEvent.ITEM_CLICK,episodeSelectorOnItemClick);
		episodeSelector.addEventListener(GeneralListEvent.PAGE_CHANGED,episodeSelectorOnPageChange);
		episodeSelector.addEventListener(GeneralListEvent.ACTIVE,episodeSelectorOnActive);//TODO
		episodeSelector.addEventListener(GeneralListEvent.UN_ACTIVE,episodeSelectorOnUnActive);//TODO
		episodeSelectorPaginationEl.prev.addEventListener("click",function(){
			episodeSelectorPageup();
		});
		episodeSelectorPaginationEl.next.addEventListener("click",function(){
			episodeSelectorPagedown();
		});

		seasonSelector.addEventListener(GeneralListEvent.FOCUS_CHANGED,seasonSelectorOnFocusChange);
		seasonSelector.addEventListener(GeneralListEvent.ITEM_CLICK,seasonSelectorOnItemClick);
		seasonSelector.addEventListener(GeneralListEvent.PAGE_CHANGED,seasonSelectorOnPageChange);
		seasonSelectorPaginationEl.prev.addEventListener("click",function(){
			seasonSelector.pageup();
		});
		seasonSelectorPaginationEl.next.addEventListener("click",function(){
			seasonSelector.pagedown();
		});

		seasonSelectorBoxEl.addEventListener("mouseover",function(){
			if(gli != seasonSelector) setGLIFocus(seasonSelector);
		});

		episodeSelectorBoxEl.addEventListener("mouseover",function(){
			if(gli != episodeSelector) setGLIFocus(episodeSelector);
		});

		updateSeriesTree.addEventListener("UPDATE_SERIES_TREE", function(data){
			if(deepCompare(seriesTree.seasonList, data.seasonList) && deepCompare(seriesTree.episodeList, data.episodeList)){
				return;
			}
			seriesTree.seasonList = data.seasonList;
			seriesTree.episodeList = data.episodeList;
			var indexInfo = null;
			if(episodeSelector.getCurrentObj() != null){
				var targetContentId = episodeSelector.getCurrentObj().contentId;
				var episodeList = seriesTree.episodeList;
				episodeList.some(function(l0, i){
					return l0.some(function(l1, j){
						if(l1.contentId == targetContentId){
							indexInfo = [i, j];
							return true;
						}
						return false;
					});
				});
			}

			if(indexInfo == null){
				var preSeasonIndex = seasonSelector.getCurrentIndex();
				if(seriesTree.seasonList.length - 1 > preSeasonIndex){
					indexInfo = [preSeasonIndex];
				}else{
					indexInfo = [seriesTree.seasonList.length - 1];
				}
				indexInfo.push(seriesTree.episodeList[indexInfo[0]].length - 1);
			}

			seasonSelector.update(seriesTree.seasonList);
			seasonSelector.setActive(indexInfo[0]);
			episodeSelector.update(seriesTree.episodeList[indexInfo[0]]);
			if(typeof indexInfo[1] !== "undefined") episodeSelector.setActive(indexInfo[1]);
		});

		updateSeriesTree.start(programInfo.seriesId, seasonSelector, episodeSelector);
	}
	
	//set tvod priceDesc
	var searchPackage = function(packageInfo) {
		var bsmPurchaseType = {
            "TVOD": "TVOD",
            "SVOD": "SVOD",
            "X": "X"
        };
        
        var pInfo = null;
        var pList = packageInfo.bsmPkgCategories;
        var categoryIdList = [];
        for (var i = 0, max = pList.length; i < max; i++) {
            purchaseType = pList[i].purchaseType;
            if (purchaseType === bsmPurchaseType[purchaseType]) {
                if(pInfo == null) pInfo = pList[i];
                categoryIdList.push(pList[i].categoryId);
            }
        }
        
        if(pInfo == null){
            pInfo = packageInfo.notAvailableInfo;
        }
        
        pInfo.categoryIds = categoryIdList;
        return pInfo;
	};
	var priceDescEl = document.getElementById("priceDesc");
	priceDescEl.innerText = (searchPackage(programInfo.packageInfo)).priceMdDesc;
	
	//console.log(programInfo);
	
	function handlePurchase(purchaseHint, directPage) {
		if (programInfo.chargeMode === "X") {
			dialogService.alert("目前本片已下架","","確定").setBtnActive(0);
            TraTracking.event(null, TrackingEventAction.ERROR, "CONTENT|0x95CD|off the shelf");
            TraTracking.event(null, TrackingEventAction.DIALOG, "ERROR");
			return;
		}

		if(SystemInfo.bindingDevice == true){
			if(directPage == true){
				PageManager.goPurchase();
			}else{
				handleBindingDeviceAuthorization(programInfo, Tracking)
				.progress(function(e){
					if(e.type == "send_purchase_complete"){
						TraTracking.event(null, TrackingEventAction.PURCHASE_COMPLETE, e.package.package_title + "|" + programInfo.contentType + "|" + programInfo.title);
					}
				})
				.then(function(info){
					if(info.updateAuth == true) setLoginStatus(true, true);
					if(info.status == "complete") {
						play();
					} else if(info.status == "gotoPurchase"){
						var packageInfo = info.packageInfo;
						PageManager.goPurchase({
							gd: packageInfo.product_id,
							id: packageInfo.vendor_package_id,
							gaevent: encodeURI(programInfo.contentType + "|" + programInfo.title),
							//id: packageInfo.package_id,
							only: true
						});
					}
				})
				.fail(function(){
					//TODO error handle
				});
			}
			return;
		}

		var bsmPkgData = searchPackage(programInfo.packageInfo);
		var ecommerceData = {
			promotions: [{
				id: bsmPkgData.categoryId,
				name: "PlayCard",
				creative_name: programInfo.title
			}]
		};
		
		if (bsmPkgData.purchaseType === "SVOD") {
			if (purchaseHint) {
				dialogService.confirm("權限不足", "您尚未購買隨選影片服務，請問是否要前往購買", "離開", "前往購買", function (choose) {
					if (choose == "right") {
						Tracking.ecommerce("select_content", ecommerceData);
                        TraTracking.event(null, TrackingEventAction.GOTO_PURCHASE, "AUTHENTICATE");
						PageManager.goPurchase({"categories": encodeURIComponent(JSON.stringify(bsmPkgData.categoryIds))});
					}
				}).setBtnActive(1);
				Tracking.ecommerce("view_promotion", ecommerceData);
                TraTracking.event(null, TrackingEventAction.DIALOG, "ASK_PURCHASE");
			} else {
				ecommerceData = {
						promotions: [{
							id: "Bluebottom",
							name: "Bluebottom",
							creative_name: programInfo.contentType + "|" + programInfo.title
						}]
					};
				Tracking.ecommerce("select_content", ecommerceData);
                TraTracking.event(null, TrackingEventAction.GOTO_PURCHASE, "COLOR_KEY");
				PageManager.goPurchase({"categories": encodeURIComponent(JSON.stringify(bsmPkgData.categoryIds))});
			}
		} else if (bsmPkgData.purchaseType === "TVOD") {
			var playDirectly = function () {
                TraTracking.event(null, TrackingEventAction.GOTO_PLAY, "TVOD_PURCHASED");
				play();
			};
			TvodFeature.tvodPurchasePopUp(programInfo, bsmPkgData, playDirectly);
			Tracking.ecommerce("view_promotion", ecommerceData);
            TraTracking.event(null, TrackingEventAction.DIALOG, "TVOD");
		} else {
			dialogService.alert(bsmPkgData.title, bsmPkgData.text, "確定", function () {}).setBtnActive(0);
            TraTracking.event(null, TrackingEventAction.ERROR, "PACKAGE|0x83F2|Unknow");
            TraTracking.event(null, TrackingEventAction.DIALOG, "ERROR");
		}
	}

	//---------- Event Binding ----------//
	//ParentalControl
	ParentalControl.addEventListener(ParentalControlEvent.OPEN,function(){
        TraTracking.event(null, TrackingEventAction.PARENTAL_CONTROL, "OPEN");
	});
	ParentalControl.addEventListener(ParentalControlEvent.SUCCESS,function(){
        TraTracking.event(null, TrackingEventAction.PARENTAL_CONTROL, "SUCCESS");
	});
	ParentalControl.addEventListener(ParentalControlEvent.FAIL,function(){
        TraTracking.event(null, TrackingEventAction.PARENTAL_CONTROL, "FAIL");
	});
	ParentalControl.addEventListener(ParentalControlEvent.CANCEL,function(){
        TraTracking.event(null, TrackingEventAction.PARENTAL_CONTROL, "CANCEL");
	});
	
	//relatedG
	relatedGContentEl.addEventListener("mouseover",function(event){
		if(gli != relatedG){ setGLIFocus(relatedG); }
		if(event.target != this){
			for (var i = 0, max = event.path.length; i < max; i++) {
				var target = event.path[i];
				if(target.classList.contains("boxSection") && target.dataset.listindex){
					relatedG.setActive(target.dataset.listindex);
					break;
				}
				else if(target.id == "relatedGContent") break;
			}
		}
	});

	//Main Menu
	menuBoxEl.addEventListener("mouseover",function(event){
		if(gli != menu){ setGLIFocus(menu); }
	});
	menu.addEventListener(GeneralListEvent.FOCUS_CHANGED,menuOnFocusChange);
	menu.addEventListener(GeneralListEvent.ITEM_CLICK,menuOnItemClick);

	//Back Button
	document.getElementById("backBtn").addEventListener("click",function(){
		PageManager.goPage(_backpage);
	});

	//Keyboard
	document.body.addEventListener("keydown",function(event){
		event.stopPropagation();
		event.stopImmediatePropagation();

		switch(event.keyName){
			case Keyboard.ENTER:
				autoPlay = true;
				gli.choose(); break;

			case Keyboard.ARROW_UP:
				switch(gli){
					case relatedG:
						gli.prevRow2(); break;
					case episodeSelector:
						episodeSelectorPrev();
						break;
					default:
						gli.prev(); break;
				} break;

			case Keyboard.ARROW_DOWN:
				switch(gli){
					case relatedG:
						gli.nextRow2(); break;
					case episodeSelector:
						episodeSelectorNext();
						break;
					default:
						gli.next(); break;
				} break;

			case Keyboard.ARROW_RIGHT:
				switch(gli){
					case menu:
						switch(menu.getCurrentObj().menuId){
							case "related_G":
								setGLIFocus(relatedG); break;
							case "select":
								setGLIFocus(episodeSelector); break;
						}
						break;
					case relatedG:
						gli.next(); break;
					case seasonSelector:
						setGLIFocus(episodeSelector); break;
				} break;

			case Keyboard.ARROW_LEFT:
				switch(gli){
					case relatedG:
						if(relatedG.getCurrentIndex() % relatedG.getConfig().col == 0) {
							RelateTitle.hide();
							setGLIFocus(menu);
						} else gli.prev();
						break;
					case seasonSelector:
						setGLIFocus(menu); break;
					case episodeSelector:
						setGLIFocus(seasonSelector); break;
				} break;

			case Keyboard.GO_BACK:
				event.preventDefault();
				switch(gli){
					case relatedG:
						RelateTitle.hide();
						setGLIFocus(menu);
						break;
					default:
						PageManager.goPage(_backpage);
					break;
				} break;

			case Keyboard.PAGE_UP:
				switch(gli){
					case episodeSelector:
						episodeSelectorPageup();
						break;
					default:
						gli.pageup();
						break;
				} break;

			case Keyboard.PAGE_DOWN:
				switch(gli){
					case episodeSelector:
						episodeSelectorPagedown();
						break;
					default:
						gli.pagedown();
						break;
				} break;
			case Keyboard.COLOR_F2_YELLOW:
                TraTracking.event(null, TrackingEventAction.GOTO_PLAY, "COLOR_KEY");
				autoPlay = true;
				play(); break;
			case Keyboard.COLOR_F3_BLUE:
				if(SystemInfo.enablePurchase == false) return;
				if(SystemInfo.bindingDevice == true){
					handlePurchase(false, true);
				} else if(AccountInfo.isAuthenticated) {
					handlePurchase(false);
				} else {
					var setLoginStatus = function (success, notAjax) {
						if (success) {
							if (!notAjax) {
								ParentalControl.update();
							}
							handlePurchase(false);
						}
					};
					LoginPopup.enable(SystemInfo.projectNum, setLoginStatus);
                    TraTracking.event(null, TrackingEventAction.DIALOG, "LOGIN");
				}
				break;
			/*
			case keyboard.RED:
				cki.choose("red"); break;
			case keyboard.GREEN:
				cki.choose("green"); break;
			*/
		}
	});

	//---------- Initialize ----------//
	menu.setActive(0);
	setGLIFocus(menu);

	if(SystemInfo.enablePurchase == true){
		document.getElementById("hintPurchase").style.display = "block";
	}

	var frameId = "WebTV_" + urlQS.type + "_description_ValidTime";
	getDateExpired.setNotice(frameId, document.getElementById("dateExpired"));

}

//調整內容行距
var LineHeightAdjust = (function(){
	function setDescription(text) {
		this.description = text;
	}
	
	function setAwards(text) {
		this.awards = text;
	}
	
	function getDescription() {
		return this.description;
	}
	
	function getAwards() {
		return this.awards;
	}
	
	function adjust() {
		var introHeight = parseInt(($("#videoIntroduce").css("height")),10);
		var awardHeight = parseInt(($("#awardRecord").css("height")),10);
		var totalHeight = introHeight + awardHeight;

		$("#videoIntroduce").css("line-height", "140%");
		$("#awardRecord").css("line-height", "140%");
		$("#lineTemplate").css("line-height", "140%");

		if (totalHeight >= 272) {
			$("#videoIntroduce").css("margin-bottom", 0);
			$("#videoIntroduce").css("line-height", "137%");
			$("#awardRecord").css("line-height", "137%");
			$("#lineTemplate").css("line-height", "137%");
		}

		if (totalHeight >= 328 && totalHeight <= 340) {
			$("#videoIntroduce").css("line-height", "123%");
			$("#awardRecord").css("line-height", "123%");
			$("#lineTemplate").css("line-height", "123%");
		} else if (totalHeight > 341) {
			$("#videoIntroduce").css("line-height", "110%");
			$("#awardRecord").css("line-height", "110%");
			$("#lineTemplate").css("line-height", "110%");
		}

		var templateHeight = parseInt(($("#lineTemplate").css("height")),10);
		templateHeight = templateHeight * 4;
		$("#awardRecord").css("max-height", templateHeight + "px");
		$("#lineTemplate").hide();
	}
	return {
		"adjust": adjust,
		"setDescription": setDescription,
		"setAwards": setAwards,
		"getDescription": getDescription,
		"getAwards": getAwards
	};
})();

function backOnNoReady(e){
	if(e.keyName == Keyboard.GO_BACK){
		backToVOD();
	}
}

function backToVOD() {
	PageManager.goPage(_backpage);
}

function UpdateSeriesTree(){
	var _seriesId, _preTime, _intervalId = null;
	var eventCenter = new ObserverPattern();

	function isEmptyObject(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) return false;
        }
        return true;
    }

	function exe(){
		LiTVAPI.Vod.getSeriesTreeInfo(_seriesId, function(isSuccess, response, options){
			if(!isSuccess) return;
			if(response == null || typeof response == "undefined") return;
			if(isEmptyObject(response)) return;
			eventCenter.publish("UPDATE_SERIES_TREE", [response]);
		});
	}

	this.stop = function(){
		if(_intervalId != null) {
			clearInterval(_intervalId);
			_intervalId = null;
		}
	};

	this.start = function(seriesId){
		_preTime = +new Date();
		_seriesId = seriesId;
		this.stop();
		_intervalId = setInterval(function(){
			var nTime = +new Date();
			if(nTime - _preTime > 18E5){ //30 分鐘
				_preTime = nTime;
				exe();
			}
		}, 6E4); //1 分鐘
	};

	this.addEventListener = eventCenter.subscribe;
	this.removeEventListener = eventCenter.unsubscribe;
}
