import setAttributes from './setAttributes';

function createElement(
    tag: keyof HTMLElementTagNameMap,
    attributes: { [key: string]: string } = {},
    children: string | Node = ''
): HTMLElement {
    const element = document.createElement(tag);

    setAttributes(element, attributes);

    if (typeof children === 'string') {
        element.innerHTML = children;
    } else {
        element.appendChild(children);
    }

    return element;
}

export default createElement;
