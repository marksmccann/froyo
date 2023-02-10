# Creating Listeners

This guide explains how to create and add various listeners to a component.

## Adding Event Listeners

To add an event listener, use the [`addEventListener`](../api/listener-helpers.md#addeventlistener) utility and store the result directly to an object that is assigned to [`this.listeners`](../api/component.md#listeners).

```js
import { Component, addEventListener } from 'froyojs';

class FrozenYogurt extends Component {
    setup() {
        this.listeners = {
            click: addEventListener(this.rootElement, 'click', () => {}),
        };
    }
}
```

<br />

---

## Creating Mutation Observers

To create a [mutation observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), use the [`createMutationObserver`](../api/listener-helpers.md#createmutationobserver) utility and store the result directly to an object that is assigned to [`this.listeners`](../api/component.md#listeners).

```js
import { Component, createMutationObserver } from 'froyojs';

class FrozenYogurt extends Component {
    setup() {
        this.listeners = {
            attributeChange: createMutationObserver(someElement, () => {}, {
                attributes: true,
            }),
        };
    }
}
```

<br />

---

## Creating Media Query Listeners

To create a listener for media queries (via [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)), use the [`createMediaQueryListener`](../api/listener-helpers.md#createmediaquerylistener) utility and store the result directly to an object that is assigned to [`this.listeners`](../api/component.md#listeners).

```js
import { Component, createMediaQueryListener } from 'froyojs';

class FrozenYogurt extends Component {
    setup() {
        this.listeners = {
            mediaChanged: createMediaQueryListener(
                '(min-width: 500px)',
                () => {}
            ),
        };
    }
}
```

<br />

---

## Adding Handlers to Instance

When needed, callback handlers can be added to the instance as class methods. As a matter of convention, the method name should be prefixed with "handle". Remember to [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) the handler to the instance so that `this` will refer to the instance instead of the listener's target element.

```js
class FrozenYogurt extends Component {
    setup() {
        this.listeners = {
            click: addEventListener(
                this.rootElement,
                'click',
                this.handleClick.bind(this) // bind to instance
            ),
        };
    }

    handleClick() {
        // do something ...
    }
}
```

<br />

---

## Adding Custom Listeners

Custom listener can also be assigned to [`this.listeners`](../api/listener-helpers.md). This property expects each key to be a simple object with a "destroy" function. As long as that simple criteria is met, it can be used with any listener.

```js
this.listeners = {
    myCustomListener: {
        destroy() {
            // remove the custom listener ...
        },
    },
};
```

For example, the lightweight package [delegate](https://www.npmjs.com/package/delegate) coincidentally supports the same API and can be used to create delegated event listeners that can be assigned directly to the class.

```js
import delegate from 'delegate';

this.listeners = {
    myCustomListener: delegate(
        this.rootElement,
        '<some selector>',
        'click',
        this.handleClick.bind(this),
        false
    ),
};
```

<br />

---

## Adding Listeners Manually

While not recommended, it is possible to add listeners manually. For example, this is how one would use [EventTarget.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) out-of-the-box.

```js
import { Component } from 'froyojs';

class FrozenYogurt extends Component {
    setup() {
        this.handleClick = () => {};

        // add the event listener
        this.rootElement.addEventListener('click', this.handleClick);
    }

    destroy() {
        // remove the event listener
        this.rootElement.removeEventListener('click', this.handleClick);

        super.destroy(); // destroy the parent class
    }
}
```
