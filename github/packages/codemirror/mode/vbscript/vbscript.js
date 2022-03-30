(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){e.defineMode("vbscript",function(k,q){function d(a){return new RegExp("^(("+a.join(")|(")+"))\\b","i")}function l(a,b){if(a.eatSpace())return"space";if("'"===a.peek()||a.match(r))return a.skipToEnd(),"comment";if(a.match(/^((&H)|(&O))?[0-9\.]/i,!1)&&!a.match(/^((&H)|(&O))?[0-9\.]+[a-z_]/i,!1)){var c=!1;
a.match(/^\d*\.\d+/i)?c=!0:a.match(/^\d+\.\d*/)?c=!0:a.match(/^\.\d+/)&&(c=!0);if(c)return a.eat(/J/i),"number";c=!1;a.match(/^&H[0-9a-f]+/i)?c=!0:a.match(/^&O[0-7]+/i)?c=!0:a.match(/^[1-9]\d*F?/)?(a.eat(/J/i),c=!0):a.match(/^0(?![\dx])/i)&&(c=!0);if(c)return a.eat(/L/i),"number"}if(a.match('"'))return b.tokenize=t(a.current()),b.tokenize(a,b);if(a.match(u)||a.match(v)||a.match(w))return"operator";if(a.match(x))return null;if(a.match(y))return"bracket";if(a.match(z))return b.doInCurrentLine=!0,"keyword";
if(a.match(A))return b.currentIndent++,b.doInCurrentLine=!0,"keyword";if(a.match(B))return b.doInCurrentLine?b.doInCurrentLine=!1:b.currentIndent++,"keyword";if(a.match(m))return"keyword";if(a.match(n))return b.currentIndent--,b.currentIndent--,"keyword";if(a.match(p))return b.doInCurrentLine?b.doInCurrentLine=!1:b.currentIndent--,"keyword";if(a.match(C))return"keyword";if(a.match(D))return"atom";if(a.match(E))return"variable-2";if(a.match(F))return"builtin";if(a.match(G))return"variable-2";if(a.match(H))return"variable";
a.next();return"error"}function t(a){var b=1==a.length;return function(c,f){for(;!c.eol();){c.eatWhile(/[^'"]/);if(c.match(a))return f.tokenize=l,"string";c.eat(/['"]/)}if(b){if(q.singleLineStringErrors)return"error";f.tokenize=l}return"string"}}var v=RegExp("^[\\+\\-\\*/&\\\\\\^<>=]"),u=RegExp("^((<>)|(<=)|(>=))"),x=RegExp("^[\\.,]"),y=RegExp("^[\\(\\)]"),H=RegExp("^[A-Za-z][_A-Za-z0-9]*"),w=d("and or not xor is mod eqv imp".split(" ")),g=["WScript","err","debug","RegExp"],I=["server","response",
"request","session","application"],J="buffer cachecontrol charset contenttype expires expiresabsolute isclientconnected pics status clientcertificate cookies form querystring servervariables totalbytes contents staticobjects codepage lcid sessionid timeout scripttimeout".split(" "),K="addheader appendtolog binarywrite end flush redirect binaryread remove removeall lock unlock abandon getlasterror htmlencode mappath transfer urlencode".split(" "),h="clear execute raise replace test write writeline close open state eof update addnew end createobject quit".split(" ").concat("description firstindex global helpcontext helpfile ignorecase length number pattern source value count".split(" "));
g=g.concat("vbBlack vbRed vbGreen vbYellow vbBlue vbMagenta vbCyan vbWhite vbBinaryCompare vbTextCompare vbSunday vbMonday vbTuesday vbWednesday vbThursday vbFriday vbSaturday vbUseSystemDayOfWeek vbFirstJan1 vbFirstFourDays vbFirstFullWeek vbGeneralDate vbLongDate vbShortDate vbLongTime vbShortTime vbObjectError vbOKOnly vbOKCancel vbAbortRetryIgnore vbYesNoCancel vbYesNo vbRetryCancel vbCritical vbQuestion vbExclamation vbInformation vbDefaultButton1 vbDefaultButton2 vbDefaultButton3 vbDefaultButton4 vbApplicationModal vbSystemModal vbOK vbCancel vbAbort vbRetry vbIgnore vbYes vbNo vbCr VbCrLf vbFormFeed vbLf vbNewLine vbNullChar vbNullString vbTab vbVerticalTab vbUseDefault vbTrue vbFalse vbEmpty vbNull vbInteger vbLong vbSingle vbDouble vbCurrency vbDate vbString vbObject vbError vbBoolean vbVariant vbDataObject vbDecimal vbByte vbArray".split(" "));
k.isASP&&(g=g.concat(I),h=h.concat(K,J));var C=d("dim;redim;then;until;randomize;byval;byref;new;property;exit;in;const;private;public;get;set;let;stop;on error resume next;on error goto 0;option explicit;call;me".split(";")),D=d(["true","false","nothing","empty","null"]),F=d("abs array asc atn cbool cbyte ccur cdate cdbl chr cint clng cos csng cstr date dateadd datediff datepart dateserial datevalue day escape eval execute exp filter formatcurrency formatdatetime formatnumber formatpercent getlocale getobject getref hex hour inputbox instr instrrev int fix isarray isdate isempty isnull isnumeric isobject join lbound lcase left len loadpicture log ltrim rtrim trim maths mid minute month monthname msgbox now oct replace rgb right rnd round scriptengine scriptenginebuildversion scriptenginemajorversion scriptengineminorversion second setlocale sgn sin space split sqr strcomp string strreverse tan time timer timeserial timevalue typename ubound ucase unescape vartype weekday weekdayname year".split(" ")),
G=d(g),E=d(h),B=d("class sub select while if function property with for".split(" ")),m=d(["else","elseif","case"]),p=d(["next","loop","wend"]),n=d(["end"]),A=d(["do"]),z=d(["on error resume next","exit"]),r=d(["rem"]);return{electricChars:"dDpPtTfFeE ",startState:function(){return{tokenize:l,lastToken:null,currentIndent:0,nextLineIndent:0,doInCurrentLine:!1,ignoreKeyword:!1}},token:function(a,b){a.sol()&&(b.currentIndent+=b.nextLineIndent,b.nextLineIndent=0,b.doInCurrentLine=0);var c=b.tokenize(a,
b);var f=a.current();if("."===f)if(c=b.tokenize(a,b),f=a.current(),!c||"variable"!==c.substr(0,8)&&"builtin"!==c&&"keyword"!==c)c="error";else{if("builtin"===c||"keyword"===c)c="variable";-1<h.indexOf(f.substr(1))&&(c="variable-2")}b.lastToken={style:c,content:a.current()};"space"===c&&(c=null);return c},indent:function(a,b){b=b.replace(/^\s+|\s+$/g,"");return b.match(p)||b.match(n)||b.match(m)?k.indentUnit*(a.currentIndent-1):0>a.currentIndent?0:a.currentIndent*k.indentUnit}}});e.defineMIME("text/vbscript",
"vbscript")});
