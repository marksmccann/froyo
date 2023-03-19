/* eslint-disable */

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

export default function Home() {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout title="Hello" description={siteConfig.tagline}>
            <header className={clsx('hero hero--primary', styles.heroBanner)}>
                <div className="container margin-bottom--lg">
                    <img src="/froyo/img/logo.svg" alt="Froyo Logo" />
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <Link
                            className="button button--primary button--lg"
                            to="/docs"
                        >
                            Get Started →
                        </Link>
                    </div>
                </div>
            </header>
            <hr className="margin-top--none" />
            <main>
                <section className="container margin-vert--xl padding-horiz--md">
                    <h2 className="margin-bottom--lg text--center">
                        Why Froyo?
                    </h2>
                    <div className="row">
                        <div className="col col--4">
                            <div>
                                <h3>No sugar added</h3>
                                <p>
                                    Build components with 100%, all natural,
                                    vanilla JavaScript. No setup required.
                                </p>
                            </div>
                        </div>
                        <div className="col col--4">
                            <div>
                                <h3>A low-fat alternative</h3>
                                <p>
                                    Weighing-in at less than 2k (gzipped), Froyo
                                    is a fraction of the size of other
                                    frameworks.
                                </p>
                            </div>
                        </div>
                        <div className="col col--4">
                            <div>
                                <h3>Treat yourself</h3>
                                <p>
                                    Froyo is universally compatible with all
                                    browsers and can be integrated into any
                                    system.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <hr />
                <section className="container margin-vert--xl padding-horiz--md text--center">
                    <h2>What is Froyo?</h2>
                    <iframe
                        className={styles.video}
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/gspaoaecNAg?clip=UgkxIxhD0UHDM9DqSBwAKZf0ON1KHoWnFiVM&amp;clipt=EN3ECxjB3gw"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    />
                </section>
            </main>
        </Layout>
    );
}
