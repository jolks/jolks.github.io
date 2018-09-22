(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
    0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
    for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
    mixpanel.init("35a63367c4fab134971dd8d4a4a28bba");

/*
  Sources:-
  http://www.test-cors.org/
  https://jsonip.com/
  */
var createCORSRequest = function(method, url) {
var xhr = new XMLHttpRequest();
if ("withCredentials" in xhr) {
    // Most browsers.
    xhr.open(method, url, true);
} else if (typeof XDomainRequest != "undefined") {
    // IE8 & IE9
    xhr = new XDomainRequest();
    xhr.open(method, url);
} else {
    // CORS not supported.
    xhr = null;
}
return xhr;
};

var url = 'https://jsonip.com/';
var method = 'GET';
var xhr = createCORSRequest(method, url);

xhr.onload = function() {
// Success code goes here.
var resp = JSON.parse(xhr.responseText);
var useragent = window.navigator.userAgent;
// window.navigator.userLanguage is for IE browser
var language = window.navigator.userLanguage || window.navigator.language;
mixpanel.track("Homepage", {
    "userip": resp.ip,
    "useragent": useragent,
    "language": language 
});
};

xhr.onerror = function() {
// Error code goes here.
};

xhr.send();