(function(l){"object"==typeof exports&&"object"==typeof module?l(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],l):l(CodeMirror)})(function(l){function q(e){var k={};e=e.split(",");for(var f=0;f<e.length;++f){var r=e[f].toUpperCase(),t=e[f].charAt(0).toUpperCase()+e[f].slice(1);k[e[f]]=!0;k[r]=!0;k[t]=!0}return k}function v(e){e.eatWhile(/[\w\$_]/);return"meta"}l.defineMode("vhdl",function(e,k){function f(a,b){var c=a.next();if(w[c]){var d=w[c](a,
b);if(!1!==d)return d}if('"'==c)return b.tokenize=t(c),b.tokenize(a,b);if("'"==c)return b.tokenize=r(c),b.tokenize(a,b);if(/[\[\]{}\(\),;:\.]/.test(c))return g=c,null;if(/[\d']/.test(c))return a.eatWhile(/[\w\.']/),"number";if("-"==c&&a.eat("-"))return a.skipToEnd(),"comment";if(x.test(c))return a.eatWhile(x),"operator";a.eatWhile(/[\w\$_]/);a=a.current();return A.propertyIsEnumerable(a.toLowerCase())?(B.propertyIsEnumerable(a)&&(g="newstatement"),"keyword"):C.propertyIsEnumerable(a)?"atom":"variable"}
function r(a){return function(b,c){for(var d=!1,h,m=!1;null!=(h=b.next());){if(h==a&&!d){m=!0;break}d=!d&&"--"==h}if(m||!d&&!y)c.tokenize=f;return"string"}}function t(a){return function(b,c){for(var d=!1,h,m=!1;null!=(h=b.next());){if(h==a&&!d){m=!0;break}d=!d&&"--"==h}if(m||!d&&!y)c.tokenize=f;return"string-2"}}function z(a,b,c,d,h){this.indented=a;this.column=b;this.type=c;this.align=d;this.prev=h}function p(a,b,c){return a.context=new z(a.indented,b,c,null,a.context)}function n(a){var b=a.context.type;
if(")"==b||"]"==b||"}"==b)a.indented=a.context.indented;return a.context=a.context.prev}var u=e.indentUnit,C=k.atoms||q("null"),w=k.hooks||{"`":v,$:v},y=k.multiLineStrings,A=q("abs,access,after,alias,all,and,architecture,array,assert,attribute,begin,block,body,buffer,bus,case,component,configuration,constant,disconnect,downto,else,elsif,end,end block,end case,end component,end for,end generate,end if,end loop,end process,end record,end units,entity,exit,file,for,function,generate,generic,generic map,group,guarded,if,impure,in,inertial,inout,is,label,library,linkage,literal,loop,map,mod,nand,new,next,nor,null,of,on,open,or,others,out,package,package body,port,port map,postponed,procedure,process,pure,range,record,register,reject,rem,report,return,rol,ror,select,severity,signal,sla,sll,sra,srl,subtype,then,to,transport,type,unaffected,units,until,use,variable,wait,when,while,with,xnor,xor"),
B=q("architecture,entity,begin,case,port,else,elsif,end,for,function,if"),x=/[&|~><!\)\(*#%@+\/=?:;}{,\.\^\-\[\]]/,g;return{startState:function(a){return{tokenize:null,context:new z((a||0)-u,0,"top",!1),indented:0,startOfLine:!0}},token:function(a,b){var c=b.context;a.sol()&&(null==c.align&&(c.align=!1),b.indented=a.indentation(),b.startOfLine=!0);if(a.eatSpace())return null;g=null;var d=(b.tokenize||f)(a,b);if("comment"==d||"meta"==d)return d;null==c.align&&(c.align=!0);if(";"!=g&&":"!=g||"statement"!=
c.type)if("{"==g)p(b,a.column(),"}");else if("["==g)p(b,a.column(),"]");else if("("==g)p(b,a.column(),")");else if("}"==g){for(;"statement"==c.type;)c=n(b);for("}"==c.type&&(c=n(b));"statement"==c.type;)c=n(b)}else g==c.type?n(b):("}"==c.type||"top"==c.type||"statement"==c.type&&"newstatement"==g)&&p(b,a.column(),"statement");else n(b);b.startOfLine=!1;return d},indent:function(a,b){if(a.tokenize!=f&&null!=a.tokenize)return 0;b=b&&b.charAt(0);a=a.context;var c=b==a.type;return"statement"==a.type?
a.indented+("{"==b?0:u):a.align?a.column+(c?0:1):a.indented+(c?0:u)},electricChars:"{}"}});l.defineMIME("text/x-vhdl","vhdl")});