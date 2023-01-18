/* eslint-disable no-console */

import Component from './Component';

function createInitializer(componentList) {
    return function initialize() {
        const rootElements = document.querySelectorAll('[data-initialize]');
        const instances = [];

        Array.from(rootElements).forEach((rootElement) => {
            const name = rootElement.getAttribute('data-initialize');
            const Constructor = componentList[name];

            if (!(Constructor.prototype instanceof Component)) {
                console.error(
                    `Warning: "${name}" is not a valid "Component" constructor`
                );

                return;
            }

            rootElement.removeAttribute('data-initialize');
            instances.push(new Constructor(rootElement));
        });

        return instances;
    };
}

export default createInitializer;
