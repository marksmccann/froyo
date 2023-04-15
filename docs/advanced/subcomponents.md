# Subcomponents

This guide explains how to add other components to an instance.

## Adding components

There are times a component needs to instantiate another component within itself. These nested components are are known as "subcomponents". Use the [components options](../api/define-component.md#components) to accomplish this.

```js
// subcomponent
const Topping = defineComponent({
    state: {
        type: {
            type: String,
            default: 'sprinkles',
        },
    },
    render: {
        $root() {
            return this.type;
        },
    },
});

// parent component
const FrozenYogurt = defineComponent({
    components: {
        topping() {
            return {
                constructor: Topping,
                root: this.$root,
            };
        },
    },
});
```

<br />

---

## Updating a subcomponent

Use the `state` property to define or control the state of the subcomponent. If state values from `this` are applied to the subcomponent state, the states will be bound. This means that when the state of the parent changes, the corresponding state of the subcomponent will also change.

```js
const FrozenYogurt = defineComponent({
    state: {
        topping: {
            type: String,
            default: 'Chocolate Syrup',
        },
    },
    components: {
        topping() {
            return {
                constructor: Topping,
                root: this.$root,
                state: {
                    type: this.topping, // <-- binds the states
                },
            };
        },
    },
});
```

<br />

---

## Subscribing to subcomponents

There are times it may be necessary to update the state of the parent component when the state of the child has changed. To accomplish this, add an entry to the subcomponent's `subscribe` option. Each key in this object must be the name of the state property to subscribe to, while the corresponding value is a function that is called when the value changes.

```js
const FrozenYogurt = defineComponent({
    state: {
        topping: {
            type: String,
            default: 'Chocolate Syrup',
        },
    },
    components: {
        topping() {
            return {
                constructor: Topping,
                root: this.$root,
                state: { type: this.topping },
                subscribe: {
                    type: (value) => {
                        this.topping = value; // <-- update the parent
                    },
                },
            };
        },
    },
});
```
