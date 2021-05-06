(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),c=n(7),o=n.n(c),l=(n(14),n(8)),r=n(1),s=n(2),u=n(3);n(15);function d(e){var t=Object(i.useState)(""),n=Object(u.a)(t,2),c=n[0],o=n[1],l=Object(i.useState)(!1),r=Object(u.a)(l,2),s=r[0],d=r[1],f=s&&a.a.createElement("div",{style:{color:"red"}},"Title is required!");return a.a.createElement("div",null,a.a.createElement("h3",null,e.title,a.a.createElement("button",{onClick:function(){e.removeTodolist(e.todoListId)}},"X")),a.a.createElement("div",null,a.a.createElement("input",{placeholder:"Enter a new task",value:c,onChange:function(e){o(e.currentTarget.value),d(!1)},onKeyPress:function(t){"Enter"===t.key&&(e.addTask(c,e.todoListId),o(""))},className:s?"error":""}),a.a.createElement("button",{onClick:function(){""!==c.trim()?e.addTask(c.trim(),e.todoListId):d(!0),o("")}},"+"),f),a.a.createElement("ul",null,e.tasks.map((function(t){return a.a.createElement("li",{key:t.id,className:t.isDone?"isDone":""},a.a.createElement("input",{type:"checkbox",checked:t.isDone,onChange:function(n){e.changeTaskStatus(t.id,n.currentTarget.checked,e.todoListId)}}),a.a.createElement("span",null,t.title),a.a.createElement("button",{onClick:function(){e.removeTasks(t.id,e.todoListId)}},"delete"))}))),a.a.createElement("div",null,a.a.createElement("button",{className:"all"===e.filter?"activeFilter":"",onClick:function(){e.changeFilter("all",e.todoListId)}}," All"),a.a.createElement("button",{className:"active"===e.filter?"activeFilter":"",onClick:function(){e.changeFilter("active",e.todoListId)}},"Active"),a.a.createElement("button",{className:"completed"===e.filter?"activeFilter":"",onClick:function(){e.changeFilter("completed",e.todoListId)}},"Completed")))}var f=n(18);var m=function(){var e,t=Object(f.a)(),n=Object(f.a)(),c=Object(i.useState)([{id:t,title:"What to learn",filter:"all"},{id:n,title:"What to buy",filter:"all"}]),o=Object(u.a)(c,2),m=o[0],b=o[1],j=Object(i.useState)((e={},Object(s.a)(e,t,[{id:Object(f.a)(),title:"HTML&CSS",isDone:!0},{id:Object(f.a)(),title:"JS",isDone:!0},{id:Object(f.a)(),title:"React",isDone:!1},{id:Object(f.a)(),title:"Redux",isDone:!1}]),Object(s.a)(e,n,[{id:Object(f.a)(),title:"HTML&CSS",isDone:!0},{id:Object(f.a)(),title:"JS",isDone:!0},{id:Object(f.a)(),title:"React",isDone:!1},{id:Object(f.a)(),title:"Redux",isDone:!1}]),e)),O=Object(u.a)(j,2),v=O[0],h=O[1];function k(e,t){h(Object(r.a)(Object(r.a)({},v),{},Object(s.a)({},t,v[t].filter((function(t){return t.id!==e})))))}function E(e,t){var n={id:Object(f.a)(),title:e,isDone:!1};h(Object(r.a)(Object(r.a)({},v),{},Object(s.a)({},t,[n].concat(Object(l.a)(v[t])))))}function p(e,t,n){var i=v[n].find((function(t){return t.id===e}));i&&(i.isDone=t),h(Object(r.a)({},v))}function g(e,t){b(m.map((function(n){return n.id===t?Object(r.a)(Object(r.a)({},n),{},{filter:e}):n})))}function D(e){switch(e.filter){case"active":return v[e.id].filter((function(e){return!e.isDone}));case"completed":return v[e.id].filter((function(e){return e.isDone}));default:return v[e.id]}}function T(e){b(m.filter((function(t){return t.id!==e}))),delete v[e]}var S=m.map((function(e){return a.a.createElement(d,{key:e.id,todoListId:e.id,title:e.title,tasks:D(e),removeTasks:k,changeFilter:g,addTask:E,changeTaskStatus:p,filter:e.filter,removeTodolist:T})}));return a.a.createElement("div",{className:"App"},S)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,n){e.exports=n(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.103ba9d0.chunk.js.map