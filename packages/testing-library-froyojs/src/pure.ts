/* eslint-disable no-console */

import { getQueriesForElement } from '@testing-library/dom';
import type { RenderOptions, RenderResult, ComponentInstance } from './types';

const renderedContainers: Map<HTMLElement, RenderResult> = new Map();

function render<T extends ComponentInstance>(
    html: string,
    initialize?: (() => T | T[]) | null,
    options: RenderOptions = {}
): RenderResult<T> {
    const { queries } = options;
    const { container, baseElement: base } = options;
    let instances: T[] = [];
    let containerElement: HTMLElement;
    let baseElement: HTMLElement;

    if (base) {
        baseElement = base;
    } else {
        baseElement = container ?? document.body;
    }

    if (container) {
        containerElement = container;
    } else {
        containerElement = document.createElement('div');
        baseElement.appendChild(containerElement);
    }

    // if the container was rendered previously,
    // return the saved data from before
    if (renderedContainers.has(containerElement)) {
        const previousResult = renderedContainers.get(containerElement);

        // istanbul ignore else
        if (previousResult !== undefined) {
            return previousResult;
        }
    }

    containerElement.innerHTML = html.trim();

    if (initialize) {
        const result = initialize();

        if (Array.isArray(result)) {
            instances = result;
        } else {
            instances = [result];
        }
    }

    const data: RenderResult = {
        baseElement,
        container: containerElement,
        ...getQueriesForElement(baseElement, queries),
        rerender(root, newState = {}) {
            let rootElement: Element;

            if (typeof root === 'string') {
                const element = containerElement.querySelector(root);

                if (element) rootElement = element;
            } else {
                rootElement = root;
            }

            const component = instances.find(
                (instance) => rootElement === instance.root
            );

            if (!component) {
                console.error(
                    `Warning: no component found for the root element: ${root}`
                );

                return;
            }

            component.setState(newState);
        },
        destroy() {
            containerElement.remove();
            if (baseElement !== document.body) baseElement.remove();
            instances.forEach((instance) => instance.destroy());
            renderedContainers.delete(containerElement);
        },
    };

    renderedContainers.set(containerElement, data);

    return data;
}

function cleanup() {
    renderedContainers.forEach(({ destroy }) => destroy());
}

export { render, cleanup };
