(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{41:function(t,n,e){},42:function(t,n,e){"use strict";e.r(n);var c=e(2),r=e.n(c),o=e(17),i=e.n(o),a=e(8),u=e(3),s=e(0),j=function(t){var n=t.note,e=t.toggleImportance,c=n.important?"make not important":"make important";return Object(s.jsxs)("li",{className:"note",children:[n.content,Object(s.jsx)("button",{onClick:e,children:c})]},n.id)},f=e(6),d=e.n(f),l="https://powerful-fortress-08439.herokuapp.com/api/notes",b=function(){return d.a.get(l).then((function(t){return t.data}))},h=function(t){return d.a.post(l,t).then((function(t){return t.data}))},p=function(t,n){return d.a.put("".concat(l,"/").concat(n),t).then((function(t){return t.data}))},m=function(){var t=Object(c.useState)([]),n=Object(u.a)(t,2),e=n[0],r=n[1],o=Object(c.useState)("a new note..."),i=Object(u.a)(o,2),f=i[0],d=i[1],l=Object(c.useState)(!0),m=Object(u.a)(l,2),O=m[0],x=m[1],g=Object(c.useState)("some error happened..."),v=Object(u.a)(g,2),S=(v[0],v[1]),k=O?e:e.filter((function(t){return t.important}));return Object(c.useEffect)((function(){b().then((function(t){return r(t)}))}),[]),console.log("render",e.length,"render"),Object(s.jsxs)("section",{children:[Object(s.jsx)("h1",{children:"Notes"}),Object(s.jsx)("div",{children:Object(s.jsxs)("button",{onClick:function(){return x(!O)},children:["show ",O?"important":"all"]})}),Object(s.jsx)("ul",{children:k.map((function(t){return Object(s.jsx)(j,{note:t,toggleImportance:function(){return function(t){var n=e.find((function(n){return n.id===t})),c=Object(a.a)(Object(a.a)({},n),{},{important:!n.important});p(c,n.id).then((function(n){return r(e.map((function(e){return e.id!==t?e:n})))})).catch((function(c){S("the note '".concat(n.content,"' was already deleted from server")),setTimeout((function(){S(null)}),5e3),r(e.filter((function(n){return n.id!==t})))}))}(t.id)}})}))}),Object(s.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={content:f,date:(new Date).toISOString(),important:Math.random()<.5};h(n).then((function(t){r.concat(t),d("")}))},children:[Object(s.jsx)("input",{value:f,onChange:function(t){d(t.target.value)}}),Object(s.jsx)("button",{type:"submit",children:"save"})]})]})};e(41);i.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(m,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.23b497d3.chunk.js.map