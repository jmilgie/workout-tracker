(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{9650:(e,s,t)=>{Promise.resolve().then(t.bind(t,1907))},1907:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>y});var a=t(5155),l=t(2115),r=t(4798),n=t(2981),i=t(2963),c=t(400),o=t(934),d=t(6565),m=t(955),h=t(8684),u=t(1773),x=t(8867),j=t(767),p=t(5565),v=t(1902),N=t(1719);let b=e=>{let{primaryVideos:s=[],relatedVideos:t=[]}=e,[r,n]=(0,l.useState)(0),[i,c]=(0,l.useState)(!1),[o,d]=(0,l.useState)(!1),[m,h]=(0,l.useState)(0),u=(o?t:s)[r];if(!s.length&&!t.length)return null;let x=Math.ceil(t.length/5),j=function(e){let s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;d(e),n(s),c(!1)},b=t.slice(5*m,(m+1)*5);return(0,a.jsx)("div",{className:"w-full max-w-7xl mx-auto bg-white rounded-lg overflow-hidden",children:(0,a.jsxs)("div",{className:"flex",children:[(0,a.jsx)("div",{className:"flex-1 relative",children:(0,a.jsx)("div",{className:"w-full",children:(0,a.jsx)("div",{className:"relative pb-[56.25%]",children:(0,a.jsx)("div",{className:"absolute inset-0",children:u&&i?(0,a.jsx)("iframe",{src:function(e){let s=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=new URL(e).searchParams.get("v");return t?"https://www.youtube.com/embed/".concat(t,"?").concat(s?"autoplay=1&":"","loop=1&playlist=").concat(t,"&mute=0&modestbranding=1&rel=0"):e}(u.link,!0),title:u.title,className:"w-full h-full",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}):u?(0,a.jsxs)("div",{className:"w-full h-full relative",children:[(0,a.jsx)(p.default,{src:u.thumbnail,alt:u.title,fill:!0,className:"object-cover"}),(0,a.jsx)("div",{className:"absolute inset-0 flex items-center justify-center",children:(0,a.jsx)("button",{onClick:()=>c(!0),className:"w-16 h-16 flex items-center justify-center rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 shadow-lg transition-all group",children:(0,a.jsx)("div",{className:"w-0 h-0 border-y-[12px] border-y-transparent border-l-[20px] border-l-blue-600 ml-1 group-hover:border-l-blue-700"})})})]}):null})})})}),t.length>0&&(0,a.jsxs)("div",{className:"w-72 border-l border-gray-200",children:[(0,a.jsx)("div",{className:"p-2 border-b border-gray-200",children:(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsx)("h3",{className:"font-semibold text-sm",children:o?"Other Videos":"Related Videos"}),o&&(0,a.jsx)("button",{onClick:()=>j(!1),className:"text-xs text-blue-600 hover:text-blue-700",children:"Back to Main"})]})}),(0,a.jsxs)("div",{className:"relative",children:[m>0&&(0,a.jsx)("button",{onClick:()=>{h(e=>Math.max(0,e-1))},className:"sticky top-0 w-full p-1 bg-white border-b border-gray-200 hover:bg-gray-50",children:(0,a.jsx)(v.A,{className:"w-4 h-4 mx-auto"})}),(0,a.jsx)("div",{className:"space-y-2 p-2",children:b.map((e,s)=>(0,a.jsxs)("button",{onClick:()=>j(!o,s+5*m),className:"w-full flex gap-2 p-2 hover:bg-gray-50 rounded-lg",children:[(0,a.jsx)("div",{className:"w-24 flex-shrink-0",children:(0,a.jsx)("div",{className:"relative aspect-video bg-gray-100 rounded overflow-hidden",children:(0,a.jsx)(p.default,{src:e.thumbnail,alt:e.title,fill:!0,className:"object-cover"})})}),(0,a.jsx)("div",{className:"flex-1 min-w-0 text-left",children:(0,a.jsx)("p",{className:"text-sm line-clamp-2",children:e.title})})]},s))}),m<x-1&&(0,a.jsx)("button",{onClick:()=>{h(e=>Math.min(x-1,e+1))},className:"sticky bottom-0 w-full p-1 bg-white border-t border-gray-200 hover:bg-gray-50",children:(0,a.jsx)(N.A,{className:"w-4 h-4 mx-auto"})})]})]})]})})};var f=t(2818);let g=()=>{let[e,s]=(0,l.useState)("1"),[t,p]=(0,l.useState)({}),[v,N]=(0,l.useState)(null),[g,y]=(0,l.useState)(null),[w,A]=(0,l.useState)([]);(0,l.useEffect)(()=>{let e=async()=>{try{let e=f.env.NEXT_PUBLIC_BASE_PATH||"",s=await fetch("".concat(e,"/workoutvideos.json"));if(!s.ok)throw Error("HTTP error! status: ".concat(s.status));let t=await s.json();if(Array.isArray(t))A(t);else throw Error("Invalid video data format")}catch(e){console.error("Error loading video data:",e)}};(async()=>{try{let e=f.env.NEXT_PUBLIC_BASE_PATH||"",s=await fetch("".concat(e,"/workout.json"));if(!s.ok)throw Error("HTTP error! status: ".concat(s.status));let t=await s.json();N(t)}catch(e){y("Error loading workout data"),console.error("Error loading workout data:",e)}})(),e()},[]);let k=e=>null==e?void 0:e.toLowerCase().replace(/[^a-z0-9\s]/g,"").trim(),E=e=>{if(!e||!w.length)return{primaryVideos:[],relatedVideos:[]};let s=k(e.name).split(/\s+/),t=Array.isArray(e.equipment)?e.equipment.map(k):[k(e.equipment||"")],a=e=>s.every(s=>e.includes(s))&&t.some(s=>s&&e.includes(s)),l=e=>s.some(s=>e.includes(s))||t.some(s=>s&&e.includes(s)),r=w.filter(e=>a(k(e.title))),n=w.filter(e=>l(k(e.title))&&!r.includes(e));return{primaryVideos:r,relatedVideos:n}},P=async e=>{var s;let t=null===(s=e.target.files)||void 0===s?void 0:s[0];if(t)try{let e=await t.text(),s=JSON.parse(e);if(!s.weeks||!s.programTitle)throw Error("Invalid workout plan format");N(s),y(null),p({})}catch(e){y("Error loading workout plan. Please check the file format."),console.error("Error loading file:",e)}},S=async()=>{try{let e=f.env.NEXT_PUBLIC_BASE_PATH||"",s=await fetch("".concat(e,"/workout.json"));if(!s.ok)throw Error("HTTP error! status: ".concat(s.status));let t=await s.json();N(t),p({}),y(null)}catch(e){y("Error loading default workout data"),console.error("Error resetting to default:",e)}},_=(e,s,t,a)=>{let l="".concat(e,"-").concat(s,"-").concat(t,"-").concat(a);p(e=>({...e,[l]:!e[l]}))},C=e=>{let s=[];if(e.sets&&s.push("".concat(e.sets," sets")),e.reps&&s.push("".concat(e.reps," reps")),e.repsPerLeg&&s.push("".concat(e.repsPerLeg," reps per leg")),e.duration&&s.push(e.duration),e.equipment){let t=Array.isArray(e.equipment)?e.equipment.join("/"):e.equipment;s.push("(".concat(t,")"))}return"".concat(e.partner?"Partner ".concat(e.partner,": "):"").concat(e.name," ").concat(s.length?s.join(", "):"")};return v?(0,a.jsx)(r.A,{className:"py-4",children:(0,a.jsxs)(n.A,{className:"mb-4",children:[(0,a.jsx)(n.A.Header,{className:"bg-light",children:(0,a.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[(0,a.jsx)("h2",{className:"h4 mb-0",children:v.programTitle}),(0,a.jsxs)("div",{className:"d-flex gap-2",children:[(0,a.jsxs)(i.A,{variant:"primary",className:"d-flex align-items-center gap-2",children:[(0,a.jsx)(h.A,{size:16}),(0,a.jsxs)("label",{className:"mb-0",style:{cursor:"pointer"},children:["Upload Plan",(0,a.jsx)("input",{type:"file",accept:".json",onChange:P,className:"d-none"})]})]}),(0,a.jsxs)(i.A,{variant:"secondary",onClick:S,className:"d-flex align-items-center gap-2",children:[(0,a.jsx)(u.A,{size:16}),"Reset"]})]})]})}),(0,a.jsxs)(n.A.Body,{children:[g&&(0,a.jsx)(c.A,{variant:"danger",className:"mb-4",children:g}),(0,a.jsx)(o.A,{activeKey:e,onSelect:e=>e&&s(e),className:"mb-4",children:Object.entries(v.weeks).map(e=>{var s;let[l,r]=e;return(0,a.jsx)(d.A,{eventKey:l,title:"Week ".concat(l),children:(0,a.jsxs)("div",{className:"mt-4",children:[(0,a.jsxs)("h3",{className:"h5 mb-3",children:[r.title," - Focus: ",r.focus]}),(null===(s=r.notes)||void 0===s?void 0:s.main)&&(0,a.jsxs)(c.A,{variant:"info",className:"mb-4",children:[(0,a.jsx)("h4",{className:"h6",children:"Week Notes:"}),(0,a.jsx)("ul",{className:"mb-0",children:r.notes.main.map((e,s)=>(0,a.jsx)("li",{children:e},s))})]}),(0,a.jsx)(m.A,{children:Object.entries(r.days||{}).map(e=>{var s,r;let[n,i]=e;return(0,a.jsxs)(m.A.Item,{eventKey:n,children:[(0,a.jsx)(m.A.Header,{children:(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"text-capitalize",children:n}),(0,a.jsxs)("small",{className:"text-muted",children:[i.name," ",i.type&&"(".concat(i.type,")")]})]})}),(0,a.jsxs)(m.A.Body,{children:[i.notes&&(0,a.jsxs)(c.A,{variant:"secondary",className:"mb-3",children:[(0,a.jsx)("h5",{className:"h6",children:"Notes:"}),(0,a.jsx)("ul",{className:"mb-0",children:Array.isArray(i.notes)?i.notes.map((e,s)=>(0,a.jsx)("li",{children:e},s)):(0,a.jsx)("li",{children:i.notes})})]}),null===(s=i.blocks)||void 0===s?void 0:s.map((e,s)=>(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsxs)("h5",{className:"h6 mb-3",children:[e.name," ",e.type&&"(".concat(e.type,")")]}),(0,a.jsx)("div",{children:e.exercises.map((e,r)=>{let i=t["".concat(l,"-").concat(n,"-").concat(s,"-").concat(r)],{primaryVideos:c,relatedVideos:o}=E(e);return(0,a.jsxs)("div",{className:"mb-3",children:[(0,a.jsxs)("div",{className:"d-flex align-items-center gap-2 p-2 bg-light rounded cursor-pointer",onClick:()=>_(l,n,s,r),children:[i?(0,a.jsx)(x.A,{className:"text-success",size:20}):(0,a.jsx)(j.A,{className:"text-muted",size:20}),(0,a.jsx)("span",{className:i?"text-muted text-decoration-line-through":"",children:C(e)})]}),!i&&(c.length>0||o.length>0)&&(0,a.jsx)("div",{className:"ps-4 mt-2",children:(0,a.jsx)(b,{primaryVideos:c,relatedVideos:o})})]},r)})}),e.notes&&(0,a.jsxs)("small",{className:"text-muted fst-italic",children:["Note: ",e.notes]})]},s)),null===(r=i.options)||void 0===r?void 0:r.map((e,s)=>{var t;return(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("h5",{className:"h6 mb-2",children:e.name}),(0,a.jsx)("div",{className:"ps-3",children:null===(t=e.structure)||void 0===t?void 0:t.map((e,s)=>(0,a.jsxs)("div",{children:["• ",e.name,": ",e.duration,e.rounds&&" (".concat(e.rounds," rounds: ").concat(e.work,"/").concat(e.rest,")"),e.intensity&&" - ".concat(e.intensity)]},s))})]},s)})]})]},n)})})]})},l)})})]})]})}):(0,a.jsx)(r.A,{className:"py-4",children:(0,a.jsx)(n.A,{children:(0,a.jsx)(n.A.Body,{children:"Loading workout data..."})})})};function y(){return(0,a.jsx)("main",{children:(0,a.jsx)(g,{})})}}},e=>{var s=s=>e(e.s=s);e.O(0,[176,441,517,358],()=>s(9650)),_N_E=e.O()}]);