/* eslint-disable no-console */

import Component from './Component';

type Constructor = new (
    root: string | HTMLElement,
    initialState?: Record<string, any>
) => Component;

function createInitializer<T extends Record<string, Constructor>>(
    componentList: T
) {
    return function initialize(): Array<Component> {
        const rootElements =
            document.querySelectorAll<HTMLElement>('[data-initialize]');
        const instances: Array<Component> = [];

        rootElements.forEach((rootElement) => {
            const name = rootElement.getAttribute('data-initialize');

            if (
                name &&
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
