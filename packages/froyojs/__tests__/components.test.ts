import defineComponent from '../src/defineComponent';
import { getErrorMessage } from '../src/logError';

describe('components', () => {
    it('should instantiate subcomponents', () => {
        const Foo = defineComponent({
            render: {
                $root() {
                    return 'Foo';
                },
            },
        });
        const Bar = defineComponent<{
            $root: Element;
            $state: {};
            foo: InstanceType<typeof Foo>;
        }>({
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

    it('should fail if subscribe value is not a function', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent<{
            $root: Element;
            $state: { foo: string };
        }>({
            name: 'Foo',
            state: {
                foo: {
                    default: 'foo',
                },
            },
        });
        const Bar = defineComponent<{
            $root: Element;
            $state: {};
            foo: InstanceType<typeof Foo>;
        }>({
            name: 'Bar',
            components: {
                // @ts-expect-error
                foo() {
                    return {
                        constructor: Foo,
                        root: this.$root,
                        subscribe: {
                            foo: 'foo',
                        },
                    };
                },
            },
        });
        const instance = new Bar(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            getErrorMessage('E29', {
                name: 'Bar',
                component: 'Foo',
                property: 'foo',
            })
        );

        instance.destroy();
    });

    it('should fail if invalid component is applied', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Foo = defineComponent<{
            $root: Element;
            $state: {};
            foo: string;
        }>({
            name: 'Foo',
            components: {
                foo() {
                    return {
                        constructor: 'foo',
                        root: this.$root,
                    };
                },
            },
        });
        const instance = new Foo(document.createElement('div'));

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            getErrorMessage('E27', {
                name: 'Foo',
                property: 'foo',
            })
        );

        instance.destroy();
    });
});
