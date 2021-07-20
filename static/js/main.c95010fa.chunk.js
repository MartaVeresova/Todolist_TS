(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{102:function(t,e,n){t.exports={container:"Error404_container__19vDO"}},120:function(t,e,n){},121:function(t,e,n){},148:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),c=n(10),s=n.n(c);n(120),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(121);var i,o,u,d=n(201),l=n(196),j=n(205),b=n(193),O=n(202),f=n(150),p=n(204),h=n(203),m=n(14),v=n(13),x=n.n(v),T=n(22),g=n(64),k=n(7),S=n(93),y=n.n(S).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1",withCredentials:!0,headers:{"api-key":"56cc9d09-6ac5-48a7-98d1-6f7ea21ef704"}}),I=function(){return y.get("/todo-lists")},E=function(t){return y.post("/todo-lists",{title:t})},L=function(t){return y.delete("/todo-lists/".concat(t))},w=function(t,e){return y.put("/todo-lists/".concat(t),{title:e})},C=function(t){return y.get("/todo-lists/".concat(t,"/tasks"))},A=function(t,e){return y.post("/todo-lists/".concat(t,"/tasks"),{title:e})},D=function(t,e){return y.delete("/todo-lists/".concat(t,"/tasks/").concat(e))},N=function(t,e,n){return y.put("/todo-lists/".concat(t,"/tasks/").concat(e),n)},R=function(t){return y.post("/auth/login",t)},G=function(){return y.get("/auth/me")},H=function(){return y.delete("/auth/login")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(i||(i={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(o||(o={})),function(t){t[t.succeeded=0]="succeeded",t[t.error=1]="error",t[t.captcha=10]="captcha"}(u||(u={}));var K=function(t,e){t(W(e)),t(z("failed"))},F=function(t,e){e.messages.length?t(W(e.messages[0])):t(W("Some ERROR")),t(z("failed"))},M={isLoggedIn:!1},P=function(t){return{type:"login/SET-IS-LOGGED-IN",value:t}},U={status:"idle",error:null,isInitialized:!1},z=function(t){return{type:"App/SET-STATUS",status:t}},W=function(t){return{type:"App/SET-ERROR",error:t}},V=[],Z=function(t){return{type:"Todo/REMOVE-TODOLIST",id:t}},_=function(t,e){return{type:"Todo/CHANGE-TODOLIST-TITLE",title:t,id:e}},B=function(t,e){return{type:"Todo/CHANGE-TODOLIST-ENTITY-STATUS",entityStatus:t,id:e}},Y=n(197),q=n(149),J=n(50),$=n(206),Q=n(194),X=n(3),tt=r.a.memo((function(t){var e=t.addItem,n=t.disabled,r=Object(a.useState)(""),c=Object(J.a)(r,2),s=c[0],i=c[1],o=Object(a.useState)(!1),u=Object(J.a)(o,2),d=u[0],l=u[1],j=Object(a.useCallback)((function(t){i(t.currentTarget.value),l(!1)}),[]),O=Object(a.useCallback)((function(){""!==s.trim()?e(s.trim()):l(!0),i("")}),[e,s]),f=Object(a.useCallback)((function(t){"Enter"===t.key&&O()}),[O]);return Object(X.jsxs)("div",{children:[Object(X.jsx)($.a,{variant:"outlined",error:d,placeholder:"Enter a new task",value:s,onChange:j,onKeyPress:f,label:"Title",helperText:d&&"Title is required!",size:"small",onBlur:function(){return l(!1)},disabled:n}),Object(X.jsx)(b.a,{onClick:O,disabled:n,children:Object(X.jsx)(Q.a,{})})]})})),et=n(187),nt=r.a.memo((function(t){var e=t.title,n=t.disabled,r=t.onChangeTitle,c=Object(a.useState)(!1),s=Object(J.a)(c,2),i=s[0],o=s[1],u=Object(a.useState)(e),d=Object(J.a)(u,2),l=d[0],j=d[1],b=Object(a.useCallback)((function(){o(!1),l.length>100&&j(e),r(l)}),[r,l,e]),O=Object(a.useCallback)((function(t){j(t.currentTarget.value)}),[]),f=Object(a.useCallback)((function(t){"Enter"===t.key&&b()}),[b]);return i?Object(X.jsx)(et.a,{color:"primary",value:l,onChange:O,autoFocus:!0,onBlur:b,onKeyPress:f,disabled:n}):Object(X.jsx)("span",{onDoubleClick:function(){return o(!0)},children:e})})),at=n(98),rt=n.n(at),ct=n(34),st={},it=function(t,e){return{type:"Tasks/SET-TASKS",todoListId:t,tasks:e}},ot=function(t,e){return{type:"Tasks/REMOVE-TASK",taskId:t,todoListId:e}},ut=function(t,e,n){return{type:"Tasks/CHANGE-TASK",taskId:t,model:e,todoListId:n}},dt=function(t,e,n){return{type:"Tasks/CHANGE-TASK-ENTITY-STATUS",entityStatus:t,todoListId:e,taskId:n}},lt=function(t,e,n){return function(){var a=Object(T.a)(x.a.mark((function a(r,c){var s,i,o;return x.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(!(s=c().tasks[t].find((function(t){return t.id===n})))){a.next=14;break}return i=Object(k.a)({title:s.title,status:s.status,startDate:s.startDate,priority:s.priority,deadline:s.deadline,description:s.description},e),r(z("loading")),a.prev=4,a.next=7,N(t,n,i);case 7:(o=a.sent).data.resultCode===u.succeeded?(r(ut(n,e,t)),r(z("succeeded"))):F(r,o.data),a.next=14;break;case 11:a.prev=11,a.t0=a.catch(4),K(r,a.t0.message);case 14:case"end":return a.stop()}}),a,null,[[4,11]])})));return function(t,e){return a.apply(this,arguments)}}()},jt=n(208),bt=n(195),Ot=r.a.memo((function(t){var e=t.todoListId,n=t.task,r=t.entityStatus,c=Object(m.b)(),s=Object(a.useCallback)((function(){return c((t=e,a=n.id,function(){var e=Object(T.a)(x.a.mark((function e(n){var r;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(z("loading")),n(dt("loading",t,a)),e.prev=2,e.next=5,D(t,a);case 5:(r=e.sent).data.resultCode===u.succeeded?(n(ot(a,t)),n(z("succeeded"))):F(n,r.data),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),K(n,e.t0.message);case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()));var t,a}),[c,n,e]),o=Object(a.useCallback)((function(t){c(lt(e,{status:t.currentTarget.checked?i.Completed:i.New},n.id))}),[c,n,e]),d=Object(a.useCallback)((function(t){return c(lt(e,{title:t},n.id))}),[c,n,e]),l=n.status===i.Completed?"isDone":"";return Object(X.jsxs)("li",{children:[Object(X.jsxs)("span",{className:l,children:[Object(X.jsx)(jt.a,{color:"primary",checked:n.status===i.Completed,onChange:o,disabled:"loading"===r}),Object(X.jsx)(nt,{title:n.title,onChangeTitle:d,disabled:"loading"===r})]}),Object(X.jsx)(b.a,{onClick:s,disabled:"loading"===r,children:Object(X.jsx)(bt.a,{})})]},n.id)})),ft=r.a.memo((function(t){var e=t.todoListId,n=t.changeTodoListTitle,r=t.removeTodolist,c=t.changeFilter,s=t.title,o=t.filter,d=t.entityStatus,j=Object(m.c)((function(t){return t.tasks[e]})),O=Object(m.b)();Object(a.useEffect)((function(){O(function(t){return function(){var e=Object(T.a)(x.a.mark((function e(n){var a;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(z("loading")),e.prev=1,e.next=4,C(t);case 4:a=e.sent,n(it(t,a.data.items)),n(z("succeeded")),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),K(n,e.t0.message);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}()}(e))}),[O,e]);var f=function(){switch(o){case"active":return j.filter((function(t){return t.status===i.New}));case"completed":return j.filter((function(t){return t.status===i.Completed}));default:return j}}(),p=Object(a.useCallback)((function(){c("all",e)}),[c,e]),h=Object(a.useCallback)((function(){c("active",e)}),[c,e]),v=Object(a.useCallback)((function(){c("completed",e)}),[c,e]),g=Object(a.useCallback)((function(){r(e)}),[r,e]),k=Object(a.useCallback)((function(t){return O(function(t,e){return function(){var n=Object(T.a)(x.a.mark((function n(a){var r;return x.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a(z("loading")),n.prev=1,n.next=4,A(t,e);case 4:(r=n.sent).data.resultCode===u.succeeded?(a({type:"Tasks/ADD-NEW-TASK",task:r.data.data.item}),a(z("succeeded"))):F(a,r.data),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(1),K(a,n.t0.message);case 11:case"end":return n.stop()}}),n,null,[[1,8]])})));return function(t){return n.apply(this,arguments)}}()}(e,t))}),[O,e]),S=Object(a.useCallback)((function(t){return n(t,e)}),[n,e]);return Object(X.jsxs)("div",{children:[Object(X.jsxs)("h3",{children:[Object(X.jsx)(nt,{title:s,onChangeTitle:S,disabled:"loading"===d}),Object(X.jsx)(b.a,{onClick:g,disabled:"loading"===d,children:Object(X.jsx)(rt.a,{})})]}),Object(X.jsx)(tt,{addItem:k,disabled:"loading"===d}),Object(X.jsx)("ul",{style:{listStyle:"none",paddingLeft:"0px"},children:f.map((function(t){return Object(X.jsx)(Ot,{todoListId:e,task:t,entityStatus:t.entityStatus},t.id)}))}),Object(X.jsxs)("div",{children:[Object(X.jsx)(l.a,{variant:"all"===o?"contained":"outlined",size:"small",color:"primary",onClick:p,children:"All"}),Object(X.jsx)(l.a,{style:{marginLeft:"3px"},variant:"active"===o?"contained":"outlined",size:"small",color:"primary",onClick:h,children:"Active"}),Object(X.jsx)(l.a,{style:{marginLeft:"3px"},variant:"completed"===o?"contained":"outlined",size:"small",color:"primary",onClick:v,children:"Completed"})]})]})})),pt=n(17),ht=function(){var t=Object(m.b)(),e=Object(m.c)((function(t){return t.todoLists})),n=Object(m.c)((function(t){return t.auth.isLoggedIn}));function r(e){var n;t((n=e,function(){var t=Object(T.a)(x.a.mark((function t(e){var a;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(z("loading")),e(B("loading",n)),t.prev=2,t.next=5,L(n);case 5:(a=t.sent).data.resultCode===u.succeeded?(e(Z(n)),e(z("succeeded"))):F(e,a.data),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(2),K(e,t.t0.message);case 12:case"end":return t.stop()}}),t,null,[[2,9]])})));return function(e){return t.apply(this,arguments)}}()))}Object(a.useEffect)((function(){n&&t(function(){var t=Object(T.a)(x.a.mark((function t(e){var n;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(z("loading")),t.prev=1,t.next=4,I();case 4:n=t.sent,e({type:"Todo/SET-TODOLISTS",todoLists:n.data}),e(z("succeeded")),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),K(e,t.t0.message);case 12:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e){return t.apply(this,arguments)}}())}),[t,n]);var c=Object(a.useCallback)((function(e){t(function(t){return function(){var e=Object(T.a)(x.a.mark((function e(n){var a;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(z("loading")),e.prev=1,e.next=4,E(t);case 4:(a=e.sent).data.resultCode===u.succeeded?(n({type:"Todo/ADD-NEW-TODOLIST",todoList:a.data.data.item}),n(z("succeeded"))):F(n,a.data),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),K(n,e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()}(e))}),[t]);function s(e,n){t(function(t,e){return function(){var n=Object(T.a)(x.a.mark((function n(a){var r;return x.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a(z("loading")),n.prev=1,n.next=4,w(t,e);case 4:(r=n.sent).data.resultCode===u.succeeded?(a(_(e,t)),a(z("succeeded"))):F(a,r.data),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(1),K(a,n.t0.message);case 11:case"end":return n.stop()}}),n,null,[[1,8]])})));return function(t){return n.apply(this,arguments)}}()}(n,e))}function i(e,n){t(function(t,e){return{type:"Todo/CHANGE-TODOLIST-FILTER",value:t,id:e}}(e,n))}return n?Object(X.jsxs)(X.Fragment,{children:[Object(X.jsx)(Y.a,{container:!0,style:{padding:"20px 0"},children:Object(X.jsx)(tt,{addItem:c})}),Object(X.jsx)(Y.a,{container:!0,spacing:3,children:e.map((function(t){return Object(X.jsx)(Y.a,{item:!0,children:Object(X.jsx)(q.a,{elevation:4,style:{padding:"15px"},children:Object(X.jsx)(ft,{todoListId:t.id,title:t.title,filter:t.filter,entityStatus:t.entityStatus,changeFilter:i,removeTodolist:r,changeTodoListTitle:s})})},t.id)}))})]}):Object(X.jsx)(pt.a,{to:"/login"})},mt=n(210),vt=n(207);function xt(t){return Object(X.jsx)(vt.a,Object(k.a)({elevation:6,variant:"filled"},t))}function Tt(){var t=Object(m.b)(),e=Object(m.c)((function(t){return t.app.error})),n=function(e,n){"clickaway"!==n&&t(W(null))};return Object(X.jsx)(mt.a,{open:null!==e,autoHideDuration:4e3,onClose:n,children:Object(X.jsx)(xt,{onClose:n,severity:"error",children:e})})}var gt=n(191),kt=n(199),St=n(198),yt=n(192),It=n(104),Et=n(101),Lt=n.n(Et),wt=function(){var t=Object(m.b)(),e=Object(m.c)((function(t){return t.auth.isLoggedIn})),n=Object(It.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<3?e.password="Must be 3 characters or more.":t.password.length>15&&(e.password="Must be 15 characters or less"):e.password="Required",e},onSubmit:function(e){var a;t((a=e,function(){var t=Object(T.a)(x.a.mark((function t(e){var n;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(z("loading")),t.prev=1,t.next=4,R(a);case 4:(n=t.sent).data.resultCode===u.succeeded?(e(P(!0)),e(z("succeeded"))):F(e,n.data),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),K(e,t.t0.message);case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}())),n.resetForm()}});return e?Object(X.jsx)(pt.a,{to:"/"}):Object(X.jsx)(Y.a,{container:!0,justify:"center",children:Object(X.jsx)(Y.a,{item:!0,xs:4,children:Object(X.jsx)("form",{onSubmit:n.handleSubmit,children:Object(X.jsxs)(gt.a,{children:[Object(X.jsx)(Lt.a,{}),Object(X.jsxs)(yt.a,{children:[Object(X.jsxs)("p",{children:["To log in get registered",Object(X.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",rel:"noreferrer",children:"here"})]}),Object(X.jsx)("p",{children:"or use common test account credentials:"}),Object(X.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(X.jsx)("p",{children:"Password: free"})]}),Object(X.jsxs)(St.a,{children:[Object(X.jsx)($.a,Object(k.a)({label:"Email",margin:"normal"},n.getFieldProps("email"))),n.touched.email&&n.errors.email&&Object(X.jsx)("div",{style:{color:"red"},children:n.errors.email}),Object(X.jsx)($.a,Object(k.a)({type:"password",label:"Password",margin:"normal"},n.getFieldProps("password"))),n.touched.password&&n.errors.password&&Object(X.jsx)("div",{style:{color:"red"},children:n.errors.password}),Object(X.jsx)(kt.a,{label:"Remember me",control:Object(X.jsx)(jt.a,Object(k.a)({},n.getFieldProps("rememberMe")))}),Object(X.jsx)(l.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})]})})})})},Ct=n.p+"static/media/Error404.d9af2882.png",At=n(102),Dt=n.n(At),Nt=function(){Object(m.b)(),Object(m.c)((function(t){return t.auth.isLoggedIn}));var t=Object(pt.g)();return Object(X.jsxs)("div",{className:Dt.a.container,children:[Object(X.jsx)("img",{src:Ct,alt:"Error 404: PAGE NOT FOUND"}),Object(X.jsx)(l.a,{variant:"contained",size:"small",color:"secondary",onClick:function(){t.push("/")},children:"Take me away"})]})},Rt=n(200);var Gt=function(){var t=Object(m.b)(),e=Object(m.c)((function(t){return t.app.status})),n=Object(m.c)((function(t){return t.app.isInitialized})),r=Object(m.c)((function(t){return t.auth.isLoggedIn}));return Object(a.useEffect)((function(){t(function(){var t=Object(T.a)(x.a.mark((function t(e){var n;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,G();case 3:(n=t.sent).data.resultCode===u.succeeded?e(P(!0)):F(e,n.data),e({type:"App/SET-IS-INITIALIZED",value:!0}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),K(e,t.t0.message);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}())}),[t]),n?Object(X.jsxs)("div",{children:[Object(X.jsx)(d.a,{position:"static",children:Object(X.jsxs)(O.a,{style:{justifyContent:"space-between"},children:[Object(X.jsx)(b.a,{color:"inherit",children:Object(X.jsx)(h.a,{})}),Object(X.jsx)(f.a,{variant:"h6",children:"TodoLists"}),r&&Object(X.jsx)(l.a,{color:"inherit",variant:"outlined",onClick:function(){t(function(){var t=Object(T.a)(x.a.mark((function t(e){var n;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(z("loading")),t.prev=1,t.next=4,H();case 4:(n=t.sent).data.resultCode===u.succeeded?(e(P(!1)),e(z("succeeded"))):F(e,n.data),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),K(e,t.t0.message);case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}())},children:"Logout"})]})}),"loading"===e&&Object(X.jsx)(p.a,{color:"secondary"}),Object(X.jsx)(j.a,{fixed:!0,children:Object(X.jsxs)(pt.d,{children:[Object(X.jsx)(pt.b,{exact:!0,path:"/",render:function(){return Object(X.jsx)(ht,{})}}),Object(X.jsx)(pt.b,{path:"/login",render:function(){return Object(X.jsx)(wt,{})}}),Object(X.jsx)(pt.b,{path:"/404",render:function(){return Object(X.jsx)(Nt,{})}}),Object(X.jsx)(pt.a,{from:"*",to:"/404"})]})}),Object(X.jsx)(Tt,{})]}):Object(X.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(X.jsx)(Rt.a,{})})},Ht=n(65),Kt=n(103),Ft=Object(Ht.b)({todoLists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"Todo/SET-TODOLISTS":return e.todoLists.map((function(t){return Object(k.a)(Object(k.a)({},t),{},{filter:"all",entityStatus:"idle"})}));case"Todo/REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.id}));case"Todo/ADD-NEW-TODOLIST":return[Object(k.a)(Object(k.a)({},e.todoList),{},{filter:"all",entityStatus:"idle"})].concat(Object(g.a)(t));case"Todo/CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.id?Object(k.a)(Object(k.a)({},t),{},{title:e.title}):t}));case"Todo/CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.id?Object(k.a)(Object(k.a)({},t),{},{filter:e.value}):t}));case"Todo/CHANGE-TODOLIST-ENTITY-STATUS":return t.map((function(t){return t.id===e.id?Object(k.a)(Object(k.a)({},t),{},{entityStatus:e.entityStatus}):t}));default:return t}},tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:st,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"Tasks/SET-TASKS":return Object(k.a)(Object(k.a)({},t),{},Object(ct.a)({},e.todoListId,e.tasks.map((function(t){return Object(k.a)(Object(k.a)({},t),{},{entityStatus:"idle"})}))));case"Todo/SET-TODOLISTS":return e.todoLists.forEach((function(e){return Object(k.a)({},t[e.id]=[])})),Object(k.a)({},t);case"Tasks/REMOVE-TASK":return Object(k.a)(Object(k.a)({},t),{},Object(ct.a)({},e.todoListId,t[e.todoListId].filter((function(t){return t.id!==e.taskId}))));case"Tasks/ADD-NEW-TASK":return Object(k.a)(Object(k.a)({},t),{},Object(ct.a)({},e.task.todoListId,[Object(k.a)(Object(k.a)({},e.task),{},{entityStatus:"idle"})].concat(Object(g.a)(t[e.task.todoListId]))));case"Tasks/CHANGE-TASK":return Object(k.a)(Object(k.a)({},t),{},Object(ct.a)({},e.todoListId,t[e.todoListId].map((function(t){return t.id===e.taskId?Object(k.a)(Object(k.a)({},t),e.model):t}))));case"Todo/ADD-NEW-TODOLIST":return Object(k.a)(Object(k.a)({},t),{},Object(ct.a)({},e.todoList.id,[]));case"Todo/REMOVE-TODOLIST":var n=Object(k.a)({},t);return delete n[e.id],n;case"Tasks/CHANGE-TASK-ENTITY-STATUS":return Object(k.a)(Object(k.a)({},t),{},Object(ct.a)({},e.todoListId,t[e.todoListId].map((function(t){return t.id===e.taskId?Object(k.a)(Object(k.a)({},t),{},{entityStatus:e.entityStatus}):t}))));default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"App/SET-STATUS":return Object(k.a)(Object(k.a)({},t),{},{status:e.status});case"App/SET-ERROR":return Object(k.a)(Object(k.a)({},t),{},{error:e.error});case"App/SET-IS-INITIALIZED":return Object(k.a)(Object(k.a)({},t),{},{isInitialized:e.value});default:return t}},auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"login/SET-IS-LOGGED-IN":return Object(k.a)(Object(k.a)({},t),{},{isLoggedIn:e.value});default:return t}}}),Mt=Object(Ht.c)(Ft,Object(Ht.a)(Kt.a));window.store=Mt;var Pt=n(43);s.a.render(Object(X.jsx)(Pt.a,{children:Object(X.jsx)(m.a,{store:Mt,children:Object(X.jsx)(Gt,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[148,1,2]]]);
//# sourceMappingURL=main.c95010fa.chunk.js.map