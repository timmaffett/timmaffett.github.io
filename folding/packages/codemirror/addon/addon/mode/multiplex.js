(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){e.multiplexingMode=function(h){function m(a,c,b,d){return"string"==typeof c?(b=a.indexOf(c,b),d&&-1<b?b+c.length:b):(c=c.exec(b?a.slice(b):a))?c.index+b+(d?c[0].length:0):-1}var k=Array.prototype.slice.call(arguments,1);return{startState:function(){return{outer:e.startState(h),innerActive:null,inner:null,
startingInner:!1}},copyState:function(a){return{outer:e.copyState(h,a.outer),innerActive:a.innerActive,inner:a.innerActive&&e.copyState(a.innerActive.mode,a.inner),startingInner:a.startingInner}},token:function(a,c){if(c.innerActive){var b=c.innerActive;f=a.string;if(!b.close&&a.sol())return c.innerActive=c.inner=null,this.token(a,c);g=b.close&&!c.startingInner?m(f,b.close,a.pos,b.parseDelimiters):-1;if(g==a.pos&&!b.parseDelimiters)return a.match(b.close),c.innerActive=c.inner=null,b.delimStyle&&
b.delimStyle+" "+b.delimStyle+"-close";-1<g&&(a.string=f.slice(0,g));var d=b.mode.token(a,c.inner);-1<g?a.string=f:a.pos>a.start&&(c.startingInner=!1);g==a.pos&&b.parseDelimiters&&(c.innerActive=c.inner=null);b.innerStyle&&(d=d?d+" "+b.innerStyle:b.innerStyle);return d}d=Infinity;for(var f=a.string,l=0;l<k.length;++l){b=k[l];var g=m(f,b.open,a.pos);if(g==a.pos)return b.parseDelimiters||a.match(b.open),c.startingInner=!!b.parseDelimiters,c.innerActive=b,a=0,h.indent&&(f=h.indent(c.outer,"",""),f!==
e.Pass&&(a=f)),c.inner=e.startState(b.mode,a),b.delimStyle&&b.delimStyle+" "+b.delimStyle+"-open";-1!=g&&g<d&&(d=g)}Infinity!=d&&(a.string=f.slice(0,d));c=h.token(a,c.outer);Infinity!=d&&(a.string=f);return c},indent:function(a,c,b){var d=a.innerActive?a.innerActive.mode:h;return d.indent?d.indent(a.innerActive?a.inner:a.outer,c,b):e.Pass},blankLine:function(a){var c=a.innerActive?a.innerActive.mode:h;c.blankLine&&c.blankLine(a.innerActive?a.inner:a.outer);if(a.innerActive)"\n"===a.innerActive.close&&
(a.innerActive=a.inner=null);else for(var b=0;b<k.length;++b){var d=k[b];"\n"===d.open&&(a.innerActive=d,a.inner=e.startState(d.mode,c.indent?c.indent(a.outer,"",""):0))}},electricChars:h.electricChars,innerMode:function(a){return a.inner?{state:a.inner,mode:a.innerActive.mode}:{state:a.outer,mode:h}}}}});
