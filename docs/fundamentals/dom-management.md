# DOM Management

This guide explains how to manage references to, and the manipulation of, the DOM.

## Selecting Elements

Use conventional JavaScript DOM selectors like [`Element.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector) and [`Element.querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll) to retrieve elements from the DOM. Assign the results of these selectors to [`this.elements`](../api/component.md#elements) from within the `setup` method so they can be referenced from elsewhere in the class.

Only valid instances of DOM nodes and lists (e.g. `Element`, `NodeList`, `TextNode`, `HTMLCollection`, etc.) or `null` can be applied to this property. If any other value is assigned, it will be ignored and an error will log to the console. Node lists like `NodeList` and `HTMLCollection` are automatically converted to a traditional `Array`.

:::tip

Use the [`:scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/:scope) pseudo class for more precise element selection (e.g. `querySelector(':scope > .first-child')`. This is useful when a selector could potentially grab elements belonging to other components nested deeper within the markup structure.

:::

```js
import { Component } from 'froyojs';

class FrozenYogurt extends Component {
    setup() {
        this.elements = {
            someElement: this.rootElement.querySelector('<some selector>'),
            someElements: this.rootElement.querySelectorAll('<some selector>'),
        };
    }
}
```

Properties on this object cannot be set directly. Any attempt to do so will be ignored.

```js
// this will not work
this.elements.someElement = null;
```

Instead, a new object must be assigned directly to the property in order to add or change its values. All valid entries on this object are then assigned to the property, while the remainder are ignored. Removing a property or setting it to `undefined` is not supported.

```js
// sets this.elements.someElement to "null"
this.elements = { someElement: null };
```

<br />

---

## Creating Elements

For convenience, use the utility function [`createElement`](../api/dom-utilities.md#createelement) to generate elements with attributes and content. Assign these elements to [`this.elements`](../api/component.md#elements) from within the `setup` method so they can be referenced from elsewhere in the class.

```js
import { Component, createElement } from 'froyojs';

class FrozenYogurt extends Component {
    setup() {
        this.elements = {
            someElement: createElement(
                'div',
                { class: '<some class>' },
                '<some content>'
            ),
        };
    }
}
```

<br />

---

## Setting Attributes

For convenience, use the utility function [`setAttributes`](../api/dom-utilities.md#setattributes) to add, change, or remove attributes from an element at once.

```js
import { Component, setAttributes } from 'froyojs';

class FrozenYogurt extends Component {
    render() {
        setAttributes(this.rootElement, {
            id: '<some-id>',
            role: undefined, // "undefined" is ignored
            'aria-hidden': null, // "null" removes attribute
        });
    }
}
```
