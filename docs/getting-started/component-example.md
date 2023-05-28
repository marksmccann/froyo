import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Component Example

The following is an example of a basic `Tabs` component built with Froyo.

## Initial HTML

The initial markup for this component includes the content for three tabs and panels.

```html
<div class="tabs">
    <div class="tabs__tablist">
        <button class="tabs__tab">Tab 1</button>
        <button class="tabs__tab">Tab 2</button>
        <button class="tabs__tab">Tab 3</button>
    </div>
    <div class="tabs__panel">Panel 1</div>
    <div class="tabs__panel">Panel 2</div>
    <div class="tabs__panel">Panel 3</div>
</div>
```

## Component Definition

This is the `Tabs` component definition using the primary features of the framework.

<Tabs>
<TabItem value="js" label="JavaScript" default>

<!-- prettier-ignore -->
```js
import { defineComponent } from 'froyojs';

const Tabs = defineComponent({
    state: {
        activeTab: {
            type: Number,
            default: 0,
        },
    },
    nodes: {
        tablist: {
            type: 'query',
            selector: '.tabs__tablist',
            attributes: { role: 'tablist' },
        },
        tabs: {
            type: 'query-all',
            selector: 'button.tabs__tab',
        },
        panels: {
            type: 'query-all',
            selector: '.tabs__panel',
        },
    },
    events: {
        tabs(index) {
            return {
                click: () => {
                    this.$state.activeTab = index;
                },
            };
        },
    },
    render: {
        tabs(index) {
            return {
                classes: {
                    'tabs__tab--active': this.$state.activeTab === index,
                },
                attributes: {
                    type: 'button',
                    role: 'tab',
                    id: `tab-${index}`,
                    'aria-controls': `panel-${index}`,
                    'aria-selected': this.$state.activeTab === index ? 'true' : 'false',
                },
            };
        },
        panels(index) {
            return {
                classes: {
                    'tabs__panel--active': this.$state.activeTab === index,
                },
                attributes: {
                    role: 'tabpanel',
                    id: `panel-${index}`,
                    'aria-labelledby': `tab-${index}`,
                    hidden: this.$state.activeTab !== index,
                },
            };
        },
    },
});
```

</TabItem>
<TabItem value="ts" label="TypeScript">

<!-- prettier-ignore -->
```ts
import { defineComponent } from 'froyojs';

const Tabs = defineComponent<{
    $root: HTMLElement,
    $state: { activeTab: number };
    tablist: HTMLElement;
    tabs: HTMLButtonElement[];
    panels: HTMLElement[];
}>({
    state: {
        activeTab: {
            type: Number,
            default: 0,
        },
    },
    nodes: {
        tablist: {
            type: 'query',
            selector: '.tabs__tablist',
            attributes: { role: 'tablist' },
        },
        tabs: {
            type: 'query-all',
            selector: 'button.tabs__tab',
        },
        panels: {
            type: 'query-all',
            selector: '.tabs__panel',
        },
    },
    events: {
        tabs(index) {
            return {
                click: () => {
                    this.$state.activeTab = index;
                },
            };
        },
    },
    render: {
        tabs(index) {
            return {
                classes: {
                    'tabs__tab--active': this.$state.activeTab === index,
                },
                attributes: {
                    type: 'button',
                    role: 'tab',
                    id: `tab-${index}`,
                    'aria-controls': `panel-${index}`,
                    'aria-selected': this.$state.activeTab === index ? 'true' : 'false',
                },
            };
        },
        panels(index) {
            return {
                classes: {
                    'tabs__panel--active': this.$state.activeTab === index,
                },
                attributes: {
                    role: 'tabpanel',
                    id: `panel-${index}`,
                    'aria-labelledby': `tab-${index}`,
                    hidden: this.$state.activeTab !== index,
                },
            };
        },
    },
});
```

</TabItem>
</Tabs>

## Initialization

This is how the component would be initialized.

:::info

Alternatively, components can be initialized with a raw [query selector](../api/define-component.md#constructor) or [from the HTML](../fundamentals/html-only-usage.md).

:::

```js
const instance = new Tabs(document.querySelector('.tabs'));
```

## Rendered Markup

This is what the rendered HTML would look like after initialization.

```html
<div class="tabs">
    <div class="tabs__tablist" role="tablist">
        <button
            class="tabs__tab tabs__tab--active"
            type="button"
            role="tab"
            id="tab-0"
            aria-controls="panel-0"
            aria-selected="true"
        >
            Tab 1
        </button>
        <button
            class="tabs__tab"
            type="button"
            role="tab"
            id="tab-1"
            aria-controls="panel-1"
            aria-selected="false"
        >
            Tab 2
        </button>
        <button
            class="tabs__tab"
            type="button"
            role="tab"
            id="tab-2"
            aria-controls="panel-2"
            aria-selected="false"
        >
            Tab 3
        </button>
    </div>
    <div
        class="tabs__panel tabs__panel--active"
        role="panel"
        id="panel-0"
        aria-labelledby="tab-0"
    >
        Panel 1
    </div>
    <div
        class="tabs__panel"
        role="panel"
        id="panel-1"
        aria-labelledby="tab-1"
        hidden
    >
        Panel 2
    </div>
    <div
        class="tabs__panel"
        role="panel"
        id="panel-2"
        aria-labelledby="tab-2"
        hidden
    >
        Panel 3
    </div>
</div>
```
