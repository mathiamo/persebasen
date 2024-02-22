import {Avatar, Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import styles from "./runnerCard.module.scss";
import {PersonalBest, Runner} from "../models/runner";
import {defaultDistances, getDistanceDisplayString} from "../utils/running.util";
import {Fragment} from "react";

export const RunnerCard = ({runner, onDelete, onUpdate}: {
    runner: Runner;
    onDelete: () => void;
    onUpdate: (runner: Runner) => void;
}) => {
    function getPbTime(distance: number) {
        return runner.personalBests?.find(pb => pb.distance.value == distance)?.timeString ?? 'N/A';
    }

    function getPb(pbs: PersonalBest[] | undefined, distance: number): PersonalBest | undefined {
        return pbs?.find(pb => pb.distance.value === distance)
    }

    const handleDelete = () => {
        onDelete();
    };
    const handleUpdate = (runner: Runner) => {
        onUpdate(runner);
    };
    return (
        <Card variant="outlined">
            <CardHeader
                avatar={runner.image && <Avatar src={runner.image} alt={"image of " + runner.name}/>}
                title={runner.name + ', ' + runner.age + ' år'}>
            </CardHeader>

            <CardContent>
                {runner &&
                    <Grid container spacing={2} className={styles.runnerStats}>
                        {defaultDistances.map((distance, index) => {
                            const pb: PersonalBest | undefined = getPb(runner.personalBests, distance.value);
                            type DateFormatOptions = {
                                year?: 'numeric';
                                month?: 'numeric' | 'long' | 'short' | 'narrow';
                                day?: 'numeric';
                            };
                            const options: DateFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
                            return (
                                <Fragment key={index}>
                                    <Grid item xs={3}>
                                        {getDistanceDisplayString(distance.value)}
                                    </Grid>
                                    <Grid item xs={2}>
                                        {getPbTime(distance.value)}
                                    </Grid>
                                    <Grid item xs={4}>
                                        {pb && pb.date && new Date(pb.date).toLocaleDateString('nb-NO', options)}
                                    </Grid>
                                    <Grid item xs={3}
                                          style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                                        {pb?.location}
                                    </Grid>
                                </Fragment>
                            );
                        })}
                    </Grid>
                }
                <Grid container justifyContent="flex-end">
                    <Button variant="contained" onClick={() => handleUpdate(runner)}
                            style={{marginTop: '16px', marginRight: '16px'}}>
                        Update
                    </Button>
                    <Button variant="contained" onClick={handleDelete} style={{marginTop: '16px'}}>
                        Delete
                    </Button>
                </Grid>
            </CardContent>
        </Card>
    );
};

