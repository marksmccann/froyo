/* eslint-disable @typescript-eslint/naming-convention */

import type { Constructor, Simplify, ConditionalKeys } from 'type-fest';

export type StateOption<T> = {
    type?: T extends string
        ? Constructor<String>
        : T extends boolean
        ? Constructor<Boolean>
        : T extends number
        ? Constructor<Number>
        : Constructor<T>;
    default?: T | null;
    required?: true;
    readonly?: true;
};

type NodeOptionMap<T extends ComponentNode> = {
    text: {
        type: 'text';
        value?: string;
    };
    svg: {
        type: 'svg';
        tagName: ConditionalKeys<SVGElementTagNameMap, T>;
        className?: string;
        attributes?: Record<string, string>;
        content?: string;
    };
    element: {
        type: 'element';
        tagName: ConditionalKeys<HTMLElementTagNameMap, T>;
        className?: string;
        attributes?: Record<string, string>;
        content?: string;
    };
    query: {
        type: 'query';
        selector: string;
        optional?: true;
        scope?: ($root: Element) => Element | Document;
    };
    queryAll: {
        type: 'query-all';
        selector: string;
        optional?: true;
        scope?: ($root: Element) => Element | Document;
    };
    custom: {
        type: 'custom';
        node: (
            $root: Element
        ) => T extends Array<infer U extends Element>
            ? T | NodeListOf<U> | HTMLCollectionOf<U>
            : T;
    };
};

type NodeOption<T> = T extends Text
    ? NodeOptionMap<T>['text' | 'custom']
    : T extends Element[]
    ? NodeOptionMap<T>['queryAll' | 'custom']
    : T extends SVGElement
    ? NodeOptionMap<T>['svg' | 'query' | 'custom']
    : T extends HTMLElement
    ? NodeOptionMap<T>['element' | 'query' | 'custom']
    : T extends Element
    ? NodeOptionMap<T>['query' | 'custom']
    : never;

type MethodOption<T, TThis extends ComponentThis> = T extends ComponentMethod
    ? T & ThisType<TThis>
    : never;

type ComponentOption<T extends ComponentInstance<any>> = {
    constructor: ComponentConstructor<T>;
    root: string | Element;
    state?: Partial<T['state']>;
    subscribe?: {
        [K in keyof T['state']]?: ComponentObserver<T['state'][K]>;
    };
};

type EventOptionResult<T extends GlobalEventHandlersEventMap> = {
    [K in keyof T]?: (event: T[K]) => void;
};

// prettier-ignore
type EventOption<
    TNode extends ComponentNode | Window | Document,
    TThis extends ComponentThis
> = TNode extends Window
    ? (this: TThis) => Simplify<EventOptionResult<WindowEventMap>>
    : TNode extends Document
    ? (this: TThis) => Simplify<EventOptionResult<DocumentEventMap>>
    : TNode extends HTMLElement
    ? (this: TThis) => Simplify<EventOptionResult<HTMLElementEventMap>>
    : TNode extends Array<HTMLElement>
    ? (this: TThis, index: number) => Simplify<EventOptionResult<HTMLElementEventMap>>
    : TNode extends Array<Element>
    ? (this: TThis, index: number) => Record<string, (event: Event) => void>
    : TNode extends Node
    ? (this: TThis) => Record<string, (event: Event) => void>
    : never;

export type ElementAttributes = Record<
    string,
    string | boolean | null | undefined
>;

export type ElementClasses = Record<string, boolean>;

export type ElementStyle = Record<string, string | null | undefined>;

// prettier-ignore
type RenderOptionElement<T extends Element> = {
    attributes?: ElementAttributes;
    classes?: Record<string, boolean>;
    content?: string;
    style?: T extends HTMLElement ? ElementStyle : never;
};

export type RenderOption<
    TNode extends ComponentNode,
    TThis extends ComponentThis
> = TNode extends Text
    ? (this: TThis) => string
    : TNode extends Element
    ? (this: TThis) => string | Simplify<RenderOptionElement<TNode>>
    : TNode extends Array<infer U extends Element>
    ? (this: TThis, index: number) => string | Simplify<RenderOptionElement<U>>
    : never;

type HookOption<
    TStateValue,
    TThis extends ComponentThis
> = ComponentStateHook<TStateValue> & ThisType<TThis>;

type FilterOptions<TThis extends ComponentThis, TMatch> = Pick<
    TThis,
    ConditionalKeys<Omit<TThis, '$state' | '$root'>, TMatch>
>;

export type ComponentNode = Text | Element | Element[] | null;

export type ComponentMethod = (...args: any) => any;

export type ComponentStateHook<T> = (value: T, previousValue: T) => void;

export type ComponentObserver<T> = (
    this: void,
    value: T,
    previousValue: T
) => void;

export type ComponentThis = {
    $root: Element;
    $state: Record<string, any>;
} & Record<string, any>;

// prettier-ignore
export type ComponentOptions<
    TThis extends ComponentThis,
    _TState = TThis['$state'],
    _TNodes extends Record<string, ComponentNode> = FilterOptions<TThis, Exclude<ComponentNode, null>>,
    _TMethods extends Record<string, ComponentMethod> = FilterOptions<TThis, ComponentMethod>,
    _TComponents extends Record<string, ComponentInstance<any>> = FilterOptions<TThis, ComponentInstance<any>>
> = {
    name?: string;
    state?: { [K in keyof _TState]: Simplify<StateOption<_TState[K]>> };
    nodes?: { [K in keyof _TNodes]?: Simplify<NodeOption<_TNodes[K]>> };
    methods?: { [K in keyof _TMethods]?: MethodOption<_TMethods[K], TThis> };
    components?: {
        [K in keyof _TComponents]?: (
            this: TThis
        ) => ComponentOption<_TComponents[K]>;
    };
    events?: {
        $window?: EventOption<Window, TThis>;
        $document?: EventOption<Document, TThis>;
        $root?: EventOption<TThis['$root'], TThis>;
    } & {
        [K in keyof _TNodes]?: EventOption<_TNodes[K], TThis>;
    };
    render?: {
        $root?: RenderOption<TThis['$root'], TThis>;
    } & {
        [K in keyof _TNodes]?: RenderOption<_TNodes[K], TThis>;
    };
    hooks?: {
        $setup?: (this: TThis) => void;
        $teardown?: (this: TThis) => void;
    } & {
        [K in keyof _TState]?: HookOption<_TState[K], TThis>;
    };
} & ThisType<TThis>;

// prettier-ignore
export type ComponentNormalizedOptions = {
    name: string;
    state: Record<string, StateOption<any>>;
    nodes: Record<string, NodeOptionMap<ComponentNode>[keyof NodeOptionMap<ComponentNode>]>;
    methods: Record<string, ComponentMethod>;
    components: Record<string, () => ComponentOption<ComponentInstance<any>>>;
    events: Record<string, (index?: number) => Record<string, () => void>>;
    render: Record<string, (index?: number) => string | RenderOptionElement<Element>>;
    hooks: Record<string, (value?: any, previousValue?: any) => void>;
};

export interface ComponentInstance<T extends ComponentThis> {
    get root(): T['$root'];
    get state(): T['$state'];
    destroy(): void;
    setState(stateChanges: Partial<T['$state']>): void;
    subscribe<K extends keyof T['$state']>(
        property: K,
        observer: ComponentObserver<T['$state'][K]>
    ): void;
    unsubscribe<K extends keyof T['$state']>(
        property: K,
        observer: ComponentObserver<T['$state'][K]>
    ): void;
}

export interface ComponentConstructor<T extends ComponentInstance<any>> {
    get $$typeof(): symbol;
    get displayName(): string;
    new (root: string | Element, state?: Partial<T['state']>): T;
}
