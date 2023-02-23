/* eslint-disable jest/require-top-level-describe, no-var */

import { cleanup } from './pure';

declare var teardown: any;

// if running in a test environment, automatically
// cleanup after each test via "afterEach" or "teardown".
// This ensures tests are run in isolation. To opt-out
// of this feature, import the "pure" modules of set
// RTL_SKIP_AUTO_CLEANUP env variable to "true"
/* eslint-disable no-undef */
if (!process.env.RTL_SKIP_AUTO_CLEANUP) {
    if (typeof afterEach === 'function') {
        afterEach(cleanup);
    } else if (typeof teardown === 'function') {
        teardown(cleanup);
    }
}
/* eslint-enable no-undef */

export * from '@testing-library/dom';
export * from './pure';
