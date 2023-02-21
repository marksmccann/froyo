function setAttributes(
    target: Element,
    attributes: { [key: string]: string | null | undefined } = {}
) {
    Object.entries(attributes).forEach(([key, value]) => {
        if (value === null) {
            target.removeAttribute(key);
        } else if (value !== undefined) {
            target.setAttribute(key, value);
        }
    });
}

export default setAttributes;
