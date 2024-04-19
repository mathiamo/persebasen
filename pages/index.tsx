import React, {useState} from "react";
import {fetchRunners, removeRunner} from "./api/runnerData";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Dialog, DialogContent, Fab, Grid} from "@mui/material";
import Opprettloper from "./opprettloper";
import {RunnerCard} from "../components/runnerCard";
import {Add} from "@mui/icons-material";
import EndreLoper from "./endreloper";
import {Runner} from "../models/runner";

export default async function Home() {
    const queryCache = useQueryClient()

    const [search,] = useState("");
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [initialValues, setInitialValues] = useState<Runner | null>(null);

    const handleOpenCreateDialog = () => {
        setCreateDialogOpen(true);
    };

    const handleCloseCreateDialog = () => {
        setCreateDialogOpen(false);
    };

    const handleOpenUpdateDialog = () => {
        setUpdateDialogOpen(true);
    };

    const handleCloseUpdateDialog = () => {
        setUpdateDialogOpen(false);
    };
    const {data: runners, isLoading} = useQuery({
        queryFn: () => fetchRunners(search),
        queryKey: ["runners", {search}]
    });

    const {mutateAsync: removeRunnerMutation} = useMutation({
        mutationFn: removeRunner,
        onSuccess: () => {
            queryCache.invalidateQueries({queryKey: ['runners']})
                .then(() => console.log("Invalidated query"));
        }
    });

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Fab
                color="primary"
                aria-label="add"
                style={{position: "fixed", bottom: 16, right: 16}}
                onClick={handleOpenCreateDialog}
            >
                <Add/>
            </Fab>
            <Dialog open={createDialogOpen} onClose={handleCloseCreateDialog}>
                <DialogContent>
                    <Opprettloper onClose={handleCloseCreateDialog}/>
                </DialogContent>
            </Dialog>
            <Dialog open={updateDialogOpen} onClose={handleCloseUpdateDialog}>
                <DialogContent>
                    {initialValues && (
                        <EndreLoper initialValues={initialValues} onClose={handleCloseUpdateDialog}/>)
                    }
                </DialogContent>
            </Dialog>
            <Grid sx={{p: 2}} container spacing={2}>
                {runners?.map((runner) => (
                    <Grid item xs={12} md={6} lg={4} key={runner.id} style={{marginBottom: '32px'}}>
                        <RunnerCard runner={runner} onDelete={() => removeRunnerMutation(runner.id)}
                                    onUpdate={() => {
                                        setInitialValues(runner);
                                        handleOpenUpdateDialog();
                                    }}
                        ></RunnerCard>
                    </Grid>
                ))}
            </Grid>

        </>
    )
}
