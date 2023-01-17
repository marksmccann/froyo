function createMutationObserver(target, callback, options) {
    const observer = new MutationObserver(callback);

    observer.observe(target, options);

    return {
        observer,
        destroy() {
            observer.disconnect();
        },
    };
}
