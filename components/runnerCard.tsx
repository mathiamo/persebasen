import {Avatar, Card, CardContent, CardHeader, Grid} from "@mui/material";
import styles from "./runnerCard.module.scss";
export const RunnerCard = () => {
    return (
        <>
          <Card variant="outlined">
            <CardHeader avatar={<Avatar src="mathias.jpg" alt="me"/>} title={"Mathias Moen"}>
            </CardHeader>
            <CardContent>
              <Grid container spacing={2} className={styles.runnerStats}>
                  <Grid item xs={3}>
                    1500m
                  </Grid>
                  <Grid item xs={9}>
                    3:59
                  </Grid>

                <Grid item xs={3}>
                  3000m
                </Grid>
                <Grid item xs={9}>
                  8:26
                </Grid>

                <Grid item xs={3}>
                  5000m
                </Grid>
                <Grid item xs={9}>
                  14:28
                </Grid>

                <Grid item xs={3}>
                  10 000m
                </Grid>
                <Grid item xs={9}>
                  30:50
                </Grid>
              </Grid>
            </CardContent>

          </Card>
        </>
    );
};

