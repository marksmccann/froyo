import loglevel from 'loglevel';
import Component from './Component';

function createInitializer(ComponentList = {}) {
    Object.entries(ComponentList).forEach(([name, Constructor]) => {
        if (
            Constructor !== Component &&
            !(Constructor.prototype instanceof Component)
        ) {
            loglevel.error(
                `Warning: "Constructor" for "${name}" must be a class that extends from "Component"`
            );
        }
    });

    return function initialize() {
        const rootElements = document.querySelectorAll('[data-initialize]');
        const instances = [];

        Array.from(rootElements).forEach((rootElement) => {
            const name = rootElement.getAttribute('data-initialize');
            const Constructor = ComponentList[name];

            if (!Constructor) {
                loglevel.error(
                    `Warning: there is no constructor for the component "${name}"`
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
