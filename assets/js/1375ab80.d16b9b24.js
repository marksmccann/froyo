"use strict";(self.webpackChunkfroyo=self.webpackChunkfroyo||[]).push([[9406],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>p});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var i=a.createContext({}),u=function(e){var n=a.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},d=function(e){var n=u(e.components);return a.createElement(i.Provider,{value:n},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},h=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=u(t),h=r,p=c["".concat(i,".").concat(h)]||c[h]||m[h]||o;return t?a.createElement(p,l(l({ref:n},d),{},{components:t})):a.createElement(p,l({ref:n},d))}));function p(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,l=new Array(o);l[0]=h;var s={};for(var i in n)hasOwnProperty.call(n,i)&&(s[i]=n[i]);s.originalType=e,s[c]="string"==typeof e?e:r,l[1]=s;for(var u=2;u<o;u++)l[u]=t[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}h.displayName="MDXCreateElement"},5162:(e,n,t)=>{t.d(n,{Z:()=>l});var a=t(7294),r=t(6010);const o="tabItem_Ymn6";function l(e){let{children:n,hidden:t,className:l}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(o,l),hidden:t},n)}},4866:(e,n,t)=>{t.d(n,{Z:()=>E});var a=t(7462),r=t(7294),o=t(6010),l=t(2466),s=t(6550),i=t(1980),u=t(7392),d=t(12);function c(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:n,label:t,attributes:a,default:r}}=e;return{value:n,label:t,attributes:a,default:r}}))}function m(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??c(t);return function(e){const n=(0,u.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function h(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function p(e){let{queryString:n=!1,groupId:t}=e;const a=(0,s.k6)(),o=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,i._X)(o),(0,r.useCallback)((e=>{if(!o)return;const n=new URLSearchParams(a.location.search);n.set(o,e),a.replace({...a.location,search:n.toString()})}),[o,a])]}function v(e){const{defaultValue:n,queryString:t=!1,groupId:a}=e,o=m(e),[l,s]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const a=t.find((e=>e.default))??t[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:n,tabValues:o}))),[i,u]=p({queryString:t,groupId:a}),[c,v]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,o]=(0,d.Nk)(t);return[a,(0,r.useCallback)((e=>{t&&o.set(e)}),[t,o])]}({groupId:a}),f=(()=>{const e=i??c;return h({value:e,tabValues:o})?e:null})();(0,r.useLayoutEffect)((()=>{f&&s(f)}),[f]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!h({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);s(e),u(e),v(e)}),[u,v,o]),tabValues:o}}var f=t(2389);const b="tabList__CuJ",g="tabItem_LNqP";function y(e){let{className:n,block:t,selectedValue:s,selectValue:i,tabValues:u}=e;const d=[],{blockElementScrollPositionUntilNextRender:c}=(0,l.o5)(),m=e=>{const n=e.currentTarget,t=d.indexOf(n),a=u[t].value;a!==s&&(c(n),i(a))},h=e=>{let n=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const t=d.indexOf(e.currentTarget)+1;n=d[t]??d[0];break}case"ArrowLeft":{const t=d.indexOf(e.currentTarget)-1;n=d[t]??d[d.length-1];break}}n?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":t},n)},u.map((e=>{let{value:n,label:t,attributes:l}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:s===n?0:-1,"aria-selected":s===n,key:n,ref:e=>d.push(e),onKeyDown:h,onClick:m},l,{className:(0,o.Z)("tabs__item",g,l?.className,{"tabs__item--active":s===n})}),t??n)})))}function k(e){let{lazy:n,children:t,selectedValue:a}=e;const o=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=o.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},o.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==a}))))}function w(e){const n=v(e);return r.createElement("div",{className:(0,o.Z)("tabs-container",b)},r.createElement(y,(0,a.Z)({},e,n)),r.createElement(k,(0,a.Z)({},e,n)))}function E(e){const n=(0,f.Z)();return r.createElement(w,(0,a.Z)({key:String(n)},e))}},5514:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>u,toc:()=>c});var a=t(7462),r=(t(7294),t(3905)),o=t(4866),l=t(5162);const s={},i="Handling Events",u={unversionedId:"fundamentals/handling-events",id:"fundamentals/handling-events",title:"Handling Events",description:"This guide explains how to add event listeners to a component.",source:"@site/docs/fundamentals/handling-events.md",sourceDirName:"fundamentals",slug:"/fundamentals/handling-events",permalink:"/froyo/docs/fundamentals/handling-events",draft:!1,editUrl:"https://github.com/marksmccann/froyo/docs/fundamentals/handling-events.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"DOM Management",permalink:"/froyo/docs/fundamentals/dom-management"},next:{title:"HTML-only Usage",permalink:"/froyo/docs/fundamentals/html-only-usage"}},d={},c=[{value:"Adding event listeners",id:"adding-event-listeners",level:2},{value:"Reserved event types",id:"reserved-event-types",level:2},{value:"Handling multiple elements",id:"handling-multiple-elements",level:2},{value:"Moving handlers to <code>methods</code>",id:"moving-handlers-to-methods",level:2},{value:"Adding custom events",id:"adding-custom-events",level:2}],m={toc:c};function h(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"handling-events"},"Handling Events"),(0,r.kt)("p",null,"This guide explains how to add event listeners to a component."),(0,r.kt)("h2",{id:"adding-event-listeners"},"Adding event listeners"),(0,r.kt)("p",null,"Once nodes have been declared in ",(0,r.kt)("inlineCode",{parentName:"p"},"nodes"),", an entry for them can be added to the ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/define-component#render"},"events option"),". The entry must have the exact same name as the node and must be a function that returns an event object. Each key in the event object must be a valid event type and the corresponding value must a function that handles that event."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"defineComponent({\n    nodes: {\n        button: {\n            type: 'element',\n            tagName: 'button',\n        },\n    },\n    events: {\n        button() {\n            return {\n                click: () => {\n                    // the button was clicked, do something ...\n                },\n            };\n        },\n    },\n});\n")),(0,r.kt)("br",null),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"reserved-event-types"},"Reserved event types"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"$window"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"$document"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"$root")," are reserved properties on the ",(0,r.kt)("inlineCode",{parentName:"p"},"events")," option that should be used add events to the Window, Document, and root element respectively."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"defineComponent({\n    events: {\n        $window() {\n            return {\n                resize: () => {\n                    // the window resized, do something ...\n                },\n            };\n        },\n        $document() {\n            return {\n                click: () => {\n                    // the document was clicked, do something ...\n                },\n            };\n        },\n        $root() {\n            return {\n                click: () => {\n                    // the root element was clicked, do something ...\n                },\n            };\n        },\n    },\n});\n")),(0,r.kt)("br",null),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"handling-multiple-elements"},"Handling multiple elements"),(0,r.kt)("p",null,"For nodes that are an array (via the ",(0,r.kt)("inlineCode",{parentName:"p"},"query-all")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"custom")," type), the events will be assigned directly to each element. Also, the index of the array will be passed as the first argument and can be used to differentiate each element."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"defineComponent({\n    nodes: {\n        multipleElements: {\n            type: 'query-all',\n            selector: '<some-selector>',\n        },\n    },\n    events: {\n        multipleElements(index) {\n            return {\n                click: () => {\n                    console.log(`Element ${index} was clicked!`;\n                },\n            };\n        },\n    },\n});\n")),(0,r.kt)("br",null),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"moving-handlers-to-methods"},"Moving handlers to ",(0,r.kt)("inlineCode",{parentName:"h2"},"methods")),(0,r.kt)("p",null,"When desired, event handlers can be moved to the ",(0,r.kt)("a",{parentName:"p",href:"/froyo/docs/api/define-component#methods"},"methods option")," and referenced via the ",(0,r.kt)("inlineCode",{parentName:"p"},"this")," keyword. This can be useful when handlers contain a lot of logic and become unwieldy."),(0,r.kt)(o.Z,{mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"js",label:"JavaScript",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"defineComponent({\n    methods: {\n        handleClick() {},\n    },\n    events: {\n        $root() {\n            return {\n                click: this.handleClick,\n            };\n        },\n    },\n});\n"))),(0,r.kt)(l.Z,{value:"ts",label:"TypeScript",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"defineComponent<{\n    $root: Element;\n    $state: {};\n    handleClick(): void;\n}>({\n    methods: {\n        handleClick() {},\n    },\n    events: {\n        $root() {\n            return {\n                click: this.handleClick,\n            };\n        },\n    },\n});\n")))),(0,r.kt)("br",null),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"adding-custom-events"},"Adding custom events"),(0,r.kt)("p",null,"The lifecycle hooks can be used add custom events and unconventional listeners like ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver"},"mutation observers")," and ",(0,r.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia"},"media query listeners")," to the component."),(0,r.kt)(o.Z,{mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"js",label:"JavaScript",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"defineComponent({\n    methods: {\n        handleCustomEvent() {}\n        handleMutationObserver() {}\n        handleMediaQueryChange() {}\n    },\n    hooks: {\n        $setup() {\n            this.$root.addEventListener('click', this.handleCustomEvent);\n\n            this.mutationObserver = new MutationObserver(this.handleMutationObserver);\n            this.mutationObserver.observe(this.$root, { attributes: true });\n\n            this.mediaQueryList = window.matchMedia('(max-width: 600px)');\n            this.mediaQueryList.addEventListener('change', this.handleMediaQueryChange);\n        },\n        $teardown() {\n            this.$root.removeEventListener('click', this.handleCustomEvent);\n            this.mutationObserver.disconnect();\n            this.mediaQueryList.removeEventListener('change', this.handleMediaQueryChange);\n        },\n    },\n});\n"))),(0,r.kt)(l.Z,{value:"ts",label:"TypeScript",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"defineComponent<{\n    $root: Element;\n    $state: {};\n    mutationObserver: MutationObserver,\n    mediaQueryList: MediaQueryList,\n    handleCustomEvent(): void,\n    handleMutationObserver(): void,\n    handleMediaQueryChange(): void,\n}>({\n    methods: {\n        handleCustomEvent() {}\n        handleMutationObserver() {}\n        handleMediaQueryChange() {}\n    },\n    hooks: {\n        $setup() {\n            this.$root.addEventListener('click', this.handleCustomEvent);\n\n            this.mutationObserver = new MutationObserver(this.handleMutationObserver);\n            this.mutationObserver.observe(this.$root, { attributes: true });\n\n            this.mediaQueryList = window.matchMedia('(max-width: 600px)');\n            this.mediaQueryList.addEventListener('change', this.handleMediaQueryChange);\n        },\n        $teardown() {\n            this.$root.removeEventListener('click', this.handleCustomEvent);\n            this.mutationObserver.disconnect();\n            this.mediaQueryList.removeEventListener('change', this.handleMediaQueryChange);\n        },\n    },\n});\n")))))}h.isMDXComponent=!0}}]);