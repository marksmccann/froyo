# Observer Pattern

This guide introduces the concept of the [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) in Froyo.

## Creating an Observer

At its simplest, an observer is just a function. It is added to the instance via the [`subscribe`](../api/component.md#subscribe) method. Once subscribed, it will be called every time the component updates (after the [lifecycle methods](../fundamentals/component-lifecycle.md#the-lifecycle-methods)).

```js
const instance = new FrozenYogurt(rootElement);

instance.subscribe((stateChanges) => {
    /* the state changed, do something ... */
});
```

This "observer" can be used to perform any number of tasks relative to the component's state. Use the `stateChanges` passed as the first argument to filter updates. See ["Handling Updates"](../fundamentals/handling-updates.md#handling-updates) to learn more.

## Removing the Observer

An individual observer can be removed from the instance via the [`unsubscribe`](../api/component.md#unsubscribe) method. The function passed to `unsubscribe` must be a direct reference to the same function passed to `subscribe`. This method is rarely necessary because all observers are automatically removed when the component is destroyed.

```js
function myObserver() {}

instance.subscribe(myObserver);
instance.unsubscribe(myObserver);
```
