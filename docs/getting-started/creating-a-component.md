import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating a Component

In this brief tutorial you will learn the fundamentals of Froyo by building a simple UI component.

:::info

This tutorial assumes readers have a working knowledge of JavaScript and fundamental software development concepts. If this doesn't describe you, consider taking a moment to review a [JavaScript tutorial](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Overview) before continuing.

:::

## Setup

For this tutorial, we will be working directly in the browser.

### Create page from template

Let's begin with a basic HTML template; copy it to an HTML file and open it in a browser.

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

Add the following script tag to the head to import the latest version of Froyo.

```html
<head>
    <meta charset="utf-8" />
    <title>Froyo Component Example</title>
    <!-- highlight-next-line -->
    <script src="https://cdn.jsdelivr.net/gh/marksmccann/froyo@latest/bundles/froyojs.min.js"></script>
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

## Component Creation

Learn how to define a new component and get it to render some content.

### Define the Component Class

Create a new component by extending the `Component` class from Froyo. Make sure to include the required [`render`](../api/component.md#render) method; `render` is called during the component lifecycle and is where all DOM updates should be handled.

:::info

Froyo components are defined with [ES6 class syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) which is supported by modern browsers.

:::

```html
<script>
    class IceCream extends froyojs.Component {
        render() {}
    }
</script>
```

### Instantiate the Component

Now that we have a valid component, we can instantiate it with the root element.

```html
<script>
    class IceCream extends froyojs.Component {
        render() {}
    }

    /* highlight-start */
    const instance = new IceCream(document.getElementById('root'));
    /* highlight-end */
</script>
```

### Render Something

We have a component, but it doesn't do anything. Update the `render` method to render a string within the root element.

```js
render() {
    this.rootElement.innerHTML = 'Vanilla is the best ice cream.';
}
```

After initializing, the root element should look like this:

```html
<div id="root">Vanilla is the best ice cream.</div>
```

### Render Something with State

Now let's make the message dynamic by applying a value from the component's internal state.

:::info

Every instance of component has an internal "state"; a simple object that stores data relevant to the instance. The data from this object is used to control the behavior of the component relative to its values. This concept is known as the [state pattern](https://en.wikipedia.org/wiki/State_pattern) in software development.

:::

```js
class IceCream extends froyojs.Component {
    render() {
        // highlight-next-line
        this.rootElement.innerHTML = `${this.state.flavor} is the best ice cream.`;
    }
}
```

To instantiate the component with state, pass an object as the second argument of the constructor. This sets the initial state of the instance.

```js
const instance = new IceCream(rootElement, { flavor: 'Chocolate' });
```

This time, the rendered output should be:

```html
<div id="root">Chocolate is the best ice cream.</div>
```

## Add Functionality

Now, let's learn how make the component functional. Our goal for this section is to create component with a button that will toggle the ice cream flavor when clicked.

### Update the Initial HTML

Start by adding some content to the root element to work with.

:::info

As a general rule, static content or markup structure that takes up visual space on the page, should be included in the markup before the component is initialized in order to avoid [cumulative layout shift](https://web.dev/cls/) as much as possible. That is why we are adding this new markup directly in the HTML instead of using the component to generate it.

:::

```html
<div id="root">
    <!-- highlight-start -->
    <button>Toggle</button><br />
    The best ice cream is: <span class="flavor">Vanilla<span>.
    <!-- highlight-end -->
</div>
```

### Add the Initialize Method

We now need to grab DOM elements and add an event listener. However, before we can do that, we need a place to put that logic &mdash; the [`initialize`](../api/component.md#initialize) method. This method is called once during initialization and is the designation location for performing setup tasks like those previously mentioned.

```js
class IceCream extends froyojs.Component {
    // highlight-start
    initialize() {
        /* setup tasks go here */
    }
    // highlight-end

    render() {
        this.rootElement.innerHTML = `The best ice cream flavor is ${this.state.flavor}.`;
    }
}
```

### Save Element References

As a matter of convention, references to DOM elements should be retrieved and stored in an object assigned to [`this.elements`](../api/component.md#elements). This keeps the component organized and makes the elements easily accessible.

```js
initialize() {
    // highlight-start
    this.elements = {
        button: this.rootElement.querySelector('button');
        flavor: this.rootElement.querySelector('.flavor');
    };
    // highlight-end
}
```

### Add Event Listener

Event listeners should also be created in `initialize`. Event listeners should be added to an object using the framework's custom [`addEventListener`](../api/listener-utilities.md#addeventlistener) utility. This utility adds the event and returns a function that will remove it when the component is destroyed. This object should be assigned to [`this.listeners`](../api/component.md#listeners).

:::info

It is a best practice to define event callbacks as class methods with a name beginning with `handle`. This keeps the component organized and avoids unnecessary clutter in `initialize`. Note that the method is [bound to the instance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) so that `this` refers to the component instance instead of the button element.

:::

```js
initialize() {
    this.elements = {
        button: this.rootElement.querySelector('button');
        flavor: this.rootElement.querySelector('.flavor');
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
class IceCream extends froyojs.Component {
    initialize() {
       this.elements = {
            button: this.rootElement.querySelector('button');
            flavor: this.rootElement.querySelector('.flavor');
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
        this.rootElement.innerHTML = `The best ice cream flavor is ${this.state.flavor}.`;
    }
}
```

When initialized the component should render "Chocolate".

```js
const instance = new IceCream(rootElement, { flavor: 'Chocolate' });
```

```html
The best ice cream is: <span class="flavor">Chocolate<span>.</span></span>
```

And when the button is clicked, it should render "Vanilla".

```html
The best ice cream is: <span class="flavor">Vanilla<span>.</span></span>
```

## Conclusion

You have now created a functional UI component with Froyo. The fundamental concepts you have learned are the foundation of every component and can scale to support very complex components. While there is more to learn you now know enough to be dangerous.

Check out the component example on the next page to see a more realistic, real-world example of a Froyo component. Also, review the upcoming guides to learn about other important concepts such as dynamic rendering, the component lifecycle, the observer pattern and more.
