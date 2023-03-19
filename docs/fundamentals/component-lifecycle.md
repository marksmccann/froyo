import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Component Lifecycle

This guide introduces the concept of the component lifecycle.

## The Lifecycle Methods

When a component is initialized, or when the state changes, a series of "lifecycle" methods are called in a particular order. Each method has a designated responsibility relative to its position in the lifecycle.

The methods are: [`setup`](../api/component.md#setup), [`validate`](../api/component.md#validate), [`render`](../api/component.md#render), [`update`](../api/component.md#update), [`destroy`](../api/component.md#destroy).

When initialized, these methods are called once in this order:

1. `setup`
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

<Tabs>
<TabItem value="js" label="JavaScript" default>

```js
class FrozenYogurt extends Component {
    setup() {
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

</TabItem>
<TabItem value="ts" label="TypeScript" default>

```ts
type State = {};

class FrozenYogurt extends Component<State> {
    protected setup(): void {
        /* perform setup tasks */
    }

    protected validate(
        stateChanges: Partial<State>,
        previousState: State
    ): void {
        /* perform validation before render */
    }

    protected render(stateChanges: Partial<State>, previousState: State): void {
        /* perform DOM updates */
    }

    protected update(stateChanges: Partial<State>, previousState: State): void {
        /* perform updates after render */
    }

    public destroy(): void {
        /* perform cleanup tasks */

        super.destroy(); // cleanup the parent
    }
}
```

</TabItem>
</Tabs>

<br />

---

## Setting State Correctly

Outside of the [`setup`](../api/component.md#setup) method, `this.state` cannot be set directly. In fact, if you attempt to do so, it will not work and an error message will log to the console.

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

<br />

---

## Determining the Initial State

When a component is initialized, the initial state is collected from multiple sources, merged, and assigned to [`this.state`](../api/component.md#state). In reverse order of priority, the data is collected from the following three sources:

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

2\. The `data-initial-state` HTML attribute on the root element.

:::info

The value of this attribute must be valid JSON. See ["HTML-only Usage"](./html-only-usage.md) to learn more about this feature and its particular usefulness when paired with the ["Create Initializer"](../api/create-initializer.md) tool.

:::

```html
<div data-initial-state='{"flavor": "vanilla"}'></div>
```

3\. The `initialState` passed to the second argument of the constructor.

```js
new FrozenYogurt('#root', { flavor: 'Vanilla' });
```

<br />

---

## Setting the Initial State

If needed, the state can by set directly from within the [`setup`](../api/component.md#setup) method. This is not always necessary, but it can be useful for setting state properties dynamically.

:::info

Setting the state this way replaces the entire state object; giving you complete control over the initial state of the component. Whatever this property is set to, will be the initial state of the component. If used, make sure to spread the state object to preserve the other values.

:::

```js
class FrozenYogurt extends Component {
    setup() {
        this.state = {
            ...this.state, // extend the state
            large: window.innerWidth > 500,
        };
    }
}
```
