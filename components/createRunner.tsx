import React from 'react';
import {Distance, PersonalBest, Runner, RunnerCreate, Time} from '../models/runner';
import {Controller, SubmitHandler, useFieldArray, useForm} from 'react-hook-form';
import {Button, Grid, MenuItem, Select, TextField} from '@mui/material';
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {addRunner} from "../pages/api/runnerData";
import {faker} from "@faker-js/faker";
import {readableRunTime} from "../utils/strings.util";
import {calculateTimeInSeconds} from "../utils/time.util";
import {HorizontalRule} from "@mui/icons-material";
import {defaultDistances} from "../utils/running.util";

interface CreateRunnerFormProps {
  onSubmitSuccess: (data: RunnerCreate) => void;
}


// Define the Zod schema for personal best
const personalBestSchema = z.object({
  distance: z.object({
    value: z.number().int().positive(),
    unit: z.string(),
  }),
  time: z.object({
    seconds: z.number().int().nonnegative(),
    minutes: z.number().int().nonnegative(),
    hours: z.number().int().nonnegative(),
    hundredths: z.number().int().nonnegative(),
  }),
  timeString: z.string().nullable(),
  location: z.string().nullable(),
  date: z.coerce.date().nullable(),
});
const schema = z.object({
  name: z.string().min(2, "Navn må ha flere enn 2 bokstaver").max(60, "maksgrensen for navn er 60 tegn"),
  age: z.number().int().positive().min(0).max(99),
  personalBests: z.array(personalBestSchema),
})

export type CreateRunnerFormFields = z.infer<typeof schema>;

const CreateRunner: React.FC<CreateRunnerFormProps> = ({ onSubmitSuccess }) => {



  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: {errors, isSubmitting, },
  } = useForm<CreateRunnerFormFields>({
    resolver: zodResolver(schema),
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'personalBests',
  });
  const handleAddPersonalBest = () => {
    const usedDistanceValues = new Set(fields.map((pb) => pb.distance.value));
    const nextFreeDistance = defaultDistances.find((dist) => !usedDistanceValues.has(dist.value));

    append({
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);

      const pbs: PersonalBest[] =
          data.personalBests.map( (pb) => ({
                distance: {
                  value: pb.distance.value,
                  unit: pb.distance.unit,
                },
                date: pb.date,
                time: pb.time,
                location: pb.location,
                timeString: readableRunTime(calculateTimeInSeconds(pb.time)),
              })
      )

      onSubmitSuccess({
        name: data.name,
        age: data.age,
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

        {/* Personal Bests Section */}
        <Grid item xs={12}>

          <Button variant="contained" type="button" onClick={handleAddPersonalBest} style={{ marginBottom: '16px' }} >
            Add Personal Best
          </Button>

          {fields.map((personalBest, index) => (

            <Grid key={index} container spacing={3} alignItems="center" style={{ marginTop: '16px' }} >

              <Grid item xs={4}>
                <Controller
                    name={`personalBests.${index}.distance.value`}
                    control={control}
                    render={({ field }) => (
                        <Select
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
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
              <Grid item xs={2}>
                <TextField
                  label="Hours" type="number"
                  key={personalBest.id}
                  {...register(`personalBests.${index}.time.hours`, {
                    valueAsNumber: true
                  })}
                  fullWidth/>
                <span>{errors?.personalBests?.[index]?.time?.hours?.message}</span>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Minutes" type="number"
                  key={personalBest.id}
                  {...register(`personalBests.${index}.time.minutes`, {
                    valueAsNumber: true
                  })}
                  fullWidth/>
                <span>{errors?.personalBests?.[index]?.time?.minutes?.message}</span>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Seconds" type="number"
                  key={personalBest.id}
                  {...register(`personalBests.${index}.time.seconds`, {
                    valueAsNumber: true
                  })}
                  fullWidth/>
                <span>{errors?.personalBests?.[index]?.time?.seconds?.message}</span>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Hundredths" type="number"
                  key={personalBest.id}
                  {...register(`personalBests.${index}.time.hundredths`, {
                    valueAsNumber: true
                  })}
                  fullWidth/>
                <span>{errors?.personalBests?.[index]?.time?.hundredths?.message}</span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Løp"
                  key={personalBest.id}
                  {...register(`personalBests.${index}.location`)}
                  fullWidth/>

                <span>{errors?.personalBests?.[index]?.location?.message}</span>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Dato"
                  type="date"
                  key={personalBest.id}
                  {...register(`personalBests.${index}.date`)}
                  fullWidth/>
                <span>{errors?.personalBests?.[index]?.date?.message}</span>
              </Grid>
              <Grid item xs={4}>
                <Button variant="text" onClick={() => remove(index)}>
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" disabled={isSubmitting} type="submit"  color="primary" fullWidth style={{ marginTop: '16px' }}>
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};


export default CreateRunner;