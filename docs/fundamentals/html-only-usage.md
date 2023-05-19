import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# HTML-only Usage

This guide explains how components can be implemented from the HTML.

## Introduction

With just a couple of attributes, Froyo components can be declared and configured directly from the HTML. Once an [initializer](#creating-an-initializer) has been created and called, consumers can build entire pages without writing a single line of JavaScript.

<!-- prettier-ignore -->
```html
<div data-init="ComponentName" data-state='{"someState": true}'></div>
```

<br />

---

## Creating an Initializer

To create an initializer, use the [`createInitializer`](../api/create-initializer.md) tool. This utility takes a list of component names and constructors and it will return an initializer function. When called, every element marked with a matching `data-init` attribute will be initialized.

```js
import { defineComponent, createInitializer } from 'froyojs';

const FrozenYogurt = defineComponent({
    render: {
        $root() {
            return 'I love frozen yogurt!';
        },
    },
});

const initialize = createInitializer({ FrozenYogurt });

// initializes elements with the attribute: data-init="FrozenYogurt"
const instances = initialize();
```

<br />

---

## Marking root elements

The initializer uses the `data-init` attribute to identify which elements to initialize. Apply this attribute to the root element with the name of the desired component as its value.

When the initializer is called, it searches the DOM for every element that has this attribute and pairs its value with the list of components it was given. When a match is found, it uses that element and the specified component constructor to initialize the component.

```html
<div data-init="FrozenYogurt"></div>
```

After initialization the `data-init` attribute will be removed.

:::info

The removal of the `data-init` attribute means the initializer can be harmlessly called more than once, which can be useful to instantiate additional components not originally present in markup (e.g. injected asynchronously).

:::

```html
<div>I love frozen yogurt!</div>
```

<br />

---

## Setting the initial state

To set the initial state from the HTML, apply the `data-state` attribute onto the root element. The value should include the desired state as valid JSON.

:::info

Only primitive data types can be set from the HTML. If you want to configure a more complex state property, like a function, it must instead be set at instantiation via the [constructor](../api/define-component.md#constructor) or post instantiation via [`setState`](../api/define-component.md#setstate). See [Determining the initial state](./component-lifecycle.md#determining-the-initial-state) to learn more.

:::

```html
<div data-state='{"flavor": "vanilla"}'></div>
```

After initialization the `data-state` attribute will be removed.

```html
<div>I love frozen yogurt!</div>
```

<br />

---

## Initializing an entire library

Conveniently create an initializer for an entire library by importing all of the components at once.

<Tabs>
<TabItem value="es6" label="ES6" default>

```js
import * as myFroyoComponents from './my-froyo-library';

const initialize = createInitializer(myFroyoComponents);
```

</TabItem>
<TabItem value="commonjs" label="CommonJS">

```js
const myFroyoComponents = require('./my-froyo-library');

const initialize = createInitializer(myFroyoComponents);
```

</TabItem>
<TabItem value="browser" label="Browser (CDN)">

```js
const myFroyoComponents = window.myFroyoLibrary;

const initialize = createInitializer(myFroyoComponents);
```

</TabItem>
</Tabs>
