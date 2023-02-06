# Subcomponents

This guide explains how to add other components to an instance.

## Adding a Subcomponent

There are times a component needs to instantiate another component within itself. These nested components are are known as "subcomponents". To create one, initialize the subcomponent and assign it to [`this.components`](../api/component.md#components) from within [`setup`](../api/component.md#setup).

```js
// subcomponent
class Topping extends Component {
    render() {
        this.rootElement.innerHTML = 'Sprinkles';
    }
}

// parent component
class FrozenYogurt extends Component {
    setup() {
        this.components = {
            topping: new Topping(this.rootElement),
        };
    }
}
```

<br />

---

## Responding to Subcomponent Events

Use the ["External Control"](./external-control.md) technique to respond to events triggered by the subcomponent.

```js
this.components = {
    topping: new Topping(this.rootElement, {
        onChange: () => {
            // the subcomponent changed, do something ...
        },
    }),
};
```

<br />

---

## Updating the Subcomponent

If the subcomponent needs to be updated relative to the parent, use the [`update`](../api/component.md#update) method to update the child component via [`setState`](../api/component.md#setstate). See ["Handling Updates"](../fundamentals/handling-updates.md) to review best practices for filtering updates within a lifecycle method.

```js
update(stateChanges) {
    if ('topping' in stateChanges) {
        this.components.topping.setState({ topping: this.state.topping });
    }
}
```
