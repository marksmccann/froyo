# Component Lifecycle

This guide introduces the concept of the component lifecycle.

## The Lifecycle Methods

When a component is initialized, or when the state changes, a series of "lifecycle" methods are called in a particular order. Each method has a designated responsibility relative to its position in the lifecycle.

The methods are: [`initialize`](../api/component.md#initialize), [`validate`](../api/component.md#validate), [`render`](../api/component.md#render), [`update`](../api/component.md#update), [`destroy`](../api/component.md#destroy).

When initialized, these methods are called once in this order:

1. `initialize`
1. `validate`
1. `render`
1. `update`

Every time the component state is updated (via [`setState`](../api/component.md#setstate)), these methods are called in this order:

1. `validate`
1. `render`
1. `update`

When the component needs to be removed, `destroy` must be called manually.

<br />

---

## Adding Lifecycle Methods to a Class

When defining a component, the lifecycle methods are optional, except for `render`. Add the others to the class on an as-needed basis. See the [API reference](../api/component.md#instance-methods) to learn more.

```js
class FrozenYogurt extends Component {
    initialize() {
        /* perform setup tasks */
    }

    validate() {
        /* perform validation before render */
    }

    render() {
        /* perform DOM updates */
    }

    update() {
        /* perform updates after render */
    }

    destroy() {
        /* perform cleanup tasks */

        super.destroy(); // cleanup the parent
    }
}
```

<br />

---

## Setting State Correctly

The state cannot be updated directly. In fact, if you attempt to do so (outside of `initialize`), it will not work and an error message will log to the console.

```js
// Incorrect
this.state = { flavor: 'Vanilla' };
```

Setting the value of a specific state property also will not work, but an error will not be logged.

```js
// Incorrect
this.state.flavor = 'Vanilla';
```

Instead, use [`setState`](../api/component.md#setstate) which will update the state and kick-off the component lifecycle.

:::info

`setState` will only kick-off the component lifecycle if there were changes to the state. The [strict equality operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) (e.g. `===`) is used to determine which values have changed. This means that objects and arrays must be replaced in order for their changes to be recognized.

:::

```js
// Correct
this.setState({ flavor: 'Vanilla' });
```

The only place where it is appropriate to set `this.state` directly is in `initialize`.

<br />

---

## Determining the Initial State

When a component begins initialization, before the `initialize` method is called, data is collected, merged, and assigned to `this.state`. In reverse order of priority, the data is collected from the following three sources:

1\. The [`defaultState`](../api/component.md#defaultstate) from the class definition.

```js
class FrozenYogurt extends Component {
    static get defaultState() {
        return {
            flavor: 'Vanilla',
        };
    }
}
```

2\. The `data-initial-state` HTML attribute from the root element.

:::info

The value of this attribute must be valid JSON. See ["HTML-only Usage"](./html-only-usage.md) to learn more about this feature and its particular usefulness when paired with the ["Create Initializer"](../api/create-initializer.md) tool.

:::

```html
<div data-initial-state='{"flavor": "vanilla"}'></div>
```

3\. The `initialState` passed to the second argument of the constructor.

```js
const instance = new FrozenYogurt(rootElement, { flavor: 'Vanilla' });
```

<br />

By the time `initialize` is called, the data from the sources above have been merged and are available on `this.state`. While in this method, `this.state` can by set directly. Ultimately, whatever the state is at the end of this method, will be the initial state of the component. Keep in mind that assignments to `this.state` extend the existing object, they do not replace it.

:::info

Sometimes, initial state properties must be set dynamically (e.g. referencing the viewport width to determine the initial layout of a component). This is the appropriate place to perform that logic. Alternatively, calling `setState` from the `update` method would also be appropriate, if the logic can wait until after the initial render of the component.

:::

```js
class FrozenYogurt extends Component {
    initialize() {
        this.state = {
            flavor: 'Vanilla',
        };
    }
}
```
