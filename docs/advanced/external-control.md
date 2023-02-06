# External Control

This guide explores a technique for controlling a component externally.

## Introduction

By default, Froyo components update their own state internally, as they respond to events. However, there are times it may be necessary to hijack this behavior so it can be controlled manually. For example, you may want to perform an asynchronous request before opening a modal.

<br />

---

## Enabling External Control

To enable external control, define an optional state property that expects a function. As a matter of convention, this property should begin with "on". By wrapping `this.setState` in a condition, you can then favor the function over `this.setState` when it exists.

```js
class Modal extends Component {
    handleOpenClick() {
        if (this.props.onOpen) {
            this.props.onOpen(true);
        } else {
            this.setState({ open: true });
        }
    }
}
```

<br />

---

## Taking External Control

To take control of a component, provide the designated function to the state. After doing so, it becomes your responsibility to update the state so it remains functional.

:::info

If you just need to monitor and respond to state changes, the ["Observer Pattern"](./observer-pattern.md) is a better solution.

:::

```js
const instance = new Modal(rootElement, {
    onOpen: (open) => {
        // do something before updating the state ...
        instance.setState({ open });
    },
});
```

<br />

---

## Private State Properties

In Froyo, the concept of private state does not exist. Every property in state can be read or changed externally. If a particular state property exists for internal component management, and should not be updated externally, make sure to communicate that to the consumer in the API documentation.

```js
instance.state.someInternalState; // available externally
```
