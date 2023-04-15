import type {
    Constructor,
    ConditionalKeys,
    Simplify,
    SetRequired,
} from 'type-fest';

/* state */

type StateType<T> = T extends string
    ? Constructor<String>
    : T extends boolean
    ? Constructor<Boolean>
    : T extends number
    ? Constructor<Number>
    : Constructor<T>;

export type StateOption<T = any> = {
    type?: StateType<T>;
    default?: T;
    required?: true;
    readonly?: true;
};

export type ComponentState = Record<string, any>;

export type StateOptionList<
    T extends NormalizedComponentTypes = NormalizedComponentTypes
> = {
    [K in keyof T['state']]: StateOption<T['state'][K]>;
};

/* nodes */

type GetTagNameFromElement<T extends ComponentNode> = T extends SVGElement
    ? ConditionalKeys<SVGElementTagNameMap, T>
    : T extends HTMLElement
    ? ConditionalKeys<HTMLElementTagNameMap, T>
    : string;

export type ComponentNode = Text | Element | Element[] | null;

export type ComponentNodes = Record<string, ComponentNode>;

type NodeOption<T extends ComponentNode = ComponentNode> =
    | {
          type: 'text';
          value?: string;
      }
    | {
          type: 'element';
          tagName: GetTagNameFromElement<T>;
      }
    | {
          type: 'svg';
          tagName: GetTagNameFromElement<T>;
      }
    | {
          type: 'query';
          selector: string;
          optional?: true;
          scope?: Element | Document;
      }
    | {
          type: 'query-all';
          selector: string;
          optional?: true;
          scope?: Element | Document;
      };

export type NodeOptionList<
    T extends NormalizedComponentTypes = NormalizedComponentTypes
> = {
    [K in keyof T['nodes']]: Simplify<
        T['nodes'][K] extends Text
            ? Extract<NodeOption, { type: 'text' }>
            : T['nodes'][K] extends Array<infer U extends Element>
            ? Extract<NodeOption<U>, { type: 'query-all' }>
            : T['nodes'][K] extends SVGElement
            ? Extract<NodeOption<T['nodes'][K]>, { type: 'svg' }>
            : T['nodes'][K] extends HTMLElement
            ?
                  | Omit<
                        Extract<NodeOption<T['nodes'][K]>, { type: 'element' }>,
                        'optional'
                    >
                  | Omit<
                        Extract<NodeOption<T['nodes'][K]>, { type: 'query' }>,
                        'optional'
                    >
            : T['nodes'][K] extends Element | null
            ? null extends T['nodes'][K]
                ? SetRequired<
                      Extract<NodeOption<T['nodes'][K]>, { type: 'query' }>,
                      'optional'
                  >
                : Omit<
                      Extract<NodeOption<T['nodes'][K]>, { type: 'query' }>,
                      'optional'
                  >
            : NodeOption
    >;
};

/* data */

export type ComponentData = Record<string, any>;

export type DataOptionList<
    T extends NormalizedComponentTypes = NormalizedComponentTypes
> = {
    [K in keyof T['data']]: T['data'][K];
};

/* this */

export type ComponentThis<
    T extends NormalizedComponentTypes = NormalizedComponentTypes
> = {
    $root: T['root'];
} & T['state'] &
    T['nodes'] &
    T['data'];

/* class */

export type ComponentRoot = string | Element;

export type ComponentObserver<T = any> = (
    this: void,
    value: T,
    previousValue: T
) => void;

export interface ComponentInstance<
    T extends ComponentTypes = ComponentTypes,
    N extends NormalizedComponentTypes = NormalizedComponentTypes<T>,
    S extends ComponentState = N['state']
> {
    get state(): S;
    get root(): N['root'];
    destroy(): void;
    setState(stateChanges: Partial<S>): void;
    subscribe<P extends keyof S, O extends ComponentObserver<S[P]>>(
        property: P,
        observer: O
    ): void;
    unsubscribe<P extends keyof S, O extends ComponentObserver<S[P]>>(
        property: P,
        observer: O
    ): void;
}

export interface ComponentConstructor<
    T extends ComponentTypes = ComponentTypes,
    N extends NormalizedComponentTypes = NormalizedComponentTypes<T>
> {
    $$typeof: symbol;
    new (
        root: ComponentRoot,
        state?: Partial<N['state']>
    ): ComponentInstance<T>;
    get displayName(): string;
}

/* components */

export type ComponentComponents = Record<string, any>;

type ComponentOption<
    C extends ComponentConstructor,
    S = ConstructorParameters<C>[1]
> = {
    constructor: C;
    root: ComponentRoot;
    state?: S;
    subscribe?: {
        [K in keyof Required<S>]?: ComponentObserver<Required<S>[K]>;
    };
};

export type ComponentOptionList<
    T extends NormalizedComponentTypes = NormalizedComponentTypes
> = {
    [K in keyof T['components']]: (
        this: ComponentThis<T>
    ) => Simplify<ComponentOption<T['components'][K]>>;
};

/* events */

export type EventOption<T extends Record<any, any> = Record<string, any>> = {
    [K in keyof T]?: T[K] extends Event
        ? (event: T[K]) => void
        : (...args: T[K]) => void;
};

type EventOptionList<
    T extends NormalizedComponentTypes = NormalizedComponentTypes
> = {
    $window: (this: ComponentThis<T>) => EventOption<WindowEventMap>;
    $document: (this: ComponentThis<T>) => EventOption<DocumentEventMap>;
    $root: (this: ComponentThis<T>) => EventOption<HTMLElementEventMap>;
} & {
    [K in keyof T['nodes']]: T['nodes'][K] extends Array<infer U>
        ? U extends HTMLElement
            ? (
                  this: ComponentThis<T>,
                  index: number
              ) => EventOption<HTMLElementEventMap>
            : (this: ComponentThis<T>, index: number) => EventOption
        : T['nodes'][K] extends HTMLElement
        ? (this: ComponentThis<T>) => EventOption<HTMLElementEventMap>
        : (this: ComponentThis<T>, index: number | undefined) => EventOption;
};

/* render */

export type ElementClasses = Record<string, boolean>;

export type ElementContent = string;

export type ElementAttributes = Record<
    string,
    string | boolean | null | undefined
>;

export type ElementStyle = Record<string, string | null | undefined>;

type RenderOptionText = string;

type RenderOptionElement =
    | {
          attributes?: ElementAttributes;
          classes?: ElementClasses;
          content?: ElementContent;
      }
    | string;

type RenderOptionHTMLElement =
    | {
          attributes?: ElementAttributes;
          classes?: ElementClasses;
          content?: ElementContent;
          style?: ElementStyle;
      }
    | string;

export type RenderOption<T extends ComponentThis = ComponentThis> = (
    this: T,
    index: number | undefined
) => RenderOptionText | RenderOptionHTMLElement;

type RenderOptionList<
    T extends NormalizedComponentTypes = NormalizedComponentTypes
> = {
    $root: (this: ComponentThis<T>) => RenderOptionHTMLElement;
} & {
    [K in keyof T['nodes']]: T['nodes'][K] extends Array<infer U>
        ? U extends HTMLElement
            ? (this: ComponentThis<T>, index: number) => RenderOptionHTMLElement
            : (this: ComponentThis<T>, index: number) => RenderOptionElement
        : T['nodes'][K] extends HTMLElement
        ? (this: ComponentThis<T>) => RenderOptionHTMLElement
        : T['nodes'][K] extends Element
        ? (this: ComponentThis<T>) => RenderOptionElement
        : T['nodes'][K] extends Text
        ? (this: ComponentThis<T>) => RenderOptionText
        : RenderOption<ComponentThis<T>>;
};

/* hooks */

export type ComponentLifecycleHook<T extends ComponentThis = ComponentThis> = (
    this: T
) => void;

export type ComponentStateHook<
    T extends ComponentThis = ComponentThis,
    V = any
> = (this: T, value: V, previousValue: V) => void;

type HookOptionList<
    T extends NormalizedComponentTypes = NormalizedComponentTypes
> = {
    $setup: ComponentLifecycleHook<ComponentThis<T>>;
    $teardown: ComponentLifecycleHook<ComponentThis<T>>;
} & {
    [K in keyof T['state']]: ComponentStateHook<
        ComponentThis<T>,
        T['state'][K]
    >;
};

/* options */

export type ComponentTypes = {
    root?: Element;
    state?: ComponentState;
    nodes?: ComponentNodes;
    data?: ComponentData;
    components?: ComponentComponents;
};

type NormalizedComponentTypes<T extends ComponentTypes = any> = {
    root: undefined extends T['root'] ? Element : T['root'];
    state: undefined extends T['state'] ? ComponentState : T['state'];
    nodes: undefined extends T['nodes'] ? ComponentNodes : T['nodes'];
    data: undefined extends T['data'] ? ComponentData : T['data'];
    components: undefined extends T['components']
        ? ComponentComponents
        : T['components'];
};

export type ComponentOptions<
    T extends ComponentTypes = ComponentTypes,
    N extends NormalizedComponentTypes<T> = NormalizedComponentTypes<T>
> = {
    name?: string;
    state?: StateOptionList<N>;
    nodes?: NodeOptionList<N>;
    data?: DataOptionList<N>;
    components?: ComponentOptionList<N>;
    events?: Partial<EventOptionList<N>>;
    render?: Partial<RenderOptionList<N>>;
    hooks?: Partial<HookOptionList<N>>;
} & ThisType<ComponentThis<N>>;
