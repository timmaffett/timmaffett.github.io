(function(d){"object"==typeof exports&&"object"==typeof module?d(require("../../lib/codemirror"),require("../xml/xml"),require("../javascript/javascript")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../xml/xml","../javascript/javascript"],d):d(CodeMirror)})(function(d){function l(e,m,n,p){this.state=e;this.mode=m;this.depth=n;this.prev=p}function q(e){return new l(d.copyState(e.mode,e.state),e.mode,e.depth,e.prev&&q(e.prev))}d.defineMode("jsx",function(e,m){function n(a){var c=
a.tagName;a.tagName=null;var b=h.indent(a,"","");a.tagName=c;return b}function p(a,c){if(c.context.mode==h)return t(a,c,c.context);var b=c.context;if("<"==a.peek()&&k.expressionAllowed(a,b.state))c.context=new l(d.startState(h,k.indent(b.state,"","")),h,0,c.context),k.skipExpression(b.state),c=null;else{var f=k.token(a,b.state);f||null==b.depth||(a=a.current(),"{"==a?b.depth++:"}"==a&&0==--b.depth&&(c.context=c.context.prev));c=f}return c}function t(a,c,b){if(2==b.depth)return a.match(/^.*?\*\//)?
b.depth=1:a.skipToEnd(),"comment";if("{"==a.peek()){h.skipAttribute(b.state);var f=n(b.state),g=b.state.context;if(g&&a.match(/^[^>]*>\s*$/,!1)){for(;g.prev&&!g.startOfLine;)g=g.prev;g.startOfLine?f-=e.indentUnit:b.prev.state.lexical&&(f=b.prev.state.lexical.indented)}else 1==b.depth&&(f+=e.indentUnit);c.context=new l(d.startState(k,f),k,0,c.context);return null}if(1==b.depth){if("<"==a.peek())return h.skipAttribute(b.state),c.context=new l(d.startState(h,n(b.state)),h,0,c.context),null;if(a.match("//"))return a.skipToEnd(),
"comment";if(a.match("/*"))return b.depth=2,p(a,c)}f=h.token(a,b.state);g=a.current();var r;/\btag\b/.test(f)?/>$/.test(g)?b.state.context?b.depth=0:c.context=c.context.prev:/^</.test(g)&&(b.depth=1):!f&&-1<(r=g.indexOf("{"))&&a.backUp(g.length-r);return f}var h=d.getMode(e,{name:"xml",allowMissing:!0,multilineTagIndentPastTag:!1,allowMissingTagName:!0}),k=d.getMode(e,m&&m.base||"javascript");return{startState:function(){return{context:new l(d.startState(k),k)}},copyState:function(a){return{context:q(a.context)}},
token:p,indent:function(a,c,b){return a.context.mode.indent(a.context.state,c,b)},innerMode:function(a){return a.context}}},"xml","javascript");d.defineMIME("text/jsx","jsx");d.defineMIME("text/typescript-jsx",{name:"jsx",base:{name:"javascript",typescript:!0}})});
