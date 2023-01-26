function setAttributes(target, attributes) {
    Object.entries(attributes ?? {}).forEach(([key, value]) => {
        if (value === null) {
            target.removeAttribute(key);
        } else {
            target.setAttribute(key, value);
        }
    });
}

export default setAttributes;
