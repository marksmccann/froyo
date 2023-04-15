import defineComponent from '../src/defineComponent';

describe('data', () => {
    it('should add properties to instance', () => {
        const Foo = defineComponent<{
            data: {
                foo: string;
                bar(): string;
            };
        }>({
            data: {
                foo: 'bar',
                bar() {
                    return this.foo;
                },
            },
            hooks: {
                $setup() {
                    expect(this.foo).toBe('bar');
                    expect(this.bar()).toBe('bar');
                },
            },
        });

        const instance = new Foo(document.createElement('div'));

        instance.destroy();
    });
});
