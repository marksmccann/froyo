import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DOM Utilities

This page contains a detailed API reference for various DOM-related convenience utilities.

## Import

<Tabs>
<TabItem value="es6" label="ES6" default>

```js
import { createElement, setAttributes } from 'froyojs';
```

</TabItem>
<TabItem value="commonjs" label="CommonJS">

```js
const { createElement, setAttributes } = require('froyojs');
```

</TabItem>
<TabItem value="browser" label="Browser (CDN)">

```js
window.froyojs.createElement;
window.froyojs.setAttributes;
```

</TabItem>
</Tabs>

## Reference

### `createElement`

```ts
function createElement(
    tag: string,
    attributes?: object,
    children?: string | DOMNode
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
