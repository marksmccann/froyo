function querySelectorAll(target: HTMLElement, query: string): HTMLElement[] {
    return Array.from(target.querySelectorAll(query));
}

export default querySelectorAll;
