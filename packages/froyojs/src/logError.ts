/* eslint-disable no-console, spaced-comment */

export type ComponentErrorTokenMap = {
    // render
    E01: 'name'; // invalid element attributes
    E02: 'name' | 'attribute' | 'type'; // invalid element attribute
    E03: 'name'; // invalid element classes
    E04: 'name'; // invalid element content
    E05: 'name'; // invalid element style
    E06: 'name' | 'property' | 'type'; // invalid element style property
    E07: 'name'; // styles applied to non-HTML element
    E08: 'name'; // invalid element
    E09: 'name'; // invalid text node

    // events
    E10: 'type' | 'name'; // invalid event handler

    // type-check
    E11: 'property'; // missing required value
    E12: 'property' | 'type'; // invalid type

    // initializer
    E13: 'name'; // unknown name
    E14: 'name'; // invalid component

    // constructor
    E15: 'name'; // invalid "data-state" value
    E16: 'name' | 'property' | 'selector'; // missing required element (query)
    E17: 'name' | 'property' | 'selector'; // missing required elements (query-all)
    E18: 'name' | 'property'; // unknown events option
    E19: 'name' | 'property'; // unknown hook option
    E20: 'name' | 'property'; // unknown render option
    E27: 'name' | 'property'; // invalid component option
    E28: 'name' | 'property'; // invalid method option
    E29: 'name' | 'component' | 'property'; // invalid component subscription

    // instance
    E21: 'name' | 'property'; // set readonly state
    E22: 'name' | 'property'; // set unknown state
    E23: 'name' | 'property'; // subscribe to unknown state
    E24: 'name' | 'property'; // subscribe invalid observer
    E25: 'name' | 'property'; // unsubscribe from unknown state
    E26: 'name' | 'property'; // unsubscribe invalid observer
};

export const /*#__PURE__*/ ERRORS: Record<
        keyof ComponentErrorTokenMap,
        string
    > = {
        E01: 'Invalid node: failed to add attributes to node "{{ name }}". Expected an object',
        E02: 'Invalid node: failed to add attribute "{{ attribute }}" of unknown type "{{ type }}" to node "{{ name }}"',
        E03: 'Invalid node: failed to add classes to node "{{ name }}". Expected an object',
        E04: 'Invalid node: failed to add content to node "{{ name }}". Expected a string or object',
        E05: 'Invalid node: failed to add style to node "{{ name }}". Expected an object',
        E06: 'Invalid node: failed to add style "{{ property }}" of unknown type "{{ type }}" to node "{{ name }}"',
        E07: 'Invalid node: failed to apply styles to node "{{ name }}" because it is not an HTML element',
        E08: 'Invalid node: failed to render element "{{ name }}". Expected a string or object',
        E09: 'Invalid node: failed to render text node "{{ name }}". Expected a string',
        E10: 'Invalid event: unable to add "{{ type }}" event to "{{ name }}". Expected function',
        E11: 'Invalid state: missing required property: {{ property }}',
        E12: 'Invalid state: type check failed for "{{ property }}". Expected "{{ type }}"',
        E13: 'Initializer: unable to find component "{{ name }}"',
        E14: 'Initializer: "{{ name }}" is not a valid component constructor',
        E15: '{{ name }}: the "data-state" attribute must contain valid JSON',
        E16: '{{ name }}: missing required node "{{ property }}". No element was found with selector "{{ selector }}"',
        E17: '{{ name }}: missing required node "{{ property }}". No elements were found with selector "{{ selector }}"',
        E18: '{{ name }}: found unknown event option: "{{ property }}"',
        E19: '{{ name }}: found unknown hook option: "{{ property }}"',
        E20: '{{ name }}: found unknown render option: "{{ property }}"',
        E21: '{{ name }}: cannot set readonly state "{{ property }}"',
        E22: '{{ name }}: failed to set unknown state "{{ property }}"',
        E23: '{{ name }}: failed to subscribe to unknown state property "{{ property }}"',
        E24: '{{ name }}: failed to subscribe to "{{ property }}". Expected a function',
        E25: '{{ name }}: failed to unsubscribe from unknown state property "{{ property }}"',
        E26: '{{ name }}: failed to unsubscribe from "{{ property }}". Expected a function',
        E27: '{{ name }}: found invalid component option "{{ property }}. Expected a valid component constructor."',
        E28: '{{ name }}: found invalid method option "{{ property }}. Expected a function"',
        E29: '{{ name }}: failed to subscribe to "{{ property }}" on component "{{ component }}". Expected a function.',
    };

export function /*#__PURE__*/ getErrorMessage<
    K extends keyof ComponentErrorTokenMap
>(name: K, tokens: Record<ComponentErrorTokenMap[K], string>): string {
    let message = ERRORS[name];

    if (tokens) {
        Object.entries<string>(tokens).forEach(([key, value]) => {
            message = message.replace(
                new RegExp(`{{\\s*${key}\\s*}}`, 'g'),
                value
            );
        });
    }

    return message;
}

function logError<K extends keyof ComponentErrorTokenMap>(
    name: K,
    tokens: Record<ComponentErrorTokenMap[K], string>
): void {
    if (process.env.NODE_ENV !== 'production') {
        console.error(getErrorMessage(name, tokens));
    }
}

export default logError;
