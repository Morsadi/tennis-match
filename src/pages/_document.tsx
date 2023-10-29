import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel='preconnect'
            href='https://fonts.googleapis.com'
            crossOrigin='anonymous' // Add crossorigin attribute
          />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous' // Add crossorigin attribute
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Slab:wght@100;200;400;500;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
