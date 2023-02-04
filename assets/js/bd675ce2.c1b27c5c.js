"use strict";(self.webpackChunkfroyo=self.webpackChunkfroyo||[]).push([[2542],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=a.createContext({}),s=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(c.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),p=s(n),u=i,f=p["".concat(c,".").concat(u)]||p[u]||m[u]||o;return n?a.createElement(f,r(r({ref:t},d),{},{components:n})):a.createElement(f,r({ref:t},d))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[p]="string"==typeof e?e:i,r[1]=l;for(var s=2;s<o;s++)r[s]=n[s];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5399:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var a=n(7462),i=(n(7294),n(3905));const o={},r="Component Validation",l={unversionedId:"advanced/component-validation",id:"advanced/component-validation",title:"Component Validation",description:"This guide explains the concept of component validation.",source:"@site/docs/advanced/component-validation.md",sourceDirName:"advanced",slug:"/advanced/component-validation",permalink:"/froyo/docs/advanced/component-validation",draft:!1,editUrl:"https://github.com/marksmccann/froyo/docs/advanced/component-validation.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Typechecking State",permalink:"/froyo/docs/advanced/typechecking-state"},next:{title:"Observer Pattern",permalink:"/froyo/docs/advanced/observer-pattern"}},c={},s=[{value:"Introduction",id:"introduction",level:2},{value:"Adding Validation",id:"adding-validation",level:2},{value:"Validating the Initial HTML",id:"validating-the-initial-html",level:2},{value:"Validating State",id:"validating-state",level:2}],d={toc:s};function p(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"component-validation"},"Component Validation"),(0,i.kt)("p",null,"This guide explains the concept of component validation."),(0,i.kt)("h2",{id:"introduction"},"Introduction"),(0,i.kt)("p",null,"Component validation is the process of making sure the component is working properly throughout its lifecycle. When issues are identified, consumers should be informed via thrown errors or console messaging. While optional, this validation creates a better experience during the development process. There are various aspects of a component that can be validated. However, the most common are the ",(0,i.kt)("a",{parentName:"p",href:"#validating-the-initial-html"},"initial HTML")," and ",(0,i.kt)("a",{parentName:"p",href:"#validating-state"},"state"),"."),(0,i.kt)("h2",{id:"adding-validation"},"Adding Validation"),(0,i.kt)("p",null,"To add validation to a component, include the ",(0,i.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#validate"},(0,i.kt)("inlineCode",{parentName:"a"},"validate"))," lifecycle method on the class definition. Use the arguments provided to this callback to filter the validators. See ",(0,i.kt)("a",{parentName:"p",href:"/froyo/docs/fundamentals/handling-updates"},'"Handling Updates"')," to learn more."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    validate() {\n        /* validate something ... */\n    }\n}\n")),(0,i.kt)("h2",{id:"validating-the-initial-html"},"Validating the Initial HTML"),(0,i.kt)("p",null,"Consumers are responsible for writing the initial HTML for components. Failing to include a required element or misspelling a key attribute is an easy mistake to make. Unfortunately, this small mistake can break the component or create an error that is difficult to debug. To avoid this, consider adding validation to check the markup during initialization. If something is wrong, let the consumer know."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"validate() {\n    if (!this.state.initialized) {\n        if (!this.rootElement.contains('input')) {\n            throw new Error('The component is missing an <input> element');\n        }\n    }\n}\n")),(0,i.kt)("h2",{id:"validating-state"},"Validating State"),(0,i.kt)("p",null,"In addition to ",(0,i.kt)("a",{parentName:"p",href:"/froyo/docs/advanced/typechecking-state"},"type-checking"),", it can be valuable to validate that the component state is being set correctly. For example, you could check if two mutually exclusive state properties are set at the same time."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"validate(stateChanges) {\n    if ('flavor' in stateChanges || 'topping' in stateChanges) {\n        if (this.state.flavor && this.state.topping) {\n            console.error('\"flavor\" and \"topping\" cannot be set at the same time');\n        }\n    }\n}\n")))}p.isMDXComponent=!0}}]);