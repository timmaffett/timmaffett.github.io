(function(d){"object"==typeof exports&&"object"==typeof module?d(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],d):d(CodeMirror)})(function(d){d.defineMode("jinja2",function(){function h(a,b){var c=a.peek();if(b.incomment)return a.skipTo("#}")?(a.eatWhile(/#|}/),b.incomment=!1):a.skipToEnd(),"comment";if(b.intag){if(b.operator){b.operator=!1;if(a.match(e))return"atom";if(a.match(f))return"number"}if(b.sign){b.sign=!1;if(a.match(e))return"atom";
if(a.match(f))return"number"}if(b.instring)return c==b.instring&&(b.instring=!1),a.next(),"string";if("'"==c||'"'==c)return b.instring=c,a.next(),"string";if(a.match(b.intag+"}")||a.eat("-")&&a.match(b.intag+"}"))return b.intag=!1,"tag";if(a.match(k))return b.operator=!0,"operator";if(a.match(l))b.sign=!0;else if(a.eat(" ")||a.sol()){if(a.match(g))return"keyword";if(a.match(e))return"atom";if(a.match(f))return"number";a.sol()&&a.next()}else a.next();return"variable"}if(a.eat("{")){if(a.eat("#"))return b.incomment=
!0,a.skipTo("#}")?(a.eatWhile(/#|}/),b.incomment=!1):a.skipToEnd(),"comment";if(c=a.eat(/\{|%/))return b.intag=c,"{"==c&&(b.intag="}"),a.eat("-"),"tag"}a.next()}var g="and as block endblock by cycle debug else elif extends filter endfilter firstof for endfor if endif ifchanged endifchanged ifequal endifequal ifnotequal endifnotequal in include load not now or parsed regroup reversed spaceless endspaceless ssi templatetag openblock closeblock openvariable closevariable openbrace closebrace opencomment closecomment widthratio url with endwith get_current_language trans endtrans noop blocktrans endblocktrans get_available_languages get_current_language_bidi plural".split(" "),
k=/^[+\-*&%=<>!?|~^]/,l=/^[:\[\(\{]/,e=["true","false"],f=/^(\d[+\-\*\/])?\d+(\.\d+)?/;g=new RegExp("(("+g.join(")|(")+"))\\b");e=new RegExp("(("+e.join(")|(")+"))\\b");return{startState:function(){return{tokenize:h}},token:function(a,b){return b.tokenize(a,b)},blockCommentStart:"{#",blockCommentEnd:"#}"}});d.defineMIME("text/jinja2","jinja2")});
