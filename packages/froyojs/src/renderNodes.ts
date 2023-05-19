/* eslint-disable no-param-reassign */

import type {
    RenderOption,
    ComponentNode,
    ComponentThis,
    ElementClasses,
    ElementAttributes,
    ElementContent,
    ElementStyle,
} from './types';
import logError from './logError';

function isObject<T extends Record<string, any>>(value: any): value is T {
    return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

function setElementAttributes(
    name: string,
    element: Element,
    attributes?: ElementAttributes
): void {
    if (isObject(attributes)) {
        Object.entries(attributes).forEach(([attribute, value]) => {
            if (typeof value === 'string') {
                element.setAttribute(attribute, value);
            } else if (value === null) {
                element.removeAttribute(attribute);
            } else if (typeof value === 'boolean') {
                if (value) {
                    element.setAttribute(attribute, '');
                } else {
                    element.removeAttribute(attribute);
                }
            } else if (value !== undefined) {
                logError('E02', { name, attribute, type: typeof value });
            }
        });
    } else if (attributes !== undefined) {
        logError('E01', { name });
    }
}

function setElementClasses(
    name: string,
    element: Element,
    classes?: ElementClasses
): void {
    if (isObject(classes)) {
        Object.entries(classes).forEach(([key, value]) => {
            if (value) {
                element.classList.add(key);
            } else {
                element.classList.remove(key);
            }
        });
    } else if (classes !== undefined) {
        logError('E03', { name });
    }
}

function setElementContent(
    name: string,
    element: Element,
    content?: ElementContent
): void {
    if (typeof content === 'string') {
        if (element.innerHTML !== content) {
            element.innerHTML = content;
        }
    } else if (content !== undefined) {
        logError('E04', { name });
    }
}

function setElementStyle(
    name: string,
    element: Element,
    style?: ElementStyle
): void {
    if (element instanceof HTMLElement) {
        if (typeof style === 'object' && style !== null) {
            Object.entries(style).forEach(([property, value]) => {
                if (typeof value === 'string') {
                    element.style.setProperty(property, value);
                } else if (value === null) {
                    element.style.removeProperty(property);
                } else if (value !== undefined) {
                    logError('E06', {
                        name,
                        property,
                        type: typeof value,
                    });
                }
            });
        } else if (style !== undefined) {
            logError('E05', { name });
        }
    } else {
        logError('E07', { name });
    }
}

function renderText(
    name: string,
    node: Text,
    value: ReturnType<RenderOption>
): void {
    if (typeof value === 'string') {
        // istanbul ignore else
        if (node.nodeValue !== value) {
            node.nodeValue = value;
        }
    } else {
        logError('E09', { name });
    }
}

function renderElement(
    name: string,
    element: Element,
    options: ReturnType<RenderOption>
): void {
    if (typeof options === 'string') {
        setElementContent(name, element, options);
    } else if (isObject(options)) {
        setElementAttributes(name, element, options.attributes);
        setElementClasses(name, element, options.classes);
        setElementContent(name, element, options.content);
        setElementStyle(name, element, options.style);
    } else {
        logError('E08', { name });
    }
}

function renderNodes(this: ComponentThis, tasks: Set<[string, RenderOption]>) {
    tasks.forEach(([name, render]) => {
        const node = this[name] as ComponentNode;
        const isArray = Array.isArray(node);
        let nodes: Array<Exclude<ComponentNode, any[] | null>> = [];

        if (isArray) {
            nodes = node;
        } else if (node !== null) {
            nodes.push(node);
        }

        nodes.forEach((target, index) => {
            const position = isArray ? index : undefined;
            const result = render.call(this, position);

            if (target instanceof Text) {
                renderText(name, target, result);
            } else {
                renderElement(name, target, result);
            }
        });
    });
}

export default renderNodes;
