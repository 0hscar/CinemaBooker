import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link'

const morethen = ">";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Tjong bong på en stång</p>
        <p>
          Cinemabooker {morethen} Hello world
        </p>
      </section>
    </Layout>
  );
}