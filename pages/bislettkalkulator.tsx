import RunningPaceCalculator from "../components/bislettPace";
import {Grid} from "@mui/material";
import Head from "next/head";

export default function Bislettkalkulator() {
return (
  <Grid sx={{ p: 2 }} container  spacing={2}>
    <Head>
      <title>Bislettkalkulator</title>
    </Head>
    <Grid item xs={12}>
      <RunningPaceCalculator></RunningPaceCalculator>
    </Grid>
  </Grid>
)
}