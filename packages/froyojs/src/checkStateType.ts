import type { StateOption } from './types';
import logError from './logError';

const simpleTypes = /^(String|Number|Boolean|Function|Symbol|BigInt)$/;
const mainTypes =
    /^(String|Number|Boolean|Function|Symbol|BigInt|Object|Array|null)$/;

function getType(value: StateOption<any>['type']): string {
    let typeName = '';

    if (value) {
        const match = value.toString().match(/^\s*(function|class) (\w+)/);

        // istanbul ignore next
        typeName = match ? match[2] : '';
    }

    return typeName;
}

function checkStateType(
    property: string,
    value: any,
    option: StateOption<any>
): void {
    const { type, required } = option;

    if (required && value === undefined) {
        logError('E11', { property });
    } else if (value !== undefined && value !== null) {
        const expectedType = getType(type);
        const matchesType = typeof value === expectedType.toLowerCase();

        if (
            (simpleTypes.test(expectedType) && !matchesType) ||
            (expectedType === 'Object' && typeof value !== 'object') ||
            (expectedType === 'Array' && !Array.isArray(value)) ||
            (type && !mainTypes.test(expectedType) && !(value instanceof type))
        ) {
            logError('E12', { property, type: expectedType });
        }
    }
}

export default checkStateType;
