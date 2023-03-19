# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
