import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create Initializer

This page contains a detailed API reference for the `createInitializer` tool.

## Import

<Tabs>
<TabItem value="es6" label="ES6" default>

```js
import { createInitializer } from 'froyojs';
```

</TabItem>
<TabItem value="commonjs" label="CommonJS">

```js
const { createInitializer } = require('froyojs');
```

</TabItem>
<TabItem value="browser" label="Browser (CDN)">

```js
window.froyojs.createInitializer;
```

</TabItem>
</Tabs>

## Reference

### `createInitializer`

```ts
function createInitializer<T>(componentList: ComponentList<T>): () => T[];

type ComponentList<T> = {
    [K in keyof T]: new (root: string | Element, initialState?: Record<string, any>): T[K]
} & Record<string, any>;
```

Creates an "initializer" function that will initialize components from the HTML when called. The function takes a named list of `Component` subclasses as its only argument.

```js
class FrozenYogurt extends Component {
    render() {
        this.rootElement.innerHTML = 'I love frozen yogurt!';
    }
}

const initialize = createInitializer({ FrozenYogurt });
```

The names from `componentList` are used to identify root elements in the HTML via the `data-initialize` attribute.

```html
<div data-initialize="FrozenYogurt"></div>
```

The value corresponding to each name, which is the `Component` subclass, is then used to initialize the components with those root elements. An array of the instances generated is returned.

```js
const instances = initialize();
```

```html
<div>I love frozen yogurt!</div>
```

See ["HTML-only Usage"](../fundamentals/html-only-usage.md) to learn more.
