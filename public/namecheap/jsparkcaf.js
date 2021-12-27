var pageOptions = {
	'pubId' : 'dp-teaminternet01',
	'resultsPageBaseUrl' : '//' + location.host + '/?caf',
	'fontFamily' : 'arial',
	'optimizeTerms' : true,
	'maxTermLength' : 40,
	'adtest' : true,
	'clicktrackUrl' : 'http://parkingcrew.net/track.php?',
	'attributionText' : 'Ads',
	'colorAttribution' : '#b7b7b7',
	'fontSizeAttribution' : 16,
	'attributionBold': false,
	'rolloverLinkBold' : false,
	'fontFamilyAttribution' : 'arial',
	'adLoadedCallback' : function(container, adsLoaded) {
		if(!adsLoaded) {
			var ele = document.getElementById(container).getElementsByTagName('iframe')[0];
			var vars = JSON.parse( ele.name.substr( ele.id.length + 1 ) );
			if( typeof vars[ele.id].type == "string" && vars[ele.id].type == "relatedsearch" ) {
				relatedFallback( (function(){relatedCallback(vars[ele.id]);}) );
			}
		}
	},
	'pageLoadedCallback' : function(requestAccepted, status) {
		document.body.style.visibility = 'visible';

		if(status.errorcode && !status.error_code) {
			status.error_code = status.errorcode;
		}

		if (!requestAccepted) {
			ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=answercheck&answer=rejected&uid=" + encodeURIComponent(uniqueTrackingID));
		} else if (status.error_code) {
			ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=answercheck&answer=error_" + encodeURIComponent(status.error_code) + "&uid=" + encodeURIComponent(uniqueTrackingID));
		} else {
			ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=answercheck&answer=yes&uid=" + encodeURIComponent(uniqueTrackingID));
		}

		if(status.feed) {
			ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=feed&feed=" + encodeURIComponent(status.feed) + "&uid=" + encodeURIComponent(uniqueTrackingID));
		}

		if(status.faillisted === true || status.faillisted == "true" || status.blocked === true || status.blocked == "true") {
			ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=block&reason=other&uid=" + encodeURIComponent(uniqueTrackingID));
		}

		if(status.error_code) {
			ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=errorcode&code=" + encodeURIComponent(status.error_code) + "&uid=" + encodeURIComponent(uniqueTrackingID));
		}

		if(status.needsreview === true || status.needsreview == "true") {
			ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=needsreview&uid=" + encodeURIComponent(uniqueTrackingID));
		}

		if( (status.adult === true || status.adult == "true") && !isAdult) {
			ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=adult&uid=" + encodeURIComponent(uniqueTrackingID));
		} else if( (status.adult === false || status.adult == "false") && isAdult) {
			ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&caf=1&toggle=nonadult&uid=" + encodeURIComponent(uniqueTrackingID));
		}
	}
};

var x = function(obj1, obj2) {
	if(typeof obj1 != "object") {
		obj1 = {};
	}
	for(var key in obj2) {
		obj1[key] = obj2[key];
	}
	return obj1;
};

var y = function(name) {
	var pattern = "[\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(pattern);
	var res = regex.exec(document.location.href);
	if(res === null) {
		return "";
	}
	return decodeURIComponent(res[1]);
};

var is_afs = y('afdToken') !== '';
var search = y('query');

function getXMLhttp() {
	var xmlHttp = null;
	try {
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (ex) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (exc) {}
		}
	}
	return xmlHttp;
}

function ajaxQuery(url) {
	if (adtest == 'on') return false;
	xmlHttp = getXMLhttp();
	if (!xmlHttp) return ajaxBackfill(url);
	try {
		xmlHttp.open("GET", url, false);
		return xmlHttp.send(null);
	} catch (e) {
		return ajaxBackfill(url);
	}
}

function ajaxBackfill(url) {
	if(adtest == 'on') return false;
	if(url.indexOf("&toggle=browserjs") > -1) return false;
	try {
		var img = document.createElement('img');
		img.style.visibility = 'hidden';
		img.style.width = '1px';
		img.style.height = '1px';
		img.src = url + "&_t=" + new Date().getTime();
		document.body.appendChild(img);
	} catch (e) {}
}

if(typeof adtest == "undefined" || adtest != "on") {
	ajaxQuery(scriptPath + "/track.php?domain=" + encodeURIComponent(domain) + "&toggle=browserjs&uid=" + encodeURIComponent(uniqueTrackingID));
}

if(typeof caf_loaded !== "undefined") {
	caf_loaded();
}

pcrewJSsync(regTemplate);

if(is_afs) {
	x2c = false;
}

function onPageLoadEvent() {
	var c1 = document.getElementById("oneclick");
	var c2 = document.getElementById("twoclick");

	var call = function(){};

	if(x2c && typeof caf_twoclick_call != "undefined") {
		c1.parentNode.removeChild(c1);
		c2.style.display = "block";

		call = caf_twoclick_call;
	} else if(typeof caf_oneclick_call != "undefined") {
		c2.parentNode.removeChild(c2);
		c1.style.display = "block";

		call = caf_oneclick_call;
	}

	if( (el = document.getElementById("domaintitle")) ) {
		el.innerHTML = "<a href='/'>" + domain_utf8 + "</a>";
	}

	if( (el = document.getElementById("sidebar")) ) {
		el.innerHTML = "<div id='related_holder'></div><div id='searchbox_holder'></div>";
	}

	if( typeof domain_utf8 == "string") {
		document.title = domain_utf8;
	}

	call();
}

if (window.addEventListener) {
	window.addEventListener("load", onPageLoadEvent, false);
} else {
	window.attachEvent("onload", onPageLoadEvent);
}
