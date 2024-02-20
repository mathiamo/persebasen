
import React, {useState} from "react";
import {fetchRunners, removeRunner} from "./api/runnerData";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {Dialog, DialogContent, Fab, Grid} from "@mui/material";
import Opprettloper from "./opprettloper";
import {RunnerCard} from "../components/runnerCard";
import {Add} from "@mui/icons-material";

export default function Home() {

  const queryCache = useQueryClient()

  const [search, _] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            style={{ position: "fixed", bottom: 16, right: 16 }}
            onClick={handleOpen}
        >
          <Add />
        </Fab>
        <Dialog open={open} onClose={handleClose} >
          <DialogContent>
            <Opprettloper onClose={handleClose}/>
          </DialogContent>
        </Dialog>
        <Grid sx={{p: 2}} container spacing={2}>
          {runners?.map((runner) => (
              <Grid item xs={4} key={runner.id}>
                <RunnerCard runner={runner} onDelete={() => removeRunnerMutation(runner.id)}></RunnerCard>
              </Grid>
          ))}
        </Grid>
      </>
  )
}
