import defineComponent from '../src/defineComponent';

describe('components', () => {
    it('should instantiate subcomponents', () => {
        const Foo = defineComponent({
            render: {
                $root() {
                    return 'Foo';
                },
            },
        });
        const Bar = defineComponent({
            components: {
                foo() {
                    return {
                        constructor: Foo,
                        root: this.$root,
                    };
                },
            },
        });

        const root = document.createElement('div');
        const instance = new Bar(root);

        expect(root.innerHTML).toBe('Foo');

        instance.destroy();
    });

    it('should synchronize states', () => {
        const Foo = defineComponent<{
            state: {
                active: boolean;
            };
        }>({
            state: {
                active: {
                    default: true,
                },
            },
            render: {
                $root() {
                    return this.active.toString();
                },
            },
        });
        const Bar = defineComponent<{
            state: {
                active: boolean;
            };
            components: {
                foo: typeof Foo;
            };
        }>({
            state: {
                active: {
                    default: true,
                },
            },
            components: {
                foo() {
                    return {
                        constructor: Foo,
                        root: this.$root,
                        state: {
                            active: this.active,
                        },
                        subscribe: {
                            active: (value) => {
                                this.active = value;
                            },
                        },
                    };
                },
            },
        });

        const root = document.createElement('div');
        const instance = new Bar(root);

        expect(root.innerHTML).toBe('true');

        instance.setState({ active: false });

        expect(root.innerHTML).toBe('false');

        instance.destroy();
    });
});
