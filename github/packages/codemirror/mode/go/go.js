(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){f.defineMode("go",function(t){function h(a,c){var b=a.next();if('"'==b||"'"==b||"`"==b)return c.tokenize=u(b),c.tokenize(a,c);if(/[\d\.]/.test(b))return"."==b?a.match(/^[0-9]+([eE][\-+]?[0-9]+)?/):"0"==b?a.match(/^[xX][0-9a-fA-F]+/)||a.match(/^0[0-7]+/):a.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/),"number";
if(/[\[\]{}\(\),;:\.]/.test(b))return e=b,null;if("/"==b){if(a.eat("*"))return c.tokenize=l,l(a,c);if(a.eat("/"))return a.skipToEnd(),"comment"}if(m.test(b))return a.eatWhile(m),"operator";a.eatWhile(/[\w\$_\xa1-\uffff]/);a=a.current();if(v.propertyIsEnumerable(a)){if("case"==a||"default"==a)e="case";return"keyword"}return w.propertyIsEnumerable(a)?"atom":"variable"}function u(a){return function(c,b){for(var d=!1,g,n=!1;null!=(g=c.next());){if(g==a&&!d){n=!0;break}d=!d&&"`"!=a&&"\\"==g}if(n||!d&&
"`"!=a)b.tokenize=h;return"string"}}function l(a,c){for(var b=!1,d;d=a.next();){if("/"==d&&b){c.tokenize=h;break}b="*"==d}return"comment"}function p(a,c,b,d,g){this.indented=a;this.column=c;this.type=b;this.align=d;this.prev=g}function k(a,c,b){return a.context=new p(a.indented,c,b,null,a.context)}function q(a){if(a.context.prev){var c=a.context.type;if(")"==c||"]"==c||"}"==c)a.indented=a.context.indented;return a.context=a.context.prev}}var r=t.indentUnit,v={"break":!0,"case":!0,chan:!0,"const":!0,
"continue":!0,"default":!0,defer:!0,"else":!0,fallthrough:!0,"for":!0,func:!0,go:!0,"goto":!0,"if":!0,"import":!0,"interface":!0,map:!0,"package":!0,range:!0,"return":!0,select:!0,struct:!0,"switch":!0,type:!0,"var":!0,bool:!0,"byte":!0,complex64:!0,complex128:!0,float32:!0,float64:!0,int8:!0,int16:!0,int32:!0,int64:!0,string:!0,uint8:!0,uint16:!0,uint32:!0,uint64:!0,"int":!0,uint:!0,uintptr:!0,error:!0,rune:!0},w={"true":!0,"false":!0,iota:!0,nil:!0,append:!0,cap:!0,close:!0,complex:!0,copy:!0,"delete":!0,
imag:!0,len:!0,make:!0,"new":!0,panic:!0,print:!0,println:!0,real:!0,recover:!0},m=/[+\-*&^%:=<>!|\/]/,e;return{startState:function(a){return{tokenize:null,context:new p((a||0)-r,0,"top",!1),indented:0,startOfLine:!0}},token:function(a,c){var b=c.context;a.sol()&&(null==b.align&&(b.align=!1),c.indented=a.indentation(),c.startOfLine=!0,"case"==b.type&&(b.type="}"));if(a.eatSpace())return null;e=null;var d=(c.tokenize||h)(a,c);if("comment"==d)return d;null==b.align&&(b.align=!0);"{"==e?k(c,a.column(),
"}"):"["==e?k(c,a.column(),"]"):"("==e?k(c,a.column(),")"):"case"==e?b.type="case":"}"==e&&"}"==b.type?q(c):e==b.type&&q(c);c.startOfLine=!1;return d},indent:function(a,c){if(a.tokenize!=h&&null!=a.tokenize)return f.Pass;var b=a.context,d=c&&c.charAt(0);if("case"==b.type&&/^(?:case|default)\b/.test(c))return a.context.type="}",b.indented;a=d==b.type;return b.align?b.column+(a?0:1):b.indented+(a?0:r)},electricChars:"{}):",closeBrackets:"()[]{}''\"\"``",fold:"brace",blockCommentStart:"/*",blockCommentEnd:"*/",
lineComment:"//"}});f.defineMIME("text/x-go","go")});
