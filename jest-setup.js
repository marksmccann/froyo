/* eslint-disable jest/require-top-level-describe */

import '@testing-library/jest-dom';
import loglevel from 'loglevel';

const originalNodeEnv = process.env.NODE_ENV;

beforeAll(() => {
    // https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

beforeEach(() => {
    global.consoleErrorSpy = jest.spyOn(console, 'error');
    global.loglevelErrorSpy = jest.spyOn(loglevel, 'error');
});

afterEach(() => {
    global.consoleErrorSpy.mockRestore();
    global.loglevelErrorSpy.mockRestore();
    process.env.NODE_ENV = originalNodeEnv;
});
