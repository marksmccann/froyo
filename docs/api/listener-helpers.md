import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Listener Helpers

This page contains a detailed API reference for various convenience helpers related to listeners.

## Import

<Tabs>
<TabItem value="es6" label="ES6" default>

```js
import {
    addEventListener,
    createMediaQueryListener,
    createMutationObserver,
} from 'froyojs';
```

</TabItem>
<TabItem value="commonjs" label="CommonJS">

```js
const {
    addEventListener,
    createMediaQueryListener,
    createMutationObserver,
} = require('froyojs');
```

</TabItem>
<TabItem value="browser" label="Browser (CDN)">

```js
window.froyojs.addEventListener;
window.froyojs.createMediaQueryListener;
window.froyojs.createMutationObserver;
```

</TabItem>
</Tabs>

## Reference

### `addEventListener`

```ts
function addEventListener(
    target: HTMLElement,
    type: string,
    callback: function(event): void,
    useCapture?: boolean | object,
): {
    destroy: function(): void,
}
```

Adds an event listener to the specified target element via [EventTarget.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). It returns an object with a `destroy` function that removes the listener when called.

```js
class MyComponent extends Component {
    setup() {
        this.listeners = {
            click: addEventListener(element, 'click', () => {}),
        };
    }
}
```

### `createMediaQueryListener`

```ts
function createMediaQueryListener(
    query: mediaQueryString,
    callback: fn,
): {
    media: MediaQueryList,
    destroy: function(): void,
}
```

Creates a `MediaQueryList` for a given media query via [Window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) and adds a change event listener. It returns an object with a reference to the `media` query list instance and a `destroy` function that removes the listener when called.

:::caution

`Window.matchMedia` is not supported by JSDOM and will need to be [mocked manually](https://jestjs.io/docs/26.x/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom) to work within the test environment.

:::

```js
class MyComponent extends Component {
    setup() {
        this.listeners = {
            mediaChanged: createMediaQueryListener(
                '(min-width: 500px)',
                () => {}
            ),
        };
    }
}
```

### `createMutationObserver`

```ts
function createMutationObserver(
    target: HTMLElement,
    callback: fn,
    options?: object,
): {
    observer: MutationObserver,
    destroy: function(): void
}
```

Creates a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) for the specified target element and begins observing it. `options` is passed to the [observe](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe) method. It returns an object with a reference to the `observer` instance and a `destroy` function that disconnects the observer when called.

```js
class MyComponent extends Component {
    setup() {
        this.listeners = {
            attributeChange: createMutationObserver(element, () => {}, {
                attributes: true,
            }),
        };
    }
}
```
