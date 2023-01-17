import setAttributes from './setAttributes';

function createElement(tag, attributes, children = '') {
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
