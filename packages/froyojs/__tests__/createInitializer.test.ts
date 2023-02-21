/* eslint-disable max-classes-per-file */

import Component from '../src/Component';
import createInitializer from '../src/createInitializer';

describe('createInitializer', () => {
    it('should create initializer', () => {
        // prettier-ignore
        class Foo extends Component {}
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

    it('should fail if constructor is not valid', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        // @ts-ignore
        const initialize = createInitializer({ Foo: {} });
        const rootElement = document.createElement('div');

        rootElement.setAttribute('data-initialize', 'Foo');
        document.body.appendChild(rootElement);

        const instances = initialize();

        expect(instances).toHaveLength(0);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('is not a valid "Component" constructor')
        );

        rootElement.remove();
    });

    it('should fail if name is not valid', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        // @ts-ignore
        class Foo extends Component {}
        const initialize = createInitializer({ Foo });
        const rootElement = document.createElement('div');

        rootElement.setAttribute('data-initialize', '');
        document.body.appendChild(rootElement);

        const instances = initialize();

        expect(instances).toHaveLength(0);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('is not a valid "Component" constructor')
        );

        rootElement.remove();
    });
});
