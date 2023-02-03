function createMediaQueryListener(
    query: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
): FroyoComponentListener {
    const media = window.matchMedia(query);

    media.addEventListener('change', listener, options);

    return {
        media,
        destroy() {
            media.removeEventListener('change', listener, options);
        },
    };
}

export default createMediaQueryListener;
