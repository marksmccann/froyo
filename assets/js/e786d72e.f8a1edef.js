"use strict";(self.webpackChunkfroyo=self.webpackChunkfroyo||[]).push([[384],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),d=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=d(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=d(n),m=a,h=p["".concat(l,".").concat(m)]||p[m]||u[m]||s;return n?r.createElement(h,i(i({ref:t},c),{},{components:n})):r.createElement(h,i({ref:t},c))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,i=new Array(s);i[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o[p]="string"==typeof e?e:a,i[1]=o;for(var d=2;d<s;d++)i[d]=n[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6751:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var r=n(7462),a=(n(7294),n(3905));const s={},i="Creating Listeners",o={unversionedId:"fundamentals/creating-listeners",id:"fundamentals/creating-listeners",title:"Creating Listeners",description:"This guide explains how to create and add various listeners to a component.",source:"@site/docs/fundamentals/creating-listeners.md",sourceDirName:"fundamentals",slug:"/fundamentals/creating-listeners",permalink:"/froyo/docs/fundamentals/creating-listeners",draft:!1,editUrl:"https://github.com/marksmccann/froyo/docs/fundamentals/creating-listeners.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"DOM Management",permalink:"/froyo/docs/fundamentals/dom-management"},next:{title:"HTML-only Usage",permalink:"/froyo/docs/fundamentals/html-only-usage"}},l={},d=[{value:"Adding Event Listeners",id:"adding-event-listeners",level:2},{value:"Creating Mutation Observers",id:"creating-mutation-observers",level:2},{value:"Creating Media Query Listeners",id:"creating-media-query-listeners",level:2},{value:"Adding Handlers to Instance",id:"adding-handlers-to-instance",level:2},{value:"Adding Custom Listeners",id:"adding-custom-listeners",level:2},{value:"Adding Listeners Manually",id:"adding-listeners-manually",level:2}],c={toc:d};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"creating-listeners"},"Creating Listeners"),(0,a.kt)("p",null,"This guide explains how to create and add various listeners to a component."),(0,a.kt)("h2",{id:"adding-event-listeners"},"Adding Event Listeners"),(0,a.kt)("p",null,"To add an event listener, use the ",(0,a.kt)("a",{parentName:"p",href:"/froyo/docs/api/listener-helpers#addeventlistener"},(0,a.kt)("inlineCode",{parentName:"a"},"addEventListener"))," utility and store the result directly to an object that is assigned to ",(0,a.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#listeners"},(0,a.kt)("inlineCode",{parentName:"a"},"this.listeners")),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { Component, addEventListener } from 'froyojs';\n\nclass FrozenYogurt extends Component {\n    setup() {\n        this.listeners = {\n            click: addEventListener(this.rootElement, 'click', () => {}),\n        };\n    }\n}\n")),(0,a.kt)("br",null),(0,a.kt)("hr",null),(0,a.kt)("h2",{id:"creating-mutation-observers"},"Creating Mutation Observers"),(0,a.kt)("p",null,"To create a ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver"},"mutation observer"),", use the ",(0,a.kt)("a",{parentName:"p",href:"/froyo/docs/api/listener-helpers#createmutationobserver"},(0,a.kt)("inlineCode",{parentName:"a"},"createMutationObserver"))," utility and store the result directly to an object that is assigned to ",(0,a.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#listeners"},(0,a.kt)("inlineCode",{parentName:"a"},"this.listeners")),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { Component, createMutationObserver } from 'froyojs';\n\nclass FrozenYogurt extends Component {\n    setup() {\n        this.listeners = {\n            attributeChange: createMutationObserver(someElement, () => {}, {\n                attributes: true,\n            }),\n        };\n    }\n}\n")),(0,a.kt)("br",null),(0,a.kt)("hr",null),(0,a.kt)("h2",{id:"creating-media-query-listeners"},"Creating Media Query Listeners"),(0,a.kt)("p",null,"To create a listener for media queries (via ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia"},"window.matchMedia"),"), use the ",(0,a.kt)("a",{parentName:"p",href:"/froyo/docs/api/listener-helpers#createmediaquerylistener"},(0,a.kt)("inlineCode",{parentName:"a"},"createMediaQueryListener"))," utility and store the result directly to an object that is assigned to ",(0,a.kt)("a",{parentName:"p",href:"/froyo/docs/api/component#listeners"},(0,a.kt)("inlineCode",{parentName:"a"},"this.listeners")),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { Component, createMediaQueryListener } from 'froyojs';\n\nclass FrozenYogurt extends Component {\n    setup() {\n        this.listeners = {\n            mediaChanged: createMediaQueryListener(\n                '(min-width: 500px)',\n                () => {}\n            ),\n        };\n    }\n}\n")),(0,a.kt)("br",null),(0,a.kt)("hr",null),(0,a.kt)("h2",{id:"adding-handlers-to-instance"},"Adding Handlers to Instance"),(0,a.kt)("p",null,'When needed, callback handlers can be added to the instance as class methods. As a matter of convention, the method name should be prefixed with "handle". Remember to ',(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind"},"bind")," the handler to the instance so that ",(0,a.kt)("inlineCode",{parentName:"p"},"this")," will refer to the instance instead of the listener's target element."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"class FrozenYogurt extends Component {\n    setup() {\n        this.listeners = {\n            click: addEventListener(\n                this.rootElement,\n                'click',\n                this.handleClick.bind(this) // bind to instance\n            ),\n        };\n    }\n\n    handleClick() {\n        // do something ...\n    }\n}\n")),(0,a.kt)("br",null),(0,a.kt)("hr",null),(0,a.kt)("h2",{id:"adding-custom-listeners"},"Adding Custom Listeners"),(0,a.kt)("p",null,"Custom listener can also be assigned to ",(0,a.kt)("a",{parentName:"p",href:"/froyo/docs/api/listener-helpers"},(0,a.kt)("inlineCode",{parentName:"a"},"this.listeners")),'. This property expects each key to be a simple object with a "destroy" function. As long as that simple criteria is met, it can be used with any listener.'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"this.listeners = {\n    myCustomListener: {\n        destroy() {\n            // remove the custom listener ...\n        },\n    },\n};\n")),(0,a.kt)("p",null,"For example, the lightweight package ",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/delegate"},"delegate")," coincidentally supports the same API and can be used to create delegated event listeners that can be assigned directly to the class."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import delegate from 'delegate';\n\nthis.listeners = {\n    myCustomListener: delegate(\n        this.rootElement,\n        '<some selector>',\n        'click',\n        this.handleClick.bind(this),\n        false\n    ),\n};\n")),(0,a.kt)("br",null),(0,a.kt)("hr",null),(0,a.kt)("h2",{id:"adding-listeners-manually"},"Adding Listeners Manually"),(0,a.kt)("p",null,"While not recommended, it is possible to add listeners manually. For example, this is how one would use ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener"},"EventTarget.addEventListener")," out-of-the-box."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { Component } from 'froyojs';\n\nclass FrozenYogurt extends Component {\n    setup() {\n        this.handleClick = () => {};\n\n        // add the event listener\n        this.rootElement.addEventListener('click', this.handleClick);\n    }\n\n    destroy() {\n        // remove the event listener\n        this.rootElement.removeEventListener('click', this.handleClick);\n\n        super.destroy(); // destroy the parent class\n    }\n}\n")))}p.isMDXComponent=!0}}]);