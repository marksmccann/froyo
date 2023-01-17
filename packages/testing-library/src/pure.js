import { getQueriesForElement } from '@testing-library/dom';
// import Component from '@vanillajs/core';

const renderedContainers = new Map();

function render(html, initialize, options = {}) {
    const { queries } = options;
    let { container, baseElement } = options;
    // let instances = {};
    // let instance;

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
        // const results = initialize(container);
        // a single instance
        // if (results.render) {
        //     instance = results;
        //     return;
        // }
        // multiple named instances
        // Object.entries(([key, value]) => {
        //     if (value.render) {
        //         instances[key] = value;
        //     } else {
        //         // console error
        //     }
        // });
    }

    const data = {
        container,
        baseElement,
        ...getQueriesForElement(baseElement, queries),
        rerender() {
            // const name = args.length > 1 ? args[0] : null;
            // const newState = args[args.length > 1 ? 1 : 0];
            // if (name && instances[name]) {
            //     instances[name].setState(newState);
            // } else if (instance) {
            //     instance.setState(newState);
            // }
        },
        destroy: () => {
            // Object.values(instances).forEach((component) => {
            //     component.destroy();
            // });
            // if (instance) {
            //     instance.destroy();
            // }
            // if (container.parentNode === document.body) {
            //     container.remove();
            // }
        },
    };

    renderedContainers.set(container, data);

    return data;
}

function cleanup() {
    renderedContainers.forEach(({ destroy }) => destroy());
    renderedContainers.clear();
}

export { render, cleanup };
