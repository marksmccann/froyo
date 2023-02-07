---
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# testing-library-froyojs

`testing-library-froyojs` is a package that extends `@testing-library/dom` to work with [Froyo](https://marksmccann.github.io/froyo/).

## Installation

<Tabs>
<TabItem value="npm" label="npm" default>

```shell
npm i testing-library-froyojs --save-dev
```

</TabItem>
<TabItem value="yarn" label="Yarn">

```shell
yarn add testing-library-froyojs --dev
```

</TabItem>
</Tabs>

## API

Froyo Testing Library re-exports everything from DOM Testing Library as well as these methods:

### `render`

```ts
function render(html: HTMLString, initialize: function(): void, options?: RenderOptions): RenderResult
```

Renders an HTML string into a container that is appended to the document and then calls `initialize` to instantiate Froyo components.

```js
import '@testing-library/jest-dom';
import { Component } from 'froyojs';
import { render } from 'testing-library-froyojs';

class HelloWorld extends Component {
    render() {
        this.rootElement.innerHTML = 'Hello, World!';
    }
}

test('renders a greeting', () => {
    const { getByText } = render(
        '<div id="root"></div>',
        () => new HelloWorld('#root')
    );

    expect(getByText('Hello, world!')).toBeInTheDocument();
});
```

### `render` Options

#### `container`

By default, Froyo Testing Library will create a div and append it to the base element. This element is the container where the provided `html` is rendered. If you provide your own container via this option, it will not be appended to `document.body` automatically.

```js
const container = document.createElement('div');

const result = render('<div id="root"></div>', () => new HelloWorld('#root'), {
    container: document.body.appendChild(container),
});
```

:::info

If you choose not to append the container to the document, keep in mind that passing a raw selector to the Froyo component constructor will not work because it will not be able to find the element. You will need to pass a direct reference to the HTML element instead.

```js
new HelloWorld(container.querySelector('#root'));
```

:::

#### `baseElement`

If the container is specified, then this defaults to that, otherwise this defaults to `document.body`. This is used as the base element for the queries. If you provide your own base element via this option or `container`, it will not be appended to `document.body` automatically.

```js
const baseElement = document.createElement('div');

const result = render('<div id="root"></div>', () => new HelloWorld('#root'), {
    baseElement: document.body.appendChild(baseElement),
});
```

:::info

If the base element you provided is not appended to the document, keep in mind that passing a raw selector to the Froyo component constructor will not work because it will not be able to find the element. You will need to pass a direct reference to the HTML element instead.

```js
new HelloWorld(baseElement.querySelector('#root'));
```

:::

#### `queries`

Queries to bind to the `baseElement`. Overrides the default set of queries from DOM Testing Library unless merged.

```js
import * as myQueries from 'my-query-library';
import { queries } from 'testing-library-froyojs';

const { getByMyQuery } = render(
    '<div id="root"></div>',
    () => new HelloWorld('#root'),
    queries: { ...queries, ...myQueries },
);
```

Learn more about creating [custom queries](https://testing-library.com/docs/dom-testing-library/api-custom-queries/) on the Testing Library website.

### `render` Result

The render method returns an object with the following properties:

#### `...queries`

Most importantly, the queries from DOM Testing Library are automatically returned with their first argument bound to the `baseElement`, which defaults to `document.body`.

See [Queries](https://testing-library.com/docs/queries/about) for a complete list.

```js
const { getByText, queryByLabelText } = render(
    '<div id="root"></div>',
    () => new HelloWorld('#root')
);
```

#### `container`

The containing DOM node for the rendered `html`.

#### `baseElement`

The containing DOM node where the container was appended; defaults to `document.body`.

#### `rerender`

This function will rerender a single component by updating its state. The first argument must be an HTML element (or query string) to the root element of the desired component. When a corresponding instance is identified, its state is then updated with the data passed to the second argument, causing the component to update and rerender.

```js
import { render } from 'testing-library-froyo';

const { rerender } = render(
    '<div id="root"></div>',
    () => new HelloWorld('#root')
);

// re-render the same component with different state
rerender('#root', { message: 'Goodbye, World!' });
```

#### `destroy`

This will destroy the component instance(s) and remove the container element from the DOM.

```js
import { render } from '@testing-library/react';

const { destroy } = render(
    '<div id="root"></div>',
    () => new HelloWorld('#root')
);

destroy(); // the component is destroyed and now: document.body.innerHTML === ''
```

### `cleanup`

Destroys all instances and removes all elements that were created with `render`. Failing to call cleanup when you've called render could result in a memory leak and a test environment that is not pure (which can lead to errors that are difficult to debug).

:::info

Please note that this is done automatically if the testing framework you're using supports the `afterEach` or `teardown` global and it is injected into your testing environment (like mocha, Jest, and Jasmine). If not, you will need to manually perform cleanups after each test by calling this function.

:::

```js
cleanup();
```
