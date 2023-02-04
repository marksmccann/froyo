// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Froyo',
    tagline: 'An ultra lightweight framework for building UI components',
    url: 'https://marksmccann.github.io',
    baseUrl: '/froyo/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'marksmccann',
    projectName: 'froyo',
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/marksmccann/froyo',
                },
                blog: {
                    showReadingTime: true,
                    editUrl: 'https://github.com/marksmccann/froyo',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'Froyo',
                logo: {
                    alt: 'Froyo Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        to: 'docs/',
                        position: 'right',
                        label: 'Docs',
                    },
                    {
                        href: 'https://github.com/marksmccann/froyo',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [],
                copyright: `Copyright © ${new Date().getFullYear()} Mark McCann. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
