function setAttributes(target, attributes) {
    Object.entries(attributes ?? {}).forEach(([key, value]) => {
        if (value === null) {
            target.removeAttribute(key);
        } else if (value !== undefined) {
            target.setAttribute(key, value);
        }
    });
}

export default setAttributes;
