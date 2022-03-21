var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(l,r,p){l instanceof String&&(l=String(l));for(var y=l.length,w=0;w<y;w++){var E=l[w];if(r.call(p,E,w,l))return{i:w,v:E}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(l,r,p){if(l==Array.prototype||l==Object.prototype)return l;l[r]=p.value;return l};$jscomp.getGlobal=function(l){l=["object"==typeof globalThis&&globalThis,l,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var r=0;r<l.length;++r){var p=l[r];if(p&&p.Math==Math)return p}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(l,r){var p=$jscomp.propertyToPolyfillSymbol[r];if(null==p)return l[r];p=l[p];return void 0!==p?p:l[r]};
$jscomp.polyfill=function(l,r,p,y){r&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(l,r,p,y):$jscomp.polyfillUnisolated(l,r,p,y))};$jscomp.polyfillUnisolated=function(l,r,p,y){p=$jscomp.global;l=l.split(".");for(y=0;y<l.length-1;y++){var w=l[y];if(!(w in p))return;p=p[w]}l=l[l.length-1];y=p[l];r=r(y);r!=y&&null!=r&&$jscomp.defineProperty(p,l,{configurable:!0,writable:!0,value:r})};
$jscomp.polyfillIsolated=function(l,r,p,y){var w=l.split(".");l=1===w.length;y=w[0];y=!l&&y in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var E=0;E<w.length-1;E++){var K=w[E];if(!(K in y))return;y=y[K]}w=w[w.length-1];p=$jscomp.IS_SYMBOL_NATIVE&&"es6"===p?y[w]:null;r=r(p);null!=r&&(l?$jscomp.defineProperty($jscomp.polyfills,w,{configurable:!0,writable:!0,value:r}):r!==p&&(void 0===$jscomp.propertyToPolyfillSymbol[w]&&(p=1E9*Math.random()>>>0,$jscomp.propertyToPolyfillSymbol[w]=$jscomp.IS_SYMBOL_NATIVE?
$jscomp.global.Symbol(w):$jscomp.POLYFILL_PREFIX+p+"$"+w),$jscomp.defineProperty(y,$jscomp.propertyToPolyfillSymbol[w],{configurable:!0,writable:!0,value:r})))};$jscomp.polyfill("Array.prototype.find",function(l){return l?l:function(r,p){return $jscomp.findInternal(this,r,p).v}},"es6","es3");
(function(l){"object"==typeof exports&&"object"==typeof module?l(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","diff_match_patch"],l):l(CodeMirror)})(function(l){function r(a,b){this.mv=a;this.type=b;this.classes="left"==b?{chunk:"CodeMirror-merge-l-chunk",start:"CodeMirror-merge-l-chunk-start",end:"CodeMirror-merge-l-chunk-end",insert:"CodeMirror-merge-l-inserted",del:"CodeMirror-merge-l-deleted",connect:"CodeMirror-merge-l-connect"}:{chunk:"CodeMirror-merge-r-chunk",
start:"CodeMirror-merge-r-chunk-start",end:"CodeMirror-merge-r-chunk-end",insert:"CodeMirror-merge-r-inserted",del:"CodeMirror-merge-r-deleted",connect:"CodeMirror-merge-r-connect"}}function p(a){a.diffOutOfDate&&(a.diff=aa(a.orig.getValue(),a.edit.getValue(),a.mv.options.ignoreWhitespace),a.chunks=ba(a.diff),a.diffOutOfDate=!1,l.signal(a.edit,"updateDiff",a.diff))}function y(a){function b(n){M=!0;m=!1;"full"==n&&(a.svg&&N(a.svg),a.copyButtons&&N(a.copyButtons),S(a.edit,g.marked,a.classes),S(a.orig,
h.marked,a.classes),g.from=g.to=h.from=h.to=0);p(a);a.showDifferences&&(ca(a.edit,a.diff,g,DIFF_INSERT,a.classes),ca(a.orig,a.diff,h,DIFF_DELETE,a.classes));"align"==a.mv.options.connect&&T(a);I(a);null!=a.needsScrollSync&&E(a,a.needsScrollSync);M=!1}function c(n){M||(a.dealigned=!0,d(n))}function d(n){M||m||(clearTimeout(k),!0===n&&(m=!0),k=setTimeout(b,!0===n?20:250))}function f(n,q){a.diffOutOfDate||(a.diffOutOfDate=!0,g.from=g.to=h.from=h.to=0);c(q.text.length-1!=q.to.line-q.from.line)}function e(){a.diffOutOfDate=
!0;a.dealigned=!0;b("full")}var g={from:0,to:0,marked:[]},h={from:0,to:0,marked:[]},k,m=!1;a.edit.on("change",f);a.orig.on("change",f);a.edit.on("swapDoc",e);a.orig.on("swapDoc",e);"align"==a.mv.options.connect&&(l.on(a.edit.state.trackAlignable,"realign",c),l.on(a.orig.state.trackAlignable,"realign",c));a.edit.on("viewportChange",function(){d(!1)});a.orig.on("viewportChange",function(){d(!1)});b();return b}function w(a,b){a.edit.on("scroll",function(){E(a,!0)&&I(a)});a.orig.on("scroll",function(){E(a,
!1)&&I(a);b&&E(b,!0)&&I(b)})}function E(a,b){if(a.diffOutOfDate)return a.lockScroll&&null==a.needsScrollSync&&(a.needsScrollSync=b),!1;a.needsScrollSync=null;if(!a.lockScroll)return!0;var c=+new Date;if(b){var d=a.edit;var f=a.orig}else d=a.orig,f=a.edit;if(d.state.scrollSetBy==a&&(d.state.scrollSetAt||0)+250>c)return!1;var e=d.getScrollInfo();if("align"==a.mv.options.connect)v=e.top;else{var g=.5*e.clientHeight;v=e.top+g;var h=d.lineAtHeight(v,"local");for(var k=a.chunks,m,n,q,z=0;z<k.length;z++){var u=
k[z],A=b?u.editFrom:u.origFrom,x=b?u.editTo:u.origTo;null==n&&(A>h?(n=u.editFrom,q=u.origFrom):x>h&&(n=u.editTo,q=u.origTo));if(x<=h){m=u.editTo;var t=u.origTo}else A<=h&&(m=u.editFrom,t=u.origFrom)}h={before:m,after:n};t={before:t,after:q};d=K(d,b?h:t);b=K(f,b?t:h);var v=b.top-g+(v-d.top)/(d.bot-d.top)*(b.bot-b.top),B;v>e.top&&1>(B=e.top/g)?v=v*B+e.top*(1-B):(b=e.height-e.clientHeight-e.top)<g&&(d=f.getScrollInfo(),d.height-d.clientHeight-v>b&&1>(B=b/g)&&(v=v*B+(d.height-d.clientHeight-b)*(1-B)))}f.scrollTo(e.left,
v);f.state.scrollSetAt=c;f.state.scrollSetBy=a;return!0}function K(a,b){var c=b.after;null==c&&(c=a.lastLine()+1);return{top:a.heightAtLine(b.before||0,"local"),bot:a.heightAtLine(c,"local")}}function da(a,b,c){(a.lockScroll=b)&&0!=c&&E(a,DIFF_INSERT)&&I(a);(b?l.addClass:l.rmClass)(a.lockButton,"CodeMirror-merge-scrolllock-enabled")}function S(a,b,c){for(var d=0;d<b.length;++d){var f=b[d];if(f instanceof l.TextMarker)f.clear();else if(f.parent)for(var e=a,g=c,h=g.classLocation,k=0;k<h.length;k++)e.removeLineClass(f,
h[k],g.chunk),e.removeLineClass(f,h[k],g.start),e.removeLineClass(f,h[k],g.end)}b.length=0}function ca(a,b,c,d,f){var e=a.getViewport();a.operation(function(){c.from==c.to||20<e.from-c.to||20<c.from-e.to?(S(a,c.marked,f),U(a,b,d,c.marked,e.from,e.to,f),c.from=e.from,c.to=e.to):(e.from<c.from&&(U(a,b,d,c.marked,e.from,c.from,f),c.from=e.from),e.to>c.to&&(U(a,b,d,c.marked,c.to,e.to,f),c.to=e.to))})}function V(a,b,c,d,f,e){var g=c.classLocation;b=a.getLineHandle(b);for(var h=0;h<g.length;h++)d&&a.addLineClass(b,
g[h],c.chunk),f&&a.addLineClass(b,g[h],c.start),e&&a.addLineClass(b,g[h],c.end);return b}function U(a,b,c,d,f,e,g){function h(v,B){for(var H=Math.max(f,v),D=Math.min(e,B),F=H;F<D;++F)d.push(V(a,F,g,!0,F==v,F==B-1));v==B&&H==B&&D==B&&(H?d.push(V(a,H-1,g,!1,!1,!0)):d.push(V(a,H,g,!1,!0,!1)))}for(var k=C(0,0),m=C(f,0),n=a.clipPos(C(e-1)),q=c==DIFF_DELETE?g.del:g.insert,z=0,u=!1,A=0;A<b.length;++A){var x=b[A],t=x[0];x=x[1];t==DIFF_EQUAL?(t=k.line+(ea(b,A)?0:1),O(k,x),x=k.line+(fa(b,A)?1:0),x>t&&(u&&(h(z,
t),u=!1),z=x)):(u=!0,t==c&&(t=O(k,x,!0),k=0<(m.line-k.line||m.ch-k.ch)?m:k,x=0>(n.line-t.line||n.ch-t.ch)?n:t,k.line==x.line&&k.ch==x.ch||d.push(a.markText(k,x,{className:q})),k=t))}u&&h(z,k.line+1)}function I(a){if(a.showDifferences){if(a.svg){N(a.svg);var b=a.gap.offsetWidth;ha(a.svg,"width",b,"height",a.gap.offsetHeight)}a.copyButtons&&N(a.copyButtons);var c=a.edit.getViewport(),d=a.orig.getViewport(),f=a.mv.wrap.getBoundingClientRect().top,e=f-a.edit.getScrollerElement().getBoundingClientRect().top+
a.edit.getScrollInfo().top;f=f-a.orig.getScrollerElement().getBoundingClientRect().top+a.orig.getScrollInfo().top;for(var g=0;g<a.chunks.length;g++){var h=a.chunks[g];if(h.editFrom<=c.to&&h.editTo>=c.from&&h.origFrom<=d.to&&h.origTo>=d.from){var k=a,m=f,n=e,q=b,z="left"==k.type,u=k.orig.heightAtLine(h.origFrom,"local",!0)-m;if(k.svg){var A=u,x=k.edit.heightAtLine(h.editFrom,"local",!0)-n;if(z){var t=A;A=x;x=t}m=k.orig.heightAtLine(h.origTo,"local",!0)-m;var v=k.edit.heightAtLine(h.editTo,"local",
!0)-n;z&&(t=m,m=v,v=t);z=" C "+q/2+" "+x+" "+q/2+" "+A+" "+(q+2)+" "+A;A=" C "+q/2+" "+m+" "+q/2+" "+v+" -1 "+v;ha(k.svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg","path")),"d","M -1 "+x+z+" L "+(q+2)+" "+m+A+" z","class",k.classes.connect)}k.copyButtons&&(q=k.copyButtons.appendChild(G("div","left"==k.type?"\u21dd":"\u21dc","CodeMirror-merge-copy")),x=k.mv.options.allowEditingOriginals,q.title=k.edit.phrase(x?"Push to left":"Revert chunk"),q.chunk=h,q.style.top=(h.origTo>h.origFrom?
u:k.edit.heightAtLine(h.editFrom,"local")-n)+"px",q.setAttribute("role","button"),x&&(n=k.edit.heightAtLine(h.editFrom,"local")-n,u=k.copyButtons.appendChild(G("div","right"==k.type?"\u21dd":"\u21dc","CodeMirror-merge-copy-reverse")),u.title="Push to right",u.chunk={editFrom:h.origFrom,editTo:h.origTo,origFrom:h.editFrom,origTo:h.editTo},u.style.top=n+"px","right"==k.type?u.style.left="2px":u.style.right="2px",u.setAttribute("role","button")))}}}}function ia(a,b){for(var c=0,d=0,f=0;f<b.length;f++){var e=
b[f];if(e.editTo>a&&e.editFrom<=a)return null;if(e.editFrom>a)break;c=e.editTo;d=e.origTo}return d+(a-c)}function W(a,b,c){var d=a.state.trackAlignable;a=a.firstLine();for(var f=0,e=[],g=0;;g++){for(var h=b[g],k=h?c?h.origFrom:h.editFrom:1E9;f<d.alignable.length;f+=2){var m=d.alignable[f]+1;if(!(m<=a))if(m<=k)e.push(m);else break}if(!h)break;e.push(a=c?h.origTo:h.editTo)}return e}function ja(a,b,c,d){var f=0,e=0,g=0,h=0;a:for(;;f++){var k=a[f],m=b[e];if(!k&&null==m)break;var n=k?k[0]:1E9;for(m=null==
m?1E9:m;g<c.length;){var q=c[g];if(q.origFrom<=m&&q.origTo>m){e++;f--;continue a}if(q.editTo>n){if(q.editFrom<=n)continue a;break}h+=q.origTo-q.origFrom-(q.editTo-q.editFrom);g++}n==m-h?(k[d]=m,e++):n<m-h?k[d]=n+h:(k=[m-h,null,null],k[d]=m,a.splice(f,0,k),e++)}}function ra(a,b){var c=W(a.edit,a.chunks,!1),d=[];if(b)for(var f=0,e=0;f<b.chunks.length;f++){for(var g=b.chunks[f].editTo;e<c.length&&c[e]<g;)e++;e!=c.length&&c[e]==g||c.splice(e++,0,g)}for(f=0;f<c.length;f++)d.push([c[f],null,null]);ja(d,
W(a.orig,a.chunks,!0),a.chunks,1);b&&ja(d,W(b.orig,b.chunks,!0),b.chunks,2);return d}function T(a,b){if(a.dealigned||b){if(!a.orig.curOp)return a.orig.operation(function(){T(a,b)});a.dealigned=!1;var c=a.mv.left==a?a.mv.right:a.mv.left;c&&(p(c),c.dealigned=!1);for(var d=ra(a,c),f=a.mv.aligners,e=0;e<f.length;e++)f[e].clear();f.length=0;var g=[a.edit,a.orig],h=[],k=[];c&&g.push(c.orig);for(e=0;e<g.length;e++)h.push(g[e].getScrollInfo().top),k.push(-g[e].getScrollerElement().getBoundingClientRect().top);
(k[0]!=k[1]||3==g.length&&k[1]!=k[2])&&ka(g,k,[0,0,0],f);for(c=0;c<d.length;c++)ka(g,k,d[c],f);for(e=0;e<g.length;e++)g[e].scrollTo(null,h[e])}}function ka(a,b,c,d){for(var f=-1E8,e=[],g=0;g<a.length;g++)if(null!=c[g]){var h=a[g].heightAtLine(c[g],"local")-b[g];e[g]=h;f=Math.max(f,h)}for(g=0;g<a.length;g++)if(null!=c[g]){var k=f-e[g];if(1<k){b=d;h=b.push;var m=a[g];var n=c[g],q=!0;n>m.lastLine()&&(n--,q=!1);var z=document.createElement("div");z.className="CodeMirror-merge-spacer";z.style.height=k+
"px";z.style.minWidth="1px";m=m.addLineWidget(n,z,{height:k,above:q,mergeSpacer:!0,handleMouseEvents:!0});h.call(b,m)}}}function la(a,b,c,d){if(!a.diffOutOfDate){var f=d.origTo>c.lastLine()?C(d.origFrom-1):C(d.origFrom,0),e=C(d.origTo,0),g=d.editTo>b.lastLine()?C(d.editFrom-1):C(d.editFrom,0);d=C(d.editTo,0);var h=a.mv.options.revertChunk;h?h(a.mv,c,f,e,b,g,d):b.replaceRange(c.getRange(f,e),g,d)}}function ma(a){var b=a.lockButton=G("div",null,"CodeMirror-merge-scrolllock");b.setAttribute("role","button");
var c=G("div",[b],"CodeMirror-merge-scrolllock-wrap");l.on(b,"click",function(){da(a,!a.lockScroll)});b=[c];!1!==a.mv.options.revertButtons&&(a.copyButtons=G("div",null,"CodeMirror-merge-copybuttons-"+a.type),l.on(a.copyButtons,"click",function(d){d=d.target||d.srcElement;d.chunk&&("CodeMirror-merge-copy-reverse"==d.className?la(a,a.orig,a.edit,d.chunk):la(a,a.edit,a.orig,d.chunk))}),b.unshift(a.copyButtons));"align"!=a.mv.options.connect&&((c=document.createElementNS&&document.createElementNS("http://www.w3.org/2000/svg",
"svg"))&&!c.createSVGRect&&(c=null),(a.svg=c)&&b.push(c));return a.gap=G("div",b,"CodeMirror-merge-gap")}function na(a){return"string"==typeof a?a:a.getValue()}function aa(a,b,c){X||(X=new diff_match_patch);a=X.diff_main(a,b);for(b=0;b<a.length;++b){var d=a[b];(c?/[^ \t]/.test(d[1]):d[1])?b&&a[b-1][0]==d[0]&&(a.splice(b--,1),a[b][1]+=d[1]):a.splice(b--,1)}return a}function ba(a){var b=[];if(!a.length)return b;for(var c=0,d=0,f=C(0,0),e=C(0,0),g=0;g<a.length;++g){var h=a[g],k=h[0];if(k==DIFF_EQUAL){var m=
!ea(a,g)||f.line<c||e.line<d?1:0;k=f.line+m;m=e.line+m;O(f,h[1],null,e);var n=fa(a,g)?1:0;h=f.line+n;n=e.line+n;h>k&&(g&&b.push({origFrom:d,origTo:m,editFrom:c,editTo:k}),c=h,d=n)}else O(k==DIFF_INSERT?f:e,h[1])}(c<=f.line||d<=e.line)&&b.push({origFrom:d,origTo:e.line+1,editFrom:c,editTo:f.line+1});return b}function fa(a,b){if(b==a.length-1)return!0;var c=a[b+1][1];if(1==c.length&&b<a.length-2||10!=c.charCodeAt(0))return!1;if(b==a.length-2)return!0;c=a[b+2][1];return(1<c.length||b==a.length-3)&&10==
c.charCodeAt(0)}function ea(a,b){if(0==b)return!0;var c=a[b-1][1];if(10!=c.charCodeAt(c.length-1))return!1;if(1==b)return!0;c=a[b-2][1];return 10==c.charCodeAt(c.length-1)}function sa(a,b,c){function d(){e.clear();a.removeLineClass(b,"wrap","CodeMirror-merge-collapsed-line")}a.addLineClass(b,"wrap","CodeMirror-merge-collapsed-line");var f=document.createElement("span");f.className="CodeMirror-merge-collapsed-widget";f.title=a.phrase("Identical text collapsed. Click to expand.");var e=a.markText(C(b,
0),C(c-1),{inclusiveLeft:!0,inclusiveRight:!0,replacedWith:f,clearOnEnter:!0});e.explicitlyCleared&&d();l.on(f,"click",d);e.on("clear",d);l.on(f,"click",d);return{mark:e,clear:d}}function ta(a,b){function c(){for(var g=0;g<d.length;g++)d[g].clear()}for(var d=[],f=0;f<b.length;f++){var e=b[f];e=sa(e.cm,e.line,e.line+a);d.push(e);e.mark.on("clear",c)}return d[0].mark}function oa(a,b,c,d){for(var f=0;f<a.chunks.length;f++)for(var e=a.chunks[f],g=e.editFrom-b;g<e.editTo+b;g++){var h=g+c;0<=h&&h<d.length&&
(d[h]=!1)}}function G(a,b,c,d){a=document.createElement(a);c&&(a.className=c);d&&(a.style.cssText=d);if("string"==typeof b)a.appendChild(document.createTextNode(b));else if(b)for(c=0;c<b.length;++c)a.appendChild(b[c]);return a}function N(a){for(var b=a.childNodes.length;0<b;--b)a.removeChild(a.firstChild)}function ha(a){for(var b=1;b<arguments.length;b+=2)a.setAttribute(arguments[b],arguments[b+1])}function Y(a,b){b||(b={});for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}function O(a,b,c,
d){a=c?C(a.line,a.ch):a;for(c=0;;){var f=b.indexOf("\n",c);if(-1==f)break;++a.line;d&&++d.line;c=f+1}a.ch=(c?0:a.ch)+(b.length-c);d&&(d.ch=(c?0:d.ch)+(b.length-c));return a}function Z(a){this.cm=a;this.alignable=[];this.height=a.doc.height;var b=this;a.on("markerAdded",function(c,d){d.collapsed&&(c=d.find(1),null!=c&&b.set(c.line,P))});a.on("markerCleared",function(c,d,f,e){null!=e&&d.collapsed&&b.check(e,P,b.hasMarker)});a.on("markerChanged",this.signal.bind(this));a.on("lineWidgetAdded",function(c,
d,f){d.mergeSpacer||(d.above?b.set(f-1,J):b.set(f,pa))});a.on("lineWidgetCleared",function(c,d,f){d.mergeSpacer||(d.above?b.check(f-1,J,b.hasWidgetBelow):b.check(f,pa,b.hasWidget))});a.on("lineWidgetChanged",this.signal.bind(this));a.on("change",function(c,d){c=d.from.line;var f=d.to.line-d.from.line,e=d.text.length-1,g=c+e;(f||e)&&b.map(c,f,e);b.check(g,P,b.hasMarker);(f||e)&&b.check(d.from.line,P,b.hasMarker)});a.on("viewportChange",function(){b.cm.doc.height!=b.height&&b.signal()})}function qa(a,
b){var c=null,d=a.state.diffViews,f=a.getCursor().line;if(d)for(var e=0;e<d.length;e++){var g=d[e],h=a==g.orig;p(g);if(0>b)a:{g=g.chunks;for(var k=g.length-1;0<=k;k--){var m=g[k];m=(h?m.origTo:m.editTo)-1;if(m<f){h=m;break a}}h=void 0}else a:{g=g.chunks;for(k=0;k<g.length;k++)if(m=g[k],m=h?m.origFrom:m.editFrom,m>f){h=m;break a}h=void 0}null!=h&&(null==c||(0>b?h>c:h<c))&&(c=h)}if(null!=c)a.setCursor(c,0);else return l.Pass}var C=l.Pos;r.prototype={constructor:r,init:function(a,b,c){this.edit=this.mv.edit;
(this.edit.state.diffViews||(this.edit.state.diffViews=[])).push(this);this.orig=l(a,Y({value:b,readOnly:!this.mv.options.allowEditingOriginals},Y(c)));"align"==this.mv.options.connect&&(this.edit.state.trackAlignable||(this.edit.state.trackAlignable=new Z(this.edit)),this.orig.state.trackAlignable=new Z(this.orig));this.lockButton.title=this.edit.phrase("Toggle locked scrolling");this.orig.state.diffViews=[this];a=c.chunkClassLocation||"background";"[object Array]"!=Object.prototype.toString.call(a)&&
(a=[a]);this.classes.classLocation=a;this.diff=aa(na(b),na(c.value),this.mv.options.ignoreWhitespace);this.chunks=ba(this.diff);this.diffOutOfDate=this.dealigned=!1;this.needsScrollSync=null;this.showDifferences=!1!==c.showDifferences},registerEvents:function(a){this.forceUpdate=y(this);da(this,!0,!1);w(this,a)},setShowDifferences:function(a){a=!1!==a;a!=this.showDifferences&&(this.showDifferences=a,this.forceUpdate("full"))}};var M=!1,Q=l.MergeView=function(a,b){if(!(this instanceof Q))return new Q(a,
b);this.options=b;var c=b.origLeft,d=null==b.origRight?b.orig:b.origRight,f=null!=c,e=null!=d,g=1+(f?1:0)+(e?1:0),h=[],k=this.left=null,m=this.right=null,n=this;if(f){k=this.left=new r(this,"left");var q=G("div",null,"CodeMirror-merge-pane CodeMirror-merge-left");h.push(q);h.push(ma(k))}f=G("div",null,"CodeMirror-merge-pane CodeMirror-merge-editor");h.push(f);if(e){m=this.right=new r(this,"right");h.push(ma(m));var z=G("div",null,"CodeMirror-merge-pane CodeMirror-merge-right");h.push(z)}(e?z:f).className+=
" CodeMirror-merge-pane-rightmost";h.push(G("div",null,null,"height: 0; clear: both;"));var u=this.wrap=a.appendChild(G("div",h,"CodeMirror-merge CodeMirror-merge-"+g+"pane"));this.edit=l(f,Y(b));k&&k.init(q,c,b);m&&m.init(z,d,b);b.collapseIdentical&&this.editor().operation(function(){var t=b.collapseIdentical;"number"!=typeof t&&(t=2);for(var v=[],B=n.editor(),H=B.firstLine(),D=H,F=B.lastLine();D<=F;D++)v.push(!0);n.left&&oa(n.left,t,H,v);n.right&&oa(n.right,t,H,v);for(D=0;D<v.length;D++)if(v[D]){F=
D+H;for(var R=1;D<v.length-1&&v[D+1];D++,R++);if(R>t){var L=[{line:F,cm:B}];n.left&&L.push({line:ia(F,n.left.chunks),cm:n.left.orig});n.right&&L.push({line:ia(F,n.right.chunks),cm:n.right.orig});L=ta(R,L);if(n.options.onCollapse)n.options.onCollapse(n,F,R,L)}}});"align"==b.connect&&(this.aligners=[],T(this.left||this.right,!0));k&&k.registerEvents(m);m&&m.registerEvents(k);var A=function(){k&&I(k);m&&I(m)};l.on(window,"resize",A);var x=setInterval(function(){for(var t=u.parentNode;t&&t!=document.body;t=
t.parentNode);t||(clearInterval(x),l.off(window,"resize",A))},5E3)};Q.prototype={constructor:Q,editor:function(){return this.edit},rightOriginal:function(){return this.right&&this.right.orig},leftOriginal:function(){return this.left&&this.left.orig},setShowDifferences:function(a){this.right&&this.right.setShowDifferences(a);this.left&&this.left.setShowDifferences(a)},rightChunks:function(){if(this.right)return p(this.right),this.right.chunks},leftChunks:function(){if(this.left)return p(this.left),
this.left.chunks}};var X,pa=1,J=2,P=4;Z.prototype={signal:function(){l.signal(this,"realign");this.height=this.cm.doc.height},set:function(a,b){for(var c=-1;c<this.alignable.length;c+=2){var d=this.alignable[c]-a;if(0==d){if((this.alignable[c+1]&b)==b)return;this.alignable[c+1]|=b;this.signal();return}if(0<d)break}this.signal();this.alignable.splice(c,0,a,b)},find:function(a){for(var b=0;b<this.alignable.length;b+=2)if(this.alignable[b]==a)return b;return-1},check:function(a,b,c){var d=this.find(a);
-1!=d&&this.alignable[d+1]&b&&!c.call(this,a)&&(this.signal(),(a=this.alignable[d+1]&~b)?this.alignable[d+1]=a:this.alignable.splice(d,2))},hasMarker:function(a){a=this.cm.getLineHandle(a);if(a.markedSpans)for(var b=0;b<a.markedSpans.length;b++)if(a.markedSpans[b].marker.collapsed&&null!=a.markedSpans[b].to)return!0;return!1},hasWidget:function(a){a=this.cm.getLineHandle(a);if(a.widgets)for(var b=0;b<a.widgets.length;b++)if(!a.widgets[b].above&&!a.widgets[b].mergeSpacer)return!0;return!1},hasWidgetBelow:function(a){if(a==
this.cm.lastLine())return!1;a=this.cm.getLineHandle(a+1);if(a.widgets)for(var b=0;b<a.widgets.length;b++)if(a.widgets[b].above&&!a.widgets[b].mergeSpacer)return!0;return!1},map:function(a,b,c){for(var d=c-b,f=a+b,e=b=-1,g=0;g<this.alignable.length;g+=2){var h=this.alignable[g];h==a&&this.alignable[g+1]&J&&(b=g);h==f&&this.alignable[g+1]&J&&(e=g);h<=a||(h<f?this.alignable.splice(g--,2):this.alignable[g]+=d)}-1<b&&(d=this.alignable[b+1],d==J?this.alignable.splice(b,2):this.alignable[b+1]=d&~J);-1<e&&
c&&this.set(a+c,J)}};l.commands.goNextDiff=function(a){return qa(a,1)};l.commands.goPrevDiff=function(a){return qa(a,-1)}});
