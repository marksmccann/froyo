# Typechecking State

This guide explains how to add runtime [type-checking](https://www.geeksforgeeks.org/type-checking-in-compiler-design/) for a component's state.

## Adding type checks

Add a type check to a [state option](../api/define-component.md#state) by including the `type` property. It's value must be one of the constructors listed below. Once added, the component will throw a warning in non-production environments if the value does not match that type (aside from `null` or `undefined`).

The type can be any of the following constructors:

-   String
-   Number
-   Boolean
-   Array
-   Object
-   Date
-   Function
-   A custom class or constructor function

```js
defineComponent({
    state: {
        flavor: {
            type: String, // value must be a `string`
        },
    },
});
```

<br />

---

## Requiring state values

If that value must be provided by the consumer, add the `required` property. When `true`, the component will throw a warning in non-production environments if `undefined`. Alternatively, consider setting a `default` value to ensure the property always has an explicitly defined value.

```js
defineComponent({
    props: {
        requiredState: {
            type: Boolean,
            required: true, // <-- the value cannot be `undefined`
        },
        defaultedState: {
            type: Number,
            default: 100, // <-- the value will be this, if `undefined`
        },
    },
});
```
