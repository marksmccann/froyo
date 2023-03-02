"use strict";(self.webpackChunkfroyo=self.webpackChunkfroyo||[]).push([[5423],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),u=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(i.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=u(n),d=a,f=m["".concat(i,".").concat(d)]||m[d]||p[d]||o;return n?r.createElement(f,l(l({ref:t},c),{},{components:n})):r.createElement(f,l({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[m]="string"==typeof e?e:a,l[1]=s;for(var u=2;u<o;u++)l[u]=n[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(7294),a=n(6010);const o="tabItem_Ymn6";function l(e){let{children:t,hidden:n,className:l}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(o,l),hidden:n},t)}},4866:(e,t,n)=>{n.d(t,{Z:()=>N});var r=n(7462),a=n(7294),o=n(6010),l=n(2466),s=n(6550),i=n(1980),u=n(7392),c=n(12);function m(e){return function(e){return a.Children.map(e,(e=>{if((0,a.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))}(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}function p(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??m(n);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function d(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const r=(0,s.k6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i._X)(o),(0,a.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(r.location.search);t.set(o,e),r.replace({...r.location,search:t.toString()})}),[o,r])]}function h(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,o=p(e),[l,s]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:o}))),[i,u]=f({queryString:n,groupId:r}),[m,h]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,o]=(0,c.Nk)(n);return[r,(0,a.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:r}),g=(()=>{const e=i??m;return d({value:e,tabValues:o})?e:null})();(0,a.useLayoutEffect)((()=>{g&&s(g)}),[g]);return{selectedValue:l,selectValue:(0,a.useCallback)((e=>{if(!d({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);s(e),u(e),h(e)}),[u,h,o]),tabValues:o}}var g=n(2389);const b="tabList__CuJ",y="tabItem_LNqP";function v(e){let{className:t,block:n,selectedValue:s,selectValue:i,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:m}=(0,l.o5)(),p=e=>{const t=e.currentTarget,n=c.indexOf(t),r=u[n].value;r!==s&&(m(t),i(r))},d=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:l}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,key:t,ref:e=>c.push(e),onKeyDown:d,onClick:p},l,{className:(0,o.Z)("tabs__item",y,l?.className,{"tabs__item--active":s===t})}),n??t)})))}function k(e){let{lazy:t,children:n,selectedValue:r}=e;if(n=Array.isArray(n)?n:[n],t){const e=n.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},n.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function E(e){const t=h(e);return a.createElement("div",{className:(0,o.Z)("tabs-container",b)},a.createElement(v,(0,r.Z)({},e,t)),a.createElement(k,(0,r.Z)({},e,t)))}function N(e){const t=(0,g.Z)();return a.createElement(E,(0,r.Z)({key:String(t)},e))}},6269:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>u,toc:()=>m});var r=n(7462),a=(n(7294),n(3905)),o=n(4866),l=n(5162);const s={},i="DOM Management",u={unversionedId:"fundamentals/dom-management",id:"fundamentals/dom-management",title:"DOM Management",description:"This guide explains how to manage references to, and the manipulation of, the DOM.",source:"@site/docs/fundamentals/dom-management.md",sourceDirName:"fundamentals",slug:"/fundamentals/dom-management",permalink:"/froyo/docs/fundamentals/dom-management",draft:!1,editUrl:"https://github.com/marksmccann/froyo/docs/fundamentals/dom-management.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Component Lifecycle",permalink:"/froyo/docs/fundamentals/component-lifecycle"},next:{title:"Creating Listeners",permalink:"/froyo/docs/fundamentals/creating-listeners"}},c={},m=[{value:"Selecting Elements",id:"selecting-elements",level:2},{value:"Creating Elements",id:"creating-elements",level:2},{value:"Setting Attributes",id:"setting-attributes",level:2},{value:"Changing Classes",id:"changing-classes",level:2}],p={toc:m};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"dom-management"},"DOM Management"),(0,a.kt)("p",null,"This guide explains how to manage references to, and the manipulation of, the DOM."),(0,a.kt)("h2",{id:"selecting-elements"},"Selecting Elements"),(0,a.kt)("p",null,"Use conventional JavaScript DOM selectors like ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector"},(0,a.kt)("inlineCode",{parentName:"a"},"Element.querySelector"))," and ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll"},(0,a.kt)("inlineCode",{parentName:"a"},"Element.querySelectorAll"))," to retrieve elements from the DOM. Assign the results of these selectors to ",(0,a.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#elements"},(0,a.kt)("inlineCode",{parentName:"a"},"this.elements"))," from within the ",(0,a.kt)("inlineCode",{parentName:"p"},"setup")," method so they can be referenced from elsewhere in the class."),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"If needed, use ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from"},(0,a.kt)("inlineCode",{parentName:"a"},"Array.from"))," to convert lists (e.g. ",(0,a.kt)("inlineCode",{parentName:"p"},"NodeList")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"HTMLCollection"),") into traditional arrays.")),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"Consider using the ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/:scope"},(0,a.kt)("inlineCode",{parentName:"a"},":scope"))," pseudo class with query selectors for more precise element selection (e.g. ",(0,a.kt)("inlineCode",{parentName:"p"},"querySelector(':scope > .first-child')"),". This is useful when a selector could potentially grab elements belonging to other components nested deeper within the markup structure.")),(0,a.kt)(o.Z,{mdxType:"Tabs"},(0,a.kt)(l.Z,{value:"js",label:"JavaScript",default:!0,mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { Component } from 'froyojs';\n\nclass FrozenYogurt extends Component {\n    setup() {\n        this.elements = {\n            someElement: this.rootElement.querySelector('<some selector>'),\n            someElements: this.rootElement.querySelectorAll('<some selector>'),\n        };\n    }\n}\n"))),(0,a.kt)(l.Z,{value:"ts",label:"TypeScript",default:!0,mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { Component } from 'froyojs';\n\ntype Elements = {\n    someElement: Element | null;\n    someElements: NodeList;\n};\n\nclass FrozenYogurt extends Component<{}, Elements> {\n    protected setup(): void {\n        this.elements = {\n            someElement: this.rootElement.querySelector('<some selector>'),\n            someElements: this.rootElement.querySelectorAll('<some selector>'),\n        };\n    }\n}\n")))),(0,a.kt)("p",null,"Properties on this object cannot be set directly. Any attempt to do so will be ignored. Instead, the entire object must be assigned directly to the property."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"// this will not work\nthis.elements.someElement = null;\n")),(0,a.kt)("br",null),(0,a.kt)("hr",null),(0,a.kt)("h2",{id:"creating-elements"},"Creating Elements"),(0,a.kt)("p",null,"Use the convenience function ",(0,a.kt)("a",{parentName:"p",href:"/froyo/docs/api/dom-helpers#createelement"},(0,a.kt)("inlineCode",{parentName:"a"},"createElement"))," to generate new DOM elements."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { Component, createElement } from 'froyojs';\n\nclass FrozenYogurt extends Component {\n    setup() {\n        this.elements = {\n            someElement: createElement(\n                'div',\n                { class: '<some class>' },\n                '<some content>'\n            ),\n        };\n    }\n}\n")),(0,a.kt)("br",null),(0,a.kt)("hr",null),(0,a.kt)("h2",{id:"setting-attributes"},"Setting Attributes"),(0,a.kt)("p",null,"Use the convenience function ",(0,a.kt)("a",{parentName:"p",href:"/froyo/docs/api/dom-helpers#setattributes"},(0,a.kt)("inlineCode",{parentName:"a"},"setAttributes"))," to add, change, or remove attributes from an element."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { Component, setAttributes } from 'froyojs';\n\nclass FrozenYogurt extends Component {\n    render() {\n        setAttributes(this.rootElement, {\n            id: '<some-id>',\n            role: undefined, // \"undefined\" is ignored\n            'aria-hidden': null, // \"null\" removes attribute\n        });\n    }\n}\n")),(0,a.kt)("br",null),(0,a.kt)("hr",null),(0,a.kt)("h2",{id:"changing-classes"},"Changing Classes"),(0,a.kt)("p",null,"Use the convenience function ",(0,a.kt)("a",{parentName:"p",href:"/froyo/docs/api/dom-helpers#setclasses"},(0,a.kt)("inlineCode",{parentName:"a"},"setClasses"))," to add or remove CSS classes from an element."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'class MyComponent extends Component {\n    render() {\n        setClasses(this.rootElement, {\n            foo: true, // adds "foo" class\n            bar: false, // removes "bar" class\n        });\n    }\n}\n')))}d.isMDXComponent=!0}}]);