import '../public/styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type {AppProps} from 'next/app'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import SimpleBottomNavigation from "../components/bottomnavigation";
import React from "react";

export default function App({Component, pageProps}: AppProps) {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Component {...pageProps} />
                <SimpleBottomNavigation/>
            </LocalizationProvider>
        </QueryClientProvider>
    )
}
