import defineComponent from '../src/defineComponent';
import { getErrorMessage } from '../src/logError';

describe('instantiation', () => {
    it('should fail if root element is missing', () => {
        const Foo = defineComponent({});

        // @ts-expect-error
        expect(() => new Foo()).toThrow(/root must be a valid HTML element/);
    });

    it('should set state via root element', () => {
        const Foo = defineComponent({ state: { foo: {} } });
        const initialState = JSON.stringify({ foo: 'bar' });
        const root = document.createElement('div');
        root.setAttribute('data-state', initialState);
        const instance = new Foo(root);

        expect(instance.state.foo).toBe('bar');

        instance.destroy();
    });

    it('should set state via constructor', () => {
        const Foo = defineComponent({ state: { foo: {} } });
        const root = document.createElement('div');
        const instance = new Foo(root, { foo: 'bar' });

        expect(instance.state.foo).toBe('bar');

        instance.destroy();
    });

    it('should favor state from constructor over root element', () => {
        const Foo = defineComponent({ state: { foo: {} } });
        const initialState = JSON.stringify({ foo: 'bar' });
        const root = document.createElement('div');
        root.setAttribute('data-state', initialState);
        const instance = new Foo(root, { foo: 'baz' });

        expect(instance.state.foo).toBe('baz');

        instance.destroy();
    });

    it('should fail if state on root element is invalid JSON', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({});
        const root = document.createElement('div');
        root.setAttribute('data-state', '');
        const instance = new Foo(root);

        expect(instance.state).toStrictEqual(expect.objectContaining({}));
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('must contain valid JSON')
        );

        instance.destroy();
    });

    it('should initialize with a query selector', () => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        root.setAttribute('id', 'foo');

        const Foo = defineComponent({
            hooks: {
                $setup() {
                    expect(this.$root).toStrictEqual(root);
                },
            },
        });

        const instance = new Foo('#foo');

        instance.destroy();
        root.remove();
    });

    it('should fail if root element is invalid', () => {
        const Foo = defineComponent({});

        // @ts-expect-error
        expect(() => new Foo()).toThrow(/root must be a valid HTML element/);
    });

    it('should fail if root element is invalid in production', () => {
        const env = process.env.NODE_ENV;
        process.env.NODE_ENV = 'production';

        const Foo = defineComponent({});

        // @ts-expect-error
        expect(() => new Foo()).toThrow(/An unknown error has ocurred/);

        process.env.NODE_ENV = env;
    });

    it('should subscribe to instance', () => {
        const callback = jest.fn();
        const Foo = defineComponent({ state: { foo: { default: '' } } });
        const instance = new Foo(document.createElement('div'));

        instance.subscribe('foo', callback);
        instance.subscribe('foo', callback); // subscribe twice for code coverage
        instance.setState({ foo: 'bar' });

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith('bar', '');

        instance.unsubscribe('foo', callback);
        instance.setState({ foo: 'bar' });

        expect(callback).toHaveBeenCalledTimes(1);

        instance.destroy();
    });

    it('should fail if subscribe to unknown state', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({ name: 'Foo' });
        const instance = new Foo(document.createElement('div'));

        instance.subscribe('foo', () => {});
        instance.unsubscribe('foo', () => {});

        expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            getErrorMessage('E23', { name: 'Foo', property: 'foo' })
        );
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            getErrorMessage('E25', { name: 'Foo', property: 'foo' })
        );

        instance.destroy();
    });

    it('should fail if observer is invalid', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({ name: 'Foo', state: { foo: {} } });
        const instance = new Foo(document.createElement('div'));

        // @ts-expect-error
        instance.subscribe('foo');

        // @ts-expect-error
        instance.unsubscribe('foo');

        expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            getErrorMessage('E24', { name: 'Foo', property: 'foo' })
        );
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            getErrorMessage('E26', { name: 'Foo', property: 'foo' })
        );

        instance.destroy();
    });

    it('should be able to access static and class data', () => {
        const Foo = defineComponent({
            name: 'Foo',
            state: { foo: { default: 'bar' } },
        });
        const rootElement = document.createElement('div');
        const instance = new Foo(rootElement);

        expect(Foo.displayName).toBe('Foo');
        expect(instance.root).toStrictEqual(rootElement);
        expect(instance.state).toStrictEqual({ foo: 'bar' });

        instance.destroy();
    });
});
