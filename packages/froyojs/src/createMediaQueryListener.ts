import type { ComponentMediaQueryListener } from './types';

function createMediaQueryListener(
    query: string,
    callback: EventListenerOrEventListenerObject
): ComponentMediaQueryListener {
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
