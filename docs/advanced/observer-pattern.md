# Observer Pattern

This guide introduces the concept of the [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern).

## Subscribing to instance

It is possible for external processes to respond to internal state changes of a component instance. This is done by subscribing to a specific state property via the [`subscribe`](../api/define-component.md#subscribe) method. This method takes the name of the state property to be monitored along with a callback function (known as an observer). When the state value changes, this function will be called with the current and previous value of the property.

```js
const instance = new FrozenYogurt(rootElement);

instance.subscribe('<some-state>', (value, previousValue) => {
    /* The value changed, do something ... */
});
```

<br />

---

## Removing an observer

An individual observer can be removed from the instance via the [`unsubscribe`](../api/define-component.md#unsubscribe) method. To successfully work, the provided function must be the same as the one passed to `subscribe`. When the component instance is [destroyed](../api/define-component.md#destroy), all observers are removed automatically.

```js
function myObserver() {}

instance.subscribe('<some-state>', myObserver);
instance.unsubscribe('<some-state>', myObserver);
```
