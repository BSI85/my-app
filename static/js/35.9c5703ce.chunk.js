"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[35],{5035:function(e,r,s){s.r(r),s.d(r,{AddChatMessage:function(){return g},default:function(){return j}});var n=s(9439),t=s(3211),a=s(1983),i=s(6641),c=s(2791),u="ChatPage_wrapper__r+18A",o="ChatPage_autor__zc2xo",l="ChatPage_messageText__3G+To",h="ChatPage_userName__iktbu",d=s(8687),m=s(372),v=s(184),f=function(){var e=(0,d.v9)((function(e){return e.chat.messages})),r=(0,c.useRef)(null),s=(0,c.useState)(!0),t=(0,n.Z)(s,2),a=t[0],i=t[1];(0,c.useEffect)((function(){var e;a&&(null===(e=r.current)||void 0===e||e.scrollIntoView({behavior:"smooth"}))}),[e]);return(0,v.jsxs)("div",{style:{height:400,overflowY:"auto"},onScroll:function(e){var r=e.currentTarget;Math.abs(r.scrollHeight-r.scrollTop-r.clientHeight)<300?!a&&i(!0):a&&i(!1)},children:[(0,v.jsx)("h3",{style:{textAlign:"center"},children:"Chat"}),(0,v.jsx)("div",{style:{marginTop:20},children:(0,v.jsxs)("div",{children:[e.map((function(e,r){return(0,v.jsx)(x,{message:e},r)})),(0,v.jsx)("div",{ref:r,children:" "})]})})]})},x=c.memo((function(e){var r=e.message;return(0,v.jsxs)("div",{className:u,children:[(0,v.jsxs)("div",{className:o,children:[(0,v.jsx)(t.C,{shape:"square",size:36,src:(0,v.jsx)("img",{src:r.photo,alt:"avatar"})}),(0,v.jsx)("div",{className:h,children:r.userName})]}),(0,v.jsx)("div",{className:l,children:r.message})]})})),g=function(){var e=(0,c.useState)(""),r=(0,n.Z)(e,2),s=r[0],t=r[1],u=(0,d.I0)(),o=(0,d.v9)((function(e){return e.chat.status}));return(0,v.jsxs)("div",{style:{marginTop:20},children:[(0,v.jsx)("div",{children:(0,v.jsx)(i.Z,{placeholder:"Enter your message...",autoSize:{minRows:2,maxRows:3},showCount:!0,maxLength:300,onChange:function(e){return t(e.currentTarget.value)},value:s})}),(0,v.jsx)(a.ZP,{disabled:"ready"!==o,type:"primary",style:{marginTop:15},onClick:function(){s&&(u((0,m.bE)(s)),t(""))},children:"Send message"})]})},j=function(){var e=(0,d.I0)(),r=(0,d.v9)((function(e){return e.chat.status}));return(0,c.useEffect)((function(){return e((0,m.WE)()),function(){e((0,m.R7)())}})),(0,v.jsxs)("div",{children:["error"===r&&(0,v.jsx)("div",{children:"Some error occured"}),(0,v.jsx)(f,{}),(0,v.jsx)(g,{})]})}}}]);
//# sourceMappingURL=35.9c5703ce.chunk.js.map