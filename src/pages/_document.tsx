import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" /> */}
        <meta name="theme-color" content="#ffffff" />
        <title>Linux Imóveis - Compra, Venda e Aluguel de Imóveis</title>
      </Head>
      <body className="bg-background">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
