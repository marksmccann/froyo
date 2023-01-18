import Component from '../src/Component';
import createInitializer from '../src/createInitializer';

describe('createInitializer', () => {
    it('should create initializer', () => {
        // prettier-ignore
        class Foo extends Component { render() {} }
        const initialize = createInitializer({ Foo });
        const rootElement = document.createElement('div');

        rootElement.setAttribute('data-initialize', 'Foo');
        document.body.appendChild(rootElement);

        const instances = initialize();

        expect(instances).toHaveLength(1);
        expect(instances[0]).toBeInstanceOf(Foo);
        expect(rootElement).not.toHaveAttribute('data-initialize');

        rootElement.remove();
    });

    it('should fail if class is not valid', () => {
        global.consoleErrorSpy.mockImplementation(() => {});

        const initialize = createInitializer({ Foo: {} });
        const rootElement = document.createElement('div');

        rootElement.setAttribute('data-initialize', 'Foo');
        document.body.appendChild(rootElement);

        const instances = initialize();

        expect(instances).toHaveLength(0);
        expect(global.consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(global.consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('is not a valid "Component" constructor')
        );

        rootElement.remove();
    });
});
