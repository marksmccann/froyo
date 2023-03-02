import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DOM Management

This guide explains how to manage references to, and the manipulation of, the DOM.

## Selecting Elements

Use conventional JavaScript DOM selectors like [`Element.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector) and [`Element.querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll) to retrieve elements from the DOM. Assign the results of these selectors to [`this.elements`](../api/component.md#elements) from within the `setup` method so they can be referenced from elsewhere in the class.

:::tip

If needed, use [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) to convert lists (e.g. `NodeList` and `HTMLCollection`) into traditional arrays.

:::

:::tip

Consider using the [`:scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/:scope) pseudo class with query selectors for more precise element selection (e.g. `querySelector(':scope > .first-child')`. This is useful when a selector could potentially grab elements belonging to other components nested deeper within the markup structure.

:::

<Tabs>
<TabItem value="js" label="JavaScript" default>

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

</TabItem>
<TabItem value="ts" label="TypeScript" default>

```ts
import { Component } from 'froyojs';

type Elements = {
    someElement: Element | null;
    someElements: NodeList;
};

class FrozenYogurt extends Component<{}, Elements> {
    protected setup(): void {
        this.elements = {
            someElement: this.rootElement.querySelector('<some selector>'),
            someElements: this.rootElement.querySelectorAll('<some selector>'),
        };
    }
}
```

</TabItem>
</Tabs>

Properties on this object cannot be set directly. Any attempt to do so will be ignored. Instead, the entire object must be assigned directly to the property.

```js
// this will not work
this.elements.someElement = null;
```

<br />

---

## Creating Elements

Use the convenience function [`createElement`](../api/dom-helpers.md#createelement) to generate new DOM elements.

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

Use the convenience function [`setAttributes`](../api/dom-helpers.md#setattributes) to add, change, or remove attributes from an element.

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

<br />

---

## Changing Classes

Use the convenience function [`setClasses`](../api/dom-helpers.md#setclasses) to add or remove CSS classes from an element.

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
