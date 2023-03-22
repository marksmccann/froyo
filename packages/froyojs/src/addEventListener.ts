function addEventListener<
    T extends Window & typeof globalThis,
    K extends keyof WindowEventMap
>(
    target: T,
    type: K,
    listener: (this: Window, ev: WindowEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
): { destroy(): void };
function addEventListener<T extends Document, K extends keyof DocumentEventMap>(
    target: T,
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
): { destroy(): void };
function addEventListener<
    T extends HTMLElement,
    K extends keyof HTMLElementEventMap
>(
    target: T,
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
): { destroy(): void };
function addEventListener(
    target: Element | Document | (Window & typeof globalThis),
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
) {
    target.addEventListener(type, listener, options);

    return {
        destroy() {
            target.removeEventListener(type, listener, options);
        },
    };
}

export default addEventListener;
