import defineComponent from '../src/defineComponent';

describe('hooks', () => {
    it('should call setup hook', () => {
        const callback = jest.fn();
        const Foo = defineComponent({
            state: {
                foo: {
                    default: 'foo',
                },
            },
            hooks: {
                $setup() {
                    callback(this.$state.foo);
                },
            },
        });
        const instance = new Foo(document.createElement('div'));

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith('foo');

        instance.destroy();
    });

    it('should call teardown hook', () => {
        const callback = jest.fn();
        const Foo = defineComponent({
            state: {
                foo: {
                    default: 'foo',
                },
            },
            hooks: {
                $teardown() {
                    callback(this.$state.foo);
                },
            },
        });
        const instance = new Foo(document.createElement('div'));

        instance.destroy();

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith('foo');
    });

    it('should call state hook', () => {
        const callback = jest.fn();
        const Foo = defineComponent({
            state: {
                foo: {
                    default: 'foo',
                },
            },
            hooks: {
                foo() {
                    callback(this.$state.foo);
                },
            },
        });
        const instance = new Foo(document.createElement('div'));

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith('foo');

        instance.setState({ foo: 'bar' });

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenCalledWith('bar');

        instance.destroy();
    });
});
