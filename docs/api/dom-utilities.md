import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DOM Utilities

This page contains a detailed API reference for various DOM-related convenience utilities.

## Import

<Tabs>
<TabItem value="es6" label="ES6" default>

```js
import { createElement, setAttributes, querySelectorAll } from 'froyojs';
```

</TabItem>
<TabItem value="commonjs" label="CommonJS">

```js
const { createElement, setAttributes, querySelectorAll } = require('froyojs');
```

</TabItem>
<TabItem value="browser" label="Browser (CDN)">

```js
window.froyojs.createElement;
window.froyojs.setAttributes;
window.froyojs.querySelectorAll;
```

</TabItem>
</Tabs>

## Reference

### `createElement`

```ts
createElement(tag: string, attributes: object, children: string)
createElement(tag: string, attributes: object, children: DOMNode)
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
setAttributes(attributesList: object)
```

Sets multiple attributes on an element simultaneously. If a value is `null`, the corresponding attribute will be removed.

```js
class MyComponent extends Component {
    render() {
        setAttributes(this.elements.someElement, {
            class: 'foo',
            id: 'bar',
            'aria-hidden': null, // removes attribute
        });
    }
}
```

### `querySelectorAll`

```ts
querySelectorAll(element: HTMLElement, query: string)
```

Retrieves an array of DOM elements matching a given query string.

```js
class MyComponent extends Component {
    setup() {
        this.elements = {
            someElements: querySelectorAll(this.rootElement, '.foo-bar'),
        };
    }
}
```
