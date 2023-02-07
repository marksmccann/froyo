# DOM Management

This guide explains how to manage references to, and the manipulation of, the DOM.

## Selecting Elements

Use conventional JavaScript DOM selectors like [`Element.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector) and [`Element.querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll) to retrieve elements from the DOM. Assign the results of these selectors to [`this.elements`](../api/component.md#elements) from within the `setup` method so they can be referenced from elsewhere in the class.

:::tip

Use [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) to convert the results of `Element.querySelectorAll` into a traditional array. Also, use the [`:scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/:scope) pseudo class for more precise element selection (e.g. `querySelector(':scope > .first-child')`.

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
