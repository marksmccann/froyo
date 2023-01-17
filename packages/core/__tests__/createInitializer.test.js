import Component from '../src/Component';
import createInitializer from '../src/createInitializer';

describe('createInitializer', () => {
    it('should create initializer', () => {
        class Foo extends Component {
            render() {}
        }
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
});
