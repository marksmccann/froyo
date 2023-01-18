import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Component

This page contains a detailed API reference for the `Component` class definition.

## Import

<Tabs>
<TabItem value="es6" label="ES6" default>

```js
import Component from 'froyojs';
```

</TabItem>
<TabItem value="commonjs" label="CommonJS">

```js
const Component = require('froyojs');
```

</TabItem>
<TabItem value="browser" label="Browser (CDN)">

```js
window.froyojs.Component;
```

</TabItem>
</Tabs>

## Constructor

### `Component`

```ts
new Component(rootElement: HTMLElement, initialState: object)
```

`Component` is the base class for Froyo components.

When defining a `Component` subclass, the [`render`](#render) method is the only required method:

```js
class IceCream extends Component {
    render() {
        this.rootElement.innerHTML = `"${this.state.flavor}" is the best ice cream.`;
    }
}
```

When instantiated, the first argument of the constructor is required and must be an HTML element. The second argument is optional and is responsible for setting the initial state of the component.

```js
const rootElement = document.createElement('div');
const instance = new IceCream(rootElement, { flavor: 'Vanilla' });
// will produce: '<div>"Vanilla" is the best ice cream</div>'
```

## Instance properties

### `components`

-   type: `object`

A user-defined object for storing references to component instances. Instances assigned to this property are automatically destroyed when the parent instance is destroyed.

```js
class Topping extends Component {
    ...
}

class IceCream extends Component {
    initialize() {
        this.components = {
            topping: new Topping(...),
        };
    }
}
```

### `elements`

-   type: `object`

A user-defined object for storing references to DOM elements.

:::tip

Review our [DOM utilities](dom-utilities) to see how they can help you apply elements to this property.

:::

```js
class IceCream extends Component {
    initialize() {
        this.elements = {
            toppings: this.rootElement.querySelectorAll('.topping'),
        };
    }
}
```

### `listeners`

-   type: `object`

A user-defined object for storing data related to listeners (e.g. [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), [mutation observers](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), [media query lists](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia), etc.). Each item in the object must be another object with at least, a "destroy" key that is responsible for removing the listener. The `destroy` functions are called automatically when the component is destroyed.

:::tip

Review our [listener utilities](listener-utilities) to see how they can help you apply listeners to this property.

:::

```js
class IceCream extends Component {
    initialize() {
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

### `metadata`

-   type: `object`

An object which contains read-only information about the instance.

```js
const instance = new IceCream(...);
// instance.metadata.id will be something like "NSLZypdy"
```

#### Properties

| Name          | Type      | Description                                                       |
| :------------ | :-------- | :---------------------------------------------------------------- |
| `id`          | `string`  | A unique string randomly generated for every instance.            |
| `initialized` | `boolean` | A boolean which indicates the initialized status of the instance. |

### `rootElement`

-   type: `HTMLElement`

A read-only reference to the `HTMLElement` that was used to initialize the component.

```js
const div = document.createElement('div');
const instance = new IceCream(div);
// instance.rootElement will equal "div"
```

### `state`

-   type: `object`

A user-defined object to store data about the instance. This data is used to conditionally control the output and behavior of the component.

```js
const instance = new IceCream(rootElement, { flavor: 'Vanilla' });
// instance.state will be "{ flavor: 'Vanilla' }"
```

Never mutate `this.state` directly outside of the `initialize` method. Instead, use `setState`.

See State and Lifecycle for more information about the state.

## Instance methods

### `destroy`

```ts
destroy();
```

A lifecycle method responsible for performing cleanup tasks. If included, make sure to call `super.destroy` so that the parent class is properly destroyed.

```js
class IceCream extends Component {
    destroy() {
        // perform cleanup tasks ...

        super.destroy();
    }
}
```

### `initialize`

```ts
initialize();
```

A lifecycle method that is called once during initialization before other lifecycle methods (e.g. `render`). It should be used to perform setup tasks including: creating event listeners, storing DOM references, and setting the initial state. It should never be called directly.

```js
class IceCream extends Component {
    initialize() {
        // perform setup tasks ...
    }
}
```

### `setState`

```ts
setState(newState: object)
```

Updates the component state and calls all registered observers including the lifecycle methods (e.g. `render`, `update`, `validate`). Only the properties that are changing need to be included in `newState`.

```js
const instance = new IceCream(rootElement, { flavor: 'Vanilla' });
// <div>"Vanilla" is the best ice cream</div>

instance.setState({ flavor: 'Chocolate' });
// <div>"Chocolate" is the best ice cream</div>
```

### `subscribe`

```ts
subscribe(observer: function(stateChanges: object, previousState: object, instance: object))
```

Registers a callback function which is called when the state changes, after the lifecycle methods.

```js
const instance = new IceCream(rootElement);

instance.subscribe((stateChanges) => {
    // do something when the state changes ...
});
```

### `unsubscribe`

```ts
unsubscribe(observer: function)
```

Un-registers a callback function that was previously subscribed to the instance. The observer callback must be a direct reference to the same function passed to `subscribe`. Use of this method is uncommon because all registered observers are automatically cleared when the component is destroyed.

```js
const instance = new IceCream(rootElement);

function observer() {}

instance.subscribe(observer);
instance.unsubscribe(observer);
```

### `render`

```ts
render(stateChanges: object, previousState: object, instance: object)
```

A lifecycle method that is called when the state updates. It should be used exclusively to update the DOM. The arguments provided should be used to perform conditional updates. It should never be called directly.

```js
class IceCream extends Component {
    render() {
        // update the DOM ...
    }
}
```

### `update`

```ts
update(stateChanges: object, previousState: object, instance: object)
```

The `update` method is lifecycle method that is called after every render. It should be used exclusively to perform miscellaneous tasks after a component update including subsequent state updates. It should never be called directly.

```js
class IceCream extends Component {
    update() {
        // perform tasks after update ...
    }
}
```

### `validate`

```ts
validate(stateChanges: object, previousState: object, instance: object)
```

The `update` method is lifecycle method that is called before every render. It should be used exclusively to perform validation tasks relative to the component and its state. It should never be called directly.

```js
class IceCream extends Component {
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

-   type: `object`

Used to define default values for the state. Values are defaulted when their value is `undefined`, not `null`.

```js
class IceCream extends Component {
    static get defaultState() {
        return {
            flavor: 'vanilla',
        };
    }
}
```

For example, if `state.flavor` is not set, it will be `'vanilla'` by default:

```js
const instance = new IceCream(rootElement);
// instance.state.flavor will be "vanilla"
```

If `state.flavor` is set to `null`, it will be `null`:

```js
const instance = new IceCream(rootElement, { flavor: null });
// instance.state.flavor will be "null"
```

### `displayName`

-   type: `string`

A human-friendly name of the component used in debugging messages. Generally, this property does not need to be set explicitly because it is inferred from the name of the class.

```js
class IceCream extends Component {
    static get displayName() {
        return 'IceCream';
    }
}
```

### `stateTypes`

-   type: `object`

Used to perform for [typechecking](https://www.geeksforgeeks.org/type-checking-in-compiler-design/) on the state properties. Typechecking can be very helpful for catching bugs during the development process. If you have done [typechecking in React](https://reactjs.org/docs/typechecking-with-proptypes.html#gatsby-focus-wrapper), this is likely a familiar concept. In fact, Froyo leverages the same [prop-types](https://github.com/facebook/prop-types) library as React.

```js
import PropTypes from 'prop-types';

class IceCream extends Component {
    static get stateTypes() {
        return {
            flavor: PropTypes.string,
        };
    }
}
```
