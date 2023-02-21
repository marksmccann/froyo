// manually declare this module for smaller bundle
declare module 'prop-types/checkPropTypes' {
    export default function checkPropTypes(
        typeSpecs: any,
        values: any,
        location: string,
        componentName: string,
        getStack?: () => any
    ): void;
}
