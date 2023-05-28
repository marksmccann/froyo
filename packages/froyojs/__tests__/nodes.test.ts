import defineComponent from '../src/defineComponent';
import { getErrorMessage } from '../src/logError';

describe('nodes', () => {
    it('should add properties to instance', () => {
        const Foo = defineComponent({
            nodes: {
                text: {
                    type: 'text',
                },
                svg: {
                    type: 'svg',
                    tagName: 'a',
                },
                element: {
                    type: 'element',
                    tagName: 'div',
                },
                query1: {
                    type: 'query',
                    selector: 'div',
                },
                query2: {
                    type: 'query',
                    selector: 'foo',
                    optional: true,
                },
                queryAll1: {
                    type: 'query-all',
                    selector: 'div',
                },
                queryAll2: {
                    type: 'query-all',
                    selector: 'foo',
                    optional: true,
                },
            },
            hooks: {
                $setup() {
                    expect(this.text).toBeInstanceOf(Text);
                    expect(this.svg).toBeInstanceOf(SVGElement);
                    expect(this.element).toBeInstanceOf(HTMLElement);
                    expect(this.query1).toBeInstanceOf(HTMLElement);
                    expect(this.query2).toBeNull();
                    expect(Array.isArray(this.queryAll1)).toBe(true);
                    expect(this.queryAll1).toHaveLength(2);
                    expect(this.queryAll1[0]).toBeInstanceOf(HTMLElement);
                    expect(Array.isArray(this.queryAll2)).toBe(true);
                    expect(this.queryAll2).toHaveLength(0);
                },
            },
        });

        const root = document.createElement('div');
        root.innerHTML = '<div></div><div></div>';
        const instance = new Foo(root);

        instance.destroy();
    });

    it('should require query results', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent<{
            $root: Element;
            $state: {};
            query: HTMLElement;
            queryAll: HTMLElement[];
        }>({
            name: 'Foo',
            nodes: {
                query: {
                    type: 'query',
                    selector: 'foo',
                },
                queryAll: {
                    type: 'query-all',
                    selector: 'foo',
                },
            },
            hooks: {
                $setup() {
                    expect(this.query).toBeNull();
                    expect(this.queryAll).toHaveLength(0);
                },
            },
        });

        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            getErrorMessage('E16', {
                name: 'Foo',
                property: 'query',
                selector: 'foo',
            })
        );
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            getErrorMessage('E17', {
                name: 'Foo',
                property: 'queryAll',
                selector: 'foo',
            })
        );

        instance.destroy();
    });

    it('should make query results optional', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent({
            nodes: {
                query: {
                    type: 'query',
                    selector: 'foo',
                    optional: true,
                },
                queryAll: {
                    type: 'query-all',
                    selector: 'foo',
                    optional: true,
                },
            },
            hooks: {
                $setup() {
                    expect(this.query).toBeNull();
                    expect(this.queryAll).toHaveLength(0);
                },
            },
        });

        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(0);

        instance.destroy();
    });

    it('should modify scope for queries', () => {
        const Foo = defineComponent({
            nodes: {
                query1: {
                    type: 'query',
                    selector: 'div',
                },
                query2: {
                    type: 'query',
                    selector: 'div',
                    scope: () => document,
                },
                queryAll1: {
                    type: 'query-all',
                    selector: 'div',
                },
                queryAll2: {
                    type: 'query-all',
                    selector: 'div',
                    scope: () => document,
                },
            },
            hooks: {
                $setup() {
                    expect(this.query1).toBeNull();
                    expect(this.query2).toBeInstanceOf(HTMLDivElement);
                    expect(this.queryAll1).toHaveLength(0);
                    expect(this.queryAll2[0]).toBeInstanceOf(HTMLDivElement);
                },
            },
        });

        const div = document.body.appendChild(document.createElement('div'));
        const instance = new Foo(document.createElement('div'));

        div.remove();
        instance.destroy();
    });

    it('should add static data to elements', () => {
        const Foo = defineComponent({
            nodes: {
                svg: {
                    type: 'svg',
                    tagName: 'svg',
                    className: 'foo',
                    attributes: { 'data-foo': 'bar' },
                    content: 'foo',
                },
                element: {
                    type: 'element',
                    tagName: 'div',
                    className: 'foo',
                    attributes: { 'data-foo': 'bar' },
                    content: 'foo',
                },
            },
            hooks: {
                $setup() {
                    expect(this.svg).toHaveClass('foo');
                    expect(this.svg).toHaveAttribute('data-foo', 'bar');
                    expect(this.svg).toHaveTextContent('foo');
                    expect(this.element).toHaveClass('foo');
                    expect(this.element).toHaveAttribute('data-foo', 'bar');
                    expect(this.element).toHaveTextContent('foo');
                },
            },
        });

        const instance = new Foo(document.createElement('div'));

        instance.destroy();
    });
});
