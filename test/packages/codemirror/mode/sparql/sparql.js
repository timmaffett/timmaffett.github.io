(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){e.defineMode("sparql",function(p){function m(a,b){var c=a.next();d=null;if("$"==c||"?"==c){if("?"==c&&a.match(/\s/,!1))return"operator";a.match(/^[A-Za-z0-9_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][A-Za-z0-9_\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]*/);
return"variable-2"}if("<"!=c||a.match(/^[\s\u00a0=]/,!1)){if('"'==c||"'"==c)return b.tokenize=q(c),b.tokenize(a,b);if(/[{}\(\),\.;\[\]]/.test(c))return d=c,"bracket";if("#"==c)return a.skipToEnd(),"comment";if("^"===c)return c=a.peek(),"^"===c?a.eat("^"):a.eatWhile(h),"operator";if(h.test(c))return a.eatWhile(h),"operator";if(":"==c)return n(a),"atom";if("@"==c)return a.eatWhile(/[a-z\d\-]/i),"meta";a.eatWhile(/[_\w\d]/);if(a.eat(":"))return n(a),"atom";a=a.current();return r.test(a)?"builtin":t.test(a)?
"keyword":"variable"}a.match(/^[^\s\u00a0>]*>?/);return"atom"}function n(a){a.match(/(\.(?=[\w_\-\\%])|[:\w_-]|\\[-\\_~.!$&'()*+,;=/?#@%]|%[a-f\d][a-f\d])+/i)}function q(a){return function(b,c){for(var k=!1,l;null!=(l=b.next());){if(l==a&&!k){c.tokenize=m;break}k=!k&&"\\"==l}return"string"}}function f(a,b,c){a.context={prev:a.context,indent:a.indent,col:c,type:b}}function g(a){a.indent=a.context.indent;a.context=a.context.prev}var u=p.indentUnit,d,r=RegExp("^(?:str|lang|langmatches|datatype|bound|sameterm|isiri|isuri|iri|uri|bnode|count|sum|min|max|avg|sample|group_concat|rand|abs|ceil|floor|round|concat|substr|strlen|replace|ucase|lcase|encode_for_uri|contains|strstarts|strends|strbefore|strafter|year|month|day|hours|minutes|seconds|timezone|tz|now|uuid|struuid|md5|sha1|sha256|sha384|sha512|coalesce|if|strlang|strdt|isnumeric|regex|exists|isblank|isliteral|a|bind)$",
"i"),t=RegExp("^(?:base|prefix|select|distinct|reduced|construct|describe|ask|from|named|where|order|limit|offset|filter|optional|graph|by|asc|desc|as|having|undef|values|group|minus|in|not|service|silent|using|insert|delete|union|true|false|with|data|copy|to|move|add|create|drop|clear|load)$","i"),h=/[*+\-<>=&|\^\/!\?]/;return{startState:function(){return{tokenize:m,context:null,indent:0,col:0}},token:function(a,b){a.sol()&&(b.context&&null==b.context.align&&(b.context.align=!1),b.indent=a.indentation());
if(a.eatSpace())return null;var c=b.tokenize(a,b);"comment"!=c&&b.context&&null==b.context.align&&"pattern"!=b.context.type&&(b.context.align=!0);if("("==d)f(b,")",a.column());else if("["==d)f(b,"]",a.column());else if("{"==d)f(b,"}",a.column());else if(/[\]\}\)]/.test(d)){for(;b.context&&"pattern"==b.context.type;)g(b);b.context&&d==b.context.type&&(g(b),"}"==d&&b.context&&"pattern"==b.context.type&&g(b))}else"."==d&&b.context&&"pattern"==b.context.type?g(b):/atom|string|variable/.test(c)&&b.context&&
(/[\}\]]/.test(b.context.type)?f(b,"pattern",a.column()):"pattern"!=b.context.type||b.context.align||(b.context.align=!0,b.context.col=a.column()));return c},indent:function(a,b){b=b&&b.charAt(0);a=a.context;if(/[\]\}]/.test(b))for(;a&&"pattern"==a.type;)a=a.prev;b=a&&b==a.type;return a?"pattern"==a.type?a.col:a.align?a.col+(b?0:1):a.indent+(b?0:u):0},lineComment:"#"}});e.defineMIME("application/sparql-query","sparql")});
