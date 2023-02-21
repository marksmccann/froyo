import setAttributes from './setAttributes';

function createElement(
    tag: keyof HTMLElementTagNameMap,
    attributes?: { [key: string]: string } | null,
    children: string | Node = ''
) {
    const element = document.createElement(tag);

    if (attributes) {
        setAttributes(element, attributes);
    }

    if (typeof children === 'string') {
        element.innerHTML = children;
    } else {
        element.appendChild(children);
    }

    return element;
}

export default createElement;
