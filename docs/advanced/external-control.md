# External Control

This guide outlines a technique for controlling a component externally.

## Enabling external control

In some use cases, it may be useful to give consumers the ability to manually control the state of a component externally. To accomplish this, define an optional state property that expects a function. As a matter of convention, this property should begin with "on". Then, call this function (when it exists) when the component state is supposed to change.

:::tip

Use the [observer pattern](./observer-pattern.md) instead of this option if you only need to respond to state changes.

:::

```js
defineComponent({
    state: {
        open: {
            type: Boolean,
            default: false,
        },
        onOpen: {
            type: Function,
            default: null,
        },
    },
    data: {
        handleOpen() {
            if (this.onOpen) {
                this.onOpen(true);
            } else {
                this.open = true;
            }
        },
    },
    events: {
        $root() {
            return {
                click: this.handleOpen,
            };
        },
    },
});
```

This will then allow the consumer to "take control" of the component by providing the `onOpen` state. They are now responsible for updating the state of the component; allowing them to perform tasks (e.g. asynchronous requests) before the state of the component is updated.

```js
const instance = new Modal('#root', {
    // take control of the "open" state
    onOpen: () => {
        // the "open" state changed. Do something,
        // like perform an asynchronous request ...

        // then, update the state
        instance.setState({ open: true });
    },
});
```

<br />

---

## Readonly state properties

By default, [state properties](../api/define-component.md#state) are public. This means that consumers can both read and set their value. However, there are times where a particular state property is only intended to be used internally. In these cases, the property can be set to `readonly`. This will allow consumers to read the value of the state, but they will be unable to set it. Any attempt to do so, via the [setState](../api/define-component.md#setstate) method, will result in the update being ignored and a warning being thrown (in non-production environments).

```js
defineComponent({
    state: {
        readonlyState: {
            readonly: true, // <-- consumers cannot set value
        },
    },
});
```

```js
const instance = new FrozenYogurt('#root');

instance.setState({ readonlyState: false }); // <-- will not work
```
