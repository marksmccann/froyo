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
render(
    rootElement: HTMLString,
    initialize: function(rootElement): FroyoInstance,
    options?: object
)
render(
    rootElement: HTMLElement,
    initialize: function(rootElement): FroyoInstance,
    options?: object
)
```

Renders an individual component by appending the `rootElement` and calling `initialize` to instantiate it.

```js
import '@testing-library/jest-dom';
import { Component } from 'froyojs';
import { render } from 'testing-library-froyojs';

class HelloWorld extends Component {
    render() {
        this.rootElement.innerHTML = 'Hello, World!';
    }
}

test('renders a message', () => {
    const { getByText } = render('<div></div>', (root) => new HelloWorld(root));

    expect(getByText('Hello, world!')).toBeInTheDocument();
});
```

### `Render` Options

#### `container`

By default, Froyo Testing Library will append the root element to `document.body`. If you provide your own HTMLElement container via this option, the root element will be appended to it instead. However, the container will not be appended to the `document.body` automatically.

```js
const myContainer = document.createElement('div');

const result = render('<div></div>', (root) => new HelloWorld(root), {
    container: document.body.appendChild(myContainer),
});
```

#### `baseElement`

If the container is specified, then this defaults to that, otherwise this defaults to `document.body`. This is used as the base element for the queries.

#### `queries`

Queries to bind to the `baseElement`. Overrides the default set of queries from DOM Testing Library unless merged.

```js
import * as myQueries from 'my-query-library';
import { queries } from 'testing-library-froyojs';

const { getByMyQuery } = render(
    '<div></div>',
    (root) => new HelloWorld(root),
    queries: { ...queries, ...myQueries },
);
```

Learn more about creating [custom queries](https://testing-library.com/docs/dom-testing-library/api-custom-queries/) on the Testing Library website.

### `Render` Result

The render method returns an object with the following properties:

#### `...queries`

Most importantly, the queries from DOM Testing Library are automatically returned with their first argument bound to the `baseElement`, which defaults to `document.body`.

See [Queries](https://testing-library.com/docs/queries/about) for a complete list.

```js
const { getByText, queryByLabelText } = render(
    '<div></div>',
    (root) => new HelloWorld(root)
);
```

#### `rootElement`

The resolved DOM node provided to the first argument of `render`.

#### `baseElement`

The containing DOM node where the root element was appended; defaults to `document.body`.

#### `rerender`

This function will update the component instance with a new state and re-render.

```js
import { render } from 'testing-library-froyo';

const { rerender } = render('<div></div>', (root) => new HelloWorld(root));

// re-render the same component with different state
rerender({ message: 'Goodbye, World!' });
```

#### `destroy`

This will destroy the component instance and remove the associated root element from the DOM. If a `container` was specified, it will also be removed from the DOM if it no longer has any content.

```js
import { render } from '@testing-library/react';

const { destroy } = render('<div></div>', (root) => new HelloWorld(root));

destroy(); // the component is destroyed and now: document.body.innerHTML === ''
```

### `cleanup`

Destroys all instances that were created with `render`. Failing to call cleanup when you've called render could result in a memory leak and a test environment that is not pure (which can lead to errors that are difficult to debug).

:::info

Please note that this is done automatically if the testing framework you're using supports the `afterEach` global and it is injected into your testing environment (like mocha, Jest, and Jasmine). If not, you will need to manually perform cleanups after each test by calling this function.

:::

```js
cleanup();
```
