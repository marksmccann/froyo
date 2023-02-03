function createMutationObserver(
    target: HTMLElement,
    callback: MutationCallback,
    options?: MutationObserverInit,
): FroyoComponentListener {
    const observer = new MutationObserver(callback);

    observer.observe(target, options);

    return {
        observer,
        destroy() {
            observer.disconnect();
        },
    };
}

export default createMutationObserver;
