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
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import {KindeProvider} from "@kinde-oss/kinde-auth-nextjs";

// Define your custom theme
const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        background: {
            default: '#f8f9fa', // Customize your background color
        },
    },
});
export default function App({Component, pageProps}: AppProps) {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <KindeProvider>
                        <Component className="max-w-screen-xl mx-auto" {...pageProps} />
                    </KindeProvider>
                    <SimpleBottomNavigation/>
                </ThemeProvider>
            </LocalizationProvider>
        </QueryClientProvider>

    )
}
