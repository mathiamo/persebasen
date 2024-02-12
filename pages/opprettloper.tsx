import {Grid} from "@mui/material";
import Head from "next/head";
import CreateRunnerForm from "../components/createRunner";
import {Runner} from "../models/runner";

export default function Opprettloper({onCreateRunner}: { onCreateRunner: (runner: Runner) => void }) {
  return (
    <Grid sx={{p: 2}} container spacing={2}>
      <Head>
        <title>Opprett Løper</title>
      </Head>
      <Grid item xs={12}>
        <CreateRunnerForm/>
      </Grid>
    </Grid>
  )
}
