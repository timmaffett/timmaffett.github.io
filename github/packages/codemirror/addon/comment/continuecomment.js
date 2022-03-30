var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.checkStringArgs=function(a,c,b){if(null==a)throw new TypeError("The 'this' value for String.prototype."+b+" must not be null or undefined");if(c instanceof RegExp)throw new TypeError("First argument to String.prototype."+b+" must not be a regular expression");return a+""};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;
$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){if(a==Array.prototype||a==Object.prototype)return a;a[c]=b.value;return a};
$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var c=0;c<a.length;++c){var b=a[c];if(b&&b.Math==Math)return b}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};
$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,c){var b=$jscomp.propertyToPolyfillSymbol[c];if(null==b)return a[c];b=a[b];return void 0!==b?b:a[c]};$jscomp.polyfill=function(a,c,b,e){c&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,c,b,e):$jscomp.polyfillUnisolated(a,c,b,e))};
$jscomp.polyfillUnisolated=function(a,c,b,e){b=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var g=a[e];if(!(g in b))return;b=b[g]}a=a[a.length-1];e=b[a];c=c(e);c!=e&&null!=c&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:c})};
$jscomp.polyfillIsolated=function(a,c,b,e){var g=a.split(".");a=1===g.length;e=g[0];e=!a&&e in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var r=0;r<g.length-1;r++){var d=g[r];if(!(d in e))return;e=e[d]}g=g[g.length-1];b=$jscomp.IS_SYMBOL_NATIVE&&"es6"===b?e[g]:null;c=c(b);null!=c&&(a?$jscomp.defineProperty($jscomp.polyfills,g,{configurable:!0,writable:!0,value:c}):c!==b&&(void 0===$jscomp.propertyToPolyfillSymbol[g]&&(b=1E9*Math.random()>>>0,$jscomp.propertyToPolyfillSymbol[g]=$jscomp.IS_SYMBOL_NATIVE?
$jscomp.global.Symbol(g):$jscomp.POLYFILL_PREFIX+b+"$"+g),$jscomp.defineProperty(e,$jscomp.propertyToPolyfillSymbol[g],{configurable:!0,writable:!0,value:c})))};$jscomp.polyfill("String.prototype.repeat",function(a){return a?a:function(c){var b=$jscomp.checkStringArgs(this,null,"repeat");if(0>c||1342177279<c)throw new RangeError("Invalid count value");c|=0;for(var e="";c;)if(c&1&&(e+=b),c>>>=1)b+=b;return e}},"es6","es3");
(function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)})(function(a){function c(d){if(d.getOption("disableInput"))return a.Pass;for(var k=d.listSelections(),h,w=[],u=0;u<k.length;u++){var l=k[u].head;if(!/\bcomment\b/.test(d.getTokenTypeAt(l)))return a.Pass;var p=d.getModeAt(l);if(!h)h=p;else if(h!=p)return a.Pass;var m=null,f,q=h.blockCommentStart;p=h.lineComment;if(q&&
h.blockCommentContinue){var n=d.getLine(l.line);var v=n.lastIndexOf(h.blockCommentEnd,l.ch-h.blockCommentEnd.length);if(!(-1!=v&&v==l.ch-h.blockCommentEnd.length||p&&-1<(f=n.lastIndexOf(p,l.ch-1))&&/\bcomment\b/.test(d.getTokenTypeAt({line:l.line,ch:f+1}))))if(l.ch>=q.length&&-1<(f=n.lastIndexOf(q,l.ch-q.length))&&f>v)if(b(0,n)>=f)m=n.slice(0,f);else{q=d.options.tabSize;var x;f=a.countColumn(n,f,q);m=d.options.indentWithTabs?r.call("\t",x=Math.floor(f/q))+r.call(" ",f-q*x):r.call(" ",f)}else-1<(f=
n.indexOf(h.blockCommentContinue))&&f<=l.ch&&f<=b(0,n)&&(m=n.slice(0,f));null!=m&&(m+=h.blockCommentContinue)}null==m&&p&&e(d)&&((null==n&&(n=d.getLine(l.line)),f=n.indexOf(p),l.ch||f)?-1<f&&b(0,n)>=f&&(m=-1<b(l.ch,n),m||(l=d.getLine(l.line+1)||"",m=l.indexOf(p),m=-1<m&&b(0,l)>=m||null),m&&(m=n.slice(0,f)+p+n.slice(f+p.length).match(/^\s*/)[0])):m="");if(null==m)return a.Pass;w[u]="\n"+m}d.operation(function(){for(var t=k.length-1;0<=t;t--)d.replaceRange(w[t],k[t].from(),k[t].to(),"+insert")})}function b(d,
k){g.lastIndex=d;return(d=g.exec(k))?d.index:-1}function e(d){return(d=d.getOption("continueComments"))&&"object"==typeof d?!1!==d.continueLineComment:!0}var g=/\S/g,r=String.prototype.repeat||function(d){return Array(d+1).join(this)};a.defineOption("continueComments",null,function(d,k,h){h&&h!=a.Init&&d.removeKeyMap("continueComment");k&&(h="Enter","string"==typeof k?h=k:"object"==typeof k&&k.key&&(h=k.key),k={name:"continueComment"},k[h]=c,d.addKeyMap(k))})});
