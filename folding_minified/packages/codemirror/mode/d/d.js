(function(h){"object"==typeof exports&&"object"==typeof module?h(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],h):h(CodeMirror)})(function(h){function n(g){var f={};g=g.split(" ");for(var k=0;k<g.length;++k)f[g[k]]=!0;return f}h.defineMode("d",function(g,f){function k(a,b){var c=a.next();if(r[c]){var d=r[c](a,b);if(!1!==d)return d}if('"'==c||"'"==c||"`"==c)return b.tokenize=z(c),b.tokenize(a,b);if(/[\[\]{}\(\),;:\.]/.test(c))return e=c,null;
if(/\d/.test(c))return a.eatWhile(/[\w\.]/),"number";if("/"==c){if(a.eat("+"))return b.tokenize=t,t(a,b);if(a.eat("*"))return b.tokenize=u,u(a,b);if(a.eat("/"))return a.skipToEnd(),"comment"}if(v.test(c))return a.eatWhile(v),"operator";a.eatWhile(/[\w\$_\xa1-\uffff]/);a=a.current();return A.propertyIsEnumerable(a)?(w.propertyIsEnumerable(a)&&(e="newstatement"),"keyword"):B.propertyIsEnumerable(a)?(w.propertyIsEnumerable(a)&&(e="newstatement"),"builtin"):C.propertyIsEnumerable(a)?"atom":"variable"}
function z(a){return function(b,c){for(var d=!1,l,x=!1;null!=(l=b.next());){if(l==a&&!d){x=!0;break}d=!d&&"\\"==l}if(x||!d&&!D)c.tokenize=null;return"string"}}function u(a,b){for(var c=!1,d;d=a.next();){if("/"==d&&c){b.tokenize=null;break}c="*"==d}return"comment"}function t(a,b){for(var c=!1,d;d=a.next();){if("/"==d&&c){b.tokenize=null;break}c="+"==d}return"comment"}function y(a,b,c,d,l){this.indented=a;this.column=b;this.type=c;this.align=d;this.prev=l}function p(a,b,c){var d=a.indented;a.context&&
"statement"==a.context.type&&(d=a.context.indented);return a.context=new y(d,b,c,null,a.context)}function m(a){var b=a.context.type;if(")"==b||"]"==b||"}"==b)a.indented=a.context.indented;return a.context=a.context.prev}var q=g.indentUnit,E=f.statementIndentUnit||q,A=f.keywords||{},B=f.builtin||{},w=f.blockKeywords||{},C=f.atoms||{},r=f.hooks||{},D=f.multiLineStrings,v=/[+\-*&%=<>!?|\/]/,e;return{startState:function(a){return{tokenize:null,context:new y((a||0)-q,0,"top",!1),indented:0,startOfLine:!0}},
token:function(a,b){var c=b.context;a.sol()&&(null==c.align&&(c.align=!1),b.indented=a.indentation(),b.startOfLine=!0);if(a.eatSpace())return null;e=null;var d=(b.tokenize||k)(a,b);if("comment"==d||"meta"==d)return d;null==c.align&&(c.align=!0);if(";"!=e&&":"!=e&&","!=e||"statement"!=c.type)if("{"==e)p(b,a.column(),"}");else if("["==e)p(b,a.column(),"]");else if("("==e)p(b,a.column(),")");else if("}"==e){for(;"statement"==c.type;)c=m(b);for("}"==c.type&&(c=m(b));"statement"==c.type;)c=m(b)}else e==
c.type?m(b):(("}"==c.type||"top"==c.type)&&";"!=e||"statement"==c.type&&"newstatement"==e)&&p(b,a.column(),"statement");else m(b);b.startOfLine=!1;return d},indent:function(a,b){if(a.tokenize!=k&&null!=a.tokenize)return h.Pass;a=a.context;b=b&&b.charAt(0);"statement"==a.type&&"}"==b&&(a=a.prev);var c=b==a.type;return"statement"==a.type?a.indented+("{"==b?0:E):a.align?a.column+(c?0:1):a.indented+(c?0:q)},electricChars:"{}",blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:"//",
fold:"brace"}});h.defineMIME("text/x-d",{name:"d",keywords:n("abstract alias align asm assert auto break case cast cdouble cent cfloat const continue debug default delegate delete deprecated export extern final finally function goto immutable import inout invariant is lazy macro module new nothrow override package pragma private protected public pure ref return shared short static super synchronized template this throw typedef typeid typeof volatile __FILE__ __LINE__ __gshared __traits __vector __parameters body catch class do else enum for foreach foreach_reverse if in interface mixin out scope struct switch try union unittest version while with"),
blockKeywords:n("body catch class do else enum for foreach foreach_reverse if in interface mixin out scope struct switch try union unittest version while with"),builtin:n("bool byte char creal dchar double float idouble ifloat int ireal long real short ubyte ucent uint ulong ushort wchar wstring void size_t sizediff_t"),atoms:n("exit failure success true false null"),hooks:{"@":function(g,f){g.eatWhile(/[\w\$_]/);return"meta"}}})});
