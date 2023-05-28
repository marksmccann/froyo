import defineComponent from '../src/defineComponent';

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
});
