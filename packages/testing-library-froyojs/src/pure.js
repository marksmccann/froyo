/* eslint-disable no-console */

import { getQueriesForElement } from '@testing-library/dom';
import { Component } from 'froyojs';

const renderedContainers = new Map();

function render(html, initialize, options = {}) {
    const { queries } = options;
    let { container, baseElement } = options;
    let instance;

    if (!baseElement) {
        baseElement = container ?? document.body;
    }

    if (!container) {
        container = document.createElement('div');
        baseElement.appendChild(container);
    }

    // append the markup to the container
    if (typeof html === 'string') {
        container.innerHTML = html.trim();
    } else {
        container.appendChild(html);
    }

    // if the container was rendered previously
    // return the saved data from before
    if (renderedContainers.has(container)) {
        return renderedContainers.get(container);
    }

    if (initialize) {
        instance = initialize(container);

        if (!(instance instanceof Component)) {
            console.error(
                'Warning: the initialize callback must return a Froyo component'
            );
        }
    }

    const data = {
        container,
        baseElement,
        ...getQueriesForElement(baseElement, queries),
        rerender(newState = {}) {
            if (instance) {
                instance.setState(newState);
            }
        },
        destroy() {
            if (instance) {
                instance.destroy();
            }

            if (renderedContainers.has(container)) {
                renderedContainers.delete(container);
            }

            if (container.parentNode === document.body) {
                container.remove();
            }
        },
    };

    renderedContainers.set(container, data);

    return data;
}

function cleanup() {
    renderedContainers.forEach(({ destroy }) => destroy());
}

export { render, cleanup };
