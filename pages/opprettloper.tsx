import {Grid} from "@mui/material";
import Head from "next/head";
import CreateRunnerForm from "../components/createRunner";
import {RunnerCreate} from "../models/runner";
import {addRunner} from "./api/runnerData";
import {useMutation, useQueryClient} from "@tanstack/react-query";

interface OpprettloperProps {
    onClose: () => void;
}

export default function Opprettloper({ onClose }: OpprettloperProps) {
    const queryCache = useQueryClient()
    const {mutateAsync: addRunnerMutation} = useMutation({
        mutationFn: addRunner,
        onSuccess: () => {
            queryCache.invalidateQueries({queryKey: ['runners']});
            onClose();
        }
    });
    const handleCreateRunner = (createdRunner: RunnerCreate) => {

        try {
            addRunnerMutation(createdRunner)
            console.log("New runner created:", createdRunner);
        } catch (error) {
            console.error("Error creating runner:", error);
            // Handle errors if necessary
        }
    };
  return (
    <Grid sx={{p: 2}} container spacing={2}>
      <Head>
        <title>Opprett Løper</title>
      </Head>
      <Grid item xs={12}>
        <CreateRunnerForm onSubmitSuccess={handleCreateRunner}  />
      </Grid>
    </Grid>
  )
}
