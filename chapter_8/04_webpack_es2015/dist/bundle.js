!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";var r,o,i,s,a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};s=function(e){var t=Object.prototype.toString,n=Array.isArray||function(e){return"[object Array]"===t.call(e)};function r(e){return"function"==typeof e}function o(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function i(e,t){return null!=e&&"object"===(void 0===e?"undefined":a(e))&&t in e}var s=RegExp.prototype.test;var u=/\S/;function c(e){return!function(e,t){return s.call(e,t)}(u,e)}var l={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};var p=/\s*/,f=/\s+/,h=/\s*=/,d=/\s*\}/,v=/#|\^|\/|>|\{|&|=|!/;function y(e){this.string=e,this.tail=e,this.pos=0}function g(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function w(){this.cache={}}y.prototype.eos=function(){return""===this.tail},y.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},y.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=t.length,t},g.prototype.push=function(e){return new g(e,this)},g.prototype.lookup=function(e){var t,n=this.cache;if(n.hasOwnProperty(e))t=n[e];else{for(var o,s,a=this,u=!1;a;){if(e.indexOf(".")>0)for(t=a.view,o=e.split("."),s=0;null!=t&&s<o.length;)s===o.length-1&&(u=i(t,o[s])),t=t[o[s++]];else t=a.view[e],u=i(a.view,e);if(u)break;a=a.parent}n[e]=t}return r(t)&&(t=t.call(this.view)),t},w.prototype.clearCache=function(){this.cache={}},w.prototype.parse=function(t,r){var i=this.cache,s=i[t];return null==s&&(s=i[t]=function(t,r){if(!t)return[];var i,s,a,u=[],l=[],g=[],w=!1,b=!1;function m(){if(w&&!b)for(;g.length;)delete l[g.pop()];else g=[];w=!1,b=!1}function x(e){if("string"==typeof e&&(e=e.split(f,2)),!n(e)||2!==e.length)throw new Error("Invalid tags: "+e);i=new RegExp(o(e[0])+"\\s*"),s=new RegExp("\\s*"+o(e[1])),a=new RegExp("\\s*"+o("}"+e[1]))}x(r||e.tags);for(var k,E,S,T,U,j,O=new y(t);!O.eos();){if(k=O.pos,S=O.scanUntil(i))for(var P=0,V=S.length;P<V;++P)c(T=S.charAt(P))?g.push(l.length):b=!0,l.push(["text",T,k,k+1]),k+=1,"\n"===T&&m();if(!O.scan(i))break;if(w=!0,E=O.scan(v)||"name",O.scan(p),"="===E?(S=O.scanUntil(h),O.scan(h),O.scanUntil(s)):"{"===E?(S=O.scanUntil(a),O.scan(d),O.scanUntil(s),E="&"):S=O.scanUntil(s),!O.scan(s))throw new Error("Unclosed tag at "+O.pos);if(U=[E,S,k,O.pos],l.push(U),"#"===E||"^"===E)u.push(U);else if("/"===E){if(!(j=u.pop()))throw new Error('Unopened section "'+S+'" at '+k);if(j[1]!==S)throw new Error('Unclosed section "'+j[1]+'" at '+k)}else"name"===E||"{"===E||"&"===E?b=!0:"="===E&&x(S)}if(j=u.pop())throw new Error('Unclosed section "'+j[1]+'" at '+O.pos);return function(e){for(var t,n=[],r=n,o=[],i=0,s=e.length;i<s;++i)switch((t=e[i])[0]){case"#":case"^":r.push(t),o.push(t),r=t[4]=[];break;case"/":o.pop()[5]=t[2],r=o.length>0?o[o.length-1][4]:n;break;default:r.push(t)}return n}(function(e){for(var t,n,r=[],o=0,i=e.length;o<i;++o)(t=e[o])&&("text"===t[0]&&n&&"text"===n[0]?(n[1]+=t[1],n[3]=t[3]):(r.push(t),n=t));return r}(l))}(t,r)),s},w.prototype.render=function(e,t,n){var r=this.parse(e),o=t instanceof g?t:new g(t);return this.renderTokens(r,o,n,e)},w.prototype.renderTokens=function(e,t,n,r){for(var o,i,s,a="",u=0,c=e.length;u<c;++u)s=void 0,"#"===(i=(o=e[u])[0])?s=this.renderSection(o,t,n,r):"^"===i?s=this.renderInverted(o,t,n,r):">"===i?s=this.renderPartial(o,t,n,r):"&"===i?s=this.unescapedValue(o,t):"name"===i?s=this.escapedValue(o,t):"text"===i&&(s=this.rawValue(o)),void 0!==s&&(a+=s);return a},w.prototype.renderSection=function(e,t,o,i){var s=this,u="",c=t.lookup(e[1]);if(c){if(n(c))for(var l=0,p=c.length;l<p;++l)u+=this.renderTokens(e[4],t.push(c[l]),o,i);else if("object"===(void 0===c?"undefined":a(c))||"string"==typeof c||"number"==typeof c)u+=this.renderTokens(e[4],t.push(c),o,i);else if(r(c)){if("string"!=typeof i)throw new Error("Cannot use higher-order sections without the original template");null!=(c=c.call(t.view,i.slice(e[3],e[5]),function(e){return s.render(e,t,o)}))&&(u+=c)}else u+=this.renderTokens(e[4],t,o,i);return u}},w.prototype.renderInverted=function(e,t,r,o){var i=t.lookup(e[1]);if(!i||n(i)&&0===i.length)return this.renderTokens(e[4],t,r,o)},w.prototype.renderPartial=function(e,t,n){if(n){var o=r(n)?n(e[1]):n[e[1]];return null!=o?this.renderTokens(this.parse(o),t,n,o):void 0}},w.prototype.unescapedValue=function(e,t){var n=t.lookup(e[1]);if(null!=n)return n},w.prototype.escapedValue=function(t,n){var r=n.lookup(t[1]);if(null!=r)return e.escape(r)},w.prototype.rawValue=function(e){return e[1]},e.name="mustache.js",e.version="2.3.0",e.tags=["{{","}}"];var b=new w;return e.clearCache=function(){return b.clearCache()},e.parse=function(e,t){return b.parse(e,t)},e.render=function(e,t,r){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+(n(o=e)?"array":void 0===o?"undefined":a(o))+'" was given as the first argument for mustache#render(template, view, partials)');var o;return b.render(e,t,r)},e.to_html=function(t,n,o,i){var s=e.render(t,n,o);if(!r(i))return s;i(s)},e.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,function(e){return l[e]})},e.Scanner=y,e.Context=g,e.Writer=w,e},"object"===a(t)&&t&&"string"!=typeof t.nodeName?s(t):(o=[t],void 0===(i="function"==typeof(r=s)?r.apply(t,o):r)||(e.exports=i))},function(e,t,n){"use strict";var r=n(0),o="<h1>Hello <i>{{name}}</i></h1>";r.parse(o),e.exports.sayHello=function(e){return r.render(o,{name:e})}},function(e,t,n){"use strict";window.addEventListener("load",function(){var e=(0,n(1).sayHello)("Broswer");document.getElementsByTagName("body")[0].innerHTML=e})}]);