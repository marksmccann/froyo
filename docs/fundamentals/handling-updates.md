# Handling Updates

This guide explains how to use component state to conditionally handle updates.

:::info

While the examples below are using `render`, these principles are also applicable to [`validate`](../api/component.md#validate), [`update`](../api/component.md#update), as well as any [observers](../advanced/observer-pattern.md) created with `subscribe`.

:::

## Using Basic Operators

Use basic JavaScript operators like [if](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) and the [ternary operator](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to control what actions to perform relative to the state. In the following example, a different message is rendered relative to the value of `flavor`.

```js
render() {
    if (this.state.flavor === 'Vanilla') {
        this.rootElement.innerHTML = 'Good choice!';
    } else {
        this.rootElement.innerHTML = 'Are you sure? Vanilla is better.';
    }
}
```

<br />

---

## Working with Multiple States

When a component has multiple state properties, use the list of state changes (which is passed as the first argument) to filter updates. As a general rule, only the logic relevant to the state changes should run, the rest should be ignored. Failing to do this properly will lead to a less efficient component that is more difficult to debug.

```js
render(stateChanges) {
    if ('flavor' in stateChanges) {
        if (this.state.flavor === 'Vanilla') {
            this.rootElement.innerHTML = 'Good choice!';
        } else {
            this.rootElement.innerHTML = 'Are you sure? Vanilla is better.';
        }
    }

    if ('large' in stateChanges) {
        if (this.state.large) {
            this.rootElement.classList.add('large');
        } else {
            this.rootElement.classList.remove('large');
        }
    }
}
```

<br />

---

## Handling the First Render

Some tasks only need to be performed once, during initialization. To accomplish this, use the class property [`this.initialized`](../api/component.md#initialized). This property is `false` when the lifecycle methods are run for the first time, but is `true` for all subsequent updates.

```js
render(stateChanges) {
    if (!this.initialized) {
        /* first render only */
    }
}
```

The `initialized` property can also be used to skip the first render.

```js
render(stateChanges) {
    if (this.initialized) {
        /* skip the first render */
    }
}
```

<br />

---

## Using the Previous State

In less common scenarios, the data from the previous state may be required to accurately determine what actions to perform. If needed, the previous state is passed as the second argument.

```js
render(stateChanges, previousState) {
    if (this.state.flavor !== previousState.flavor) {
        /* do something ... */
    }
}
```
