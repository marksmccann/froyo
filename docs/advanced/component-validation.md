# Component Validation

This guide explains the concept of component validation.

## Introduction

Component validation is the process of making sure the component is working properly throughout its lifecycle. When issues are identified, consumers should be informed via thrown errors or console messaging. While optional, this validation creates a better experience during the development process. There are various aspects of a component that can be validated. However, the most common are the [initial HTML](#validating-the-initial-html) and [state](#validating-state).

<br />

---

## Adding Validation

To add validation to a component, include the [`validate`](../api/component.md#validate) lifecycle method on the class definition. Use the arguments provided to this callback to filter the validators. See ["Handling Updates"](../fundamentals/handling-updates.md) to learn more.

```js
class FrozenYogurt extends Component {
    validate() {
        /* validate something ... */
    }
}
```

<br />

---

## Validating the Initial HTML

Consumers are responsible for writing the initial HTML for components. Failing to include a required element or misspelling a key attribute is an easy mistake to make. Unfortunately, this small mistake can break the component or create an error that is difficult to debug. To avoid this, consider adding validation to check the markup during initialization. If something is wrong, let the consumer know.

```js
validate() {
    if (!this.state.initialized) {
        if (!this.rootElement.contains('input')) {
            throw new Error('The component is missing an <input> element');
        }
    }
}
```

<br />

---

## Validating State

In addition to [type-checking](../advanced/typechecking-state.md), it can be valuable to validate that the component state is being set correctly. For example, you could check if two mutually exclusive state properties are set at the same time.

```js
validate(stateChanges) {
    if ('flavor' in stateChanges || 'topping' in stateChanges) {
        if (this.state.flavor && this.state.topping) {
            console.error('"flavor" and "topping" cannot be set at the same time');
        }
    }
}
```
