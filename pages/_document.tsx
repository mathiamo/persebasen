import {Head, Html, Main, NextScript} from 'next/document'
import Navbar from "../components/header";
import React from "react";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <body>
            <Navbar/>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
