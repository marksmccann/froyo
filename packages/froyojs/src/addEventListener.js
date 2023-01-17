function addEventListener(target, ...args) {
    target.addEventListener(...args);

    return {
        destroy() {
            target.removeEventListener(...args);
        },
    };
}

export default addEventListener;
