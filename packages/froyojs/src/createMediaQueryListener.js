function createMediaQueryListener(query, callback) {
    const media = window.matchMedia(query);

    media.addEventListener('change', callback);

    return {
        media,
        destroy() {
            media.removeEventListener('change', callback);
        },
    };
}

export default createMediaQueryListener;
