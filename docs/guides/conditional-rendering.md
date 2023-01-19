# Conditional Rendering

This guide explains how to implement conditional rendering in Froyo.

## Using Operators

Basic JavaScript operators like [if](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) or the [conditional operator](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) should be used to update the DOM relative to the current state. In the following example, a different message is rendered relative to value of the `flavor` state.

```js
render() {
    if (this.state.flavor === 'Vanilla') {
        this.rootElement.innerHTML = 'Good choice!';
    } else {
        this.rootElement.innerHTML = 'Are you sure? Vanilla is better.';
    }
}
```

## Working with Multiple States

It is common for components to have multiple state properties. In the example below, the component has two states: `flavor` and `large`. The former determines the message that is displayed and the latter adds or removes a class to control the size of the text.

```js
render() {
    if (this.state.flavor === 'Vanilla') {
        this.rootElement.innerHTML = 'Good choice!';
    } else {
        this.rootElement.innerHTML = 'Are you sure? Vanilla is better.';
    }

    if (this.state.large) {
        this.rootElement.classList.add('large');
    } else {
        this.rootElement.classList.remove('large');
    }
}
```

However, the example above runs the logic for both states every time the component renders, regardless of which one actually changed. That is not very efficient. Ideally, only the logic relative to the changed state should run. For this reason, the first argument in `render` is an object which contains the properties that have changed from the previous state. It should be used to isolate updates relative to the state changes.

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

## The Initial Render

There are times when you need to know if the component is being rendered for the first time. "initialized" on the [`metadata`](../api/component.md#metadata) class property exists for this reason. It is `false` when the component initially renders (during initialization), but is `true` for subsequent updates. It can be used to isolate or skip updates relative to the initial render.

```js
render(stateChanges) {
    if (!this.metadata.initialized) {
        /* do something for the first render only ...  */
    }
}
```

## The Previous State

In less common scenarios, the data from the previous state may be required to determine what to render. If needed, the previous state is passed as the second argument of the `render` method.

```js
render(stateChanges, previousState) {
    if (this.state.flavor !== previousState.flavor) {
        /* do something ...  */
    }
}
```
