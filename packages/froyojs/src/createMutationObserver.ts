function createMutationObserver(
    target: Node,
    callback: MutationCallback,
    options: MutationObserverInit
) {
    const observer = new MutationObserver(callback);

    observer.observe(target, options);

    return {
        observer,
        destroy(): void {
            observer.disconnect();
        },
    };
}

export default createMutationObserver;
