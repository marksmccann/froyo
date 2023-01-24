"use strict";(self.webpackChunkfroyo=self.webpackChunkfroyo||[]).push([[6707],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>f});var o=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=o.createContext({}),c=function(e){var n=o.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):p(p({},n),e)),t},l=function(e){var n=c(e.components);return o.createElement(s.Provider,{value:n},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},u=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),d=c(t),u=r,f=d["".concat(s,".").concat(u)]||d[u]||m[u]||a;return t?o.createElement(f,p(p({ref:n},l),{},{components:t})):o.createElement(f,p({ref:n},l))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,p=new Array(a);p[0]=u;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i[d]="string"==typeof e?e:r,p[1]=i;for(var c=2;c<a;c++)p[c]=t[c];return o.createElement.apply(null,p)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},3262:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>p,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var o=t(7462),r=(t(7294),t(3905));const a={},p="Subcomponents",i={unversionedId:"advanced/subcomponents",id:"advanced/subcomponents",title:"Subcomponents",description:"This guide explains how to add other components to an instance.",source:"@site/docs/advanced/subcomponents.md",sourceDirName:"advanced",slug:"/advanced/subcomponents",permalink:"/froyo/docs/advanced/subcomponents",draft:!1,editUrl:"https://github.com/marksmccann/froyo/docs/advanced/subcomponents.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"External Control",permalink:"/froyo/docs/advanced/external-control"},next:{title:"Component",permalink:"/froyo/docs/api/component"}},s={},c=[{value:"Adding a Subcomponent",id:"adding-a-subcomponent",level:2},{value:"Responding to Subcomponent Events",id:"responding-to-subcomponent-events",level:2},{value:"Updating the Subcomponent",id:"updating-the-subcomponent",level:2}],l={toc:c};function d(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,o.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"subcomponents"},"Subcomponents"),(0,r.kt)("p",null,"This guide explains how to add other components to an instance."),(0,r.kt)("h2",{id:"adding-a-subcomponent"},"Adding a Subcomponent"),(0,r.kt)("p",null,"While not common, there may be times you will want to instantiate a component within another. To do so, instantiate the component within ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#initialize"},(0,r.kt)("inlineCode",{parentName:"a"},"initialize"))," and assign the instance to ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#components"},(0,r.kt)("inlineCode",{parentName:"a"},"this.components")),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"// subcomponent\nclass Topping extends Component {\n    render() {\n        this.rootElement.innerHTML = 'Sprinkles';\n    }\n}\n\n// parent component\nclass FrozenYogurt extends Component {\n    initialize() {\n        this.components = {\n            topping: new Topping(this.rootElement),\n        };\n    }\n}\n")),(0,r.kt)("h2",{id:"responding-to-subcomponent-events"},"Responding to Subcomponent Events"),(0,r.kt)("p",null,"Use the ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/advanced/external-control"},'"External Control"')," technique to respond to events triggered by the subcomponent."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"this.components = {\n    topping: new Topping(this.rootElement, {\n        onChange: () => {\n            // the subcomponent changed, do something ...\n        },\n    }),\n};\n")),(0,r.kt)("h2",{id:"updating-the-subcomponent"},"Updating the Subcomponent"),(0,r.kt)("p",null,"If the subcomponent needs to be updated relative to the parent, use the ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#update"},(0,r.kt)("inlineCode",{parentName:"a"},"update"))," method to update the child component via ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#setstate"},(0,r.kt)("inlineCode",{parentName:"a"},"setState")),". See ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/handling-updates"},'"Handling Updates"')," to review best practices for filtering updates within a lifecycle method."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"update(stateChanges) {\n    if ('topping' in stateChanges) {\n        this.components.topping.setState({ topping: this.state.topping });\n    }\n}\n")))}d.isMDXComponent=!0}}]);