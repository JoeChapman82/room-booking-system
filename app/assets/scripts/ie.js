var JSON;!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=v.elements;return"string"==typeof e?e.split(" "):e}function o(e){var t=g[e[h]];return t||(t={},m++,e[h]=m,g[m]=t),t}function a(e,n,r){return n||(n=t),f?n.createElement(e):(r||(r=o(n)),!(a=r.cache[e]?r.cache[e].cloneNode():d.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e)).canHaveChildren||p.test(e)||a.tagUrn?a:r.frag.appendChild(a));var a}function i(e){e||(e=t);var i,c,u=o(e);return!v.shivCSS||l||u.hasCSS||(u.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),f||(i=e,(c=u).cache||(c.cache={},c.createElem=i.createElement,c.createFrag=i.createDocumentFragment,c.frag=c.createFrag()),i.createElement=function(e){return v.shivMethods?a(e,i,c):c.createElem(e)},i.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return c.createElem(e),c.frag.createElement(e),'c("'+e+'")'})+");return n}")(v,c.frag)),e}function c(e){for(var t,n=e.attributes,r=n.length,o=e.ownerDocument.createElement(S+":"+e.nodeName);r--;)(t=n[r]).specified&&o.setAttribute(t.nodeName,t.nodeValue);return o.style.cssText=e.style.cssText,o}function u(e){function t(){clearTimeout(u._removeSheetTimer),a&&a.removeNode(!0),a=null}var a,i,u=o(e),l=e.namespaces,f=e.parentWindow;return!E||e.printShived?e:(void 0===l[S]&&l.add(S),f.attachEvent("onbeforeprint",function(){t();for(var o,u,l,f=e.styleSheets,s=[],p=f.length,d=Array(p);p--;)d[p]=f[p];for(;l=d.pop();)if(!l.disabled&&b.test(l.media)){try{o=l.imports,u=o.length}catch(e){u=0}for(p=0;u>p;p++)d.push(o[p]);try{s.push(l.cssText)}catch(e){}}s=function(e){for(var t,n=e.split("{"),o=n.length,a=RegExp("(^|[\\s,>+~])("+r().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),i="$1"+S+"\\:$2";o--;)(t=n[o]=n[o].split("}"))[t.length-1]=t[t.length-1].replace(a,i),n[o]=t.join("}");return n.join("{")}(s.reverse().join("")),i=function(e){for(var t,n=e.getElementsByTagName("*"),o=n.length,a=RegExp("^(?:"+r().join("|")+")$","i"),i=[];o--;)t=n[o],a.test(t.nodeName)&&i.push(t.applyElement(c(t)));return i}(e),a=n(e,s)}),f.attachEvent("onafterprint",function(){(function(e){for(var t=e.length;t--;)e[t].removeNode()})(i),clearTimeout(u._removeSheetTimer),u._removeSheetTimer=setTimeout(t,500)}),e.printShived=!0,e)}var l,f,s=e.html5||{},p=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,d=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,h="_html5shiv",m=0,g={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",l="hidden"in e,f=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return void 0===e.cloneNode||void 0===e.createDocumentFragment||void 0===e.createElement}()}catch(e){l=!0,f=!0}}();var v={elements:s.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:"3.7.3",shivCSS:!1!==s.shivCSS,supportsUnknownElements:f,shivMethods:!1!==s.shivMethods,type:"default",shivDocument:i,createElement:a,createDocumentFragment:function(e,n){if(e||(e=t),f)return e.createDocumentFragment();for(var a=(n=n||o(e)).frag.cloneNode(),i=0,c=r(),u=c.length;u>i;i++)a.createElement(c[i]);return a},addElements:function(e,t){var n=v.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),v.elements=n+" "+e,i(t)}};e.html5=v,i(t);var y,b=/^$|\b(?:all|print)\b/,S="html5shiv",E=!(f||(y=t.documentElement,void 0===t.namespaces||void 0===t.parentWindow||void 0===y.applyElement||void 0===y.removeNode||void 0===e.attachEvent));v.type+=" print",v.shivPrint=u,u(t),"object"==typeof module&&module.exports&&(module.exports=v)}("undefined"!=typeof window?window:this,document),JSON||(JSON={}),function(){"use strict";function f(e){return e<10?"0"+e:e}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,o,a,i,c=gap,u=t[e];switch(u&&"object"==typeof u&&"function"==typeof u.toJSON&&(u=u.toJSON(e)),"function"==typeof rep&&(u=rep.call(t,e,u)),typeof u){case"string":return quote(u);case"number":return isFinite(u)?String(u):"null";case"boolean":case"null":return String(u);case"object":if(!u)return"null";if(gap+=indent,i=[],"[object Array]"===Object.prototype.toString.apply(u)){for(a=u.length,n=0;n<a;n+=1)i[n]=str(n,u)||"null";return o=0===i.length?"[]":gap?"[\n"+gap+i.join(",\n"+gap)+"\n"+c+"]":"["+i.join(",")+"]",gap=c,o}if(rep&&"object"==typeof rep)for(a=rep.length,n=0;n<a;n+=1)"string"==typeof rep[n]&&(o=str(r=rep[n],u))&&i.push(quote(r)+(gap?": ":":")+o);else for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(o=str(r,u))&&i.push(quote(r)+(gap?": ":":")+o);return o=0===i.length?"{}":gap?"{\n"+gap+i.join(",\n"+gap)+"\n"+c+"}":"{"+i.join(",")+"}",gap=c,o}}"function"!=typeof JSON.stringify&&(JSON.stringify=function(e,t,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;r<n;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":e})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(e,t){var n,r,o=e[t];if(o&&"object"==typeof o)for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(void 0!==(r=walk(o,n))?o[n]=r:delete o[n]);return reviver.call(e,t,o)}if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();