import querySelectorAll from './querySelectorAll';

function querySelector(...args) {
    return querySelectorAll(...args)[0] ?? null;
}

export default querySelector;
