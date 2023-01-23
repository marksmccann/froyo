/* eslint-disable */

import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
    {
        title: '"Extremely lightweight"',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>
                Less than 2k gzipped; no that's some non-fat frozen yogurt!
                "totes the best hun-cal froyo"
            </>
        ),
    },
    {
        title: 'Build with 100%, all natural, vanilla JavaScript. No sugar added',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                Froyo let's you build user interface components with plain-old,
                browser-ready, vanilla JavaScript; no custom build tooling
                required.
            </>
        ),
    },
    {
        title: 'Implement components directly from the HTML, no JavaScript required',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                Froyo components can be initialized and configured directly from
                the HTML. Consumers don't need JavaScript experience to use
                them.
            </>
        ),
    },
];

function Feature({ Svg, title, description }) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
