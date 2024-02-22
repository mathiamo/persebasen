import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import React from "react";
import Paper from '@mui/material/Paper';
import {Calculate, Leaderboard, Man} from "@mui/icons-material";
import {NextLinkComposed} from "./link";
import {useRouter} from "next/router";

const pages = [
    {key: '/', name: "Perser", icon: <Leaderboard/>},
    {key: '/runners', name: 'Løpertabell', icon: <Man/>},
    {key: '/bislettkalkulator', name: 'Bislettkalkulator', icon: <Calculate/>},
];

export default function SimpleBottomNavigation() {
    const router = useRouter();
    const currentPage = router.pathname;
    const initialValue = pages.findIndex((page) => page.key === currentPage) || 0;
    const [value, setValue] = React.useState(initialValue);
    return (
        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                {pages.map((page) => (
                    <BottomNavigationAction
                        component={NextLinkComposed}
                        to={{pathname: page.key}}
                        key={page.key}
                        label={page.name}
                        icon={page.icon}>
                    </BottomNavigationAction>
                ))}
            </BottomNavigation>

        </Paper>
    );
}