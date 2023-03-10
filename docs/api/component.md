import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Component

This page contains a detailed API reference for the `Component` class definition.

## Import

<Tabs>
<TabItem value="es6" label="ES6" default>

```js
import { Component } from 'froyojs';
```

</TabItem>
<TabItem value="commonjs" label="CommonJS">

```js
const { Component } = require('froyojs');
```

</TabItem>
<TabItem value="browser" label="Browser (CDN)">

```js
window.froyojs.Component;
```

</TabItem>
</Tabs>

## Reference

### `Component`

```ts
abstract class Component<
    State extends Record<string, any> = {},
    Elements extends Record<
        string,
        null | Node | Array<Node> | NodeList | HTMLCollection
    > = {},
    Listeners extends Record<string, { destroy(): void }> = {},
    Components extends Record<string, Component> = {}
> {}
```

`Component` is an abstract class used to derive Froyo components.

```js
class FrozenYogurt extends Component {}
```

### `Constructor`

```ts
new Component(root: string | Element, initialState?: Record<string, any> })
```

The first argument of the constructor is required. It must be an HTML element or a query selector for a valid element within in the DOM. The second argument is optional and is responsible for setting the initial state of the component.

```js
const rootElement = document.createElement('div');
const instance = new FrozenYogurt(rootElement, { flavor: 'Vanilla' });
// will produce: '<div>"Vanilla" is the best flavor</div>'
```

## Instance properties

### `components`

-   type: `Components`

A user-defined object for storing references to component instances. Instances assigned to this property are automatically destroyed when the parent instance is destroyed. See ["Subcomponents"](../advanced/subcomponents.md) to learn more.

```js
class Topping extends Component {
    ...
}

class FrozenYogurt extends Component {
    setup() {
        this.components = {
            topping: new Topping(...),
        };
    }
}
```

### `elements`

-   type: `Elements`

A user-defined object for storing references to DOM elements. View ["Selecting Elements"](../fundamentals/dom-management.md#selecting-elements) to learn more.

:::tip

Review our [DOM helpers](./dom-helpers.md) to see how they can help you apply elements to this property.

:::

```js
class FrozenYogurt extends Component {
    setup() {
        this.elements = {
            toppings: this.rootElement.querySelectorAll('.topping'),
        };
    }
}
```

### `initialized`

-   type: `boolean`

A read-only value that indicates the initialized status of the instance.

```js
const instance = new FrozenYogurt(...);
// instance.initialized === true
```

### `listeners`

-   type: `Listeners`

A user-defined object for storing data related to listeners (e.g. [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), [mutation observers](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), [media query lists](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia), etc.). Each item in the object must be another object with at least, a "destroy" key that is responsible for removing the listener. The `destroy` functions are called automatically when the component is destroyed. See ["Creating Listeners"](../fundamentals/creating-listeners.md) to learn more.

:::tip

Review our [listener helpers](./listener-helpers.md) to see how they can help you apply listeners to this property.

:::

```js
class FrozenYogurt extends Component {
    setup() {
        this.listeners = {
            click: {
                destroy() {
                    // remove the listener
                },
            },
        };
    }
}
```

### `rootElement`

-   type: `HTMLElement`

A read-only reference to the `HTMLElement` that was used to initialize the component.

```js
const div = document.createElement('div');
const instance = new FrozenYogurt(div);
// instance.rootElement will equal "div"
```

### `state`

-   type: `State`

A user-defined object to store data about the instance. This data is used to conditionally control the output and behavior of the component. See ["Component Lifecycle"](../fundamentals/component-lifecycle.md) to learn more.

```js
const instance = new FrozenYogurt(rootElement, { flavor: 'Vanilla' });
// instance.state will be "{ flavor: 'Vanilla' }"
```

## Instance methods

### `destroy`

```ts
function destroy(): void;
```

A [lifecycle method](../fundamentals/component-lifecycle.md) responsible for performing cleanup tasks. If included, make sure to call `super.destroy` so that the parent class is properly destroyed.

```js
class FrozenYogurt extends Component {
    destroy() {
        // perform cleanup tasks ...

        super.destroy(); // cleanup parent
    }
}
```

### `render`

```ts
protected function render?(
    stateChanges: Partial<State>,
    previousState: State
): void;
```

A [lifecycle method](../fundamentals/component-lifecycle.md) that is called when the state updates. It should be used exclusively to update the DOM. The arguments provided should be used to perform [conditional updates](../fundamentals/handling-updates.md). It should never be called directly.

:::tip

Review our [DOM helpers](./dom-helpers.md) to see how they can help you update the DOM.

:::

```js
class FrozenYogurt extends Component {
    render() {
        // update the DOM ...
    }
}
```

### `setState`

```ts
function setState(newState: Partial<State>): void;
```

A method that updates the component's state and calls all [registered observers](../advanced/observer-pattern.md) including the lifecycle methods (e.g. `render`, `update`, `validate`). Only the properties that are changing need to be included in `newState`. See ["Component Lifecycle"](../fundamentals/component-lifecycle.md) and ["Handling Updates"](../fundamentals/handling-updates.md) to learn more.

```js
const instance = new FrozenYogurt(rootElement, { flavor: 'Vanilla' });
// <div>"Vanilla" is the best flavor</div>

instance.setState({ flavor: 'Chocolate' });
// <div>"Chocolate" is the best flavor</div>
```

### `setup`

```ts
function setup(): void;
```

A [lifecycle method](../fundamentals/component-lifecycle.md) that is called once during initialization, before all other lifecycle methods. It should be used to perform setup tasks like [creating event listeners](../fundamentals/creating-listeners.md) and [setting the initial state](../fundamentals/component-lifecycle.md#determining-the-initial-state). It should never be called directly.

```js
class FrozenYogurt extends Component {
    setup() {
        // perform setup tasks ...
    }
}
```

### `subscribe`

```ts
function subscribe(
    observer: (stateChanges: Partial<State>, previousState: State) => void
): void;
```

Registers a callback function which is called when the state changes, after the lifecycle methods. See ["Observer Pattern"](../advanced/observer-pattern.md) to learn more.

```js
const instance = new FrozenYogurt(rootElement);

instance.subscribe((stateChanges) => {
    // do something when the state changes ...
});
```

### `unsubscribe`

```ts
function unsubscribe(
    observer: (stateChanges: Partial<State>, previousState: State) => void
): void;
```

Deregisters a callback function that was previously subscribed to the instance. The observer callback must be a direct reference to the same function passed to `subscribe`. Use of this method is uncommon because all registered observers are automatically cleared when the component is destroyed.

```js
const instance = new FrozenYogurt(rootElement);

function observer() {}

instance.subscribe(observer);
instance.unsubscribe(observer);
```

### `update`

```ts
protected function update?(
    stateChanges: Partial<State>,
    previousState: State
): void;
```

A [lifecycle method](../fundamentals/component-lifecycle.md) that is called after every render. It should be used exclusively to perform miscellaneous tasks after a component updates. The arguments provided should be used to perform [conditional updates](../fundamentals/handling-updates.md). It should never be called directly.

```js
class FrozenYogurt extends Component {
    update() {
        // perform tasks after update ...
    }
}
```

### `validate`

```ts
protected function validate?(
    stateChanges: Partial<State>,
    previousState: State
): void;
```

A [lifecycle method](../fundamentals/component-lifecycle.md) that is called before every render. It should be used exclusively to perform validation tasks relative to the component and its state. The arguments provided should be used to perform [conditional updates](../fundamentals/handling-updates.md). It should never be called directly. See ["Component Validation"](../advanced/component-validation.md) to learn more.

```js
class FrozenYogurt extends Component {
    validate() {
        // perform validation before update ...
    }
}
```

## Class properties

:::info

Class properties should be defined with a [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) so that they are read-only and cannot be updated accidentally.

:::

### `defaultState`

-   type: `Record<string, any>`

Used to define default values for the state. Values are defaulted when their value is `undefined`, not `null`.

```js
class FrozenYogurt extends Component {
    static get defaultState() {
        return {
            flavor: 'vanilla',
        };
    }
}
```

For example, if `state.flavor` is not set, it will be `'vanilla'` by default:

```js
const instance = new FrozenYogurt(rootElement);
// instance.state.flavor will be "vanilla"
```

If `state.flavor` is set to `null`, it will be `null`:

```js
const instance = new FrozenYogurt(rootElement, { flavor: null });
// instance.state.flavor will be "null"
```

See ["Determining the Initial State"](../fundamentals/component-lifecycle.md#determining-the-initial-state) to learn more.

### `displayName`

-   type: `string`

A human-friendly name of the component used in debugging messages. Generally, this property does not need to be set explicitly because it is inferred from the name of the class.

```js
class FrozenYogurt extends Component {
    static get displayName() {
        return 'FrozenYogurt';
    }
}
```

### `stateTypes`

-   type: `Record<string, any>`

Used to perform for [typechecking](https://www.geeksforgeeks.org/type-checking-in-compiler-design/) on the state properties. See ["Typechecking State"](../advanced/typechecking-state.md) to learn more.

```js
import PropTypes from 'prop-types';

class FrozenYogurt extends Component {
    static get stateTypes() {
        return {
            flavor: PropTypes.string,
        };
    }
}
```
