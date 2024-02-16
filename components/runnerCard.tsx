import {Avatar, Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import styles from "./runnerCard.module.scss";
import {Distance, PersonalBest, Runner} from "../models/runner";
import {defaultDistances, getDistanceDisplayString} from "../utils/running.util";

export const RunnerCard = ({runner, onDelete}: { runner: Runner; onDelete: () => void }) => {
  function getPbTime(distance: Number) {
    return runner.personalBests.find(pb => pb.distance.value == distance)?.timeString ?? 'N/A';
  }

  function getPb(pbs: PersonalBest[], distance: Number): PersonalBest{
     return pbs.find(pb => pb.distance.value === distance)
  }


  const handleDelete = () => {
    onDelete();
  };
  return (
    <Card variant="outlined">
      <CardHeader avatar={
        <Avatar src={runner.image} alt={"image of " + runner.name}/>} title={runner.name+ ', ' + runner.age + ' år'}>
      </CardHeader>

      <CardContent>
        {runner &&
            <Grid container spacing={2} className={styles.runnerStats}>
                {defaultDistances.map(distance => (
                    <>
                        <Grid item xs={3}>
                            {getDistanceDisplayString(distance.value)}
                        </Grid>
                        <Grid item xs={2}>
                            {getPbTime(distance.value)}
                        </Grid>
                        <Grid item xs={4}>
                            {getPb(runner.personalBests, distance.value).date?.toDateString()}
                        </Grid>
                        <Grid item xs={3}>
                            {getPb(runner.personalBests, distance.value).location}
                        </Grid>
                    </>
                ))}
            </Grid>
        }
        <Grid container justifyContent="flex-end">
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </Grid>

      </CardContent>
    </Card>
  );
};

