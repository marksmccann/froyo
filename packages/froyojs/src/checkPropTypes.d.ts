// "checkPropTypes" must be imported directly for produce
// the smallest bundle size, however types do not exist for
// that export so the module must be declared manually
declare module 'prop-types/checkPropTypes' {
    import { checkPropTypes } from '@types/prop-types';

    export default checkPropTypes;
}
