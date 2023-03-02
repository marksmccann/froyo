/* eslint-disable no-console */

import Component from './Component';
import type { ComponentConstructorList } from './types';

function createInitializer<T>(
    componentList: { [s: string]: any } & ComponentConstructorList<T>
) {
    return function initialize(): T[] {
        const rootElements = document.querySelectorAll('[data-initialize]');
        const instances: T[] = [];

        rootElements.forEach((rootElement) => {
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
