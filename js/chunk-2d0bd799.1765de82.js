(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bd799"],{"2bc6":function(e,n,r){"use strict";r.r(n),r.d(n,"mbox",(function(){return R}));r("4d63"),r("ac1f"),r("25f0"),r("a15b"),r("466d"),r("99af");var t=["From","Sender","Reply-To","To","Cc","Bcc","Message-ID","In-Reply-To","References","Resent-From","Resent-Sender","Resent-To","Resent-Cc","Resent-Bcc","Resent-Message-ID","Return-Path","Received"],a=["Date","Subject","Comments","Keywords","Resent-Date"],i=/^[ \t]/,o=/^From /,d=new RegExp("^("+t.join("|")+"): "),c=new RegExp("^("+a.join("|")+"): "),s=/^[^:]+:/,u=/^[^ ]+@[^ ]+/,m=/^.*?(?=[^ ]+?@[^ ]+)/,l=/^<.*?>/,p=/^.*?(?=<.*>)/;function f(e){return"Subject"===e?"header":"string"}function h(e,n){if(e.sol()){if(n.inSeparator=!1,n.inHeader&&e.match(i))return null;if(n.inHeader=!1,n.header=null,e.match(o))return n.inHeaders=!0,n.inSeparator=!0,"atom";var r,t=!1;return(r=e.match(c))||(t=!0)&&(r=e.match(d))?(n.inHeaders=!0,n.inHeader=!0,n.emailPermitted=t,n.header=r[1],"atom"):n.inHeaders&&(r=e.match(s))?(n.inHeader=!0,n.emailPermitted=!0,n.header=r[1],"atom"):(n.inHeaders=!1,e.skipToEnd(),null)}if(n.inSeparator)return e.match(u)?"link":(e.match(m)||e.skipToEnd(),"atom");if(n.inHeader){var a=f(n.header);if(n.emailPermitted){if(e.match(l))return a+" link";if(e.match(p))return a}return e.skipToEnd(),a}return e.skipToEnd(),null}var R={startState:function(){return{inSeparator:!1,inHeader:!1,emailPermitted:!1,header:null,inHeaders:!1}},token:h,blankLine:function(e){e.inHeaders=e.inSeparator=e.inHeader=!1},languageData:{autocomplete:t.concat(a)}}}}]);
//# sourceMappingURL=chunk-2d0bd799.1765de82.js.map