function c(e){for(var n={},t=e.split(" "),i=0;i<t.length;++i)n[t[i]]=!0;return n}const l={keywords:c("abstract alias align asm assert auto break case cast cdouble cent cfloat const continue debug default delegate delete deprecated export extern final finally function goto immutable import inout invariant is lazy macro module new nothrow override package pragma private protected public pure ref return shared short static super synchronized template this throw typedef typeid typeof volatile __FILE__ __LINE__ __gshared __traits __vector __parameters "+s),blockKeywords:c(s),builtin:c("bool byte char creal dchar double float idouble ifloat int ireal long real short ubyte ucent uint ulong ushort wchar wstring void size_t sizediff_t"),atoms:c("exit failure success true false null"),hooks:{"@":function(e,n){return e.eatWhile(/[\w\$_]/),"meta"}}};var b=l.keywords,w=l.builtin,s=l.blockKeywords,v=l.atoms,d=l.hooks,x=l.multiLineStrings,p=/[+\-*&%=<>!?|\/]/,o;function h(e,n){var t=e.next();if(d[t]){var i=d[t](e,n);if(i!==!1)return i}if(t=='"'||t=="'"||t=="`")return n.tokenize=g(t),n.tokenize(e,n);if(/[\[\]{}\(\),;\:\.]/.test(t))return o=t,null;if(/\d/.test(t))return e.eatWhile(/[\w\.]/),"number";if(t=="/"){if(e.eat("+"))return n.tokenize=m,m(e,n);if(e.eat("*"))return n.tokenize=y,y(e,n);if(e.eat("/"))return e.skipToEnd(),"comment"}if(p.test(t))return e.eatWhile(p),"operator";e.eatWhile(/[\w\$_\xa1-\uffff]/);var r=e.current();return b.propertyIsEnumerable(r)?(s.propertyIsEnumerable(r)&&(o="newstatement"),"keyword"):w.propertyIsEnumerable(r)?(s.propertyIsEnumerable(r)&&(o="newstatement"),"builtin"):v.propertyIsEnumerable(r)?"atom":"variable"}function g(e){return function(n,t){for(var i=!1,r,u=!1;(r=n.next())!=null;){if(r==e&&!i){u=!0;break}i=!i&&r=="\\"}return(u||!(i||x))&&(t.tokenize=null),"string"}}function y(e,n){for(var t=!1,i;i=e.next();){if(i=="/"&&t){n.tokenize=null;break}t=i=="*"}return"comment"}function m(e,n){for(var t=!1,i;i=e.next();){if(i=="/"&&t){n.tokenize=null;break}t=i=="+"}return"comment"}function k(e,n,t,i,r){this.indented=e,this.column=n,this.type=t,this.align=i,this.prev=r}function f(e,n,t){var i=e.indented;return e.context&&e.context.type=="statement"&&(i=e.context.indented),e.context=new k(i,n,t,null,e.context)}function a(e){var n=e.context.type;return(n==")"||n=="]"||n=="}")&&(e.indented=e.context.indented),e.context=e.context.prev}const _={startState:function(e){return{tokenize:null,context:new k(-e,0,"top",!1),indented:0,startOfLine:!0}},token:function(e,n){var t=n.context;if(e.sol()&&(t.align==null&&(t.align=!1),n.indented=e.indentation(),n.startOfLine=!0),e.eatSpace())return null;o=null;var i=(n.tokenize||h)(e,n);if(i=="comment"||i=="meta")return i;if(t.align==null&&(t.align=!0),(o==";"||o==":"||o==",")&&t.type=="statement")a(n);else if(o=="{")f(n,e.column(),"}");else if(o=="[")f(n,e.column(),"]");else if(o=="(")f(n,e.column(),")");else if(o=="}"){for(;t.type=="statement";)t=a(n);for(t.type=="}"&&(t=a(n));t.type=="statement";)t=a(n)}else o==t.type?a(n):((t.type=="}"||t.type=="top")&&o!=";"||t.type=="statement"&&o=="newstatement")&&f(n,e.column(),"statement");return n.startOfLine=!1,i},indent:function(e,n,t){if(e.tokenize!=h&&e.tokenize!=null)return null;var i=e.context,r=n&&n.charAt(0);i.type=="statement"&&r=="}"&&(i=i.prev);var u=r==i.type;return i.type=="statement"?i.indented+(r=="{"?0:t.unit):i.align?i.column+(u?0:1):i.indented+(u?0:t.unit)},languageData:{indentOnInput:/^\s*[{}]$/,commentTokens:{line:"//",block:{open:"/*",close:"*/"}}}};export{_ as d};
