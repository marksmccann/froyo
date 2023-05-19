import type { ComponentConstructor } from './types';
import { COMPONENT } from './constants';
import logError from './logError';

/**
 * Creates a function for initializing Froyo components declared in the HTML
 * @param componentList list of named component constructors
 */
function createInitializer<T extends ComponentConstructor>(
    componentList: Record<string, T>
) {
    return function initialize(): Array<InstanceType<T>> {
        const rootElements = document.querySelectorAll('[data-init]');
        const instances: Array<InstanceType<T>> = [];

        rootElements.forEach((rootElement) => {
            const name = rootElement.getAttribute('data-init') || '';
            const Constructor = componentList[name];

            if (!(name in componentList)) {
                logError('E13', { name });
                return;
            }

            if (Constructor.$$typeof !== COMPONENT) {
                logError('E14', { name });
                return;
            }

            rootElement.removeAttribute('data-initialize');
            instances.push(new Constructor(rootElement) as InstanceType<T>);
        });

        return instances;
    };
}

export default createInitializer;
