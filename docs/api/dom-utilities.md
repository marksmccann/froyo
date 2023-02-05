import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DOM Utilities

This page contains a detailed API reference for various DOM-related convenience utilities.

## Import

<Tabs>
<TabItem value="es6" label="ES6" default>

```js
import {
    createElement,
    setAttributes,
    querySelector,
    querySelectorAll,
} from 'froyojs';
```

</TabItem>
<TabItem value="commonjs" label="CommonJS">

```js
const {
    createElement,
    setAttributes,
    querySelector,
    querySelectorAll,
} = require('froyojs');
```

</TabItem>
<TabItem value="browser" label="Browser (CDN)">

```js
window.froyojs.createElement;
window.froyojs.setAttributes;
window.froyojs.querySelector;
window.froyojs.querySelectorAll;
```

</TabItem>
</Tabs>

## Reference

### `createElement`

```ts
function createElement(
    tag: string,
    attributes?: object,
    children?: string
): HTMLElement;
function createElement(
    tag: string,
    attributes?: object,
    children?: DOMNode
): HTMLElement;
```

Creates a new DOM element, optionally with attributes and children.

```js
class MyComponent extends Component {
    setup() {
        this.elements = {
            someElement: createElement('div', { class: 'foo' }, 'bar'),
            // <div class="foo">bar</div>
        };
    }
}
```

### `setAttributes`

```ts
function setAttributes(attributesList: object): void;
```

Sets multiple attributes on an element simultaneously. If a value is `null`, the corresponding attribute will be removed. If it is `undefined` it will be ignored and the attribute will not be updated.

```js
class MyComponent extends Component {
    render() {
        setAttributes(this.rootElement, {
            class: 'foo',
            id: 'bar',
            'aria-hidden': null, // removes attribute
            'data-foo': undefined, // ignored
        });
    }
}
```

### `querySelector`

```ts
function querySelector(
    element: HTMLElement,
    query: string,
    options?: object
): HTMLElement | null;
```

Retrieves the first element that matches a given query string and the criteria provided to `options`.

:::info

By default, children more than three levels deep are excluded. Depending on the initial HTML of the component, this setting may need to be adjusted to avoid grabbing matching elements belonging to other components. Set the value relative to the expected depth of the target element(s).

:::

```js
class MyComponent extends Component {
    setup() {
        this.elements = {
            someElement: querySelector(this.rootElement, '.foo'),
        };
    }
}
```

#### Options

| Name    | Type     | Default | Description                                                                                   |
| ------- | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `depth` | `number` | `2`     | The number of child levels deep to find matches. Levels begin at `0`. Set to `-1` to disable. |

### `querySelectorAll`

```ts
function querySelectorAll(
    element: HTMLElement,
    query: string,
    options?: object
): HTMLElement[];
```

Retrieves an array of DOM elements matching a given query string and the criteria provided to `options`.

:::info

By default, children more than three levels deep are excluded. Depending on the initial HTML of the component, this setting may need to be adjusted to avoid grabbing matching elements belonging to other components. Set the value relative to the expected depth of the target element(s).

:::

```js
class MyComponent extends Component {
    setup() {
        this.elements = {
            someElements: querySelectorAll(this.rootElement, '.foo'),
        };
    }
}
```

#### Options

| Name    | Type     | Default | Description                                                                                   |
| ------- | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `depth` | `number` | `2`     | The number of child levels deep to find matches. Levels begin at `0`. Set to `-1` to disable. |
