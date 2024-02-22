import {Grid} from "@mui/material";
import Head from "next/head";
import UpdateRunnerForm from "../components/updateRunner";
import {Runner, RunnerUpdate} from "../models/runner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {changeRunner} from "./api/runnerData";

interface ChangeLoperProps {
    onClose: () => void;
    initialValues: Runner
}

export default function EndreLoper({onClose, initialValues}: ChangeLoperProps) {
    const queryCache = useQueryClient()
    const {mutateAsync: changeRunnerMutation} = useMutation({
        mutationFn: changeRunner,
        onSuccess: () => {
            console.log("Mutation succeeded");
            queryCache.invalidateQueries({queryKey: ['runners']})
                .then(() => onClose());
        },
        onError: (error) => {
            console.error("Mutation failed", error);
        },
    });
    const handleChangeRunner = async (changedRunner: RunnerUpdate) => {
        try {
            await changeRunnerMutation(changedRunner);
        } catch (error) {
            console.error("Error creating runner:", error);
        }
    };
    return (
        <Grid sx={{p: 2}} container spacing={2}>
            <Head>
                <title>Endre Løper</title>
            </Head>
            <Grid item xs={12}>
                <UpdateRunnerForm initialValues={initialValues} onSubmitSuccess={handleChangeRunner}/>
            </Grid>
        </Grid>
    )
}
