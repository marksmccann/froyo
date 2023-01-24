"use strict";(self.webpackChunkfroyo=self.webpackChunkfroyo||[]).push([[4991],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>v});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=a,v=d["".concat(s,".").concat(m)]||d[m]||p[m]||i;return n?r.createElement(v,o(o({ref:t},u),{},{components:n})):r.createElement(v,o({ref:t},u))}));function v(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:a,o[1]=l;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(7294),a=n(6010);const i="tabItem_Ymn6";function o(e){let{children:t,hidden:n,className:o}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(i,o),hidden:n},t)}},5488:(e,t,n)=>{n.d(t,{Z:()=>m});var r=n(7462),a=n(7294),i=n(6010),o=n(2389),l=n(7392),s=n(7094),c=n(2466);const u="tabList__CuJ",d="tabItem_LNqP";function p(e){const{lazy:t,block:n,defaultValue:o,values:p,groupId:m,className:v}=e,f=a.Children.map(e.children,(e=>{if((0,a.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),b=p??f.map((e=>{let{props:{value:t,label:n,attributes:r}}=e;return{value:t,label:n,attributes:r}})),h=(0,l.l)(b,((e,t)=>e.value===t.value));if(h.length>0)throw new Error(`Docusaurus error: Duplicate values "${h.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const y=null===o?o:o??f.find((e=>e.props.default))?.props.value??f[0].props.value;if(null!==y&&!b.some((e=>e.value===y)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${y}" but none of its children has the corresponding value. Available values are: ${b.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:k,setTabGroupChoices:g}=(0,s.U)(),[N,w]=(0,a.useState)(y),O=[],{blockElementScrollPositionUntilNextRender:E}=(0,c.o5)();if(null!=m){const e=k[m];null!=e&&e!==N&&b.some((t=>t.value===e))&&w(e)}const j=e=>{const t=e.currentTarget,n=O.indexOf(t),r=b[n].value;r!==N&&(E(t),w(r),null!=m&&g(m,String(r)))},C=e=>{let t=null;switch(e.key){case"Enter":j(e);break;case"ArrowRight":{const n=O.indexOf(e.currentTarget)+1;t=O[n]??O[0];break}case"ArrowLeft":{const n=O.indexOf(e.currentTarget)-1;t=O[n]??O[O.length-1];break}}t?.focus()};return a.createElement("div",{className:(0,i.Z)("tabs-container",u)},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":n},v)},b.map((e=>{let{value:t,label:n,attributes:o}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:N===t?0:-1,"aria-selected":N===t,key:t,ref:e=>O.push(e),onKeyDown:C,onClick:j},o,{className:(0,i.Z)("tabs__item",d,o?.className,{"tabs__item--active":N===t})}),n??t)}))),t?(0,a.cloneElement)(f.filter((e=>e.props.value===N))[0],{className:"margin-top--md"}):a.createElement("div",{className:"margin-top--md"},f.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==N})))))}function m(e){const t=(0,o.Z)();return a.createElement(p,(0,r.Z)({key:String(t)},e))}},9628:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>m,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var r=n(7462),a=(n(7294),n(3905)),i=n(5488),o=n(5162);const l={},s="Listener Utilities",c={unversionedId:"api/listener-utilities",id:"api/listener-utilities",title:"Listener Utilities",description:"This page contains a detailed API reference for various convenience utilities related to listeners.",source:"@site/docs/api/listener-utilities.md",sourceDirName:"api",slug:"/api/listener-utilities",permalink:"/froyo/docs/api/listener-utilities",draft:!1,editUrl:"https://github.com/marksmccann/froyo/docs/api/listener-utilities.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"DOM Utilities",permalink:"/froyo/docs/api/dom-utilities"},next:{title:"testing-library-froyojs",permalink:"/froyo/docs/ecosystem/testing-library-froyojs"}},u={},d=[{value:"Import",id:"import",level:2},{value:"Reference",id:"reference",level:2},{value:"<code>addEventListener</code>",id:"addeventlistener",level:3},{value:"<code>createMediaQueryListener</code>",id:"createmediaquerylistener",level:3},{value:"<code>createMutationObserver</code>",id:"createmutationobserver",level:3}],p={toc:d};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"listener-utilities"},"Listener Utilities"),(0,a.kt)("p",null,"This page contains a detailed API reference for various convenience utilities related to listeners."),(0,a.kt)("h2",{id:"import"},"Import"),(0,a.kt)(i.Z,{mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"es6",label:"ES6",default:!0,mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import {\n    addEventListener,\n    createMediaQueryListener,\n    createMutationObserver,\n} from 'froyojs';\n"))),(0,a.kt)(o.Z,{value:"commonjs",label:"CommonJS",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const {\n    addEventListener,\n    createMediaQueryListener,\n    createMutationObserver,\n} = require('froyojs');\n"))),(0,a.kt)(o.Z,{value:"browser",label:"Browser (CDN)",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"window.froyojs.addEventListener;\nwindow.froyojs.createMediaQueryListener;\nwindow.froyojs.createMutationObserver;\n")))),(0,a.kt)("h2",{id:"reference"},"Reference"),(0,a.kt)("h3",{id:"addeventlistener"},(0,a.kt)("inlineCode",{parentName:"h3"},"addEventListener")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"addEventListener(target: HTMLElement, type: string, callback: fn, useCapture: boolean)\naddEventListener(target: HTMLElement, type: string, callback: fn, options: object)\n")),(0,a.kt)("p",null,"Adds an event listener to the specified target element via ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener"},"EventTarget.addEventListener"),". It returns an object with a ",(0,a.kt)("inlineCode",{parentName:"p"},"destroy")," function that removes the listener when called."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"class MyComponent extends Component {\n    initialize() {\n        this.listeners = {\n            click: addEventListener(element, 'click', () => {}),\n        };\n    }\n}\n")),(0,a.kt)("h3",{id:"createmediaquerylistener"},(0,a.kt)("inlineCode",{parentName:"h3"},"createMediaQueryListener")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"createMediaQueryListener(query: mediaQueryString, callback: fn)\n")),(0,a.kt)("p",null,"Creates a ",(0,a.kt)("inlineCode",{parentName:"p"},"MediaQueryList")," for a given media query via ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia"},"Window.matchMedia")," and adds a change event listener. It returns an object with a reference to the ",(0,a.kt)("inlineCode",{parentName:"p"},"media")," query list instance and a ",(0,a.kt)("inlineCode",{parentName:"p"},"destroy")," function that removes the listener when called."),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("inlineCode",{parentName:"p"},"Window.matchMedia")," is not supported by JSDOM and will need to be ",(0,a.kt)("a",{parentName:"p",href:"https://jestjs.io/docs/26.x/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom"},"mocked manually")," to work within the test environment.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"class MyComponent extends Component {\n    initialize() {\n        this.listeners = {\n            mediaChanged: createMediaQueryListener(\n                '(min-width: 500px)',\n                () => {}\n            ),\n        };\n    }\n}\n")),(0,a.kt)("h3",{id:"createmutationobserver"},(0,a.kt)("inlineCode",{parentName:"h3"},"createMutationObserver")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"createMutationObserver(target: HTMLElement, callback: fn, options: object)\n")),(0,a.kt)("p",null,"Creates a ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver"},"MutationObserver")," for the specified target element and begins observing it. ",(0,a.kt)("inlineCode",{parentName:"p"},"options")," is passed to the ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe"},"observe")," method. It returns an object with a reference to the ",(0,a.kt)("inlineCode",{parentName:"p"},"observer")," instance and a ",(0,a.kt)("inlineCode",{parentName:"p"},"destroy")," function that disconnects the observer when called."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"class MyComponent extends Component {\n    initialize() {\n        this.listeners = {\n            attributeChange: createMutationObserver(element, () => {}, {\n                attributes: true,\n            }),\n        };\n    }\n}\n")))}m.isMDXComponent=!0}}]);