function setAttributes(target: HTMLElement, attributes: { [key: string]: string }): void {
    Object.entries(attributes ?? {}).forEach(([key, value]) => {
        if (value === null) {
            target.removeAttribute(key);
        } else {
            target.setAttribute(key, value);
        }
    });
}

export default setAttributes;
