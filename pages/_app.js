import Head from 'next/head';
import Layout from '../components/layout';
import '../styles/globals.css';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href={prefix+'/favicon.ico'} />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;