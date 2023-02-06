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

This is the `Tabs` class definition using the primary features of the framework.

```js
import PropTypes from 'prop-types';
import { Component, addEventListener, setAttributes } from 'froyojs';

class Tabs extends Component {
    static get stateTypes() {
        return {
            activeTab: PropTypes.number,
        };
    }

    static get defaultState() {
        return {
            activeTab: 0,
        };
    }

    setup() {
        const { rootElement } = this;

        this.elements = {
            tablist: rootElement.querySelector('.tabs__tablist'),
            tabs: rootElement.querySelectorAll('.tabs__tab'),
            panels: rootElement.querySelectorAll('.tabs__panel'),
        };

        this.listeners = {
            click: addEventListener(
                rootElement,
                'click',
                this.handleClick.bind(this)
            ),
        };
    }

    validate(stateChanges) {
        const { tabs, panels } = this.elements;
        const { activeTab } = this.state;

        if (!this.initialized) {
            if (tabs.length !== panels.length) {
                console.error(
                    'There must be an equal number of tabs and panels'
                );
            }
        }

        if ('activeTab' in stateChanges) {
            if (activeTab < 0 || activeTab >= tabs.length) {
                console.error(`There is no tab at index "${activeTab}"`);
            }
        }
    }

    handleClick(event) {
        const { tabs } = this.elements;

        if (tabs.includes(event.target)) {
            this.setState({
                activeTab: tabs.indexOf(event.target),
            });
        }
    }

    render(stateChanges) {
        const { tablist, tabs, panels } = this.elements;
        const { activeTab } = this.state;

        if (!this.initialized) {
            setAttributes(tablist, { role: 'tablist' });

            tabs.forEach((tab, index) => {
                setAttributes(tab, {
                    type: 'button',
                    role: 'tab',
                    id: `tab-${index}`,
                    'aria-controls': `panel-${index}`,
                });
            });

            panels.forEach((panel, index) => {
                setAttributes(panel, {
                    role: 'tabpanel',
                    id: `panel-${index}`,
                    'aria-labelledby': `tab-${index}`,
                });
            });
        }

        if ('activeTab' in stateChanges) {
            tabs.forEach((tab, index) => {
                setAttributes(tab, {
                    'aria-selected': activeTab === index,
                });

                if (activeTab === index) {
                    tab.classList.add('tabs__tab--active');
                } else {
                    tab.classList.remove('tabs__tab--active');
                }
            });

            panels.forEach((panel, index) => {
                if (activeTab === index) {
                    panel.classList.add('tabs__panel--active');
                } else {
                    panel.classList.remove('tabs__panel--active');
                }
            });
        }
    }
}
```

## Initialization

This is how the component would be initialized.

:::info

Alternatively, components can be initialized with a [query selector](../api/component.md#constructor) or [from the HTML](../fundamentals/html-only-usage.md).

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
    <div class="tabs__panel" role="panel" id="panel-1" aria-labelledby="tab-1">
        Panel 2
    </div>
    <div class="tabs__panel" role="panel" id="panel-2" aria-labelledby="tab-2">
        Panel 3
    </div>
</div>
```
