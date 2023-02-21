function setClasses(target: Element, classes: { [key: string]: boolean }) {
    Object.entries(classes).forEach((entry) => {
        target.classList[entry[1] ? 'add' : 'remove'](entry[0]);
    });
}

export default setClasses;
