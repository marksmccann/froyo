import defineComponent from '../src/defineComponent';
import { getErrorMessage } from '../src/logError';

describe('hooks', () => {
    it('should render root element', () => {
        const Foo = defineComponent({
            state: {
                foo: {
                    default: 'foo',
                },
            },
            render: {
                $root() {
                    return this.$state.foo;
                },
            },
        });
        const root = document.createElement('div');
        const instance = new Foo(root);

        expect(root.innerHTML).toBe('foo');

        instance.setState({ foo: 'bar' });

        expect(root.innerHTML).toBe('bar');

        instance.destroy();
    });

    it('should render text', () => {
        const Foo = defineComponent<{
            $root: Element;
            $state: {
                foo: string;
            };
            text: Text;
        }>({
            state: {
                foo: {
                    default: 'foo',
                },
            },
            nodes: {
                text: {
                    type: 'text',
                },
            },
            render: {
                text() {
                    return this.$state.foo;
                },
            },
            hooks: {
                $setup() {
                    this.$root.appendChild(this.text);
                },
            },
        });
        const root = document.createElement('div');
        const instance = new Foo(root);

        expect(root.innerHTML).toBe('foo');

        instance.setState({ foo: 'bar' });

        expect(root.innerHTML).toBe('bar');

        instance.destroy();
    });

    it('should pass index argument', () => {
        const callback = jest.fn();
        const Foo = defineComponent<{
            $root: Element;
            $state: {};
            foo: HTMLElement;
            bar: HTMLElement[];
        }>({
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
            render: {
                // @ts-expect-error
                foo(index) {
                    callback(`query: ${index}`);

                    return '';
                },
                bar(index) {
                    callback(`query-all: ${index}`);

                    return '';
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

    it('should render element classes', () => {
        const Foo = defineComponent<{
            $root: Element;
            $state: {
                foo: boolean;
            };
        }>({
            state: {
                foo: {
                    default: true,
                },
            },
            render: {
                $root() {
                    return {
                        classes: {
                            foo: this.$state.foo,
                        },
                    };
                },
            },
        });
        const root = document.createElement('div');
        const instance = new Foo(root);

        expect(root).toHaveClass('foo');

        instance.setState({ foo: false });

        expect(root).not.toHaveClass('foo');

        instance.destroy();
    });

    it('should render element attributes', () => {
        const Foo = defineComponent<{
            $root: Element;
            $state: {
                foo: boolean;
            };
        }>({
            state: {
                foo: {
                    default: true,
                },
            },
            render: {
                $root() {
                    return {
                        attributes: {
                            /* eslint-disable jest/no-conditional-in-test */
                            'data-foo': this.$state.foo ? 'bar' : null,
                            'data-bar': this.$state.foo ? 'bar' : undefined,
                            hidden: this.$state.foo,
                            /* eslint-enable jest/no-conditional-in-test */
                        },
                    };
                },
            },
        });
        const root = document.createElement('div');
        const instance = new Foo(root);

        expect(root).toHaveAttribute('data-foo', 'bar');
        expect(root).toHaveAttribute('data-bar', 'bar');
        expect(root).toHaveAttribute('hidden');

        instance.setState({ foo: false });

        expect(root).not.toHaveAttribute('data-foo');
        expect(root).toHaveAttribute('data-bar', 'bar');
        expect(root).not.toHaveAttribute('hidden');

        instance.destroy();
    });

    it('should render element styles', () => {
        const Foo = defineComponent<{
            $root: HTMLElement;
            $state: {
                foo: boolean;
            };
        }>({
            state: {
                foo: {
                    default: true,
                },
            },
            render: {
                $root() {
                    return {
                        style: {
                            /* eslint-disable jest/no-conditional-in-test */
                            display: this.$state.foo ? 'none' : 'block',
                            color: this.$state.foo ? 'red' : undefined,
                            background: this.$state.foo ? 'white' : null,
                            /* eslint-enable jest/no-conditional-in-test */
                        },
                    };
                },
            },
        });
        const root = document.createElement('div');
        const instance = new Foo(root);

        expect(root).toHaveStyle({ display: 'none' });
        expect(root).toHaveStyle({ color: 'red' });
        expect(root).toHaveStyle({ background: 'white' });

        instance.setState({ foo: false });

        expect(root).toHaveStyle({ display: 'block' });
        expect(root).toHaveStyle({ color: 'red' });
        expect(root).toHaveStyle({ background: null });

        instance.destroy();
    });

    it('should not render styles on non-HTML element', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent<{
            $root: Element;
            $state: {};
            svg: SVGElement;
        }>({
            nodes: {
                svg: {
                    type: 'svg',
                    tagName: 'svg',
                },
            },
            render: {
                // @ts-expect-error
                svg() {
                    return {
                        style: {
                            display: 'none',
                        },
                    };
                },
            },
            hooks: {
                $setup() {
                    this.$root.appendChild(this.svg);
                },
            },
        });
        const root = document.createElement('div');
        const instance = new Foo(root);

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining(getErrorMessage('E07', { name: 'svg' }))
        );

        instance.destroy();
    });

    it('should render element content', () => {
        const Foo = defineComponent<{
            $root: Element;
            $state: {
                foo: string;
            };
        }>({
            state: {
                foo: {
                    default: 'foo',
                },
            },
            render: {
                $root() {
                    return {
                        content: this.$state.foo,
                    };
                },
            },
        });
        const root = document.createElement('div');
        const instance = new Foo(root);

        expect(root.innerHTML).toBe('foo');

        instance.setState({ foo: 'bar' });

        expect(root.innerHTML).toBe('bar');

        instance.destroy();
    });

    it('should require render return to be a string or object', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({
            render: {
                // @ts-expect-error
                $root() {
                    return null;
                },
            },
        });
        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining(getErrorMessage('E08', { name: '$root' }))
        );

        instance.destroy();
    });

    it('should require element content to be a string', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({
            render: {
                // @ts-expect-error
                $root() {
                    return {
                        content: null,
                    };
                },
            },
        });
        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining(getErrorMessage('E04', { name: '$root' }))
        );

        instance.destroy();
    });

    it('should require element attributes to be an object', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({
            render: {
                // @ts-expect-error
                $root() {
                    return {
                        attributes: null,
                    };
                },
            },
        });
        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining(getErrorMessage('E01', { name: '$root' }))
        );

        instance.destroy();
    });

    it('should require element attribute values to be a valid type', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({
            render: {
                // @ts-expect-error
                $root() {
                    return {
                        attributes: {
                            'data-foo': [],
                        },
                    };
                },
            },
        });
        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining(
                getErrorMessage('E02', {
                    name: '$root',
                    type: typeof [],
                    attribute: 'data-foo',
                })
            )
        );

        instance.destroy();
    });

    it('should require element classes to be an object', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({
            render: {
                // @ts-expect-error
                $root() {
                    return {
                        classes: null,
                    };
                },
            },
        });
        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining(getErrorMessage('E03', { name: '$root' }))
        );

        instance.destroy();
    });

    it('should require element style to be an object', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({
            render: {
                // @ts-expect-error
                $root() {
                    return {
                        style: null,
                    };
                },
            },
        });
        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining(getErrorMessage('E05', { name: '$root' }))
        );

        instance.destroy();
    });

    it('should require element style values to be a valid type', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({
            render: {
                // @ts-expect-error
                $root() {
                    return {
                        style: {
                            display: [],
                        },
                    };
                },
            },
        });
        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining(
                getErrorMessage('E06', {
                    name: '$root',
                    property: 'display',
                    type: typeof [],
                })
            )
        );

        instance.destroy();
    });

    it('should require test return to be a string', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({
            nodes: {
                foo: {
                    type: 'text',
                },
            },
            render: {
                // @ts-expect-error
                foo() {
                    return null;
                },
            },
        });
        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining(getErrorMessage('E09', { name: 'foo' }))
        );

        instance.destroy();
    });

    it('should not fail on render of null node', () => {
        const Foo = defineComponent({
            nodes: {
                foo: {
                    type: 'query',
                    selector: 'foo',
                    optional: true,
                },
            },
            render: {
                foo() {
                    return '';
                },
            },
        });

        expect(() => new Foo(document.createElement('div'))).not.toThrow();
    });

    it('should fail if render entry is unknown', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent<{
            $root: Element;
            $state: {};
        }>({
            name: 'Foo',
            render: {
                // @ts-expect-error
                foo: () => {},
            },
        });
        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            getErrorMessage('E20', {
                name: 'Foo',
                property: 'foo',
            })
        );

        instance.destroy();
    });
});
