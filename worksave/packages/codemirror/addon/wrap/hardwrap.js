(function(l){"object"==typeof exports&&"object"==typeof module?l(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],l):l(CodeMirror)})(function(l){function v(a,c,b){for(var f=b.paragraphStart||a.getHelper(c,"paragraphStart"),e=c.line,d=a.firstLine();e>d;--e){var g=a.getLine(e);if(f&&f.test(g))break;if(!/\S/.test(g)){++e;break}}b=b.paragraphEnd||a.getHelper(c,"paragraphEnd");c=c.line+1;for(f=a.lastLine();c<=f;++c){g=a.getLine(c);if(b&&b.test(g)){++c;
break}if(!/\S/.test(g))break}return{from:e,to:c}}function A(a,c,b,f,e){for(var d=c;d<a.length&&" "==a.charAt(d);)d++;for(;0<d&&!b.test(a.slice(d-1,d+1));--d);if(!e&&d<=a.match(/^[ \t]*/)[0].length)for(d=c+1;d<a.length-1&&!b.test(a.slice(d-1,d+1));++d);for(b=!0;;b=!1){e=d;if(f)for(;" "==a.charAt(e-1);)--e;if(0==e&&b)d=c;else return{from:e,to:d}}}function t(a,c,b,f){c=a.clipPos(c);b=a.clipPos(b);var e=f.column||80,d=f.wrapOn||/\s\S|-[^\.\d]/,g=!1!==f.forceBreak;f=!1!==f.killTrailingSpace;var n=[],h=
"",p=c.line;c=a.getRange(c,b,!1);if(!c.length)return null;b=c[0].match(/^[ \t]*/)[0];b.length>=e&&(e=b.length+1);for(var r=0;r<c.length;++r){var k=c[r],w=h.length,x=0;h&&k&&!d.test(h.charAt(h.length-1)+k.charAt(0))&&(h+=" ",x=1);var u="";r&&(u=k.match(/^\s*/)[0],k=k.slice(u.length));h+=k;if(r){var y=h.length>e&&b==u&&A(h,e,d,f,g);y&&y.from==w&&y.to==w+x?(h=b+k,++p):n.push({text:[x?" ":""],from:m(p,w),to:m(p+1,u.length)})}for(;h.length>e;)if(k=A(h,e,d,f,g),k.from!=k.to||g&&b!==h.slice(0,k.to))n.push({text:["",
b],from:m(p,k.from),to:m(p,k.to)}),h=b+h.slice(k.to),++p;else break}n.length&&a.operation(function(){for(var z=0;z<n.length;++z){var q=n[z];(q.text||l.cmpPos(q.from,q.to))&&a.replaceRange(q.text,q.from,q.to)}});return n.length?{from:n[0].from,to:l.changeEnd(n[n.length-1])}:null}var m=l.Pos;l.defineExtension("wrapParagraph",function(a,c){c=c||{};a||(a=this.getCursor());a=v(this,a,c);return t(this,m(a.from,0),m(a.to-1),c)});l.commands.wrapLines=function(a){a.operation(function(){for(var c,b,f=a.listSelections(),
e=a.lastLine()+1,d=f.length-1;0<=d;d--)b=f[d],b.empty()?(b=v(a,b.head,{}),c=m(b.from,0),b=m(b.to-1)):(c=b.from(),b=b.to()),b.line>=e||(e=c.line,t(a,c,b,{}))})};l.defineExtension("wrapRange",function(a,c,b){return t(this,a,c,b||{})});l.defineExtension("wrapParagraphsInRange",function(a,c,b){b=b||{};var f=this,e=[];for(a=a.line;a<=c.line;)a=v(f,m(a,0),b),e.push(a),a=a.to;var d=!1;e.length&&f.operation(function(){for(var g=e.length-1;0<=g;--g)d=d||t(f,m(e[g].from,0),m(e[g].to-1),b)});return d})});