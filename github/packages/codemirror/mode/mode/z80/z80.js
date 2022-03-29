(function(d){"object"==typeof exports&&"object"==typeof module?d(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],d):d(CodeMirror)})(function(d){d.defineMode("z80",function(p,k){var e=k.ez80;if(e){var f=/^(exx?|(ld|cp)([di]r?)?|[lp]ea|pop|push|ad[cd]|cpl|daa|dec|inc|neg|sbc|sub|and|bit|[cs]cf|x?or|res|set|r[lr]c?a?|r[lr]d|s[lr]a|srl|djnz|nop|[de]i|halt|im|in([di]mr?|ir?|irx|2r?)|ot(dmr?|[id]rx|imr?)|out(0?|[di]r?|[di]2r?)|tst(io)?|slp)(\.([sl]?i)?[sl])?\b/i;
var g=/^(((call|j[pr]|rst|ret[in]?)(\.([sl]?i)?[sl])?)|(rs|st)mix)\b/i}else f=/^(exx?|(ld|cp|in)([di]r?)?|pop|push|ad[cd]|cpl|daa|dec|inc|neg|sbc|sub|and|bit|[cs]cf|x?or|res|set|r[lr]c?a?|r[lr]d|s[lr]a|srl|djnz|nop|rst|[de]i|halt|im|ot[di]r|out[di]?)\b/i,g=/^(call|j[pr]|ret[in]?|b_?(call|jump))\b/i;var l=/^(af?|bc?|c|de?|e|hl?|l|i[xy]?|r|sp)\b/i,m=/^(n?[zc]|p[oe]?|m)\b/i,n=/^([hl][xy]|i[xy][hl]|slia|sll)\b/i,h=/^([\da-f]+h|[0-7]+o|[01]+b|\d+d?)\b/i;return{startState:function(){return{context:0}},
token:function(a,b){a.column()||(b.context=0);if(a.eatSpace())return null;if(a.eatWhile(/\w/)){e&&a.eat(".")&&a.eatWhile(/\w/);var c=a.current();if(a.indentation()){if((1==b.context||4==b.context)&&l.test(c))return b.context=4,"var2";if(2==b.context&&m.test(c))return b.context=4,"var3";if(f.test(c))return b.context=1,"keyword";if(g.test(c))return b.context=2,"keyword";if(4==b.context&&h.test(c))return"number";if(n.test(c))return"error"}else if(a.match(h))return"number"}else{if(a.eat(";"))return a.skipToEnd(),
"comment";if(a.eat('"')){for(;(c=a.next())&&'"'!=c;)"\\"==c&&a.next();return"string"}if(a.eat("'")){if(a.match(/\\?.'/))return"number"}else if(a.eat(".")||a.sol()&&a.eat("#")){if(b.context=5,a.eatWhile(/\w/))return"def"}else if(a.eat("$")){if(a.eatWhile(/[\da-f]/i))return"number"}else if(a.eat("%")){if(a.eatWhile(/[01]/))return"number"}else a.next()}return null}}});d.defineMIME("text/x-z80","z80");d.defineMIME("text/x-ez80",{name:"z80",ez80:!0})});
