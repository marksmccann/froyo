import defineComponent from '../src/defineComponent';
import { getErrorMessage } from '../src/logError';

describe('events', () => {
    it('should add listeners', () => {
        const callback = jest.fn();
        const Foo = defineComponent({
            nodes: {
                foo: {
                    type: 'element',
                    tagName: 'div',
                },
            },
            events: {
                $window() {
                    return {
                        click: () => callback('window'),
                    };
                },
                $document() {
                    return {
                        click: () => callback('document'),
                    };
                },
                $root() {
                    return {
                        click: () => callback('root'),
                    };
                },
                foo() {
                    return {
                        click: () => callback('node'),
                    };
                },
            },
            hooks: {
                $setup() {
                    this.$root.appendChild(this.foo);
                },
            },
        });

        const root = document.body.appendChild(document.createElement('div'));
        const instance = new Foo(root);

        root.getElementsByTagName('div')[0].click();

        expect(callback).toHaveBeenCalledTimes(4);
        expect(callback).toHaveBeenCalledWith('node');
        expect(callback).toHaveBeenCalledWith('root');
        expect(callback).toHaveBeenCalledWith('document');
        expect(callback).toHaveBeenCalledWith('window');

        root.remove();
        instance.destroy();
    });

    it('should error for unknown properties', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({
            name: 'Foo',
            events: {
                foo() {
                    return {
                        click: () => {},
                    };
                },
            },
        });

        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            getErrorMessage('E18', { name: 'Foo', property: 'foo' })
        );

        instance.destroy();
    });

    it('should pass index argument', () => {
        const callback = jest.fn();
        const Foo = defineComponent({
            nodes: {
                foo: {
                    type: 'query',
                    selector: 'div',
                },
                bar: {
                    type: 'query-all',
                    selector: 'div',
                },
            },
            events: {
                foo(index) {
                    callback(`query: ${index}`);

                    return {
                        click: () => {},
                    };
                },
                bar(index) {
                    callback(`query-all: ${index}`);

                    return {
                        click: () => {},
                    };
                },
            },
        });

        const root = document.createElement('div');
        root.innerHTML = '<div><div></div></div>';
        const instance = new Foo(root);

        expect(callback).toHaveBeenCalledTimes(3);
        expect(callback).toHaveBeenCalledWith('query: undefined');
        expect(callback).toHaveBeenCalledWith('query-all: 0');
        expect(callback).toHaveBeenCalledWith('query-all: 1');

        instance.destroy();
    });

    it('should require handlers to be functions', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({
            events: {
                // @ts-expect-error
                $root() {
                    return {
                        click: 'foo',
                    };
                },
            },
        });
        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining(
                getErrorMessage('E10', { name: '$root', type: 'click' })
            )
        );

        instance.destroy();
    });
});
