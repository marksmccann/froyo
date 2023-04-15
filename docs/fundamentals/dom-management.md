import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# DOM Management

This guide explains how to manage references to, and the manipulation of, the DOM.

## Creating nodes

The [nodes option](../api/define-component.md#nodes) can be used to create new DOM nodes. To create HTML elements, SVG elements, or text nodes use the "element", "svg", and "text" node types respectively.

Once a node has been declared, it will be accessible throughout the component options via the `this` keyword. Additionally, an entry for it can be added to the [render](../api/define-component.md#render) and/or [events](../api/define-component.md#events) options.

<Tabs>
<TabItem value="js" label="JavaScript" default>

```js
defineComponent({
    nodes: {
        textNode: {
            type: 'text',
            value: '',
        },
        svgElement: {
            type: 'svg',
            tagName: 'path',
        },
        htmlElement: {
            type: 'element',
            tagName: 'div',
        },
    },
});
```

</TabItem>
<TabItem value="ts" label="TypeScript" default>

```ts
defineComponent<{
    nodes: {
        textNode: Text;
        svgElement: SVGPathElement;
        htmlElement: HTMLDivElement;
    };
}>({
    nodes: {
        someTextNode: {
            type: 'text',
            value: '',
        },
        someSVGElement: {
            type: 'svg',
            tagName: 'path',
        },
        someHTMLElement: {
            type: 'element',
            tagName: 'div',
        },
    },
});
```

</TabItem>
</Tabs>

<br />

---

## Selecting elements

The [nodes option](../api/define-component.md#nodes) can also be used retrieve elements that already exist in the DOM. The `query` and `query-all` types will select elements that match a given CSS selector. The `query` type will retrieve the first matching element while the `query-all` type will retrieve every matching element.

If no matching element is found, a warning will be thrown. However, this feature can be disabled by making the node "optional".

By default, the query is scoped to the root element. This means that only elements that are direct descendants of the root element will be selected. When needed, this scope can be customized to a different element.

Once a node has been declared, it will be accessible throughout the component options via the `this` keyword. Additionally, an entry for it can be added to the [render](../api/define-component.md#render) and/or [events](../api/define-component.md#events) options.

:::tip

Make the CSS selectors as specific as possible. This will help ensure the selected element was implemented correctly. For example, include the tag name to ensure the element type is correct (e.g. `button.trigger`) or use the [:scope](https://developer.mozilla.org/en-US/docs/Web/CSS/:scope) pseudo class to ensure the element was placed in the correct position relative to the scope (e.g. `:scope > .first-child`).

:::

<Tabs>
<TabItem value="js" label="JavaScript" default>

```js
defineComponent({
    nodes: {
        requiredElement: {
            type: 'query',
            selector: '<some selector>',
        },
        optionalElement: {
            type: 'query',
            selector: '<some selector>',
            optional: true,
        },
        elementsFromRoot: {
            type: 'query-all',
            selector: '<some selector>',
        },
        elementsFromDocument: {
            type: 'query-all',
            selector: '<some selector>',
            scope: document,
        },
    },
});
```

</TabItem>
<TabItem value="ts" label="TypeScript" default>

```ts
defineComponent<{
    nodes: {
        requiredElement: HTMLElement;
        optionalElement: HTMLElement | null;
        elementsFromRoot: HTMLElement[];
        elementsFromDocument: HTMLElement[];
    };
}>({
    nodes: {
        requiredElement: {
            type: 'query',
            selector: '<some selector>',
        },
        optionalElement: {
            type: 'query',
            selector: '<some selector>',
            optional: true,
        },
        elementsFromRoot: {
            type: 'query-all',
            selector: '<some selector>',
        },
        elementsFromDocument: {
            type: 'query-all',
            selector: '<some selector>',
            scope: document,
        },
    },
});
```

</TabItem>
</Tabs>

<br />

---

## Rendering text

Once a text node has been declared in `nodes`, an entry for it can be added to the [render option](../api/define-component.md#render). The entry must have the exact same name as the node and must be a function that returns a string. The string will be applied directly to the value of the node. When the state changes, this function will be evaluated and the node will be updated if the value has changed.

```js
defineComponent({
    nodes: {
        textNode: {
            type: 'text',
        },
    },
    render: {
        textNode() {
            return '...';
        },
    },
});
```

<br />

---

## Rendering elements

Once elements have been declared in `nodes`, an entry for them can be added to the [render option](../api/define-component.md#render). The entry must have the exact same name as the node and must be a function that returns an HTML string or a configuration object. The configuration object can be used to set the attributes, classes, style, and/or content of each element. When the state changes, this function will be evaluated and each element will be updated if there have been any changes.

```js
defineComponent({
    nodes: {
        contentOnly: {
            type: 'element',
            tagName: 'span',
        },
        configObject: {
            type: 'element',
            tagName: 'svg',
        },
    },
    render: {
        contentOnly() {
            return '...';
        },
        configObject() {
            return {
                attributes: {
                    '<attribute-name>': '...', // sets the value
                    '<attribute-name>': true, // adds boolean attribute
                    '<attribute-name>': false, // removes boolean attribute
                    '<attribute-name>': null, // removes the attribute
                    '<attribute-name>': undefined, // ignores the update
                },
                classes: {
                    '<class-name>': true, // adds class
                    '<class-name>': false, // removes class
                },
                style: {
                    '<property-name>': '...', // sets the value
                    '<property-name>': null, // removes the property
                    '<property-name>': undefined, // ignores the update
                },
                content: '...', // applies to innerHTML
            };
        },
    },
});
```

<br />

---

## Rendering the root element

To render the root element, add the reserved property `$root` to the [render option](../api/define-component.md#render). Like all other nodes, this entry must be a function that returns a string or configuration object. When the state changes, this function will be evaluated and the root element will be updated if anything has changed.

```js
defineComponent({
    render: {
        $root() {
            return { ... };
        },
    },
});
```

<br />

---

## Handling multiple elements

For nodes that are an array (via the `query-all` type), the function declared in `render` will be called for each element. The index of the array will be passed as the first argument and can be used to differentiate each element.

```js
defineComponent({
    nodes: {
        multipleElements: {
            type: 'query-all',
            selector: '<some-selector>',
        },
    },
    render: {
        multipleElements(index) {
            return `This is element ${index}`;
        },
    },
});
```
