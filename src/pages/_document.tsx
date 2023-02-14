import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
  return (
    <React.StrictMode>
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </React.StrictMode>
  )
}
