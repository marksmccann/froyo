function createMediaQueryListener(
    query: string,
    callback: EventListenerOrEventListenerObject
) {
    const media = window.matchMedia(query);

    media.addEventListener('change', callback);

    return {
        media,
        destroy(): void {
            media.removeEventListener('change', callback);
        },
    };
}

export default createMediaQueryListener;
