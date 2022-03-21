(function(m){"object"==typeof exports&&"object"==typeof module?m(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],m):m(CodeMirror)})(function(m){function q(a,b){for(var l=0,e=a.length;l<e;++l)b(a[l])}function t(a,b,l,e){var c=a.getCursor(),d=l(a,c);if(!/\b(?:string|comment)\b/.test(d.type)){var g=m.innerMode(a.getMode(),d.state);if("json"!==g.mode.helperType){d.state=g.state;/^[\w$_]*$/.test(d.string)?d.end>c.ch&&(d.end=c.ch,d.string=d.string.slice(0,
c.ch-d.start)):d={start:c.ch,end:c.ch,string:"",state:d.state,type:"."==d.string?"property":null};for(g=d;"property"==g.type;){g=l(a,r(c.line,g.start));if("."!=g.string)return;g=l(a,r(c.line,g.start));if(!p)var p=[];p.push(g)}return{list:u(d,p,b,e),from:r(c.line,d.start),to:r(c.line,d.end)}}}}function v(a,b){a=a.getTokenAt(b);b.ch==a.start+1&&"."==a.string.charAt(0)?(a.end=a.start,a.string=".",a.type="property"):/^\.[\w$_]*$/.test(a.string)&&(a.type="property",a.start++,a.string=a.string.replace(/\./,
""));return a}function u(a,b,l,e){function c(h){var k;if(k=0==h.lastIndexOf(p,0)){a:if(Array.prototype.indexOf)k=-1!=g.indexOf(h);else{for(k=g.length;k--;)if(g[k]===h){k=!0;break a}k=!1}k=!k}k&&g.push(h)}function d(h){"string"==typeof h?q(w,c):h instanceof Array?q(x,c):h instanceof Function&&q(y,c);if(Object.getOwnPropertyNames&&Object.getPrototypeOf)for(;h;h=Object.getPrototypeOf(h))Object.getOwnPropertyNames(h).forEach(c);else for(var k in h)c(k)}var g=[],p=a.string,n=e&&e.globalScope||window;if(b&&
b.length){a=b.pop();var f;a.type&&0===a.type.indexOf("variable")?(e&&e.additionalContext&&(f=e.additionalContext[a.string]),e&&!1===e.useGlobalScope||(f=f||n[a.string])):"string"==a.type?f="":"atom"==a.type?f=1:"function"==a.type&&(null==n.jQuery||"$"!=a.string&&"jQuery"!=a.string||"function"!=typeof n.jQuery?null!=n._&&"_"==a.string&&"function"==typeof n._&&(f=n._()):f=n.jQuery());for(;null!=f&&b.length;)f=f[b.pop().string];null!=f&&d(f)}else{for(b=a.state.localVars;b;b=b.next)c(b.name);for(f=a.state.context;f;f=
f.prev)for(b=f.vars;b;b=b.next)c(b.name);for(b=a.state.globalVars;b;b=b.next)c(b.name);if(e&&null!=e.additionalContext)for(var z in e.additionalContext)c(z);e&&!1===e.useGlobalScope||d(n);q(l,c)}return g}var r=m.Pos;m.registerHelper("hint","javascript",function(a,b){return t(a,A,function(l,e){return l.getTokenAt(e)},b)});m.registerHelper("hint","coffeescript",function(a,b){return t(a,B,v,b)});var w="charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search".split(" "),
x="length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight ".split(" "),y=["prototype","apply","call","bind"],A="break case catch class const continue debugger default delete do else export extends false finally for function if in import instanceof new null return super switch this throw true try typeof var void while with yield".split(" "),B="and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes".split(" ")});
