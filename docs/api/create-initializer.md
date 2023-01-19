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
createInitializer(componentList: object)
```

Creates an "initializer" function that will initialize components from the HTML when called. The function takes a named list of `Component` subclasses as its only argument.

```js
class IceCream extends Component {
    render() {
        this.rootElement.innerHTML = 'I love ice cream!';
    }
}

const initialize = createInitializer({ IceCream });
```

The names from `componentList` are used to identify root elements in the HTML via the `data-initialize` attribute.

```html
<div data-initialize="IceCream"></div>
```

The value corresponding to each name, which is the `Component` subclass is then used to initialize the components. An array of the instances generated is returned.

```js
const instances = initialize();
```

```html
<div>I love ice cream!</div>
```

:::tip

Create an initializer for a library of Froyo components by importing them all at once.

```js
import * as components from './components';

const initialize = createInitializer(components);
```

:::