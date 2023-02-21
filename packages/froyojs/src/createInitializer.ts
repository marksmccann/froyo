/* eslint-disable no-console */

import Component from './Component';

function createInitializer(componentList: {
    [key: string]: { new (root: string | Element): Component };
}) {
    return function initialize() {
        const rootElements = document.querySelectorAll('[data-initialize]');
        const instances: Component[] = [];

        Array.from(rootElements).forEach((rootElement) => {
            const name = rootElement.getAttribute('data-initialize') || '';

            if (
                name in componentList &&
                componentList[name].prototype instanceof Component
            ) {
                rootElement.removeAttribute('data-initialize');
                instances.push(new componentList[name](rootElement));
            } else {
                console.error(
                    `Warning: "${name}" is not a valid "Component" constructor`
                );
            }
        });

        return instances;
    };
}

export default createInitializer;
