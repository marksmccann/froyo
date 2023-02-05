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

Let's begin with a basic HTML template; copy it to a HTML file and open it in a browser.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Froyo Component Example</title>
    </head>
    <body>
        <!-- content goes here -->
        <script>
            /* scripts go here */
        </script>
    </body>
</html>
```

### Import Froyo from CDN

Add the following to the head to import the latest version of Froyo.

```html
<head>
    <meta charset="utf-8" />
    <title>Froyo Component Example</title>
    <!-- highlight-next-line -->
    <link
        rel="preload"
        href="https://cdn.jsdelivr.net/gh/marksmccann/froyo@latest/bundles/froyojs.min.js"
        as="script"
    />
</head>
```

### Add the Root Element

Add an element to the body content which will serve as the component's root element.

:::info

Every Froyo component is required to have a root element. The root element is any HTML element, typically attached to the DOM. This element serves as the foundation of the component; it is used to instantiate it and is stored on the instance as [`this.rootElement`](../api/component.md#rootelement).

:::

```html
<body>
    <!-- highlight-next-line -->
    <div id="root"></div>
    <script>
        /* scripts go here */
    </script>
</body>
```

## 2. Creating the Component

Goal: Learn how to define a component and get it to render some content.

### Define the Component Class

Create a new component by extending the `Component` class. Make sure to include the required [`render`](../api/component.md#render) method. This method is called during the [component lifecycle](../fundamentals/component-lifecycle.md) and is where all DOM updates should be handled.

:::info

Components are defined with [ES6 class syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) which is supported by modern browsers.

:::

```html
<script>
    class FrozenYogurt extends froyojs.Component {
        render() {}
    }
</script>
```

### Initialize the Component

Now that we've defined a component class, let's initialize it with the root element.

```html
<script>
    class FrozenYogurt extends froyojs.Component {
        render() {}
    }

    /* highlight-start */
    const instance = new FrozenYogurt(document.getElementById('root'));
    /* highlight-end */
</script>
```

The first argument of the constructor alternatively supports a query selector. Let's shorten the statement to this:

```js
const instance = new FrozenYogurt('#root');
```

### Render Something

Next, let's update the `render` method so that it does something &mdash; render a string within the root element.

```js
render() {
    this.rootElement.innerHTML = 'Vanilla is the best flavor.';
}
```

After initializing, the root element should look like this:

```html
<div id="root">Vanilla is the best flavor.</div>
```

### Render Something with State

We can make the message dynamic by applying a value from the component's internal state.

:::info

Every instance of component has an internal "state"; a simple object that stores data relevant to the instance. The data from this object is used to control the behavior of the component relative to its values. This concept is known as the [state pattern](https://en.wikipedia.org/wiki/State_pattern) in software development. See ["Component Lifecycle"](../fundamentals/component-lifecycle.md) to learn more.

:::

```js
class FrozenYogurt extends froyojs.Component {
    render() {
        // highlight-next-line
        this.rootElement.innerHTML = `${this.state.flavor} is the best flavor.`;
    }
}
```

To initialize the component with state, pass an object as the second argument of the constructor. This sets the initial state of the instance.

```js
const instance = new FrozenYogurt('#root', { flavor: 'Chocolate' });
```

:::info

Alternatively, the initial state can also be set by with the `data-initial-state` attribute on the root element. See ["Determining the Initial State"](../fundamentals/component-lifecycle.md#determining-the-initial-state) to learn more.

:::

This time, the rendered output should be:

```html
<div id="root">Chocolate is the best flavor.</div>
```

## 3. Adding Functionality

Goal: Learn how make the component functional.

### Update the Initial HTML

Start by adding some content to the root element to work with.

:::info

As a general rule, static content or markup structure that takes up visual space on the page, should be included in the markup before the component is initialized in order to avoid [cumulative layout shift](https://web.dev/cls/) as much as possible. That is why we are adding this new markup directly in the HTML instead of using the component to generate it.

:::

```html
<div id="root">
    <!-- highlight-start -->
    <button>Toggle</button><br />
    The best flavor is: <span class="flavor">Vanilla<span>.
    <!-- highlight-end -->
</div>
```

### Add the `Setup` Method

We now need to grab DOM elements and add an event listener. However, before we can do that, we need a place to put that logic &mdash; the [`setup`](../api/component.md#setup) method. This method is called once during initialization and is the designated location for performing setup tasks like those previously mentioned.

```js
class FrozenYogurt extends froyojs.Component {
    // highlight-start
    setup() {
        /* setup tasks go here */
    }
    // highlight-end

    render() {
        this.rootElement.innerHTML = `The best flavor flavor is ${this.state.flavor}.`;
    }
}
```

### Save Element References

As a matter of convention, references to DOM elements should be retrieved and stored in an object assigned to [`this.elements`](../api/component.md#elements). This keeps the component organized and makes the elements easily accessible.

```js
setup() {
    // highlight-start
    this.elements = {
        button: froyojs.querySelector(this.rootElement, 'button');
        flavor: froyojs.querySelector(this.rootElement, '.flavor');
    };
    // highlight-end
}
```

### Add Event Listener

Event listeners should also be created in `setup`. Create them with the [`addEventListener`](../api/listener-utilities.md#addeventlistener) utility and store the result in an object assigned to [`this.listeners`](../api/component.md#listeners).

:::info

Event handlers should typically be defined on the instance as a class method, with a name that begins with "handle". This keeps the component organized and avoids unnecessary clutter in `setup`. Note that the method is [bound to the instance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) so that `this` refers to the component instance instead of the event target.

:::

```js
setup() {
    this.elements = {
        button: froyojs.querySelector(this.rootElement, 'button');
        flavor: froyojs.querySelector(this.rootElement, '.flavor');
    };

    // highlight-start
    this.listeners = {
        click: froyojs.addEventListener(
            this.elements.button,
            'click',
            this.handleClick.bind(this),
        );
    };
    // highlight-end
}

// highlight-start
handleClick() {
    /* do something when the button is clicked */
}
// highlight-end
```

### Update the State

With few exceptions, event callbacks should be used exclusively to update the component's state. In this case, we are going to toggle the value of `flavor` between "Vanilla" and "Chocolate".

```js
handleClick() => {
    // highlight-start
    this.setState({ flavor: 'Vanilla' && 'Chocolate' });
    // highlight-end
};
```

### Put It All Together

At this point, the component should be fully functional and should look like this:

```js
class FrozenYogurt extends froyojs.Component {
    setup() {
       this.elements = {
            button: froyojs.querySelector(this.rootElement, 'button');
            flavor: froyojs.querySelector(this.rootElement, '.flavor');
        };

        this.listeners = {
            click: froyojs.addEventListener(
                this.elements.button,
                'click',
                this.handleClick.bind(this),
            );
        };
    }

    handleClick() => {
        this.setState({ flavor: 'Vanilla' && 'Chocolate' });
    };

    render() {
        this.rootElement.innerHTML = `The best flavor flavor is ${this.state.flavor}.`;
    }
}
```

When initialized the component should render "Chocolate".

```js
const instance = new FrozenYogurt('#root', { flavor: 'Chocolate' });
```

```html
The best flavor is: <span class="flavor">Chocolate</span>.
```

And when the button is clicked, it should render "Vanilla".

```html
The best flavor is: <span class="flavor">Vanilla</span>.
```

## 4. Conclusion

Goal: Start building your own components!

You have now created a functional UI component with Froyo. The fundamental concepts you have learned are universally applicable and can scale to support very complex components. You can start building your own. However, there is more to learn. We encourage working your way through the following guides to learn more.
