"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[165],{2165:function(e,s,a){a.r(s),a.d(s,{default:function(){return S}});var n=a(2807),t=a(5671),i=a(3144),r=a(136),o=a(516),l=a(2791),d={dialogs:"Dialogs_dialogs__b2miZ",textarea:"Dialogs_textarea__I7EMP",button:"Dialogs_button__s5kcG",textarea_wrapper:"Dialogs_textarea_wrapper__TtTI-"},c="Message_message_item__YQtva",u=a(184),g=function(e){(0,r.Z)(a,e);var s=(0,o.Z)(a);function a(){return(0,t.Z)(this,a),s.apply(this,arguments)}return(0,i.Z)(a,[{key:"render",value:function(){return(0,u.jsx)("div",{className:c,children:this.props.message})}}]),a}(l.Component),m=g,p=a(1087),h={link:"DialogItem_link__EeSh1",activeLink:"DialogItem_activeLink__xleYJ"},_=function(e){return e.isActive?h.activeLink:h.link},f=function(e){(0,r.Z)(a,e);var s=(0,o.Z)(a);function a(){return(0,t.Z)(this,a),s.apply(this,arguments)}return(0,i.Z)(a,[{key:"render",value:function(){return(0,u.jsx)("div",{className:h.item,children:(0,u.jsx)(p.OL,{className:_,to:"/dialogs/"+this.props.id,children:this.props.name})})}}]),a}(l.Component),x=f,v=a(6139),j=a(704),k=a(1169),Z=a(8470),N=function(e){(0,r.Z)(a,e);var s=(0,o.Z)(a);function a(){var e;(0,t.Z)(this,a);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(e=s.call.apply(s,[this].concat(i))).addNewMessage=function(s){e.props.sendMessage(s.newMessageBody)},e.dialogsElements=e.props.dialogsPageState.dialogsData.map((function(e){return(0,u.jsx)(x,{name:e.name,id:e.id},e.id)})),e.messagesElements=e.props.dialogsPageState.messagesData.map((function(e){return(0,u.jsx)(m,{message:e.message},e.id)})),e}return(0,i.Z)(a,[{key:"render",value:function(){return(0,u.jsxs)("div",{className:d.dialogs,children:[(0,u.jsx)("div",{className:d.dialogs_block,children:this.dialogsElements}),(0,u.jsxs)("div",{className:d.messages_block,children:[(0,u.jsx)("div",{className:d.messages,children:this.props.dialogsPageState.messagesData.map((function(e){return(0,u.jsx)(m,{message:e.message},e.id)}))}),(0,u.jsx)("div",{className:d.sendarea,children:(0,u.jsx)(w,{onSubmit:this.addNewMessage})})]})]})}}]),a}(l.Component),b=(0,Z.D)(20),w=(0,j.Z)({form:"dialog"})((function(e){return(0,u.jsxs)("form",{className:d.textarea_wrapper,onSubmit:e.handleSubmit,children:[(0,u.jsx)(v.Z,{component:k.g,validate:[Z.l,b],name:"newMessageBody",placeholder:"Enter your message",className:d.textarea}),(0,u.jsx)("div",{children:(0,u.jsx)("button",{className:d.button,children:"Send message"})})]})})),y=N,D=a(8687),M=a(1103),S=(0,a(7781).qC)((0,D.$j)((function(e){return{dialogsPageState:e.dialogsPage,newMessageText:e.dialogsPage.newMessageText}}),(function(e){return{sendMessage:function(s){e((0,n.X)(s))}}})),M.D)(y)}}]);
//# sourceMappingURL=165.7a9e4c02.chunk.js.map