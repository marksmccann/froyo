/* eslint-disable no-console */

import { getQueriesForElement } from '@testing-library/dom';
import { Component, createElement } from 'froyojs';

const renderedRootElements = new Map();

function render(root, initialize, options = {}) {
    const { queries, container } = options;
    let { baseElement } = options;
    let rootElement = root;
    let instance;

    if (typeof root === 'string') {
        const element = createElement('div', null, root.trim());

        rootElement = element.firstElementChild;
    }

    if (!(rootElement instanceof HTMLElement)) {
        console.error(
            'Warning: the root element must be a valid HTML element or string'
        );

        return {};
    }

    if (!baseElement) {
        baseElement = container ?? document.body;
    }

    if (container) {
        container.appendChild(rootElement);
    } else {
        baseElement.appendChild(rootElement);
    }

    // if the root element was rendered previously
    // return the saved data from before
    if (renderedRootElements.has(rootElement)) {
        return renderedRootElements.get(rootElement);
    }

    if (initialize) {
        instance = initialize(rootElement);
    }

    if (!(instance instanceof Component)) {
        console.error(
            'Warning: initialize must be a function that returns a Froyo component'
        );

        return {};
    }

    const data = {
        baseElement,
        rootElement,
        ...getQueriesForElement(baseElement, queries),
        rerender(newState = {}) {
            instance.setState(newState);
        },
        destroy() {
            instance.destroy();
            rootElement.remove();

            // only remove the container if it has no content
            if (/^[\n\r\s]*$/.test(container?.innerHTML)) {
                container.remove();
            }

            if (renderedRootElements.has(rootElement)) {
                renderedRootElements.delete(rootElement);
            }
        },
    };

    renderedRootElements.set(rootElement, data);

    return data;
}

function cleanup() {
    renderedRootElements.forEach(({ destroy }) => destroy());
}

export { render, cleanup };
