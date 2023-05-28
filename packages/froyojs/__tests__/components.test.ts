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
            $root: Element;
            $state: { active: boolean };
        }>({
            state: {
                active: {
                    default: true,
                },
            },
            render: {
                $root() {
                    return this.$state.active.toString();
                },
            },
        });
        const Bar = defineComponent<{
            $root: Element;
            $state: { active: boolean };
            foo: InstanceType<typeof Foo>;
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
                            active: this.$state.active,
                        },
                        subscribe: {
                            active: (value) => {
                                this.$state.active = value;
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
