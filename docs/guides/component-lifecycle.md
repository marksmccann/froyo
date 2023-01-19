# Component Lifecycle

Beginning and end of the lifecycle:

1. `initialize`
1. `destroy`

State updates that are called after `stateState`:

1. `validate`
1. `render`
1. `update`

:::info

The [strict equality operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) (e.g. `===`) is used to determine the equality of current and previous state values. This means that if the value is a object, changes will only be identified if the . The state only updates if changes are identified.

:::
