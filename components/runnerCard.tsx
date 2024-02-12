import {Avatar, Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import styles from "./runnerCard.module.scss";
import {Runner} from "../models/runner";

export const RunnerCard = ({runner, onDelete}: { runner: Runner; onDelete: () => void }) => {
  function getPbTime(distance: Number) {
    return runner.personalBests.find(pb => pb.distance.value == distance)?.timeString ?? 'N/A';
  }

  const handleDelete = () => {
    onDelete();
  };
  return (
    <Card variant="outlined">
      <CardHeader avatar={
        <Avatar src={runner.image} alt={"image of " + runner.name}/>} title={runner.name}>
      </CardHeader>

      <CardContent>
        {runner &&
            <Grid container spacing={2} className={styles.runnerStats}>
                <Grid item xs={3}>
                    1500m
                </Grid>
                <Grid item xs={9}>
                  {getPbTime(1500)}
                </Grid>

                <Grid item xs={3}>
                    3000m
                </Grid>
                <Grid item xs={9}>
                  {getPbTime(3000)}
                </Grid>

                <Grid item xs={3}>
                    5000m
                </Grid>
                <Grid item xs={9}>
                  {getPbTime(5000)}
                </Grid>

                <Grid item xs={3}>
                    10 000m
                </Grid>
                <Grid item xs={9}>
                  {getPbTime(10000)}
                </Grid>
                <Grid item xs={3}>
                    Halvmaraton
                </Grid>
                <Grid item xs={9}>
                  {getPbTime(21097)}
                </Grid>
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

