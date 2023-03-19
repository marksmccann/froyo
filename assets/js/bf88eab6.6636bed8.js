"use strict";(self.webpackChunkfroyo=self.webpackChunkfroyo||[]).push([[1650],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),p=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(i.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(n),m=r,f=d["".concat(i,".").concat(m)]||d[m]||u[m]||o;return n?a.createElement(f,l(l({ref:t},c),{},{components:n})):a.createElement(f,l({ref:t},c))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[d]="string"==typeof e?e:r,l[1]=s;for(var p=2;p<o;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(7294),r=n(6010);const o="tabItem_Ymn6";function l(e){let{children:t,hidden:n,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(o,l),hidden:n},t)}},4866:(e,t,n)=>{n.d(t,{Z:()=>C});var a=n(7462),r=n(7294),o=n(6010),l=n(2466),s=n(6550),i=n(1980),p=n(7392),c=n(12);function d(e){return function(e){return r.Children.map(e,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function u(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??d(n);return function(e){const t=(0,p.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const a=(0,s.k6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i._X)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(a.location.search);t.set(o,e),a.replace({...a.location,search:t.toString()})}),[o,a])]}function h(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,o=u(e),[l,s]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:o}))),[i,p]=f({queryString:n,groupId:a}),[d,h]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,o]=(0,c.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:a}),k=(()=>{const e=i??d;return m({value:e,tabValues:o})?e:null})();(0,r.useLayoutEffect)((()=>{k&&s(k)}),[k]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);s(e),p(e),h(e)}),[p,h,o]),tabValues:o}}var k=n(2389);const g="tabList__CuJ",v="tabItem_LNqP";function y(e){let{className:t,block:n,selectedValue:s,selectValue:i,tabValues:p}=e;const c=[],{blockElementScrollPositionUntilNextRender:d}=(0,l.o5)(),u=e=>{const t=e.currentTarget,n=c.indexOf(t),a=p[n].value;a!==s&&(d(t),i(a))},m=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},t)},p.map((e=>{let{value:t,label:n,attributes:l}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>c.push(e),onKeyDown:m,onClick:u},l,{className:(0,o.Z)("tabs__item",v,l?.className,{"tabs__item--active":s===t})}),n??t)})))}function b(e){let{lazy:t,children:n,selectedValue:a}=e;if(n=Array.isArray(n)?n:[n],t){const e=n.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},n.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function N(e){const t=h(e);return r.createElement("div",{className:(0,o.Z)("tabs-container",g)},r.createElement(y,(0,a.Z)({},e,t)),r.createElement(b,(0,a.Z)({},e,t)))}function C(e){const t=(0,k.Z)();return r.createElement(N,(0,a.Z)({key:String(t)},e))}},7184:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>p,toc:()=>d});var a=n(7462),r=(n(7294),n(3905)),o=n(4866),l=n(5162);const s={},i="Component",p={unversionedId:"api/component",id:"api/component",title:"Component",description:"This page contains a detailed API reference for the Component class definition.",source:"@site/docs/api/component.md",sourceDirName:"api",slug:"/api/component",permalink:"/froyo/docs/api/component",draft:!1,editUrl:"https://github.com/marksmccann/froyo/docs/api/component.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Subcomponents",permalink:"/froyo/docs/advanced/subcomponents"},next:{title:"Create Initializer",permalink:"/froyo/docs/api/create-initializer"}},c={},d=[{value:"Import",id:"import",level:2},{value:"Reference",id:"reference",level:2},{value:"<code>Component</code>",id:"component-1",level:3},{value:"<code>Constructor</code>",id:"constructor",level:3},{value:"Instance properties",id:"instance-properties",level:2},{value:"<code>components</code>",id:"components",level:3},{value:"<code>elements</code>",id:"elements",level:3},{value:"<code>initialized</code>",id:"initialized",level:3},{value:"<code>listeners</code>",id:"listeners",level:3},{value:"<code>rootElement</code>",id:"rootelement",level:3},{value:"<code>state</code>",id:"state",level:3},{value:"Instance methods",id:"instance-methods",level:2},{value:"<code>destroy</code>",id:"destroy",level:3},{value:"<code>render</code>",id:"render",level:3},{value:"<code>setState</code>",id:"setstate",level:3},{value:"<code>setup</code>",id:"setup",level:3},{value:"<code>subscribe</code>",id:"subscribe",level:3},{value:"<code>unsubscribe</code>",id:"unsubscribe",level:3},{value:"<code>update</code>",id:"update",level:3},{value:"<code>validate</code>",id:"validate",level:3},{value:"Class properties",id:"class-properties",level:2},{value:"<code>defaultState</code>",id:"defaultstate",level:3},{value:"<code>displayName</code>",id:"displayname",level:3},{value:"<code>stateTypes</code>",id:"statetypes",level:3}],u={toc:d};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"component"},"Component"),(0,r.kt)("p",null,"This page contains a detailed API reference for the ",(0,r.kt)("inlineCode",{parentName:"p"},"Component")," class definition."),(0,r.kt)("h2",{id:"import"},"Import"),(0,r.kt)(o.Z,{mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"es6",label:"ES6",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { Component } from 'froyojs';\n"))),(0,r.kt)(l.Z,{value:"commonjs",label:"CommonJS",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const { Component } = require('froyojs');\n"))),(0,r.kt)(l.Z,{value:"browser",label:"Browser (CDN)",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"window.froyojs.Component;\n")))),(0,r.kt)("h2",{id:"reference"},"Reference"),(0,r.kt)("h3",{id:"component-1"},(0,r.kt)("inlineCode",{parentName:"h3"},"Component")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"abstract class Component<\n    State extends Record<string, any> = {},\n    Elements extends Record<string, null | Node | Array<Node> | NodeList | HTMLCollection> = {},\n    Listeners extends Record<string, { destroy(): void }> = {},\n    Components extends Record<string, Component> = {}\n> {}\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Component")," is an abstract class used to derive Froyo components."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {}\n")),(0,r.kt)("h3",{id:"constructor"},(0,r.kt)("inlineCode",{parentName:"h3"},"Constructor")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"new (root: string | Element, initialState?: Record<string, any>);\n")),(0,r.kt)("p",null,"The first argument of the constructor is required. It must be an HTML element or a query selector for a valid element within in the DOM. The second argument is optional and is responsible for setting the initial state of the component."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const rootElement = document.createElement('div');\nconst instance = new FrozenYogurt(rootElement, { flavor: 'Vanilla' });\n// will produce: '<div>\"Vanilla\" is the best flavor</div>'\n")),(0,r.kt)("h2",{id:"instance-properties"},"Instance properties"),(0,r.kt)("h3",{id:"components"},(0,r.kt)("inlineCode",{parentName:"h3"},"components")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"type: ",(0,r.kt)("inlineCode",{parentName:"li"},"Components"))),(0,r.kt)("p",null,"A user-defined object for storing references to component instances. Instances assigned to this property are automatically destroyed when the parent instance is destroyed. See ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/advanced/subcomponents"},'"Subcomponents"')," to learn more."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"class Topping extends Component {\n    ...\n}\n\nclass FrozenYogurt extends Component {\n    setup() {\n        this.components = {\n            topping: new Topping(...),\n        };\n    }\n}\n")),(0,r.kt)("h3",{id:"elements"},(0,r.kt)("inlineCode",{parentName:"h3"},"elements")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"type: ",(0,r.kt)("inlineCode",{parentName:"li"},"Elements"))),(0,r.kt)("p",null,"A user-defined object for storing references to DOM elements. View ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/dom-management#selecting-elements"},'"Selecting Elements"')," to learn more."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Review our ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/dom-helpers"},"DOM helpers")," to see how they can help you apply elements to this property.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    setup() {\n        this.elements = {\n            toppings: this.rootElement.querySelectorAll('.topping'),\n        };\n    }\n}\n")),(0,r.kt)("h3",{id:"initialized"},(0,r.kt)("inlineCode",{parentName:"h3"},"initialized")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"type: ",(0,r.kt)("inlineCode",{parentName:"li"},"boolean"))),(0,r.kt)("p",null,"A read-only value that indicates the initialized status of the instance."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const instance = new FrozenYogurt(...);\n// instance.initialized === true\n")),(0,r.kt)("h3",{id:"listeners"},(0,r.kt)("inlineCode",{parentName:"h3"},"listeners")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"type: ",(0,r.kt)("inlineCode",{parentName:"li"},"Listeners"))),(0,r.kt)("p",null,"A user-defined object for storing data related to listeners (e.g. ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener"},"event listeners"),", ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver"},"mutation observers"),", ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia"},"media query lists"),', etc.). Each item in the object must be another object with at least, a "destroy" key that is responsible for removing the listener. The ',(0,r.kt)("inlineCode",{parentName:"p"},"destroy")," functions are called automatically when the component is destroyed. See ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/creating-listeners"},'"Creating Listeners"')," to learn more."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Review our ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/listener-helpers"},"listener helpers")," to see how they can help you apply listeners to this property.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    setup() {\n        this.listeners = {\n            click: {\n                destroy() {\n                    // remove the listener\n                },\n            },\n        };\n    }\n}\n")),(0,r.kt)("h3",{id:"rootelement"},(0,r.kt)("inlineCode",{parentName:"h3"},"rootElement")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"type: ",(0,r.kt)("inlineCode",{parentName:"li"},"HTMLElement"))),(0,r.kt)("p",null,"A read-only reference to the ",(0,r.kt)("inlineCode",{parentName:"p"},"HTMLElement")," that was used to initialize the component."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const div = document.createElement('div');\nconst instance = new FrozenYogurt(div);\n// instance.rootElement will equal \"div\"\n")),(0,r.kt)("h3",{id:"state"},(0,r.kt)("inlineCode",{parentName:"h3"},"state")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"type: ",(0,r.kt)("inlineCode",{parentName:"li"},"State"))),(0,r.kt)("p",null,"A user-defined object to store data about the instance. This data is used to conditionally control the output and behavior of the component. See ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle"},'"Component Lifecycle"')," to learn more."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const instance = new FrozenYogurt(rootElement, { flavor: 'Vanilla' });\n// instance.state will be \"{ flavor: 'Vanilla' }\"\n")),(0,r.kt)("h2",{id:"instance-methods"},"Instance methods"),(0,r.kt)("h3",{id:"destroy"},(0,r.kt)("inlineCode",{parentName:"h3"},"destroy")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"function destroy(): void;\n")),(0,r.kt)("p",null,"A ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle"},"lifecycle method")," responsible for performing cleanup tasks. If included, make sure to call ",(0,r.kt)("inlineCode",{parentName:"p"},"super.destroy")," so that the parent class is properly destroyed."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    destroy() {\n        // perform cleanup tasks ...\n\n        super.destroy(); // cleanup parent\n    }\n}\n")),(0,r.kt)("h3",{id:"render"},(0,r.kt)("inlineCode",{parentName:"h3"},"render")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"protected function render?(\n    stateChanges: Partial<State>,\n    previousState: State\n): void;\n")),(0,r.kt)("p",null,"A ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle"},"lifecycle method")," that is called when the state updates. It should be used exclusively to update the DOM. The arguments provided should be used to perform ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/handling-updates"},"conditional updates"),". It should never be called directly."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Review our ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/dom-helpers"},"DOM helpers")," to see how they can help you update the DOM.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    render() {\n        // update the DOM ...\n    }\n}\n")),(0,r.kt)("h3",{id:"setstate"},(0,r.kt)("inlineCode",{parentName:"h3"},"setState")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"function setState(newState: Partial<State>): void;\n")),(0,r.kt)("p",null,"A method that updates the component's state and calls all ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/advanced/observer-pattern"},"registered observers")," including the lifecycle methods (e.g. ",(0,r.kt)("inlineCode",{parentName:"p"},"render"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"update"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"validate"),"). Only the properties that are changing need to be included in ",(0,r.kt)("inlineCode",{parentName:"p"},"newState"),". See ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle"},'"Component Lifecycle"')," and ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/handling-updates"},'"Handling Updates"')," to learn more."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const instance = new FrozenYogurt(rootElement, { flavor: 'Vanilla' });\n// <div>\"Vanilla\" is the best flavor</div>\n\ninstance.setState({ flavor: 'Chocolate' });\n// <div>\"Chocolate\" is the best flavor</div>\n")),(0,r.kt)("h3",{id:"setup"},(0,r.kt)("inlineCode",{parentName:"h3"},"setup")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"function setup(): void;\n")),(0,r.kt)("p",null,"A ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle"},"lifecycle method")," that is called once during initialization, before all other lifecycle methods. It should be used to perform setup tasks like ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/creating-listeners"},"creating event listeners")," and ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle#determining-the-initial-state"},"setting the initial state"),". It should never be called directly."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    setup() {\n        // perform setup tasks ...\n    }\n}\n")),(0,r.kt)("h3",{id:"subscribe"},(0,r.kt)("inlineCode",{parentName:"h3"},"subscribe")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"function subscribe(\n    observer: (stateChanges: Partial<State>, previousState: State) => void\n): void;\n")),(0,r.kt)("p",null,"Registers a callback function which is called when the state changes, after the lifecycle methods. See ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/advanced/observer-pattern"},'"Observer Pattern"')," to learn more."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const instance = new FrozenYogurt(rootElement);\n\ninstance.subscribe((stateChanges) => {\n    // do something when the state changes ...\n});\n")),(0,r.kt)("h3",{id:"unsubscribe"},(0,r.kt)("inlineCode",{parentName:"h3"},"unsubscribe")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"function unsubscribe(\n    observer: (stateChanges: Partial<State>, previousState: State) => void\n): void;\n")),(0,r.kt)("p",null,"Deregisters a callback function that was previously subscribed to the instance. The observer callback must be a direct reference to the same function passed to ",(0,r.kt)("inlineCode",{parentName:"p"},"subscribe"),". Use of this method is uncommon because all registered observers are automatically cleared when the component is destroyed."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const instance = new FrozenYogurt(rootElement);\n\nfunction observer() {}\n\ninstance.subscribe(observer);\ninstance.unsubscribe(observer);\n")),(0,r.kt)("h3",{id:"update"},(0,r.kt)("inlineCode",{parentName:"h3"},"update")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"protected function update?(\n    stateChanges: Partial<State>,\n    previousState: State\n): void;\n")),(0,r.kt)("p",null,"A ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle"},"lifecycle method")," that is called after every render. It should be used exclusively to perform miscellaneous tasks after a component updates. The arguments provided should be used to perform ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/handling-updates"},"conditional updates"),". It should never be called directly."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    update() {\n        // perform tasks after update ...\n    }\n}\n")),(0,r.kt)("h3",{id:"validate"},(0,r.kt)("inlineCode",{parentName:"h3"},"validate")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"protected function validate?(\n    stateChanges: Partial<State>,\n    previousState: State\n): void;\n")),(0,r.kt)("p",null,"A ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle"},"lifecycle method")," that is called before every render. It should be used exclusively to perform validation tasks relative to the component and its state. The arguments provided should be used to perform ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/handling-updates"},"conditional updates"),". It should never be called directly. See ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/advanced/component-validation"},'"Component Validation"')," to learn more."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    validate() {\n        // perform validation before update ...\n    }\n}\n")),(0,r.kt)("h2",{id:"class-properties"},"Class properties"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Class properties should be defined with a ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get"},"getter")," so that they are read-only and cannot be updated accidentally.")),(0,r.kt)("h3",{id:"defaultstate"},(0,r.kt)("inlineCode",{parentName:"h3"},"defaultState")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"type: ",(0,r.kt)("inlineCode",{parentName:"li"},"Record<string, any>"))),(0,r.kt)("p",null,"Used to define default values for the state. Values are defaulted when their value is ",(0,r.kt)("inlineCode",{parentName:"p"},"undefined"),", not ",(0,r.kt)("inlineCode",{parentName:"p"},"null"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    static get defaultState() {\n        return {\n            flavor: 'vanilla',\n        };\n    }\n}\n")),(0,r.kt)("p",null,"For example, if ",(0,r.kt)("inlineCode",{parentName:"p"},"state.flavor")," is not set, it will be ",(0,r.kt)("inlineCode",{parentName:"p"},"'vanilla'")," by default:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'const instance = new FrozenYogurt(rootElement);\n// instance.state.flavor will be "vanilla"\n')),(0,r.kt)("p",null,"If ",(0,r.kt)("inlineCode",{parentName:"p"},"state.flavor")," is set to ",(0,r.kt)("inlineCode",{parentName:"p"},"null"),", it will be ",(0,r.kt)("inlineCode",{parentName:"p"},"null"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'const instance = new FrozenYogurt(rootElement, { flavor: null });\n// instance.state.flavor will be "null"\n')),(0,r.kt)("p",null,"See ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/component-lifecycle#determining-the-initial-state"},'"Determining the Initial State"')," to learn more."),(0,r.kt)("h3",{id:"displayname"},(0,r.kt)("inlineCode",{parentName:"h3"},"displayName")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"type: ",(0,r.kt)("inlineCode",{parentName:"li"},"string"))),(0,r.kt)("p",null,"A human-friendly name of the component used in debugging messages. Generally, this property does not need to be set explicitly because it is inferred from the name of the class."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    static get displayName() {\n        return 'FrozenYogurt';\n    }\n}\n")),(0,r.kt)("h3",{id:"statetypes"},(0,r.kt)("inlineCode",{parentName:"h3"},"stateTypes")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"type: ",(0,r.kt)("inlineCode",{parentName:"li"},"Record<string, any>"))),(0,r.kt)("p",null,"Used to perform for ",(0,r.kt)("a",{parentName:"p",href:"https://www.geeksforgeeks.org/type-checking-in-compiler-design/"},"typechecking")," on the state properties. See ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/advanced/typechecking-state"},'"Typechecking State"')," to learn more."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import PropTypes from 'prop-types';\n\nclass FrozenYogurt extends Component {\n    static get stateTypes() {\n        return {\n            flavor: PropTypes.string,\n        };\n    }\n}\n")))}m.isMDXComponent=!0}}]);