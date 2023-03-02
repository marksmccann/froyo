import type { ComponentEventListener } from './types';

function addEventListener(
    target: EventTarget,
    type: keyof HTMLElementEventMap,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
): ComponentEventListener {
    target.addEventListener(type, listener, options);

    return {
        destroy() {
            target.removeEventListener(type, listener, options);
        },
    };
}

export default addEventListener;
