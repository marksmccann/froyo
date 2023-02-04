/* eslint-disable no-console */

import { Component } from 'froyojs';
import { getQueriesForElement } from '@testing-library/dom';

const renderedContainers = new Map();

function render(html, initialize, options = {}) {
    const { queries } = options;
    let { container, baseElement } = options;
    let instances = [];

    if (!baseElement) {
        baseElement = container ?? document.body;
    }

    if (!container) {
        container = document.createElement('div');
        baseElement.appendChild(container);
    }

    // if the container was rendered previously,
    // return the saved data from before
    if (renderedContainers.has(container)) {
        return renderedContainers.get(container);
    }

    container.innerHTML = html.trim();

    if (initialize) {
        // the number of instances that already exist
        const instancesBefore = Component.instances.length;

        initialize();

        // retrieve the instances that were just created
        instances = Component.instances.reverse().slice(instancesBefore * -1);
    }

    const data = {
        baseElement,
        container,
        ...getQueriesForElement(baseElement, queries),
        rerender(root, newState = {}) {
            let rootElement = root;

            if (typeof root === 'string') {
                rootElement = container.querySelector(root);
            }

            const component = instances.find(
                (instance) => rootElement === instance.rootElement
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
            container.remove();
            if (baseElement !== document.body) baseElement.remove();
            instances.forEach((instance) => instance.destroy());
            renderedContainers.delete(container);
        },
    };

    renderedContainers.set(container, data);

    return data;
}

function cleanup() {
    renderedContainers.forEach(({ destroy }) => destroy());
}

export { render, cleanup };
