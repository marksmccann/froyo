import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DOM Helpers

This page contains a detailed API reference for various DOM-related convenience helpers.

## Import

<Tabs>
<TabItem value="es6" label="ES6" default>

```js
import { createElement, setAttributes, setClasses } from 'froyojs';
```

</TabItem>
<TabItem value="commonjs" label="CommonJS">

```js
const { createElement, setAttributes, setClasses } = require('froyojs');
```

</TabItem>
<TabItem value="browser" label="Browser (CDN)">

```js
window.froyojs.createElement;
window.froyojs.setAttributes;
window.froyojs.setClasses;
```

</TabItem>
</Tabs>

## Reference

### `createElement`

```ts
function createElement(
    tag: keyof HTMLElementTagNameMap,
    attributes?: { [key: string]: string } | null,
    children?: string | Node
): Element;
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
function setAttributes(
    target: Element,
    attributes?: { [key: string]: string | null | undefined }
): void;
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

### `setClasses`

```ts
function setClasses(target: Element, classes: { [key: string]: boolean }): void;
```

Adds and/or removes CSS classes to/from an element's class list. Each key in the `classes` object is the class that should be added or removed. If the corresponding value is [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) it will be added, otherwise it will be removed.

```js
class MyComponent extends Component {
    render() {
        setClasses(this.rootElement, {
            foo: true, // adds "foo" class
            bar: false, // removes "bar" class
        });
    }
}
```
