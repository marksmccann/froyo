# Typechecking State

This guide explains how to setup typechecking for a component's state in Froyo.

## What is Typechecking?

[Type checking](https://www.geeksforgeeks.org/type-checking-in-compiler-design/) is the process of verifying and enforcing constraints of types in values. It can be very helpful for catching bugs during the development process. If you have done [typechecking in React](https://reactjs.org/docs/typechecking-with-proptypes.html#gatsby-focus-wrapper), this is likely a familiar concept. In fact, Froyo leverages the same `prop-types` library as React.

## `stateTypes`

When the `stateTypes` property is applied to a class definition, it will automatically type-check the component state in non-production environments.

View the [prop-types](https://github.com/facebook/prop-types) documentation for a full list of available validators.

:::info

The property is defined with a [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) so that it is read-only and cannot be updated accidentally.

:::

```js
import PropTypes from 'prop-types';

class FrozenYogurt extends Component {
    static get stateTypes() {
        return {
            flavor: PropTypes.string,
        };
    }
}
```
