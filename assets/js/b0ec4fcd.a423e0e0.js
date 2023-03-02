"use strict";(self.webpackChunkfroyo=self.webpackChunkfroyo||[]).push([[2480],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(n),m=r,f=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return n?a.createElement(f,l(l({ref:t},p),{},{components:n})):a.createElement(f,l({ref:t},p))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:r,l[1]=i;for(var c=2;c<o;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(7294),r=n(6010);const o="tabItem_Ymn6";function l(e){let{children:t,hidden:n,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(o,l),hidden:n},t)}},4866:(e,t,n)=>{n.d(t,{Z:()=>w});var a=n(7462),r=n(7294),o=n(6010),l=n(2466),i=n(6550),s=n(1980),c=n(7392),p=n(12);function u(e){return function(e){return r.Children.map(e,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function d(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??u(n);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const a=(0,i.k6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,s._X)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(a.location.search);t.set(o,e),a.replace({...a.location,search:t.toString()})}),[o,a])]}function h(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,o=d(e),[l,i]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:o}))),[s,c]=f({queryString:n,groupId:a}),[u,h]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,o]=(0,p.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:a}),y=(()=>{const e=s??u;return m({value:e,tabValues:o})?e:null})();(0,r.useLayoutEffect)((()=>{y&&i(y)}),[y]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);i(e),c(e),h(e)}),[c,h,o]),tabValues:o}}var y=n(2389);const k="tabList__CuJ",g="tabItem_LNqP";function v(e){let{className:t,block:n,selectedValue:i,selectValue:s,tabValues:c}=e;const p=[],{blockElementScrollPositionUntilNextRender:u}=(0,l.o5)(),d=e=>{const t=e.currentTarget,n=p.indexOf(t),a=c[n].value;a!==i&&(u(t),s(a))},m=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=p.indexOf(e.currentTarget)+1;t=p[n]??p[0];break}case"ArrowLeft":{const n=p.indexOf(e.currentTarget)-1;t=p[n]??p[p.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},t)},c.map((e=>{let{value:t,label:n,attributes:l}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:i===t?0:-1,"aria-selected":i===t,key:t,ref:e=>p.push(e),onKeyDown:m,onClick:d},l,{className:(0,o.Z)("tabs__item",g,l?.className,{"tabs__item--active":i===t})}),n??t)})))}function b(e){let{lazy:t,children:n,selectedValue:a}=e;if(n=Array.isArray(n)?n:[n],t){const e=n.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},n.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function N(e){const t=h(e);return r.createElement("div",{className:(0,o.Z)("tabs-container",k)},r.createElement(v,(0,a.Z)({},e,t)),r.createElement(b,(0,a.Z)({},e,t)))}function w(e){const t=(0,y.Z)();return r.createElement(N,(0,a.Z)({key:String(t)},e))}},9605:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>m,frontMatter:()=>i,metadata:()=>c,toc:()=>u});var a=n(7462),r=(n(7294),n(3905)),o=n(4866),l=n(5162);const i={},s="Component Lifecycle",c={unversionedId:"fundamentals/component-lifecycle",id:"fundamentals/component-lifecycle",title:"Component Lifecycle",description:"This guide introduces the concept of the component lifecycle.",source:"@site/docs/fundamentals/component-lifecycle.md",sourceDirName:"fundamentals",slug:"/fundamentals/component-lifecycle",permalink:"/froyo/docs/fundamentals/component-lifecycle",draft:!1,editUrl:"https://github.com/marksmccann/froyo/docs/fundamentals/component-lifecycle.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Handling Updates",permalink:"/froyo/docs/fundamentals/handling-updates"},next:{title:"DOM Management",permalink:"/froyo/docs/fundamentals/dom-management"}},p={},u=[{value:"The Lifecycle Methods",id:"the-lifecycle-methods",level:2},{value:"Adding Lifecycle Methods to a Class",id:"adding-lifecycle-methods-to-a-class",level:2},{value:"Setting State Correctly",id:"setting-state-correctly",level:2},{value:"Determining the Initial State",id:"determining-the-initial-state",level:2},{value:"Setting the Initial State",id:"setting-the-initial-state",level:2}],d={toc:u};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"component-lifecycle"},"Component Lifecycle"),(0,r.kt)("p",null,"This guide introduces the concept of the component lifecycle."),(0,r.kt)("h2",{id:"the-lifecycle-methods"},"The Lifecycle Methods"),(0,r.kt)("p",null,'When a component is initialized, or when the state changes, a series of "lifecycle" methods are called in a particular order. Each method has a designated responsibility relative to its position in the lifecycle.'),(0,r.kt)("p",null,"The methods are: ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#setup"},(0,r.kt)("inlineCode",{parentName:"a"},"setup")),", ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#validate"},(0,r.kt)("inlineCode",{parentName:"a"},"validate")),", ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#render"},(0,r.kt)("inlineCode",{parentName:"a"},"render")),", ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#update"},(0,r.kt)("inlineCode",{parentName:"a"},"update")),", ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#destroy"},(0,r.kt)("inlineCode",{parentName:"a"},"destroy")),"."),(0,r.kt)("p",null,"When initialized, these methods are called once in this order:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"setup")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"validate")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"render")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"update"))),(0,r.kt)("p",null,"Every time the component state is updated (via ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#setstate"},(0,r.kt)("inlineCode",{parentName:"a"},"setState")),"), these methods are called in this order:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"validate")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"render")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"update"))),(0,r.kt)("p",null,"When the component needs to be removed, ",(0,r.kt)("inlineCode",{parentName:"p"},"destroy")," must be called manually."),(0,r.kt)("br",null),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"adding-lifecycle-methods-to-a-class"},"Adding Lifecycle Methods to a Class"),(0,r.kt)("p",null,"When defining a component, the lifecycle methods are optional, except for ",(0,r.kt)("inlineCode",{parentName:"p"},"render"),". Add the others to the class on an as-needed basis. See the ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#instance-methods"},"API reference")," to learn more."),(0,r.kt)(o.Z,{mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"js",label:"JavaScript",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    setup() {\n        /* perform setup tasks */\n    }\n\n    validate() {\n        /* perform validation before render */\n    }\n\n    render() {\n        /* perform DOM updates */\n    }\n\n    update() {\n        /* perform updates after render */\n    }\n\n    destroy() {\n        /* perform cleanup tasks */\n\n        super.destroy(); // cleanup the parent\n    }\n}\n"))),(0,r.kt)(l.Z,{value:"ts",label:"TypeScript",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"type State = {};\n\nclass FrozenYogurt extends Component<State> {\n    protected setup(): void {\n        /* perform setup tasks */\n    }\n\n    protected validate(\n        stateChanges: Partial<State>,\n        previousState: State\n    ): void {\n        /* perform validation before render */\n    }\n\n    protected render(stateChanges: Partial<State>, previousState: State): void {\n        /* perform DOM updates */\n    }\n\n    protected update(stateChanges: Partial<State>, previousState: State): void {\n        /* perform updates after render */\n    }\n\n    public destroy(): void {\n        /* perform cleanup tasks */\n\n        super.destroy(); // cleanup the parent\n    }\n}\n")))),(0,r.kt)("br",null),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"setting-state-correctly"},"Setting State Correctly"),(0,r.kt)("p",null,"Outside of the ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#setup"},(0,r.kt)("inlineCode",{parentName:"a"},"setup"))," method, ",(0,r.kt)("inlineCode",{parentName:"p"},"this.state")," cannot be set directly. In fact, if you attempt to do so, it will not work and an error message will log to the console."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"// Incorrect\nthis.state = { flavor: 'Vanilla' };\n")),(0,r.kt)("p",null,"Setting the value of a specific state property also will not work, but an error will not be logged."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"// Incorrect\nthis.state.flavor = 'Vanilla';\n")),(0,r.kt)("p",null,"Instead, use ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#setstate"},(0,r.kt)("inlineCode",{parentName:"a"},"setState"))," which will update the state and kick-off the component lifecycle."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"setState")," will only kick-off the component lifecycle if there were changes to the state. The ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality"},"strict equality operator")," (e.g. ",(0,r.kt)("inlineCode",{parentName:"p"},"==="),") is used to determine which values have changed. This means that objects and arrays must be replaced in order for their changes to be recognized.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"// Correct\nthis.setState({ flavor: 'Vanilla' });\n")),(0,r.kt)("br",null),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"determining-the-initial-state"},"Determining the Initial State"),(0,r.kt)("p",null,"When a component is initialized, the initial state is collected from multiple sources, merged, and assigned to ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#state"},(0,r.kt)("inlineCode",{parentName:"a"},"this.state")),". In reverse order of priority, the data is collected from the following three sources:"),(0,r.kt)("p",null,"1","."," The ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#defaultstate"},(0,r.kt)("inlineCode",{parentName:"a"},"defaultState"))," from the class definition."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    static get defaultState() {\n        return {\n            flavor: 'Vanilla',\n        };\n    }\n}\n")),(0,r.kt)("p",null,"2","."," The ",(0,r.kt)("inlineCode",{parentName:"p"},"data-initial-state")," HTML attribute on the root element."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"The value of this attribute must be valid JSON. See ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/html-only-usage"},'"HTML-only Usage"')," to learn more about this feature and its particular usefulness when paired with the ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/create-initializer"},'"Create Initializer"')," tool.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<div data-initial-state=\'{"flavor": "vanilla"}\'></div>\n')),(0,r.kt)("p",null,"3","."," The ",(0,r.kt)("inlineCode",{parentName:"p"},"initialState")," passed to the second argument of the constructor."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"new FrozenYogurt('#root', { flavor: 'Vanilla' });\n")),(0,r.kt)("br",null),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"setting-the-initial-state"},"Setting the Initial State"),(0,r.kt)("p",null,"If needed, the state can by set directly from within the ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#setup"},(0,r.kt)("inlineCode",{parentName:"a"},"setup"))," method. This is not always necessary, but it can be useful for setting state properties dynamically."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Setting the state this way replaces the entire state object; giving you complete control over the initial state of the component. Whatever this property is set to, will be the initial state of the component. If used, make sure to spread the state object to preserve the other values.")),(0,r.kt)(o.Z,{mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"js",label:"JavaScript",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    setup() {\n        this.state = {\n            ...this.state, // extend the state\n            large: window.innerWidth > 500,\n        };\n    }\n}\n"))),(0,r.kt)(l.Z,{value:"ts",label:"TypeScript",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"type State = {\n    large: boolean;\n};\n\nclass FrozenYogurt extends Component<State> {\n    protected setup(): void {\n        this.state = {\n            ...this.state, // extend the state\n            large: window.innerWidth > 500,\n        };\n    }\n}\n")))))}m.isMDXComponent=!0}}]);