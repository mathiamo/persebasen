import {Grid} from "@mui/material";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addRunner, fetchRunners, removeRunner} from "./api/runnerData";
import {RunnerCard} from "../components/runnerCard";
import {useState} from "react";

export default function Runners() {
  const queryCache = useQueryClient()

  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const {data: runners, isLoading} = useQuery({
    queryFn: () => fetchRunners(search),
    queryKey: ["runners", {search}]
  });

  const {mutateAsync: addRunnerMutation} = useMutation({
    mutationFn: addRunner,
    onSuccess: () => {
      queryCache.invalidateQueries({queryKey: ['runners']})
    }
  });

  const {mutateAsync: removeRunnerMutation} = useMutation({
    mutationFn: removeRunner,
    onSuccess: () => {
      queryCache.invalidateQueries({queryKey: ['runners']})
    }
  });


  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Grid sx={{p: 2}} container spacing={2}>
      {runners?.map((runner) => (
        <Grid item xs={4} key={runner.id}>
          <RunnerCard runner={runner} onDelete={() => removeRunnerMutation(runner.id)}></RunnerCard>
        </Grid>
      ))}
    </Grid>

  )
}