(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../xml/xml"),require("../javascript/javascript"),require("../css/css")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../xml/xml","../javascript/javascript","../css/css"],e):e(CodeMirror)})(function(e){function t(m,c){for(var k in m)for(var f=c[k]||(c[k]=[]),d=m[k],g=d.length-1;0<=g;g--)f.unshift(d[g])}function x(m,c){for(var k=0;k<m.length;k++){var f=m[k],d;if(!(d=!f[0])){d=
f[1];var g=d.test;var a=c;var b=a.match;var h=f[0];var l=u[h];h=l?l:u[h]=new RegExp("\\s+"+h+"\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*");a=(a=b.call(a,h))?/^\s*(.*?)\s*$/.exec(a[2])[1]:"";d=g.call(d,a)}if(d)return f[2]}}var y={script:[["lang",/(javascript|babel)/i,"javascript"],["type",/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i,"javascript"],["type",/./,"text/plain"],[null,null,"javascript"]],style:[["lang",/^css$/i,"css"],["type",/^(text\/)?(x-)?(stylesheet|css)$/i,"css"],["type",
/./,"text/plain"],[null,null,"css"]]},u={};e.defineMode("htmlmixed",function(m,c){function k(a,b){var h=f.token(a,b.htmlState),l=/\btag\b/.test(h),r;if(l&&!/[<>\s\/]/.test(a.current())&&(r=b.htmlState.tagName&&b.htmlState.tagName.toLowerCase())&&d.hasOwnProperty(r))b.inTag=r+" ";else if(b.inTag&&l&&/>$/.test(a.current())){l=/^([\S]+) (.*)/.exec(b.inTag);b.inTag=null;a=">"==a.current()&&x(d[l[1]],l[2]);a=e.getMode(m,a);var z=new RegExp("^</s*"+l[1]+"s*>","i"),v=new RegExp("</s*"+l[1]+"s*>","i");b.token=
function(n,p){if(n.match(z,!1))return p.token=k,p.localState=p.localMode=null;p=p.localMode.token(n,p.localState);var q=n.current(),w=q.search(v);-1<w?n.backUp(q.length-w):q.match(/<\/?$/)&&(n.backUp(q.length),n.match(v,!1)||n.match(q));return p};b.localMode=a;b.localState=e.startState(a,f.indent(b.htmlState,"",""))}else b.inTag&&(b.inTag+=a.current(),a.eol()&&(b.inTag+=" "));return h}var f=e.getMode(m,{name:"xml",htmlMode:!0,multilineTagIndentFactor:c.multilineTagIndentFactor,multilineTagIndentPastTag:c.multilineTagIndentPastTag,
allowMissingTagName:c.allowMissingTagName}),d={},g=c&&c.tags;c=c&&c.scriptTypes;t(y,d);g&&t(g,d);if(c)for(g=c.length-1;0<=g;g--)d.script.unshift(["type",c[g].matches,c[g].mode]);return{startState:function(){var a=e.startState(f);return{token:k,inTag:null,localMode:null,localState:null,htmlState:a}},copyState:function(a){var b;a.localState&&(b=e.copyState(a.localMode,a.localState));return{token:a.token,inTag:a.inTag,localMode:a.localMode,localState:b,htmlState:e.copyState(f,a.htmlState)}},token:function(a,
b){return b.token(a,b)},indent:function(a,b,h){return!a.localMode||/^\s*<\//.test(b)?f.indent(a.htmlState,b,h):a.localMode.indent?a.localMode.indent(a.localState,b,h):e.Pass},innerMode:function(a){return{state:a.localState||a.htmlState,mode:a.localMode||f}}}},"xml","javascript","css");e.defineMIME("text/html","htmlmixed")});