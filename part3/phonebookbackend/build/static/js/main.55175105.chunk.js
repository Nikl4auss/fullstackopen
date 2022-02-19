(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),o=n(17),r=n.n(o),u=n(8),i=n(3),l=n(0),s=function(e){var t=e.newName,n=e.handleNameChange,c=e.newNumber,a=e.handleNumberChange,o=e.handleNewContacts;return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("h2",{children:"Add a new Contact"}),Object(l.jsxs)("form",{onSubmit:o,children:[Object(l.jsxs)("label",{htmlFor:"name",children:["Name:",Object(l.jsx)("input",{id:"name",value:t,onChange:n})]}),Object(l.jsx)("br",{}),Object(l.jsx)("br",{}),Object(l.jsxs)("label",{htmlFor:"number",children:["Number:",Object(l.jsx)("input",{id:"number",value:c,onChange:a})]}),Object(l.jsx)("button",{children:"add contact"})]})]})},b=function(e){var t=e.filterText,n=e.handleFilter;return Object(l.jsxs)("label",{htmlFor:"filter",children:["Filter shown with:",Object(l.jsx)("input",{id:"filter",value:t,onChange:n})]})},j=function(e){var t=e.person,n=e.key,c=e.removeContact;return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)("p",{children:[t.name," ",t.number]},n),Object(l.jsx)("button",{onClick:function(){return c(t.name,t.id)},children:"delete"})]})},d=function(e){var t=e.personsToShow,n=e.removeContact;return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("h2",{children:"Numbers"}),t.map((function(e,t){return Object(l.jsx)(j,{person:e,removeContact:n},t)}))]})},h=n(4),f=n.n(h),m="/api/contacts",O=function(){return f.a.get(m).then((function(e){return e.data}))},x=function(e){return f.a.post(m,e).then((function(e){return e.data}))},w=function(e,t){return f.a.put("".concat(m,"/").concat(t),e).then((function(e){return e.data}))},p=function(e){return f.a.delete("".concat(m,"/").concat(e)).then((function(e){return e}))},v=function(e){var t=e.message,n=e.notificationClass;return null===t?null:Object(l.jsx)("div",{className:n,children:t})},g=function(){var e=Object(c.useState)([]),t=Object(i.a)(e,2),n=t[0],a=t[1],o=Object(c.useState)([]),r=Object(i.a)(o,2),j=r[0],h=r[1],f=Object(c.useState)(""),m=Object(i.a)(f,2),g=m[0],C=m[1],N=Object(c.useState)(""),S=Object(i.a)(N,2),F=S[0],k=S[1],T=Object(c.useState)(""),y=Object(i.a)(T,2),E=y[0],A=y[1],D=Object(c.useState)(null),J=Object(i.a)(D,2),L=J[0],B=J[1],I=Object(c.useState)(null),M=Object(i.a)(I,2),P=M[0],U=M[1],Y=Object(c.useState)(null),q=Object(i.a)(Y,2),z=q[0],G=q[1],H=0===j.length?n:j;return Object(c.useEffect)((function(){O().then((function(e){return a(e)})).catch((function(e){return console.log("fail",e)}))}),[]),Object(l.jsxs)("div",{children:[Object(l.jsx)("h1",{children:"Phonebook"}),Object(l.jsx)(v,{message:L,notificationClass:z}),Object(l.jsx)(b,{filterText:E,handleFilter:function(e){A(e.target.value);var t=n.filter((function(t){return t.name.toLowerCase().includes(e.target.value.toLowerCase())}));console.log(t),h(t)}}),Object(l.jsx)(s,{newName:g,handleNameChange:function(e){return C(e.target.value)},newNumber:F,handleNumberChange:function(e){return k(e.target.value)},handleNewContacts:function(e){e.preventDefault();var t=n.find((function(e){return e.name===g}));t?window.confirm("".concat(t.name," is already on your phonebook, you want to update the old number with this new one?"))?function(e){var t=Object(u.a)(Object(u.a)({},e),{},{number:F});w(t,e.id).then((function(t){a(n.map((function(n){return n.id!==e.id?n:t})))})).catch((function(t){null!==P&&clearTimeout(P),B("El contacto ".concat(e.name," ya ha sido borrado")),G("error"),U(setTimeout((function(){B(null),U(null),G(null)}),5e3)),a(n.filter((function(t){return t.id!==e.id})))}))}(t):window.alert("Update aborted"):x({name:g,number:F}).then((function(e){a(n.concat(e)),null!==P&&clearTimeout(P),B("Added ".concat(e.name," to the contact list")),G("success"),U(setTimeout((function(){B(null),U(null),G(null)}),5e3)),C(""),k("")}))}}),Object(l.jsx)(d,{personsToShow:H,removeContact:function(e,t){window.confirm("You want to delete ".concat(e,"?"))&&p(t).then((function(e){O().then((function(e){return a(e)})),window.alert("Contact Deleted")}))}})]})};n(41);r.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(g,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.55175105.chunk.js.map