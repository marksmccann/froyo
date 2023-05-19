import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Handling Events

This guide explains how to add event listeners to a component.

## Adding event listeners

Once nodes have been declared in `nodes`, an entry for them can be added to the [events option](../api/define-component.md#render). The entry must have the exact same name as the node and must be a function that returns an event object. Each key in the event object must be a valid event type and the corresponding value must a function that handles that event.

```js
defineComponent({
    nodes: {
        button: {
            type: 'element',
            tagName: 'button',
        },
    },
    events: {
        button() {
            return {
                click: () => {
                    // the button was clicked, do something ...
                },
            };
        },
    },
});
```

<br />

---

## Reserved event types

`$window`, `$document`, and `$root` are reserved properties on the `events` option that should be used add events to the Window, Document, and root element respectively.

```js
defineComponent({
    events: {
        $window() {
            return {
                resize: () => {
                    // the window resized, do something ...
                },
            };
        },
        $document() {
            return {
                click: () => {
                    // the document was clicked, do something ...
                },
            };
        },
        $root() {
            return {
                click: () => {
                    // the root element was clicked, do something ...
                },
            };
        },
    },
});
```

<br />

---

## Handling multiple elements

For nodes that are an array (via the `query-all` type), the events will be assigned directly to each element. Also, the index of the array will be passed as the first argument and can be used to differentiate each element.

```js
defineComponent({
    nodes: {
        multipleElements: {
            type: 'query-all',
            selector: '<some-selector>',
        },
    },
    events: {
        multipleElements(index) {
            return {
                click: () => {
                    console.log(`Element ${index} was clicked!`;
                },
            };
        },
    },
});
```

<br />

---

## Moving handlers to `data`

When desired, event handlers can be moved to the [data option](../api/define-component.md#data) and referenced via the `this` keyword. This can be useful when handlers contain a lot of logic and become unwieldy.

<Tabs>
<TabItem value="js" label="JavaScript" default>

```js
defineComponent({
    data: {
        handleClick() {},
    },
    events: {
        $root() {
            return {
                click: this.handleClick,
            };
        },
    },
});
```

</TabItem>
<TabItem value="ts" label="TypeScript" default>

```ts
defineComponent<{
    data: {
        handleClick(): void;
    };
}>({
    data: {
        handleClick() {},
    },
    events: {
        $root() {
            return {
                click: this.handleClick,
            };
        },
    },
});
```

</TabItem>
</Tabs>

<br />

---

## Adding custom events

The lifecycle hooks can be used add custom events and unconventional listeners like [mutation observers](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) and [media query listeners](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to the component.

<Tabs>
<TabItem value="js" label="JavaScript" default>

```js
defineComponent({
    data: {
        handleCustomEvent() {}
        handleMutationObserver() {}
        handleMediaQueryChange() {}
    },
    hooks: {
        $setup() {
            this.$root.addEventListener('click', this.handleCustomEvent);

            this.mutationObserver = new MutationObserver(this.handleMutationObserver);
            this.mutationObserver.observe(this.$root, { attributes: true });

            this.mediaQueryList = window.matchMedia('(max-width: 600px)');
            this.mediaQueryList.addEventListener('change', this.handleMediaQueryChange);
        },
        $teardown() {
            this.$root.removeEventListener('click', this.handleCustomEvent);
            this.mutationObserver.disconnect();
            this.mediaQueryList.removeEventListener('change', this.handleMediaQueryChange);
        },
    },
});
```

</TabItem>
<TabItem value="ts" label="TypeScript" default>

```ts
defineComponent<{
    data: {
        handleCustomEvent(): void,
        handleMutationObserver(): void,
        handleMediaQueryChange(): void,
        mutationObserver: MutationObserver,
        mediaQueryList: MediaQueryList,
    },
}>({
    data: {
        handleCustomEvent() {}
        handleMutationObserver() {}
        handleMediaQueryChange() {}
    },
    hooks: {
        $setup() {
            this.$root.addEventListener('click', this.handleCustomEvent);

            this.mutationObserver = new MutationObserver(this.handleMutationObserver);
            this.mutationObserver.observe(this.$root, { attributes: true });

            this.mediaQueryList = window.matchMedia('(max-width: 600px)');
            this.mediaQueryList.addEventListener('change', this.handleMediaQueryChange);
        },
        $teardown() {
            this.$root.removeEventListener('click', this.handleCustomEvent);
            this.mutationObserver.disconnect();
            this.mediaQueryList.removeEventListener('change', this.handleMediaQueryChange);
        },
    },
});
```

</TabItem>
</Tabs>
