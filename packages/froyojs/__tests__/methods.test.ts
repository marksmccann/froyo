import defineComponent from '../src/defineComponent';
import { getErrorMessage } from '../src/logError';

describe('data', () => {
    it('should add properties to instance', () => {
        const Foo = defineComponent<{
            $root: Element;
            $state: {};
            foo: string;
            bar(): string;
        }>({
            methods: {
                bar() {
                    return this.foo;
                },
            },
            hooks: {
                $setup() {
                    this.foo = 'bar';

                    expect(this.foo).toBe('bar');
                    expect(this.bar()).toBe('bar');
                },
            },
        });

        const instance = new Foo(document.createElement('div'));

        instance.destroy();
    });

    it('should fail if value is not a function', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({
            name: 'Foo',
            methods: { foo: '' },
        });
        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            getErrorMessage('E28', { name: 'Foo', property: 'foo' })
        );

        instance.destroy();
    });
});
