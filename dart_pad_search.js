// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

// Define search commands. Depends on dialog.js or another
// implementation of the openDialog method.

// Replace works a little oddly -- it will do the replace on the next
// Ctrl-G (or whatever is bound to findNext) press. You prevent a
// replace by making sure the match is no longer selected when hitting
// Ctrl-G.

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("./searchcursor"), require("../dialog/dialog"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "./searchcursor", "../dialog/dialog"], mod);
  else // Plain browatOccurrenceser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  // default search panel location
  CodeMirror.defineOption("dart_pad_search", {bottom: false});

  function searchOverlay(query, caseInsensitive) {
    if (typeof query == "string")
      query = new RegExp(query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), caseInsensitive ? "gi" : "g");
    else if (!query.global)
      query = new RegExp(query.source, query.ignoreCase ? "gi" : "g");

    return {token: function(stream) {
      query.lastIndex = stream.pos;
      var match = query.exec(stream.string);
      if (match && match.index == stream.pos) {
        stream.pos += match[0].length || 1;
        return "searching";
      } else if (match) {
        stream.pos = match.index;
      } else {
        stream.skipToEnd();
      }
    }};
  }

  function findMatches(cm,state) {
    var pastLastLine = cm.lastLine() + 1;
    var matches = [];
    var i=0;
    var cursor = cm.getSearchCursor(state.query, CodeMirror.Pos(cm.firstLine(), 0));
    var maxMatches = MAX_MATCHES;
    while (cursor.findNext()) {
      var match = {from: cursor.from(), to: cursor.to()};
      matches.splice(i++, 0, match);
      if (matches.length > maxMatches) break;
    }
    return matches;
  };

  function SearchState() {
    this.posFrom = this.posTo = this.lastQuery = this.query = null;
    this.overlay = null;
  }

  function getSearchState(cm) {
    return cm.state.search || (cm.state.search = new SearchState());
  }

  // All of our query strings will be regular expressions, and we only return true here if it is marked
  // as being case insensitive ('/i' or '/gi')
  function queryCaseInsensitive(query) {
    console.log(`caseInsen query=${query.toString()} typeof=${(typeof query)}`);
    if(typeof query == "object") {
      query = query.toString();
      console.log(`insen passed RegExp made str=${query}`);
    }
    var isRE = query.match(/^\/(.*)\/([a-z]*)$/);
    if (isRE) {
      var ret = isRE[2].indexOf("i") != -1;
      console.log(`Regex and caseInset = ${ret}`); 

      return isRE[2].indexOf("i") != -1;
    } else {
      var ret = (typeof query == "string") && query == query.toLowerCase();
      console.log(`string and caseInset = ${ret}`); 
      //if it is not a regular expression we return false, no string searching
      return (typeof query == "string") && query == query.toLowerCase();
    }
  }

  function getSearchCursor(cm, query, pos) {
    // Heuristic: if the query string is all lowercase, do a case insensitive search.
    return cm.getSearchCursor(query, pos, {caseFold: queryCaseInsensitive(query), multiline: true});
  }

  function parseString(string) {
    return string.replace(/\\([nrt\\])/g, function(match, ch) {
      if (ch == "n") return "\n"
      if (ch == "r") return "\r"
      if (ch == "t") return "\t"
      if (ch == "\\") return "\\"
      return match
    })
  }

  function parseQuery(query) {
    if( typeof query == "object") return query; // it is already a regex

    var isRE = query.match(/^\/(.*)\/([a-z]*)$/);
    if (isRE) {
      try { query = new RegExp(isRE[1], isRE[2].indexOf("i") == -1 ? "" : "i"); }
      catch(e) {} // Not a regular expression after all, do a string search
    } else {
      query = parseString(query)
    }
    if (typeof query == "string" ? query == "" : query.test(""))
      query = /x^/;
    return query;
  }

  function startSearch(cm, state, query) {
    state.queryText = (typeof query == "object") ? query.toString() : query;
    state.query = parseQuery(query);
    cm.removeOverlay(state.overlay, queryCaseInsensitive(state.query));
    state.overlay = searchOverlay(state.query, queryCaseInsensitive(state.query));
    cm.addOverlay(state.overlay, { priority: -5} ); // priority>0 so search highlights over others (like selection highlighting for example)
    if (cm.showMatchesOnScrollbar) {
      if (state.annotate) { state.annotate.clear(); state.annotate = null; }
      state.annotate = cm.showMatchesOnScrollbar(state.query, queryCaseInsensitive(state.query));
    }
  }

    
  function doSearchTIMMY(cm, query, rev, highlightOnly) {
    var queryText = (typeof query == "object") ? query.toString() : query;
    if( typeof query != "object" ) query = parseQuery(query);

    console.log('doSearchTimmy query=%o queryText=%s',  query, queryText);
    var state = getSearchState(cm);
    if (queryText != state.queryText) {
      startSearch(cm, state, query);
      state.posFrom = state.posTo = cm.getCursor();
    }
    if (state.query) {
      if( highlightOnly ) getSearchResultInfoObject(cm,state);
      return findNext(cm, rev);
    }
    var q = cm.getSelection() || state.lastQuery;
    if (q instanceof RegExp && q.source == "x^") q = null

    if (query && !state.query) return cm.operation(function() {
      startSearch(cm, state, query);
      state.posFrom = state.posTo = cm.getCursor();
      return findNext(cm, rev);
    });
  }

/*
  function doSearch(cm, rev, persistent, immediate) {
    var state = getSearchState(cm);
    if (state.query) return findNext(cm, rev);
    var q = cm.getSelection() || state.lastQuery;
    if (q instanceof RegExp && q.source == "x^") q = null
    if (persistent && cm.openDialog) {
      var hiding = null
      var searchNext = function(query, event) {
        CodeMirror.e_stop(event);
        if (!query) return;
        if (query != state.queryText) {
          startSearch(cm, state, query);
          state.posFrom = state.posTo = cm.getCursor();
        }
        if (hiding) hiding.style.opacity = 1
        findNext(cm, event.shiftKey, function(_, to) {
          var dialog
          if (to.line < 3 && document.querySelector &&
              (dialog = cm.display.wrapper.querySelector(".CodeMirror-dialog")) &&
              dialog.getBoundingClientRect().bottom - 4 > cm.cursorCoords(to, "window").top)
            (hiding = dialog).style.opacity = .4
        })
      };
      persistentDialog(cm, getQueryDialog(cm), q, searchNext, function(event, query) {
        var keyName = CodeMirror.keyName(event)
        var extra = cm.getOption('extraKeys'), cmd = (extra && extra[keyName]) || CodeMirror.keyMap[cm.getOption("keyMap")][keyName]
        if (cmd == "findNext" || cmd == "findPrev" ||
          cmd == "findPersistentNext" || cmd == "findPersistentPrev") {
          CodeMirror.e_stop(event);
          startSearch(cm, getSearchState(cm), query);
          cm.execCommand(cmd);
        } else if (cmd == "find" || cmd == "findPersistent") {
          CodeMirror.e_stop(event);
          searchNext(query, event);
        }
      });
      if (immediate && q) {
        startSearch(cm, state, q);
        findNext(cm, rev);
      }
    } else {
      dialog(cm, getQueryDialog(cm), "Search for:", q, function(query) {
        if (query && !state.query) cm.operation(function() {
          startSearch(cm, state, query);
          state.posFrom = state.posTo = cm.getCursor();
          findNext(cm, rev);
        });
      });
    }
  }
*/

  function findNext(cm, rev, callback) {
    return cm.operation(function() {
      var state = getSearchState(cm);
      var cursor = getSearchCursor(cm, state.query, rev ? state.posFrom : state.posTo);
      if (!cursor.find(rev)) {
        cursor = getSearchCursor(cm, state.query, rev ? CodeMirror.Pos(cm.lastLine()) : CodeMirror.Pos(cm.firstLine(), 0));
        if (!cursor.find(rev)) return getSearchResultInfoObject(cm,state);
      }
      cm.setSelection(cursor.from(), cursor.to());
      cm.scrollIntoView({from: cursor.from(), to: cursor.to()}, 20);
      state.posFrom = cursor.from(); state.posTo = cursor.to();
      if (callback) callback(cursor.from(), cursor.to())
      return getSearchResultInfoObject(cm,state);
  });}

  function clearSearch(cm) {cm.operation(function() {
    var state = getSearchState(cm);
    state.lastQuery = state.query;
    if (!state.query) return;
    state.query = state.queryText = null;
    cm.removeOverlay(state.overlay);
    if (state.annotate) { state.annotate.clear(); state.annotate = null; }
  });}

  function replaceAll(cm, query, text) {
    // make sure our query is regular expression
    query = parseQuery( query );

    cm.operation(function() {
      for (var cursor = getSearchCursor(cm, query); cursor.findNext();) {
        if (typeof query != "string") {
          var match = cm.getRange(cursor.from(), cursor.to()).match(query);
          cursor.replace(text.replace(/\$(\d)/g, function(_, i) {return match[i];}));
        } else cursor.replace(text);
      }
    });
  }
/*
  function replace(cm, all) {
    if (cm.getOption("readOnly")) return;
    var query = cm.getSelection() || getSearchState(cm).lastQuery;
    var dialogText = all ? cm.phrase("Replace all:") : cm.phrase("Replace:")
    var fragment = el("", null,
                      el("span", {className: "CodeMirror-search-label"}, dialogText),
                      getReplaceQueryDialog(cm))
    dialog(cm, fragment, dialogText, query, function(query) {
      if (!query) return;
      query = parseQuery(query);
      dialog(cm, getReplacementQueryDialog(cm), cm.phrase("Replace with:"), "", function(text) {
        text = parseString(text)
        if (all) {
          replaceAll(cm, query, text)
        } else {
          clearSearch(cm);
          var cursor = getSearchCursor(cm, query, cm.getCursor("from"));
          var advance = function() {
            var start = cursor.from(), match;
            if (!(match = cursor.findNext())) {
              cursor = getSearchCursor(cm, query);
              if (!(match = cursor.findNext()) ||
                  (start && cursor.from().line == start.line && cursor.from().ch == start.ch)) return;
            }
            cm.setSelection(cursor.from(), cursor.to());
            cm.scrollIntoView({from: cursor.from(), to: cursor.to()});
            confirmDialog(cm, getDoReplaceConfirm(cm), cm.phrase("Replace?"),
                          [function() {doReplace(match);}, advance,
                           function() {replaceAll(cm, query, text)}]);
          };
          var doReplace = function(match) {
            cursor.replace(typeof query == "string" ? text :
                           text.replace(/\$(\d)/g, function(_, i) {return match[i];}));
            advance();
          };
          advance();
        }
      });
    });
  }
*/

  function getSearchResultInfoObject(cm,state) {
    var matches;
    if( state.annotate ) {
      matches = state.annotate.matches;      
    } else {
      // we need to make a matches array
      matches = findMatches( cm, state.query )
    }
    var cursorAtFrom = cm.getCursor("from");

    var numMatches = matches.length;
    var hitWeAreOn = -1; // we might not find it
    if( matches && matches.length>0) {
      var lastLine = cursorAtFrom.line;
      var lastCh = cursorAtFrom.ch;
      numMatches = matches.length;
      for(var m=0;m<numMatches;m++) {
        var fromPos = matches[m].from;
        if( fromPos.line==lastLine && fromPos.ch==lastCh ) {
          hitWeAreOn = m;
          break;
        }
      }
    }
    console.log('matches = %o',matches);
    var objmatches = [];
    for(var i=0;i<matches.length;i++) {
      objmatches[i] = { 'line':matches[i].from.line, 'ch':matches[i].from.ch };
    }
    console.log('objmatches = %o',objmatches);
    return { 'matches':objmatches, 'rawmatches':matches, 'total':numMatches, 'curMatchNum':hitWeAreOn };
  }
  
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  // To escape a replacement string:
  function escapeReplacement(string) {
    return string.replace(/\$/g, '$$$$');
  }

  function makeOurRegExQuery(queryMayBeRegExSyntaxFromUser,  matchCase, wholeWord, regEx) {
	  if( queryMayBeRegExSyntaxFromUser=='' ) {
		  // don't allow empty string, make nonmatchable regex
		  queryMayBeRegExSyntaxFromUser = '/x^/';
	  }
    var isRE = queryMayBeRegExSyntaxFromUser.match(/^\/(.*)\/([a-z]*)$/);
    var queryRegEx=undefined;
    if (isRE) {
      // it already head regex syntax - we stripped it OFF
      var ingoreCaseInRegEx = (isRE[2].indexOf("i") != -1);
      var reStr = isRE[1];
	    if( reStr=='' ) reStr='x^'; // don't allow empty regex
      if( wholeWord ) {
        // add reg ex word boundries
        reStr = "\\b" + reStr + "\\b";
      }
      try {
        queryRegEx = new RegExp(reStr, (ingoreCaseInRegEx || !matchCase) ? "i" : ""); 
      }
      catch(e) {} // Not a regular expression after all, do a string search
    } else {
      // The didn't have /xxxxx/ but do they want a reged ?
      if( regEx ) {
        var reStr = queryMayBeRegExSyntaxFromUser;
        if( wholeWord ) {
          // add reg ex word boundries
          reStr = "\\b" + reStr + "\\b";
        }
        try {
          queryRegEx = new RegExp(reStr, !matchCase ? "i" : ""); 
        }
        catch(e) {} 
      } else {
	      // we need to ESCAPE regular expression stuff out
	      var reStr = escapeRegExp(queryMayBeRegExSyntaxFromUser);
        if( wholeWord ) {
          // add reg ex word boundries
          reStr = "\\b" + reStr + "\\b";
        }
        try {
          queryRegEx = new RegExp( reStr, !matchCase ? "i" : ""); 
        }
        catch(e) {} 
      }
    }
	  if( queryRegEx==undefined ) {
		  // something went wrong, default to unmatchable..
		  console.log("We go to end and queryRegEx was UNDEFINED, making it /^x/");
		  return /x^/;
	  }
    console.log(`Our Prep done typeof=${(typeof queryRegEx)} queryRegEx.toString=${queryRegEx.toString()}`);
    
    return queryRegEx;
  }

  CodeMirror.defineExtension("doSearchForUs", function(query, reverse, highlightOnly, matchCase, wholeWord, regEx) {
     clearSearch(this);

     console.log(`got query=${query} rev=${reverse} matchCase=${matchCase} wholeWord=${wholeWord} regEx=${regEx}`);
     var queryToSend = makeOurRegExQuery(query, matchCase, wholeWord, regEx);
     console.log(`made query=${queryToSend}`);

     return doSearchTIMMY( this, queryToSend, reverse, highlightOnly )
  });

  CodeMirror.defineExtension("replaceAllForUs", function(query, replaceText, matchCase, wholeWord, regEx) {
     clearSearch(this);

     console.log(`replaceAllForUs query=${query} matchCase=${matchCase} wholeWord=${wholeWord} regEx=${regEx}`);
     var queryToSend = makeOurRegExQuery(query, matchCase, wholeWord, regEx);
     console.log(`made query=${queryToSend}`);

     replaceAll( this, queryToSend, replaceText );

     // and end with a SEARCH to re-highlight orginal query
     return doSearchTIMMY( this, queryToSend, false );
  });

  CodeMirror.defineExtension("replaceNextForUs", function(query, replaceText, matchCase, wholeWord, regEx) {
     clearSearch(this);

     console.log(`replaceForUs query=${query} matchCase=${matchCase} wholeWord=${wholeWord} regEx=${regEx}`);
     var queryToSend = makeOurRegExQuery(query, matchCase, wholeWord, regEx);
     console.log(`made query=${queryToSend}`);

     // and end with a SEARCH to re-highlight orginal query
     return doReplaceTIMMY( this, queryToSend, replaceText );
  });

  function doReplaceTIMMY(cm, query, replaceText) {
    // get our query as regular expression
    query = parseQuery( query );

    clearSearch(cm);
    var cursor = getSearchCursor(cm, query, cm.getCursor("from"));

    var doReplace = function(match) {
      cursor.replace(typeof query == "string" ? replaceText :
            replaceText.replace(/\$(\d)/g, function(_, i) {return match[i];}));
      return advance(true);  // AFTER we replace to DO NOT ADVANCE AGAIN
    };
    var advance = function( noReplacingAfterAdvance ) {
      var start = cursor.from(), match;
      if (!(match = cursor.findNext())) {
        cursor = getSearchCursor(cm, query);
        if (!(match = cursor.findNext()) ||
            (start && cursor.from().line == start.line &&
                  cursor.from().ch == start.ch)) {
          return;
        }
      }
      cm.setSelection(cursor.from(), cursor.to());
      cm.scrollIntoView({from: cursor.from(), to: cursor.to()});
      if(noReplacingAfterAdvance==true) {
        // We need to figure out where we are in the scheme of things
        return;
      } else {
        // call and do ACTUAL replacing
        return doReplace(match);
      }
    };

    return advance();
  }

  CodeMirror.defineExtension("getTokenWeAreOnOrNear", function( regExStr ) {
    if (!this.somethingSelected()) {
      var re = regExStr==undefined ? /[\w$]/ : regExStr;
      var cur = this.getCursor(), line = this.getLine(cur.line), start = cur.ch, end = start;
      while (start && re.test(line.charAt(start - 1))) --start;
      while (end < line.length && re.test(line.charAt(end))) ++end;
      if (start < end) {
        return line.slice(start, end);
      }
      return '';
    }
  });

});
