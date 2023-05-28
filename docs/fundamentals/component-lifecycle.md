import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Component Lifecycle

This guide introduces the concept of state and the component lifecycle.

## Declaring state

The first step to making any component dynamic is to declare a state. Each property declared in `state` is reactive; when changed, the component will update and reflect the new value. To declare state, add entries to the [state option](../api/define-component.md#state). Each key represents the name of the property and the value must be a configuration object.

Once a state property has been declared, it will be accessible throughout the component options via `this.$state`. Additionally, an entry for it can be added to the [hooks option](../api/define-component.md#hooks).

<Tabs>
<TabItem value="js" label="JavaScript" default>

```js
defineComponent({
    state: {
        stateName: {
            type: String, // specifies expected type for runtime type checking
            default: '...', // specifies a default value
            required: true, // defines if the property is required
            readonly: true, // defines if the property is readonly
        },
    },
});
```

</TabItem>
<TabItem value="ts" label="TypeScript" default>

```ts
defineComponent<{
    $root: Element;
    $state: {
        stateName: string; // specifies type
    };
}>({
    state: {
        stateName: {
            type: String, // specifies expected type for runtime type checking
            default: '...', // specifies a default value
            required: true, // defines if the property is required
            readonly: true, // defines if the property is readonly
        },
    },
});
```

</TabItem>
</Tabs>

<br />

---

## Lifecycle hooks

The lifecycle hooks are reserved properties that belong to the [hooks option](../api/define-component.md#hooks). As the name implies, these functions hook into the component lifecycle and are called at a specific time during that lifecycle.

Each of these methods have a designated role and can be used to perform various tasks:

-   **`$setup`**: Called once when the component initializes. Useful for setup tasks, like constructing the initial markup, setting the initial state, and/or adding custom listeners.
-   **`$teardown`**: Called once when the component is destroyed. Useful for cleanup tasks, like deconstructing the markup, reverting the state, and/or removing custom listeners.

```js
defineComponent({
    hooks: {
        $setup() {
            // setup tasks ...
        },
        $teardown() {
            // teardown tasks ...
        },
    },
});
```

<br />

---

## State hooks

Once state properties have been declared in `state`, an entry for them can be added to the [hooks option](../api/define-component.md#hooks). The entry must have the exact same name as the state property and must be a function. As the name implies, these functions hook into the component state and will be called whenever the value of that state changes. The current and previous value are passed as the first and second argument respectively.

```js
defineComponent({
    state: {
        flavor: {
            default: 'Vanilla',
        },
    },
    hooks: {
        flavor(value) {
            if (value === 'Vanilla') {
                // "flavor" is "Vanilla", do something ...
            } else {
                // "flavor" is not "Vanilla", do something else ...
            }
        },
    },
});
```

<br />

---

## Setting the state

Setting any state property will trigger an update of the component and all relevant methods and hooks will be called to reflect the new value. While this behavior is universal, the method for setting the state varies between the **component definition** and the **component instance**.

:::info

The [strict equality operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) (e.g. `===`) is used to determine changed values. This means that objects and arrays must be replaced in order for their changes to be recognized.

:::

To set the state internally, via the **component definition**, apply new values directly to individual properties on `this.$state` from within the `events` and/or `hooks` options.

```js
const FrozenYogurt = defineComponent({
    state: {
        flavor: {
            default: 'Vanilla',
        },
    },
    nodes: {
        button: {
            type: 'element',
            tagName: 'button',
        },
    },
    events: {
        button() {
            return {
                click: () => {
                    this.$state.flavor = 'Chocolate'; // <-- sets the "flavor" state
                },
            };
        },
    },
});
```

To set the state externally, via the **component instance**, use the [setState](../api/define-component.md#setstate) class method.

```js
const instance = new FrozenYogurt('#root');

instance.setState({ flavor: 'Chocolate' }); // <-- sets the "flavor" state
```

<br />

---

## Determining the initial state

When a component is initialized, the initial state is collected from multiple sources, merged, and applied to [`this`](../api/define-component.md#this). In reverse order of priority, the data is collected from the following three sources:

1\. The [`default`](../api/define-component.md#state) value from the class definition.

```js
defineComponent({
    state: {
        flavor: {
            default: 'Vanilla',
        },
    },
});
```

2\. The `data-state` HTML attribute on the root element. See ["HTML-only Usage"](./html-only-usage.md) to learn more about this feature.

```html
<div data-state='{"flavor": "vanilla"}'></div>
```

3\. The state object passed to the second argument of the constructor.

```js
new FrozenYogurt('#root', { flavor: 'Vanilla' });
```

<br />

---

## Setting the initial state

If needed, state can by set directly within the [`$setup`](../api/define-component.md#hooks) hook. This is uncommon, but it can be useful for setting dynamic state properties. Setting the state from `$setup` will not trigger a component update and hooks will not be called. However, component instances declared in the [components option](../api/define-component.md#components) will be updated. Keep in mind that setting the state this way will replace the value of any previously determined state and it will ultimately determine the initial state of the component.

```js
defineComponent({
    state: {
        large: {
            default: false,
        },
    },
    hooks: {
        setup() {
            this.$state.large = window.innerWidth > 500,
        },
    },
});
```
