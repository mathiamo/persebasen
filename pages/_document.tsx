import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from "../components/header";
import React from "react";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Navbar></Navbar>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}