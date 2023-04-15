import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating a Component

In this brief tutorial you will learn how to build a simple component.

:::info

This tutorial assumes readers have a working knowledge of JavaScript and fundamental software development concepts. If this does not describe you, consider taking a moment to review a [JavaScript tutorial](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Overview) before continuing.

:::

## 1. Setup

Goal: Create a boilerplate page and open it in a browser.

### Create page from template

Let's begin with a basic HTML 5 template; copy it to a HTML file and open it in a browser.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Froyo Component Example</title>
    </head>
    <body>
        <!-- content goes here -->
    </body>
</html>
```

### Add the root element

Add an element to the body content which will serve as the component's root element.

:::info

Every Froyo component is required to have a root element. The root element can be any element type and it is typically attached to the DOM.

:::

```html
<body>
    <div id="root"></div>
</body>
```

### Import Froyo from CDN

Add the following script to the bottom of the document to import the latest development version of Froyo.

```html
<body>
    ...
    <!-- highlight-start -->
    <script src="https://cdn.jsdelivr.net/gh/marksmccann/froyo@latest/packages/froyojs/bundles/froyojs.js"></script>
    <!-- highlight-end -->
</body>
```

### Add script tag

Lastly, add an empty script tag to the bottom of the document. This is where we will be working.

```html
<body>
    ...
    <script>
        /* scripts will go here */
    </script>
</body>
```

## 2. Creating the Component

Goal: Learn how to define a component and get it to render some content.

### Define a new component

Define a new component by calling the `defineComponent` function. This will return a constructor for our component.

```html
<script>
    const FrozenYogurt = froyojs.defineComponent({});
</script>
```

### Initialize the component

Now that we've defined a component, let's initialize it with the root element.

```html
<script>
    const FrozenYogurt = froyojs.defineComponent({});

    /* highlight-start */
    const instance = new FrozenYogurt(document.getElementById('root'));
    /* highlight-end */
</script>
```

The first argument of the constructor alternatively supports a raw query selector. Let's shorten the statement to this:

```js
const instance = new FrozenYogurt('#root');
```

### Render something

We defined a component, but it doesn't do anything yet. Let's make the component render something in the root element. We do this by adding a method named `$root` to the [render option](../api/define-component.md#render). By returning a string we can render text within the content of the element.

```js
const FrozenYogurt = froyojs.defineComponent({
    /* highlight-start */
    render: {
        $root() {
            return 'The best flavor is: Vanilla';
        },
    },
    /* highlight-end */
});
```

After initializing, the root element should look like this:

```html
<div id="root">The best flavor is: Vanilla</div>
```

### Declare the component state

Next, let's make the content dynamic. We do this by binding the content of the root element to the component's state. Declare a new state property by adding an entry to the [state option](../api/define-component.md#state) called `flavor` and set its default value to "Vanilla".

```js
const FrozenYogurt = froyojs.defineComponent({
    /* highlight-start */
    state: {
        flavor: {
            default: 'Vanilla',
        },
    },
    /* highlight-end */
});
```

### Render something with state

Now, let's apply the newly defined state to the root element. The state property can be retrieved from the `this` keyword. Replace "Vanilla" with `this.flavor` to make the message dynamic.

```js
$root() {
    // highlight-next-line
    return `The best flavor is: ${this.flavor}.`;
}
```

Now that the content of the root element is bound to the state, we can control it. To test this, pass an object as the second argument of the constructor and set the initial value of `flavor` to "Chocolate".

```js
const instance = new FrozenYogurt('#root', { flavor: 'Chocolate' });
```

As a result, the rendered output should now be:

```html
<div id="root">The best flavor is: Chocolate</div>
```

## 3. Adding Functionality

Goal: Learn how make the component functional.

### Update the initial HTML

Let's start by adding some content to the root element to work with.

:::info

While this content could easily be generated with JavaScript, it is a good practice for static content to be included manually in the HTML. This gives consumers the ability to customize the content and it will reduce the effects of [cumulative layout shift](https://web.dev/cls/) which can have a degrading impact in SEO evaluations.

:::

```html
<div id="root">
    <!-- highlight-start -->
    <button>Toggle</button><br />
    The best flavor is: <span class="text">Vanilla<span>.
    <!-- highlight-end -->
</div>
```

### Declare DOM nodes

To access these newly defined elements in our component, add two entries to the [nodes option](../api/define-component.md#nodes). Set the `type` of each node to "query" and provide a `selector`; this tells the component to search for a match within the root element and save it to the instance.

```js
const FrozenYogurt = froyojs.defineComponent({
    /* highlight-start */
    nodes: {
        button: {
            type: 'query',
            selector: 'button',
        },
        text: {
            type: 'query',
            selector: '.text',
        },
    },
    /* highlight-end */
});
```

### Rendering the flavor

Next, remove the `$root` entry from `render` so that we do not overwrite our new content. Replace it with an entry for `text`; every property declared in `nodes` can have a corresponding entry in `render`. Return `this.flavor` from the function to apply the value to its content.

```js
const FrozenYogurt = froyojs.defineComponent({
    /* highlight-start */
    render: {
        text() {
            return this.flavor;
        },
    },
    /* highlight-end */
});
```

### Add the event listener

Now, let's add an event listener to the button element. Just like `render`, every property declared in `nodes` can have a corresponding entry in the [events option](../api/define-component.md#events). Define the event listener by adding an entry to `events` called "button". This property must be a function that returns an object of events. Add a "click" property to this object with an empty function as its value.

```js
const FrozenYogurt = froyojs.defineComponent({
    /* highlight-start */
    events: {
        button() {
            return {
                click: () => {},
            };
        },
    },
    /* highlight-end */
});
```

### Update the state

To make the component functional, we need to update the state when the button is clicked. In this case, we want to toggle the value of `flavor` between "Vanilla" and "Chocolate". We can do this by setting `this.flavor` directly.

```js
button() {
    return {
        click: () => {
            this.flavor = this.flavor === 'Vanilla' ? 'Chocolate' : 'Vanilla';
        },
    };
},
```

### Put it all together

At this point, the component should be fully functional. The component should look like the following and the flavor should toggle when the button is pressed.

<!-- prettier-ignore -->
```js
const FrozenYogurt = froyojs.defineComponent({
    state: {
        flavor: {
            default: 'Vanilla',
        },
    },
    nodes: {
        button: {
            type: 'query',
            selector: 'button',
        },
        text: {
            type: 'query',
            selector: '.text',
        },
    },
    events: {
        button() {
            return {
                click: () => {
                    this.flavor = this.flavor === 'Vanilla' ? 'Chocolate' : 'Vanilla';
                },
            };
        },
    },
    render: {
        text() {
            return this.flavor;
        },
    },
});
```

## 4. Conclusion

Goal: Start building your own components!

You have now created a functional component with Froyo. The fundamental concepts you have learned are universally applicable and can scale to support very complex components. You can start building your own. However, there is more to learn. We encourage working your way through the following guides to learn more.
