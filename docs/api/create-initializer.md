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

Create a function to initialize Froyo components from the HTML.

#### Type

```ts
function createInitializer<T extends ComponentConstructor>(componentList: {
    [key: string]: T;
}): () => T[];
```

#### Details

This function will return an "initializer" function that will initialize root elements marked with `data-init="<component-name>"` in the HTML.

The only argument must be an object where each key is the name of the component and the each value is the corresponding component constructor.

The initializer function takes no arguments and will return an array of every component instance it generated.

See [HTML-only Usage](../fundamentals/html-only-usage.md) to learn more.

#### Example

```js
const FrozenYogurt = defineComponent({
    render: {
        $root() {
            return 'I love frozen yogurt!';
        },
    },
});

const initialize = createInitializer({
    FrozenYogurt: FrozenYogurt,
});
```

Consumers can then mark root elements with the `data-init` attribute:

```html
<div id="yogurt" data-init="FrozenYogurt"></div>
```

After which, the initializer function can be called and the component will be initialized automatically.

```js
const instances = initialize();
```

```html
<div id="yogurt">I love frozen yogurt!</div>
```
