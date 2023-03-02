/* eslint-disable no-console */

import { Component } from 'froyojs';
import { getQueriesForElement } from '@testing-library/dom';
import type { Queries, BoundFunction, queries } from '@testing-library/dom';

export type RenderResult<
    Q extends Queries = typeof queries,
    Container extends Element | DocumentFragment = HTMLElement,
    BaseElement extends Element | DocumentFragment = Container
> = {
    container: Container;
    baseElement: BaseElement;
    rerender: (
        root: HTMLElement | string,
        newState?: { [key: string]: any }
    ) => void;
    destroy: () => void;
} & { [P in keyof Q]: BoundFunction<Q[P]> };

export interface RenderOptions<
    Q extends Queries = typeof queries,
    Container extends Element | DocumentFragment = HTMLElement,
    BaseElement extends Element | DocumentFragment = Container
> {
    container?: Container;
    baseElement?: BaseElement;
    queries?: Q;
}

const renderedContainers: Map<HTMLElement, RenderResult> = new Map();

function render<H extends string, T extends Component>(
    html: H,
    initialize?: (() => T | T[]) | null,
    options: RenderOptions = {}
): RenderResult {
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
        rerender(
            root: HTMLElement | string,
            newState: { [key: string]: any } = {}
        ) {
            let rootElement: Element;

            if (typeof root === 'string') {
                const element = containerElement.querySelector(root);

                if (element) rootElement = element;
            } else {
                rootElement = root;
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
