import defineComponent from '../src/defineComponent';
import { getErrorMessage } from '../src/logError';

describe('state', () => {
    it('should default value', () => {
        const Foo = defineComponent({ state: { foo: { default: 'foo' } } });
        const instance = new Foo(document.createElement('div'));

        expect(instance.state.foo).toBe('foo');

        instance.destroy();
    });

    it('should type-check value', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({
            state: {
                boolean: { type: Boolean, default: 'foo' },
                string: { type: String, default: true },
                date: { type: Date, default: 'foo' },
                array: { type: Array, default: 'foo' },
                object: { type: Object, default: 'foo' },
                custom: { type: class Foo {}, default: 'foo' },
            },
        });
        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(6);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('type check failed')
        );

        instance.destroy();
    });

    it('should not type-check in production', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const env = process.env.NODE_ENV;
        process.env.NODE_ENV = 'production';

        const Foo = defineComponent({
            state: {
                boolean: { type: Boolean, default: 'foo' },
            },
        });
        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(0);

        process.env.NODE_ENV = env;
        instance.destroy();
    });

    it('should not fail if state type is invalid', () => {
        const Foo = defineComponent({
            // @ts-expect-error
            state: { foo: { type: 'foo' } },
        });

        expect(() => {
            const instance = new Foo(document.createElement('div'));

            instance.destroy();
        }).not.toThrow();
    });

    it('should require value', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({
            state: { foo: { required: true } },
        });
        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('missing required property')
        );

        instance.destroy();
    });

    it('should not update if readonly', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({
            name: 'Foo',
            state: { foo: { readonly: true } },
        });
        const instance = new Foo(document.createElement('div'), { foo: 'foo' });

        instance.setState({ foo: 'foo' });

        expect(instance.state.foo).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            getErrorMessage('E21', { name: 'Foo', property: 'foo' })
        );

        instance.destroy();
    });
});
