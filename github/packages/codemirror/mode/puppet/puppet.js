(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){e.defineMode("puppet",function(){function f(a,b){b=b.split(" ");for(var c=0;c<b.length;c++)k[b[c]]=a}function l(a,b){for(var c,g,h=!1;!a.eol()&&(c=a.next())!=b.pending;){if("$"===c&&"\\"!=g&&'"'==b.pending){h=!0;break}g=c}h&&a.backUp(1);b.continueString=c==b.pending?!1:!0;return"string"}function m(a,b){var c=
a.match(/[\w]+/,!1),g=a.match(/(\s+)?\w+\s+=>.*/,!1),h=a.match(/(\s+)?[\w:_]+(\s+)?{/,!1),n=a.match(/(\s+)?[@]{1,2}[\w:_]+(\s+)?{/,!1),d=a.next();if("$"===d)return a.match(p)?b.continueString?"variable-2":"variable":"error";if(b.continueString)return a.backUp(1),l(a,b);if(b.inDefinition){if(a.match(/(\s+)?[\w:_]+(\s+)?/))return"def";a.match(/\s+{/);b.inDefinition=!1}if(b.inInclude)return a.match(/(\s+)?\S+(\s+)?/),b.inInclude=!1,"def";if(a.match(/(\s+)?\w+\(/))return a.backUp(1),"def";if(g)return a.match(/(\s+)?\w+/),
"tag";if(c&&k.hasOwnProperty(c))return a.backUp(1),a.match(/[\w]+/),a.match(/\s+\S+\s+{/,!1)&&(b.inDefinition=!0),"include"==c&&(b.inInclude=!0),k[c];if(/(^|\s+)[A-Z][\w:_]+/.test(c))return a.backUp(1),a.match(/(^|\s+)[A-Z][\w:_]+/),"def";if(h)return a.match(/(\s+)?[\w:_]+/),"def";if(n)return a.match(/(\s+)?[@]{1,2}/),"special";if("#"==d)return a.skipToEnd(),"comment";if("'"==d||'"'==d)return b.pending=d,l(a,b);if("{"==d||"}"==d)return"bracket";if("/"==d)return a.match(/^[^\/]*\//),"variable-3";if(d.match(/[0-9]/))return a.eatWhile(/[0-9]+/),
"number";if("="==d)return">"==a.peek()&&a.next(),"operator";a.eatWhile(/[\w-]/);return null}var k={},p=/({)?([a-z][a-z0-9_]*)?((::[a-z][a-z0-9_]*)*::)?[a-zA-Z0-9_]+(})?/;f("keyword","class define site node include import inherits");f("keyword","case if else in and elsif default or");f("atom","false true running present absent file directory undef");f("builtin","action augeas burst chain computer cron destination dport exec file filebucket group host icmp iniface interface jump k5login limit log_level log_prefix macauthorization mailalias maillist mcx mount nagios_command nagios_contact nagios_contactgroup nagios_host nagios_hostdependency nagios_hostescalation nagios_hostextinfo nagios_hostgroup nagios_service nagios_servicedependency nagios_serviceescalation nagios_serviceextinfo nagios_servicegroup nagios_timeperiod name notify outiface package proto reject resources router schedule scheduled_task selboolean selmodule service source sport ssh_authorized_key sshkey stage state table tidy todest toports tosource user vlan yumrepo zfs zone zpool");
return{startState:function(){return{inDefinition:!1,inInclude:!1,continueString:!1,pending:!1}},token:function(a,b){return a.eatSpace()?null:m(a,b)}}});e.defineMIME("text/x-puppet","puppet")});