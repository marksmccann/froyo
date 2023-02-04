import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# HTML-only Usage

This guide explains how components can be implemented from the HTML.

## Introduction

With just a couple of attributes, Froyo components can be declared and configured directly from the HTML. Once an [initializer](#creating-an-initializer) has been created and called, consumers can build entire pages with functional and dynamic UI components without writing a single line of JavaScript.

```html
<div
    data-initialize="ComponentName"
    data-initial-state='{"someState": true}'
></div>
```

## Creating an Initializer

To create an initializer, use the [`createInitializer`](../api/create-initializer.md) tool. Give it a list of component names and constructors and it will return an initializer function. When called, this function will initialize every root element marked with the `data-initialize` attribute on the page.

```js
import { Component, createInitializer } from 'froyojs';

class FrozenYogurt extends Component {
    render() {
        this.rootElement.innerHTML = 'I love frozen yogurt!';
    }
}

const initialize = createInitializer({ FrozenYogurt });

// initializes elements with the "data-initialize" attribute
const instances = initialize();
```

<br />

---

## Marking Root Elements

The initializer uses the `data-initialize` attribute to identify which elements to initialize. Apply this attribute to the desired root element with the name of the desired component as its value.

When the initializer is called, it searches the DOM for every element that has this attribute and pairs its value with the list of components it was given. It then uses that element and the specified component constructor to initialize the component.

```html
<div data-initialize="FrozenYogurt"></div>
```

After initialization the `data-initialize` attribute will be removed.

:::info

Removing the `data-initialize` attribute means the initializer to be can be called more than once. This can be useful if other components, not originally present (e.g. injected asynchronously), need to be initialized.

:::

```html
<div>I love frozen yogurt!</div>
```

<br />

---

## Setting the Initial State

To set the initial state from the HTML, apply the `data-initial-state` attribute onto the root element. The value should include the desired state as valid JSON.

:::info

Because this attribute is defined in the HTML, it only supports primitive types. If you want to configure a state that is not a primitive type (e.g. `function`), the property must instead be set at instantiation via the [constructor](../api/component.md#constructor) or post instantiation via [`setState`](../api/component.md#setstate). See [Determining the Initial State](./component-lifecycle.md#determining-the-initial-state) to learn more.

:::

```html
<div data-initial-state='{"flavor": "vanilla"}'></div>
```

After initialization the `data-initial-state` attribute will be removed.

```html
<div>I love frozen yogurt!</div>
```

<br />

---

## Retrieving Component Instances

If one has access to the [`Component`](../api/component.md) class, it is possible to retrieve any component instance. The [`instances`](../api/component.md#instances) class property returns an immutable array of all active component instances. This feature is particularly useful for recalling instances that were created by an `initializer` in a different scope.

```js
console.log(Component.instances); // [Component, Component, ...]
```

This array can then be searched or filtered to find specific instance(s), for example:

```js
// search for an instance with a specific root element
const myYogurt = Component.instances.find(
    (instance) => instance.rootElement.id === 'my-yogurt'
);

// filter for instances created by a specific constructor
const allYogurts = Component.instances.filter(
    (instance) => instance instanceof FrozenYogurt
);
```

<br />

---

## Initializing an Entire Library

Create an initializer for an entire library by importing all of the components at once.

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
