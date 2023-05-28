import logError from './logError';

function attachEvents<
    N extends string,
    T extends Node | Document | (Window & typeof globalThis),
    E extends Record<string, (...args: any) => any>
>(name: N, target: T, events: E) {
    const cleanup: Set<() => void> = new Set();

    Object.entries(events).forEach(([type, handler]) => {
        const options = /^(focus|blur)$/.test(type);

        if (typeof handler === 'function') {
            target.addEventListener(type, handler, options);

            cleanup.add(() => {
                target.removeEventListener(type, handler, options);
            });
        } else {
            logError('E10', { type, name });
        }
    });

    return () => {
        cleanup.forEach((removeEventListener) => removeEventListener());
    };
}

export default attachEvents;
