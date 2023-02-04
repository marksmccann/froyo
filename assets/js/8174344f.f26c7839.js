"use strict";(self.webpackChunkfroyo=self.webpackChunkfroyo||[]).push([[5053],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),d=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=d(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=d(n),m=o,h=u["".concat(s,".").concat(m)]||u[m]||p[m]||a;return n?r.createElement(h,l(l({ref:t},c),{},{components:n})):r.createElement(h,l({ref:t},c))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:o,l[1]=i;for(var d=2;d<a;d++)l[d]=n[d];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(7294),o=n(6010);const a="tabItem_Ymn6";function l(e){let{children:t,hidden:n,className:l}=e;return r.createElement("div",{role:"tabpanel",className:(0,o.Z)(a,l),hidden:n},t)}},5488:(e,t,n)=>{n.d(t,{Z:()=>m});var r=n(7462),o=n(7294),a=n(6010),l=n(2389),i=n(7392),s=n(7094),d=n(2466);const c="tabList__CuJ",u="tabItem_LNqP";function p(e){const{lazy:t,block:n,defaultValue:l,values:p,groupId:m,className:h}=e,y=o.Children.map(e.children,(e=>{if((0,o.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),f=p??y.map((e=>{let{props:{value:t,label:n,attributes:r}}=e;return{value:t,label:n,attributes:r}})),b=(0,i.l)(f,((e,t)=>e.value===t.value));if(b.length>0)throw new Error(`Docusaurus error: Duplicate values "${b.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const g=null===l?l:l??y.find((e=>e.props.default))?.props.value??y[0].props.value;if(null!==g&&!f.some((e=>e.value===g)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${g}" but none of its children has the corresponding value. Available values are: ${f.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:k,setTabGroupChoices:v}=(0,s.U)(),[w,N]=(0,o.useState)(g),T=[],{blockElementScrollPositionUntilNextRender:j}=(0,d.o5)();if(null!=m){const e=k[m];null!=e&&e!==w&&f.some((t=>t.value===e))&&N(e)}const C=e=>{const t=e.currentTarget,n=T.indexOf(t),r=f[n].value;r!==w&&(j(t),N(r),null!=m&&v(m,String(r)))},O=e=>{let t=null;switch(e.key){case"Enter":C(e);break;case"ArrowRight":{const n=T.indexOf(e.currentTarget)+1;t=T[n]??T[0];break}case"ArrowLeft":{const n=T.indexOf(e.currentTarget)-1;t=T[n]??T[T.length-1];break}}t?.focus()};return o.createElement("div",{className:(0,a.Z)("tabs-container",c)},o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":n},h)},f.map((e=>{let{value:t,label:n,attributes:l}=e;return o.createElement("li",(0,r.Z)({role:"tab",tabIndex:w===t?0:-1,"aria-selected":w===t,key:t,ref:e=>T.push(e),onKeyDown:O,onClick:C},l,{className:(0,a.Z)("tabs__item",u,l?.className,{"tabs__item--active":w===t})}),n??t)}))),t?(0,o.cloneElement)(y.filter((e=>e.props.value===w))[0],{className:"margin-top--md"}):o.createElement("div",{className:"margin-top--md"},y.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==w})))))}function m(e){const t=(0,l.Z)();return o.createElement(p,(0,r.Z)({key:String(t)},e))}},1502:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>m,frontMatter:()=>i,metadata:()=>d,toc:()=>u});var r=n(7462),o=(n(7294),n(3905)),a=n(5488),l=n(5162);const i={toc_min_heading_level:2,toc_max_heading_level:5},s="testing-library-froyojs",d={unversionedId:"ecosystem/testing-library-froyojs",id:"ecosystem/testing-library-froyojs",title:"testing-library-froyojs",description:"testing-library-froyojs is a package that extends @testing-library/dom to work with Froyo.",source:"@site/docs/ecosystem/testing-library-froyojs.md",sourceDirName:"ecosystem",slug:"/ecosystem/testing-library-froyojs",permalink:"/froyo/docs/ecosystem/testing-library-froyojs",draft:!1,editUrl:"https://github.com/marksmccann/froyo/docs/ecosystem/testing-library-froyojs.md",tags:[],version:"current",frontMatter:{toc_min_heading_level:2,toc_max_heading_level:5},sidebar:"docs",previous:{title:"Listener Utilities",permalink:"/froyo/docs/api/listener-utilities"}},c={},u=[{value:"Installation",id:"installation",level:2},{value:"API",id:"api",level:2},{value:"<code>render</code>",id:"render",level:3},{value:"<code>Render</code> Options",id:"render-options",level:3},{value:"<code>container</code>",id:"container",level:4},{value:"<code>baseElement</code>",id:"baseelement",level:4},{value:"<code>queries</code>",id:"queries",level:4},{value:"<code>Render</code> Result",id:"render-result",level:3},{value:"<code>...queries</code>",id:"queries-1",level:4},{value:"<code>container</code>",id:"container-1",level:4},{value:"<code>baseElement</code>",id:"baseelement-1",level:4},{value:"<code>rerender</code>",id:"rerender",level:4},{value:"<code>destroy</code>",id:"destroy",level:4},{value:"<code>cleanup</code>",id:"cleanup",level:3}],p={toc:u};function m(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"testing-library-froyojs"},"testing-library-froyojs"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"testing-library-froyojs")," is a package that extends ",(0,o.kt)("inlineCode",{parentName:"p"},"@testing-library/dom")," to work with ",(0,o.kt)("a",{parentName:"p",href:"https://marksmccann.github.io/froyo/"},"Froyo"),"."),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)(a.Z,{mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"npm",label:"npm",default:!0,mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"npm i testing-library-froyojs --save-dev\n"))),(0,o.kt)(l.Z,{value:"yarn",label:"Yarn",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"yarn add testing-library-froyojs --dev\n")))),(0,o.kt)("h2",{id:"api"},"API"),(0,o.kt)("p",null,"Froyo Testing Library re-exports everything from DOM Testing Library as well as these methods:"),(0,o.kt)("h3",{id:"render"},(0,o.kt)("inlineCode",{parentName:"h3"},"render")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"render(html: HTMLString, initialize: function(): void, options?: object)\n")),(0,o.kt)("p",null,"Renders an HTML string into a container that is appended to the document and then calls ",(0,o.kt)("inlineCode",{parentName:"p"},"initialize")," to instantiate Froyo components."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import '@testing-library/jest-dom';\nimport { Component } from 'froyojs';\nimport { render } from 'testing-library-froyojs';\n\nclass HelloWorld extends Component {\n    render() {\n        this.rootElement.innerHTML = 'Hello, World!';\n    }\n}\n\ntest('renders a greeting', () => {\n    const { getByText } = render(\n        '<div id=\"root\"></div>',\n        () => new HelloWorld('#root')\n    );\n\n    expect(getByText('Hello, world!')).toBeInTheDocument();\n});\n")),(0,o.kt)("h3",{id:"render-options"},(0,o.kt)("inlineCode",{parentName:"h3"},"Render")," Options"),(0,o.kt)("h4",{id:"container"},(0,o.kt)("inlineCode",{parentName:"h4"},"container")),(0,o.kt)("p",null,"By default, Froyo Testing Library will create a div and append it to the base element. This element is the container where the provided ",(0,o.kt)("inlineCode",{parentName:"p"},"html")," is rendered. If you provide your own container via this option, it will not be appended to ",(0,o.kt)("inlineCode",{parentName:"p"},"document.body")," automatically."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const container = document.createElement('div');\n\nconst result = render('<div id=\"root\"></div>', () => new HelloWorld('#root'), {\n    container: document.body.appendChild(container),\n});\n")),(0,o.kt)("p",null,"If you forget or choose not to append the container to the document, passing a selector to the Froyo component constructor will not work because it will not be able to find the element. You will need to pass a direct reference to the HTML element instead."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"new HelloWorld(container.querySelector('#root'));\n")),(0,o.kt)("h4",{id:"baseelement"},(0,o.kt)("inlineCode",{parentName:"h4"},"baseElement")),(0,o.kt)("p",null,"If the container is specified, then this defaults to that, otherwise this defaults to ",(0,o.kt)("inlineCode",{parentName:"p"},"document.body"),". This is used as the base element for the queries. If you provide your own base element via this option or ",(0,o.kt)("inlineCode",{parentName:"p"},"container"),", it will not be appended to ",(0,o.kt)("inlineCode",{parentName:"p"},"document.body")," automatically."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const baseElement = document.createElement('div');\n\nconst result = render('<div id=\"root\"></div>', () => new HelloWorld('#root'), {\n    baseElement: document.body.appendChild(baseElement),\n});\n")),(0,o.kt)("p",null,"If you forget or choose not to append the base element or container to the document, passing a selector to the Froyo component constructor will not work because it will not be able to find the element. You will need to pass a direct reference to the HTML element instead."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"new HelloWorld(container.querySelector('#root'));\n")),(0,o.kt)("h4",{id:"queries"},(0,o.kt)("inlineCode",{parentName:"h4"},"queries")),(0,o.kt)("p",null,"Queries to bind to the ",(0,o.kt)("inlineCode",{parentName:"p"},"baseElement"),". Overrides the default set of queries from DOM Testing Library unless merged."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import * as myQueries from 'my-query-library';\nimport { queries } from 'testing-library-froyojs';\n\nconst { getByMyQuery } = render(\n    '<div id=\"root\"></div>',\n    () => new HelloWorld('#root'),\n    queries: { ...queries, ...myQueries },\n);\n")),(0,o.kt)("p",null,"Learn more about creating ",(0,o.kt)("a",{parentName:"p",href:"https://testing-library.com/docs/dom-testing-library/api-custom-queries/"},"custom queries")," on the Testing Library website."),(0,o.kt)("h3",{id:"render-result"},(0,o.kt)("inlineCode",{parentName:"h3"},"Render")," Result"),(0,o.kt)("p",null,"The render method returns an object with the following properties:"),(0,o.kt)("h4",{id:"queries-1"},(0,o.kt)("inlineCode",{parentName:"h4"},"...queries")),(0,o.kt)("p",null,"Most importantly, the queries from DOM Testing Library are automatically returned with their first argument bound to the ",(0,o.kt)("inlineCode",{parentName:"p"},"baseElement"),", which defaults to ",(0,o.kt)("inlineCode",{parentName:"p"},"document.body"),"."),(0,o.kt)("p",null,"See ",(0,o.kt)("a",{parentName:"p",href:"https://testing-library.com/docs/queries/about"},"Queries")," for a complete list."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { getByText, queryByLabelText } = render(\n    '<div id=\"root\"></div>',\n    () => new HelloWorld('#root')\n);\n")),(0,o.kt)("h4",{id:"container-1"},(0,o.kt)("inlineCode",{parentName:"h4"},"container")),(0,o.kt)("p",null,"The containing DOM node for the rendered ",(0,o.kt)("inlineCode",{parentName:"p"},"html"),"."),(0,o.kt)("h4",{id:"baseelement-1"},(0,o.kt)("inlineCode",{parentName:"h4"},"baseElement")),(0,o.kt)("p",null,"The containing DOM node where the container was appended; defaults to ",(0,o.kt)("inlineCode",{parentName:"p"},"document.body"),"."),(0,o.kt)("h4",{id:"rerender"},(0,o.kt)("inlineCode",{parentName:"h4"},"rerender")),(0,o.kt)("p",null,"This function will rerender a single component by updating its state. The first argument must be an HTML element (or query string) to the root element of the desired component. When a corresponding instance is identified, its state is then updated with the data passed to the second argument, causing the component to update and rerender."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { render } from 'testing-library-froyo';\n\nconst { rerender } = render(\n    '<div id=\"root\"></div>',\n    () => new HelloWorld('#root')\n);\n\n// re-render the same component with different state\nrerender('#root', { message: 'Goodbye, World!' });\n")),(0,o.kt)("h4",{id:"destroy"},(0,o.kt)("inlineCode",{parentName:"h4"},"destroy")),(0,o.kt)("p",null,"This will destroy the component instance and remove the associated root element from the DOM. If a ",(0,o.kt)("inlineCode",{parentName:"p"},"container")," was specified, it will also be removed from the DOM if it no longer has any content."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { render } from '@testing-library/react';\n\nconst { destroy } = render(\n    '<div id=\"root\"></div>',\n    () => new HelloWorld('#root')\n);\n\ndestroy(); // the component is destroyed and now: document.body.innerHTML === ''\n")),(0,o.kt)("h3",{id:"cleanup"},(0,o.kt)("inlineCode",{parentName:"h3"},"cleanup")),(0,o.kt)("p",null,"Destroys all instances and removes all elements that were created with ",(0,o.kt)("inlineCode",{parentName:"p"},"render"),". Failing to call cleanup when you've called render could result in a memory leak and a test environment that is not pure (which can lead to errors that are difficult to debug)."),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Please note that this is done automatically if the testing framework you're using supports the ",(0,o.kt)("inlineCode",{parentName:"p"},"afterEach")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"teardown")," global and it is injected into your testing environment (like mocha, Jest, and Jasmine). If not, you will need to manually perform cleanups after each test by calling this function.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"cleanup();\n")))}m.isMDXComponent=!0}}]);