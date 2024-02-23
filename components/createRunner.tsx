import React from 'react';
import {PersonalBestCreate, RunnerCreate, runnerSchema} from '../models/runner';
import {Controller, SubmitHandler, useFieldArray, useForm} from 'react-hook-form';
import {Button, Grid, MenuItem, Select, TextField} from '@mui/material';
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";

import {readableRunTime} from "../utils/strings.util";
import {calculateTimeInSeconds} from "../utils/time.util";
import {defaultDistances} from "../utils/running.util";

interface CreateRunnerFormProps {
    onSubmitSuccess: (data: RunnerCreate) => void;
}

export type CreateRunnerFormFields = z.infer<typeof runnerSchema>;

const CreateRunner: React.FC<CreateRunnerFormProps> = ({onSubmitSuccess}) => {
    const {
        register,
        handleSubmit,
        setError,
        control,
        setValue,
        formState: {errors, isSubmitting,},
    } = useForm<CreateRunnerFormFields>({
        resolver: zodResolver(runnerSchema),
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'personalBests',
    });
    const handleAddPersonalBest = () => {
        const usedDistanceValues = new Set(fields.map((pb) => pb.distance.value));
        const nextFreeDistance = defaultDistances.find((dist) => !usedDistanceValues.has(dist.value));

        append({
            id: 0,
            distance: {
                value: nextFreeDistance ? nextFreeDistance.value : 0,
                unit: 'meters',
            },
            time: {
                seconds: 0,
                minutes: 0,
                hours: 0,
                hundredths: 0,
            },
            timeString: '',
            location: '',
            date: null,
        });
    };


    const onSubmit: SubmitHandler<CreateRunnerFormFields> = async (data) => {
        try {
            const pbs: PersonalBestCreate[] =
                data.personalBests.map((pb) => ({
                        distance: {
                            value: pb.distance.value,
                            unit: pb.distance.unit,
                        },
                        date: pb.date,
                        time: pb.time,
                        location: pb.location,
                        timeString: readableRunTime(calculateTimeInSeconds(pb.time)) + (pb.time.hundredths !== 0 ? `, ${pb.time.hundredths}` : ''),
                    })
                )
            console.log(pbs)
            onSubmitSuccess({
                name: data.name,
                age: data.age,
                image: data.image,
                personalBests: pbs,
            });
        } catch (error) {
            setError("name", {
                message: "Navn allerede brukt",
            });
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                    <TextField label="Name" {...register("name")} fullWidth/>
                    {errors.name && <div>{errors.name.message}</div>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Age" type="number" {...register("age", {
                        valueAsNumber: true
                    })} fullWidth/>
                    {errors.age && <div>{errors.age.message}</div>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Image url" {...register("image")} fullWidth/>
                </Grid>

                {/* Personal Bests Section */}
                <Grid item xs={12}>

                    <Button variant="contained" type="button" onClick={handleAddPersonalBest}
                            style={{marginBottom: '16px'}}>
                        Add Personal Best
                    </Button>

                    {fields.map((personalBest, index) => (

                        <Grid key={index} container spacing={3} alignItems="center" style={{marginTop: '16px'}}>

                            <Grid item xs={12} md={4}>
                                <Controller
                                    name={`personalBests.${index}.distance.value`}
                                    control={control}
                                    render={({field}) => (
                                        <Select
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                setValue(`personalBests.${index}.distance.value`, Number(e.target.value));
                                            }}
                                            label="Distance"
                                            fullWidth
                                        >
                                            {defaultDistances.map((option) => (
                                                <MenuItem key={option.value} value={option.value?.toString()}>
                                                    {option.value + ' ' + option.unit}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={3} md={2}>
                                <TextField
                                    label="Hours" type="number"
                                    key={personalBest.id}
                                    {...register(`personalBests.${index}.time.hours`, {
                                        valueAsNumber: true
                                    })}
                                    fullWidth/>
                                <span>{errors?.personalBests?.[index]?.time?.hours?.message}</span>
                            </Grid>
                            <Grid item xs={3} md={2}>
                                <TextField
                                    label="Minutes" type="number"
                                    key={personalBest.id}
                                    {...register(`personalBests.${index}.time.minutes`, {
                                        valueAsNumber: true
                                    })}
                                    fullWidth/>
                                <span>{errors?.personalBests?.[index]?.time?.minutes?.message}</span>
                            </Grid>
                            <Grid item xs={3} md={2}>
                                <TextField
                                    label="Seconds" type="number"
                                    key={personalBest.id}
                                    {...register(`personalBests.${index}.time.seconds`, {
                                        valueAsNumber: true
                                    })}
                                    fullWidth/>
                                <span>{errors?.personalBests?.[index]?.time?.seconds?.message}</span>
                            </Grid>
                            <Grid item xs={3} md={2}>
                                <TextField
                                    label="Hundredths" type="number"
                                    key={personalBest.id}
                                    {...register(`personalBests.${index}.time.hundredths`, {
                                        valueAsNumber: true
                                    })}
                                    fullWidth/>
                                <span>{errors?.personalBests?.[index]?.time?.hundredths?.message}</span>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <TextField
                                    label="Løp"
                                    key={personalBest.id}
                                    {...register(`personalBests.${index}.location`)}
                                    fullWidth/>

                                <span>{errors?.personalBests?.[index]?.location?.message}</span>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <TextField
                                    type="date"
                                    key={personalBest.id}
                                    {...register(`personalBests.${index}.date`)}
                                    fullWidth/>
                                <span>{errors?.personalBests?.[index]?.date?.message}</span>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Button variant="text" onClick={() => remove(index)}>
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" disabled={isSubmitting} type="submit" color="primary" fullWidth
                            style={{marginTop: '16px'}}>
                        {isSubmitting ? "Creating..." : "Create"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};


export default CreateRunner;