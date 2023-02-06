# Observer Pattern

This guide introduces the concept of the observer pattern.

## Introduction

The [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) is a software design pattern in which an object maintains a list of dependents, called observers, and notifies them automatically of any state changes.

In Froyo, an observer is a callback function that is [subscribed to the instance](#subscribing-to-instance). When the state of the component changes, this function will be called in the order it was subscribed (after the [lifecycle methods](../fundamentals/component-lifecycle.md#the-lifecycle-methods)). This observer can be used to perform any number of actions. The arguments provided to the observer can be used to filter the actions. See ["Handling Updates"](../fundamentals/handling-updates.md) to learn more.

<br />

---

## Subscribing to Instance

To subscribe an observer to the instance, create a callback function and pass it to the [`subscribe`](../api/component.md#subscribe) method.

```js
const instance = new FrozenYogurt(rootElement);

instance.subscribe(() => {
    /* the state changed, do something ... */
});
```

<br />

---

## Removing the Observer

An individual observer can be removed from the instance via the [`unsubscribe`](../api/component.md#unsubscribe) method. The function passed to `unsubscribe` must be a direct reference to the same function passed to `subscribe`. This method is rarely necessary because all observers are automatically removed when the component is destroyed.

```js
function myObserver() {}

instance.subscribe(myObserver);
instance.unsubscribe(myObserver);
```
