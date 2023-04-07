import { useStateContext } from '@/context/AppContext'
import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
  const { isLoading } = useStateContext()
  return (
    <React.StrictMode>
      <Html lang="en">
        <Head />
        <body className={isLoading ? 'no-scroll' : ''}>
          <Main />
          <NextScript />
        </body>
      </Html>
    </React.StrictMode>
  )
}
