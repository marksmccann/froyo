function isWithinDepth(child, target, maxDepth) {
    let parent = child.parentElement;
    let level = -1;

    if (maxDepth < 0) {
        return true;
    }

    while (parent && level < maxDepth) {
        if (parent === target) {
            return true;
        }

        level += 1;
        parent = parent.parentElement;
    }

    return false;
}

function querySelectorAll(target, query, options = {}) {
    const { depth = 2 } = options;
    const elements = Array.from(target.querySelectorAll(query));

    return elements.filter((element) => isWithinDepth(element, target, depth));
}

export default querySelectorAll;
