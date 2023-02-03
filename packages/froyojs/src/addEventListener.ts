function addEventListener(
    target: HTMLElement,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
): FroyoComponentListener {
    target.addEventListener(type, listener, options);

    return {
        destroy() {
            target.removeEventListener(type, listener, options);
        },
    };
}

export default addEventListener;
