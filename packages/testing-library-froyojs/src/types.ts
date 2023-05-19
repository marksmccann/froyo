import type { Queries, BoundFunction, queries } from '@testing-library/dom';
import { defineComponent } from 'froyojs';

export type ComponentConstructor = ReturnType<typeof defineComponent>;

export type ComponentInstance = InstanceType<ComponentConstructor>;

export type RenderResult<
    TComponent extends ComponentInstance = ComponentInstance,
    TContainer extends HTMLElement | DocumentFragment = HTMLElement,
    TBaseElement extends HTMLElement | DocumentFragment = TContainer,
    TQueries extends Queries = typeof queries
> = {
    container: TContainer;
    baseElement: TBaseElement;
    rerender(
        root: string | Element,
        stateChanges: Partial<TComponent['state']>
    ): void;
    destroy(): void;
} & {
    [P in keyof TQueries]: BoundFunction<TQueries[P]>;
};

export interface RenderOptions<
    TContainer extends HTMLElement | DocumentFragment = HTMLElement,
    TBaseElement extends HTMLElement | DocumentFragment = TContainer,
    TQueries extends Queries = typeof queries
> {
    container?: TContainer;
    baseElement?: TBaseElement;
    queries?: TQueries;
}
