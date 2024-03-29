# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-alpha.7](https://github.com/marksmccann/froyo/compare/froyojs@1.0.0-alpha.6...froyojs@1.0.0-alpha.7) (2023-06-07)

### Bug Fixes

-   move options type to generic argument ([6613734](https://github.com/marksmccann/froyo/commit/66137349e25140ef4b15f74cc213f1f01e995308))

# [1.0.0-alpha.6](https://github.com/marksmccann/froyo/compare/froyojs@1.0.0-alpha.5...froyojs@1.0.0-alpha.6) (2023-05-30)

### Bug Fixes

-   correct "this" types for component options ([a65064f](https://github.com/marksmccann/froyo/commit/a65064f68dd14047ee3ac73e673f39f78542e8e7))
-   harden condition for invalid subcomponent subscriptions ([6df4223](https://github.com/marksmccann/froyo/commit/6df42231ff189428c5de7d01cb82fe5a2abc69be))

# [1.0.0-alpha.5](https://github.com/marksmccann/froyo/compare/froyojs@1.0.0-alpha.4...froyojs@1.0.0-alpha.5) (2023-05-29)

### Bug Fixes

-   harden types for custom nodes ([1ca9898](https://github.com/marksmccann/froyo/commit/1ca9898c04ba1986c0548e2eeaf49f264c5f71fe))

# [1.0.0-alpha.4](https://github.com/marksmccann/froyo/compare/froyojs@1.0.0-alpha.3...froyojs@1.0.0-alpha.4) (2023-05-28)

### Bug Fixes

-   remove unused prop-types dependencies ([1539ec4](https://github.com/marksmccann/froyo/commit/1539ec4bd912f65bb279fb6bd57f8d6d7b904a5f))

# [1.0.0-alpha.3](https://github.com/marksmccann/froyo/compare/froyojs@1.0.0-alpha.2...froyojs@1.0.0-alpha.3) (2023-05-28)

### Features

-   refactor type arguments ([9745ab4](https://github.com/marksmccann/froyo/commit/9745ab400322a56df77586bdd20d22e0f4bdf04f))

### BREAKING CHANGES

-   -   moved state properties from `this` to `this.$state`

*   type argument for `defineComponent` now defines types for `this`
*   changed the "scope" option on query node types to a function

# [1.0.0-alpha.2](https://github.com/marksmccann/froyo/compare/froyojs@1.0.0-alpha.1...froyojs@1.0.0-alpha.2) (2023-05-20)

### Bug Fixes

-   prevent readonly state updates at instantiation ([55cfa33](https://github.com/marksmccann/froyo/commit/55cfa33289b728c8996feb7526898dc276106d1e))

# [1.0.0-alpha.1](https://github.com/marksmccann/froyo/compare/froyojs@1.0.0-alpha.0...froyojs@1.0.0-alpha.1) (2023-05-20)

### Features

-   add properties to element and svg nodes ([b06fe98](https://github.com/marksmccann/froyo/commit/b06fe98679dbf563ccf92e982ca24e4b6d9b34de))

# [1.0.0-alpha.0](https://github.com/marksmccann/froyo/compare/froyojs@0.7.3...froyojs@1.0.0-alpha.0) (2023-05-19)

### Features

-   rearchitect framework ([47e3251](https://github.com/marksmccann/froyo/commit/47e3251ed12b0b1990d5b5ebe6b4d70e68ba5ea0))

### BREAKING CHANGES

-   the framework has been rebuilt from the ground up with a new API.

## [0.7.3](https://github.com/marksmccann/froyo/compare/froyojs@0.7.2...froyojs@0.7.3) (2023-03-31)

### Bug Fixes

-   improve typings for createInitializer tool ([cbaff63](https://github.com/marksmccann/froyo/commit/cbaff634a394e51e253ebedc80056b07663a0454))

## [0.7.2](https://github.com/marksmccann/froyo/compare/froyojs@0.7.1...froyojs@0.7.2) (2023-03-22)

### Bug Fixes

-   improve typings for Component and addEventListener ([3d0e6e9](https://github.com/marksmccann/froyo/commit/3d0e6e9a870d8bfde0dd2f04538077391e3005f6))

## [0.7.1](https://github.com/marksmccann/froyo/compare/froyojs@0.7.0...froyojs@0.7.1) (2023-03-19)

### Bug Fixes

-   cleanup distributable files + typescript usage ([541dde9](https://github.com/marksmccann/froyo/commit/541dde97cbe2d072b93ce67a4b41aa2716dc95bf))

# [0.7.0](https://github.com/marksmccann/froyo/compare/froyojs@0.6.2...froyojs@0.7.0) (2023-03-02)

### Features

-   add improved typescript support ([8452cce](https://github.com/marksmccann/froyo/commit/8452ccedc9807a3b57cd713e8cdb240a963b547a))

## [0.6.2](https://github.com/marksmccann/froyo/compare/froyojs@0.6.1...froyojs@0.6.2) (2023-02-23)

### Bug Fixes

-   fix repository field in package.json ([c738d23](https://github.com/marksmccann/froyo/commit/c738d239dff09c8089a5ce4539b308036b1dc363))

## [0.6.1](https://github.com/marksmccann/froyo/compare/froyojs@0.6.0...froyojs@0.6.1) (2023-02-21)

### Bug Fixes

-   remove babel dependency ([c3b0d74](https://github.com/marksmccann/froyo/commit/c3b0d747ea523d358f1605b7d7cfb0d28a8282f1))

# [0.6.0](https://github.com/marksmccann/froyo/compare/froyojs@0.5.3...froyojs@0.6.0) (2023-02-21)

### Features

-   add typescript support ([aa4e4e6](https://github.com/marksmccann/froyo/commit/aa4e4e66b60949438d8fe6bb569719688aa95b9b))

## [0.5.3](https://github.com/marksmccann/froyo/compare/froyojs@0.5.2...froyojs@0.5.3) (2023-02-16)

### Bug Fixes

-   add changelog to package ([38ac4dc](https://github.com/marksmccann/froyo/commit/38ac4dc17776f090a77c99df5488bdf0c974a3de))
-   add keywords to package.json ([1e89b94](https://github.com/marksmccann/froyo/commit/1e89b9468747874bc9a0c4b2df068d1d670348fe))
-   correct dev build for the UMD bundle ([316d217](https://github.com/marksmccann/froyo/commit/316d2175b3891464e8405332a6aac1cc432d9577))
-   use rollup to create es and cjs bundles ([b46f2f6](https://github.com/marksmccann/froyo/commit/b46f2f68b2155a90bd16f36510a1f8224a278121))

## [0.5.2](https://github.com/marksmccann/froyo/compare/froyojs@0.5.2...froyojs@0.5.2) (2023-02-16)

### Bug Fixes

-   correct dev build for the UMD bundle ([316d217](https://github.com/marksmccann/froyo/commit/316d2175b3891464e8405332a6aac1cc432d9577))
-   modify babel config for better node consumption ([d223f46](https://github.com/marksmccann/froyo/commit/d223f46aac235c5dd1890267c24e977b83184f2d))
-   modify babel config to built modules for node ([c1106f5](https://github.com/marksmccann/froyo/commit/c1106f50d40ca5d26c4fa2a44003e9f6313d766b))
-   replace nullish operator with logical or ([a165d73](https://github.com/marksmccann/froyo/commit/a165d73bd29836e74932946b69c3abead03df3f1))
-   **set-attributes:** default nullish values for attributes argument ([1b891d2](https://github.com/marksmccann/froyo/commit/1b891d28c2fce1f662ab05ce8a1d20d3c3e957b8))

### Features

-   add information to the pcakage README ([b3f4014](https://github.com/marksmccann/froyo/commit/b3f401482a0d3bdb49510737b390f469d008f7f7))
-   add umd build and remove loglevel dependency ([abf2769](https://github.com/marksmccann/froyo/commit/abf2769da3f379a11c384e7e474f246636ced68e))
-   **component:** add "initialized" instance property ([1d9e450](https://github.com/marksmccann/froyo/commit/1d9e45092938c5041da6b14cd7bb0e41ebf8a8dc))
-   **component:** add getter and setter for elements property ([c88ce3d](https://github.com/marksmccann/froyo/commit/c88ce3dedb67cf03647332e04ccc75ddf7cf5d1d))
-   **component:** add this.setup, Component.instances and query selector support to constructor ([4ba517a](https://github.com/marksmccann/froyo/commit/4ba517a4a3859a8a300c490531ac52c75cee323a))
-   create "setClasses" DOM utility ([9f68b41](https://github.com/marksmccann/froyo/commit/9f68b41635d9586626e2412b3b1d194b867965a5))
-   create querySelector utility and add depth filter ([8b3e907](https://github.com/marksmccann/froyo/commit/8b3e907a7fc8ef54347d94ce4859326484c1b875))
-   mark package as side effect free ([1b6d20f](https://github.com/marksmccann/froyo/commit/1b6d20fa0362c66ebf48ee957da13d8803ee1b09))
-   remove the query selector dom utilities ([2c4d5e3](https://github.com/marksmccann/froyo/commit/2c4d5e3df950adb42b07ef50fe31033a668ac5f2))

### BREAKING CHANGES

-   **component:** subtle changes to the "elements" instance method regarding how it is assigned and
    what it will accept, view description for specifics.
-   replace query selector utilities with the native functions
-   **component:** Rename "initialize" to "setup"
-   **component:** removed this.metadata and nanoid dependency
