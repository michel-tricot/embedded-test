import '../styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Airbyte Embedded Demo - Next.js</title>
      </Head>
      <Script 
        src="https://cdn.jsdelivr.net/npm/@airbyte-embedded/airbyte-embedded-widget"
        strategy="beforeInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}