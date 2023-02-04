"use strict";(self.webpackChunkfroyo=self.webpackChunkfroyo||[]).push([[1650],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=a.createContext({}),p=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(i.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(n),m=o,h=d["".concat(i,".").concat(m)]||d[m]||u[m]||r;return n?a.createElement(h,l(l({ref:t},c),{},{components:n})):a.createElement(h,l({ref:t},c))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,l=new Array(r);l[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[d]="string"==typeof e?e:o,l[1]=s;for(var p=2;p<r;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(7294),o=n(6010);const r="tabItem_Ymn6";function l(e){let{children:t,hidden:n,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,o.Z)(r,l),hidden:n},t)}},5488:(e,t,n)=>{n.d(t,{Z:()=>m});var a=n(7462),o=n(7294),r=n(6010),l=n(2389),s=n(7392),i=n(7094),p=n(2466);const c="tabList__CuJ",d="tabItem_LNqP";function u(e){const{lazy:t,block:n,defaultValue:l,values:u,groupId:m,className:h}=e,f=o.Children.map(e.children,(e=>{if((0,o.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),k=u??f.map((e=>{let{props:{value:t,label:n,attributes:a}}=e;return{value:t,label:n,attributes:a}})),g=(0,s.l)(k,((e,t)=>e.value===t.value));if(g.length>0)throw new Error(`Docusaurus error: Duplicate values "${g.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const v=null===l?l:l??f.find((e=>e.props.default))?.props.value??f[0].props.value;if(null!==v&&!k.some((e=>e.value===v)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${v}" but none of its children has the corresponding value. Available values are: ${k.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:b,setTabGroupChoices:y}=(0,i.U)(),[N,C]=(0,o.useState)(v),j=[],{blockElementScrollPositionUntilNextRender:w}=(0,p.o5)();if(null!=m){const e=b[m];null!=e&&e!==N&&k.some((t=>t.value===e))&&C(e)}const T=e=>{const t=e.currentTarget,n=j.indexOf(t),a=k[n].value;a!==N&&(w(t),C(a),null!=m&&y(m,String(a)))},E=e=>{let t=null;switch(e.key){case"Enter":T(e);break;case"ArrowRight":{const n=j.indexOf(e.currentTarget)+1;t=j[n]??j[0];break}case"ArrowLeft":{const n=j.indexOf(e.currentTarget)-1;t=j[n]??j[j.length-1];break}}t?.focus()};return o.createElement("div",{className:(0,r.Z)("tabs-container",c)},o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":n},h)},k.map((e=>{let{value:t,label:n,attributes:l}=e;return o.createElement("li",(0,a.Z)({role:"tab",tabIndex:N===t?0:-1,"aria-selected":N===t,key:t,ref:e=>j.push(e),onKeyDown:E,onClick:T},l,{className:(0,r.Z)("tabs__item",d,l?.className,{"tabs__item--active":N===t})}),n??t)}))),t?(0,o.cloneElement)(f.filter((e=>e.props.value===N))[0],{className:"margin-top--md"}):o.createElement("div",{className:"margin-top--md"},f.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==N})))))}function m(e){const t=(0,l.Z)();return o.createElement(u,(0,a.Z)({key:String(t)},e))}},7184:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>p,toc:()=>d});var a=n(7462),o=(n(7294),n(3905)),r=n(5488),l=n(5162);const s={},i="Component",p={unversionedId:"api/component",id:"api/component",title:"Component",description:"This page contains a detailed API reference for the Component class definition.",source:"@site/docs/api/component.md",sourceDirName:"api",slug:"/api/component",permalink:"/froyo/docs/api/component",draft:!1,editUrl:"https://github.com/marksmccann/froyo/docs/api/component.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Subcomponents",permalink:"/froyo/docs/advanced/subcomponents"},next:{title:"Create Initializer",permalink:"/froyo/docs/api/create-initializer"}},c={},d=[{value:"Import",id:"import",level:2},{value:"Constructor",id:"constructor",level:2},{value:"<code>Component</code>",id:"component-1",level:3},{value:"Instance properties",id:"instance-properties",level:2},{value:"<code>components</code>",id:"components",level:3},{value:"<code>elements</code>",id:"elements",level:3},{value:"<code>initialized</code>",id:"initialized",level:3},{value:"<code>listeners</code>",id:"listeners",level:3},{value:"<code>rootElement</code>",id:"rootelement",level:3},{value:"<code>state</code>",id:"state",level:3},{value:"Instance methods",id:"instance-methods",level:2},{value:"<code>destroy</code>",id:"destroy",level:3},{value:"<code>setState</code>",id:"setstate",level:3},{value:"<code>setup</code>",id:"setup",level:3},{value:"<code>subscribe</code>",id:"subscribe",level:3},{value:"<code>unsubscribe</code>",id:"unsubscribe",level:3},{value:"<code>render</code>",id:"render",level:3},{value:"<code>update</code>",id:"update",level:3},{value:"<code>validate</code>",id:"validate",level:3},{value:"Class properties",id:"class-properties",level:2},{value:"<code>defaultState</code>",id:"defaultstate",level:3},{value:"<code>displayName</code>",id:"displayname",level:3},{value:"<code>stateTypes</code>",id:"statetypes",level:3},{value:"<code>instances</code>",id:"instances",level:3}],u={toc:d};function m(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"component"},"Component"),(0,o.kt)("p",null,"This page contains a detailed API reference for the ",(0,o.kt)("inlineCode",{parentName:"p"},"Component")," class definition."),(0,o.kt)("h2",{id:"import"},"Import"),(0,o.kt)(r.Z,{mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"es6",label:"ES6",default:!0,mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { Component } from 'froyojs';\n"))),(0,o.kt)(l.Z,{value:"commonjs",label:"CommonJS",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { Component } = require('froyojs');\n"))),(0,o.kt)(l.Z,{value:"browser",label:"Browser (CDN)",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"window.froyojs.Component;\n")))),(0,o.kt)("h2",{id:"constructor"},"Constructor"),(0,o.kt)("h3",{id:"component-1"},(0,o.kt)("inlineCode",{parentName:"h3"},"Component")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"new Component(root: HTMLElement, initialState: object)\nnew Component(root: querySelector, initialState: object)\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Component")," is the base class for Froyo components."),(0,o.kt)("p",null,"When defining a subclass, the ",(0,o.kt)("a",{parentName:"p",href:"#render"},(0,o.kt)("inlineCode",{parentName:"a"},"render"))," method is the only required method:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'class FrozenYogurt extends Component {\n    render() {\n        this.rootElement.innerHTML = `"${this.state.flavor}" is the best flavor.`;\n    }\n}\n')),(0,o.kt)("p",null,"When instantiated, the first argument of the constructor is required. It must be an HTML element or a query selector for a valid element rendered in the DOM. The second argument is optional and is responsible for setting the initial state of the component."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const rootElement = document.createElement('div');\nconst instance = new FrozenYogurt(rootElement, { flavor: 'Vanilla' });\n// will produce: '<div>\"Vanilla\" is the best flavor</div>'\n")),(0,o.kt)("h2",{id:"instance-properties"},"Instance properties"),(0,o.kt)("h3",{id:"components"},(0,o.kt)("inlineCode",{parentName:"h3"},"components")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"type: ",(0,o.kt)("inlineCode",{parentName:"li"},"object"))),(0,o.kt)("p",null,"A user-defined object for storing references to component instances. Instances assigned to this property are automatically destroyed when the parent instance is destroyed. See ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/advanced/subcomponents"},'"Subcomponents"')," to learn more."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"class Topping extends Component {\n    ...\n}\n\nclass FrozenYogurt extends Component {\n    setup() {\n        this.components = {\n            topping: new Topping(...),\n        };\n    }\n}\n")),(0,o.kt)("h3",{id:"elements"},(0,o.kt)("inlineCode",{parentName:"h3"},"elements")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"type: ",(0,o.kt)("inlineCode",{parentName:"li"},"object"))),(0,o.kt)("p",null,"A user-defined object for storing references to DOM elements."),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"Review our ",(0,o.kt)("a",{parentName:"p",href:"dom-utilities"},"DOM utilities")," to see how they can help you apply elements to this property.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    setup() {\n        this.elements = {\n            toppings: this.rootElement.querySelectorAll('.topping'),\n        };\n    }\n}\n")),(0,o.kt)("h3",{id:"initialized"},(0,o.kt)("inlineCode",{parentName:"h3"},"initialized")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"type: ",(0,o.kt)("inlineCode",{parentName:"li"},"boolean"))),(0,o.kt)("p",null,"A read-only value that indicates the initialized status of the instance."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const instance = new FrozenYogurt(...);\n// instance.initialized === true\n")),(0,o.kt)("h3",{id:"listeners"},(0,o.kt)("inlineCode",{parentName:"h3"},"listeners")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"type: ",(0,o.kt)("inlineCode",{parentName:"li"},"object"))),(0,o.kt)("p",null,"A user-defined object for storing data related to listeners (e.g. ",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener"},"event listeners"),", ",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver"},"mutation observers"),", ",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia"},"media query lists"),', etc.). Each item in the object must be another object with at least, a "destroy" key that is responsible for removing the listener. The ',(0,o.kt)("inlineCode",{parentName:"p"},"destroy")," functions are called automatically when the component is destroyed. See ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/creating-listeners"},'"Creating Listeners"')," to learn more."),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"Review our ",(0,o.kt)("a",{parentName:"p",href:"listener-utilities"},"listener utilities")," to see how they can help you apply listeners to this property.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    setup() {\n        this.listeners = {\n            click: {\n                destroy() {\n                    // remove the listener\n                },\n            },\n        };\n    }\n}\n")),(0,o.kt)("h3",{id:"rootelement"},(0,o.kt)("inlineCode",{parentName:"h3"},"rootElement")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"type: ",(0,o.kt)("inlineCode",{parentName:"li"},"HTMLElement"))),(0,o.kt)("p",null,"A read-only reference to the ",(0,o.kt)("inlineCode",{parentName:"p"},"HTMLElement")," that was used to initialize the component."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const div = document.createElement('div');\nconst instance = new FrozenYogurt(div);\n// instance.rootElement will equal \"div\"\n")),(0,o.kt)("h3",{id:"state"},(0,o.kt)("inlineCode",{parentName:"h3"},"state")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"type: ",(0,o.kt)("inlineCode",{parentName:"li"},"object"))),(0,o.kt)("p",null,"A user-defined object to store data about the instance. This data is used to conditionally control the output and behavior of the component. See ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle"},'"Component Lifecycle"')," to learn more."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const instance = new FrozenYogurt(rootElement, { flavor: 'Vanilla' });\n// instance.state will be \"{ flavor: 'Vanilla' }\"\n")),(0,o.kt)("h2",{id:"instance-methods"},"Instance methods"),(0,o.kt)("h3",{id:"destroy"},(0,o.kt)("inlineCode",{parentName:"h3"},"destroy")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"destroy();\n")),(0,o.kt)("p",null,"A ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle"},"lifecycle method")," responsible for performing cleanup tasks. If included, make sure to call ",(0,o.kt)("inlineCode",{parentName:"p"},"super.destroy")," so that the parent class is properly destroyed."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    destroy() {\n        // perform cleanup tasks ...\n\n        super.destroy(); // cleanup parent\n    }\n}\n")),(0,o.kt)("h3",{id:"setstate"},(0,o.kt)("inlineCode",{parentName:"h3"},"setState")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"setState(newState: object)\n")),(0,o.kt)("p",null,"Update the component's state and call all registered observers including the lifecycle methods (e.g. ",(0,o.kt)("inlineCode",{parentName:"p"},"render"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"update"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"validate"),"). Only the properties that are changing need to be included in ",(0,o.kt)("inlineCode",{parentName:"p"},"newState"),". See ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle"},'"Component Lifecycle"')," and ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/handling-updates"},'"Handling Updates"')," to learn more."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const instance = new FrozenYogurt(rootElement, { flavor: 'Vanilla' });\n// <div>\"Vanilla\" is the best flavor</div>\n\ninstance.setState({ flavor: 'Chocolate' });\n// <div>\"Chocolate\" is the best flavor</div>\n")),(0,o.kt)("h3",{id:"setup"},(0,o.kt)("inlineCode",{parentName:"h3"},"setup")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"setup();\n")),(0,o.kt)("p",null,"A ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle"},"lifecycle method")," that is called once during initialization, before all other lifecycle methods. It should be used to perform setup tasks including like ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/creating-listeners"},"creating event listeners")," and ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle#determining-the-initial-state"},"setting the initial state"),". It should never be called directly."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    setup() {\n        // perform setup tasks ...\n    }\n}\n")),(0,o.kt)("h3",{id:"subscribe"},(0,o.kt)("inlineCode",{parentName:"h3"},"subscribe")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"subscribe(observer: function(stateChanges: object, previousState: object, instance: object))\n")),(0,o.kt)("p",null,"Register a callback function which is called when the state changes, after the lifecycle methods. See ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/advanced/observer-pattern"},'"Observer Pattern"')," to learn more."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const instance = new FrozenYogurt(rootElement);\n\ninstance.subscribe((stateChanges) => {\n    // do something when the state changes ...\n});\n")),(0,o.kt)("h3",{id:"unsubscribe"},(0,o.kt)("inlineCode",{parentName:"h3"},"unsubscribe")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"unsubscribe(observer: function)\n")),(0,o.kt)("p",null,"Deregister a callback function that was previously subscribed to the instance. The observer callback must be a direct reference to the same function passed to ",(0,o.kt)("inlineCode",{parentName:"p"},"subscribe"),". Use of this method is uncommon because all registered observers are automatically cleared when the component is destroyed."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const instance = new FrozenYogurt(rootElement);\n\nfunction observer() {}\n\ninstance.subscribe(observer);\ninstance.unsubscribe(observer);\n")),(0,o.kt)("h3",{id:"render"},(0,o.kt)("inlineCode",{parentName:"h3"},"render")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"render(stateChanges: object, previousState: object, instance: object)\n")),(0,o.kt)("p",null,"A ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle"},"lifecycle method")," that is called when the state updates. It should be used exclusively to update the DOM. The arguments provided should be used to perform ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/handling-updates"},"conditional updates"),". It should never be called directly."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    render() {\n        // update the DOM ...\n    }\n}\n")),(0,o.kt)("h3",{id:"update"},(0,o.kt)("inlineCode",{parentName:"h3"},"update")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"update(stateChanges: object, previousState: object, instance: object)\n")),(0,o.kt)("p",null,"A ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle"},"lifecycle method")," that is called after every render. It should be used exclusively to perform miscellaneous tasks after a component updates. The arguments provided should be used to perform ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/handling-updates"},"conditional updates"),". It should never be called directly."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    update() {\n        // perform tasks after update ...\n    }\n}\n")),(0,o.kt)("h3",{id:"validate"},(0,o.kt)("inlineCode",{parentName:"h3"},"validate")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"validate(stateChanges: object, previousState: object, instance: object)\n")),(0,o.kt)("p",null,"A ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle"},"lifecycle method")," that is called before every render. It should be used exclusively to perform validation tasks relative to the component and its state. The arguments provided should be used to perform ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/handling-updates"},"conditional updates"),". It should never be called directly. See ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/advanced/component-validation"},'"Component Validation"')," to learn more."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    validate() {\n        // perform validation before update ...\n    }\n}\n")),(0,o.kt)("h2",{id:"class-properties"},"Class properties"),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Class properties should be defined with a ",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get"},"getter")," so that they are read-only and cannot be updated accidentally.")),(0,o.kt)("h3",{id:"defaultstate"},(0,o.kt)("inlineCode",{parentName:"h3"},"defaultState")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"type: ",(0,o.kt)("inlineCode",{parentName:"li"},"object"))),(0,o.kt)("p",null,"Used to define default values for the state. Values are defaulted when their value is ",(0,o.kt)("inlineCode",{parentName:"p"},"undefined"),", not ",(0,o.kt)("inlineCode",{parentName:"p"},"null"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    static get defaultState() {\n        return {\n            flavor: 'vanilla',\n        };\n    }\n}\n")),(0,o.kt)("p",null,"For example, if ",(0,o.kt)("inlineCode",{parentName:"p"},"state.flavor")," is not set, it will be ",(0,o.kt)("inlineCode",{parentName:"p"},"'vanilla'")," by default:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'const instance = new FrozenYogurt(rootElement);\n// instance.state.flavor will be "vanilla"\n')),(0,o.kt)("p",null,"If ",(0,o.kt)("inlineCode",{parentName:"p"},"state.flavor")," is set to ",(0,o.kt)("inlineCode",{parentName:"p"},"null"),", it will be ",(0,o.kt)("inlineCode",{parentName:"p"},"null"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'const instance = new FrozenYogurt(rootElement, { flavor: null });\n// instance.state.flavor will be "null"\n')),(0,o.kt)("p",null,"See ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle#determining-the-initial-state"},'"Determining the Initial State"')," to learn more."),(0,o.kt)("h3",{id:"displayname"},(0,o.kt)("inlineCode",{parentName:"h3"},"displayName")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"type: ",(0,o.kt)("inlineCode",{parentName:"li"},"string"))),(0,o.kt)("p",null,"A human-friendly name of the component used in debugging messages. Generally, this property does not need to be set explicitly because it is inferred from the name of the class."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    static get displayName() {\n        return 'FrozenYogurt';\n    }\n}\n")),(0,o.kt)("h3",{id:"statetypes"},(0,o.kt)("inlineCode",{parentName:"h3"},"stateTypes")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"type: ",(0,o.kt)("inlineCode",{parentName:"li"},"object"))),(0,o.kt)("p",null,"Used to perform for ",(0,o.kt)("a",{parentName:"p",href:"https://www.geeksforgeeks.org/type-checking-in-compiler-design/"},"typechecking")," on the state properties. See ",(0,o.kt)("a",{parentName:"p",href:"/froyo/docs/advanced/typechecking-state"},'"Typechecking State"')," to learn more."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import PropTypes from 'prop-types';\n\nclass FrozenYogurt extends Component {\n    static get stateTypes() {\n        return {\n            flavor: PropTypes.string,\n        };\n    }\n}\n")),(0,o.kt)("h3",{id:"instances"},(0,o.kt)("inlineCode",{parentName:"h3"},"instances")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"type: ",(0,o.kt)("inlineCode",{parentName:"li"},"array"))),(0,o.kt)("p",null,"A read-only list of every active instance of the component and its subclasses. This feature is useful to gain access to instances created in different scope."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"console.log(Component.instances); // [Component, Component, ...]\n")))}m.isMDXComponent=!0}}]);