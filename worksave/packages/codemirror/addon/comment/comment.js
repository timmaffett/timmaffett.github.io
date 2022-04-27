(function(r){"object"==typeof exports&&"object"==typeof module?r(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],r):r(CodeMirror)})(function(r){function I(c){c=c.search(w);return-1==c?0:c}function J(c,d,a){return/\bstring\b/.test(c.getTokenTypeAt(l(d.line,0)))&&!/^['"`]/.test(a)}function G(c,d){var a=c.getMode();return!1!==a.useInnerComments&&a.innerMode?c.getModeAt(d):a}var E={},w=/[^\s\u00a0]/,l=r.Pos,K=r.cmpPos;r.commands.toggleComment=function(c){c.toggleComment()};
r.defineExtension("toggleComment",function(c){c||(c=E);for(var d=Infinity,a=this.listSelections(),b=null,e=a.length-1;0<=e;e--){var g=a[e].from(),f=a[e].to();g.line>=d||(f.line>=d&&(f=l(d,0)),d=g.line,null==b?this.uncomment(g,f,c)?b="un":(this.lineComment(g,f,c),b="line"):"un"==b?this.uncomment(g,f,c):this.lineComment(g,f,c))}});r.defineExtension("lineComment",function(c,d,a){a||(a=E);var b=this,e=G(b,c),g=b.getLine(c.line);if(null!=g&&!J(b,c,g)){var f=a.lineComment||e.lineComment;if(f){var m=Math.min(0!=
d.ch||d.line==c.line?d.line+1:d.line,b.lastLine()+1),u=null==a.padding?" ":a.padding,k=a.commentBlankLines||c.line==d.line;b.operation(function(){if(a.indent){for(var p=null,h=c.line;h<m;++h){var q=b.getLine(h);q=q.slice(0,I(q));if(null==p||p.length>q.length)p=q}for(h=c.line;h<m;++h){q=b.getLine(h);var t=p.length;if(k||w.test(q))q.slice(0,t)!=p&&(t=I(q)),b.replaceRange(p+f+u,l(h,0),l(h,t))}}else for(h=c.line;h<m;++h)(k||w.test(b.getLine(h)))&&b.replaceRange(f+u,l(h,0))})}else if(a.blockCommentStart||
e.blockCommentStart)a.fullLines=!0,b.blockComment(c,d,a)}});r.defineExtension("blockComment",function(c,d,a){a||(a=E);var b=this,e=G(b,c),g=a.blockCommentStart||e.blockCommentStart,f=a.blockCommentEnd||e.blockCommentEnd;if(!g||!f)(a.lineComment||e.lineComment)&&0!=a.fullLines&&b.lineComment(c,d,a);else if(!/\bcomment\b/.test(b.getTokenTypeAt(l(c.line,0)))){var m=Math.min(d.line,b.lastLine());m!=c.line&&0==d.ch&&w.test(b.getLine(m))&&--m;var u=null==a.padding?" ":a.padding;c.line>m||b.operation(function(){if(0!=
a.fullLines){var k=w.test(b.getLine(m));b.replaceRange(u+f,l(m));b.replaceRange(g+u,l(c.line,0));var p=a.blockCommentLead||e.blockCommentLead;if(null!=p)for(var h=c.line+1;h<=m;++h)(h!=m||k)&&b.replaceRange(p+u,l(h,0))}else k=0==K(b.getCursor("to"),d),p=!b.somethingSelected(),b.replaceRange(f,d),k&&b.setSelection(p?d:b.getCursor("from"),d),b.replaceRange(g,c)})}});r.defineExtension("uncomment",function(c,d,a){a||(a=E);var b=this,e=G(b,c),g=Math.min(0!=d.ch||d.line==c.line?d.line:d.line-1,b.lastLine()),
f=Math.min(c.line,g),m=a.lineComment||e.lineComment,u=[],k=null==a.padding?" ":a.padding,p;a:if(m){for(var h=f;h<=g;++h){var q=b.getLine(h),t=q.indexOf(m);-1<t&&!/comment/.test(b.getTokenTypeAt(l(h,t+1)))&&(t=-1);if(-1==t&&w.test(q))break a;if(-1<t&&w.test(q.slice(0,t)))break a;u.push(q)}b.operation(function(){for(var n=f;n<=g;++n){var A=u[n-f],x=A.indexOf(m),v=x+m.length;0>x||(A.slice(v,v+k.length)==k&&(v+=k.length),p=!0,b.replaceRange("",l(n,x),l(n,v)))}});if(p)return!0}var y=a.blockCommentStart||
e.blockCommentStart,z=a.blockCommentEnd||e.blockCommentEnd;if(!y||!z)return!1;var H=a.blockCommentLead||e.blockCommentLead,C=b.getLine(f),D=C.indexOf(y);if(-1==D)return!1;var F=g==f?C:b.getLine(g),B=F.indexOf(z,g==f?D+y.length:0);a=l(f,D+1);e=l(g,B+1);if(-1==B||!/comment/.test(b.getTokenTypeAt(a))||!/comment/.test(b.getTokenTypeAt(e))||-1<b.getRange(a,e,"\n").indexOf(z))return!1;e=C.lastIndexOf(y,c.ch);a=-1==e?-1:C.slice(0,c.ch).indexOf(z,e+y.length);if(-1!=e&&-1!=a&&a+z.length!=c.ch)return!1;a=F.indexOf(z,
d.ch);c=F.slice(d.ch).lastIndexOf(y,a-d.ch);e=-1==a||-1==c?-1:d.ch+c;if(-1!=a&&-1!=e&&e!=d.ch)return!1;b.operation(function(){b.replaceRange("",l(g,B-(k&&F.slice(B-k.length,B)==k?k.length:0)),l(g,B+z.length));var n=D+y.length;k&&C.slice(n,n+k.length)==k&&(n+=k.length);b.replaceRange("",l(f,D),l(f,n));if(H)for(n=f+1;n<=g;++n){var A=b.getLine(n),x=A.indexOf(H);if(-1!=x&&!w.test(A.slice(0,x))){var v=x+H.length;k&&A.slice(v,v+k.length)==k&&(v+=k.length);b.replaceRange("",l(n,x),l(n,v))}}});return!0})});