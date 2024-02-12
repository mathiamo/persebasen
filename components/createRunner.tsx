import React from 'react';
import {Distance, Runner} from '../models/runner';
import {Controller, SubmitHandler, useFieldArray, useForm} from 'react-hook-form';
import {Button, Grid, MenuItem, Select, TextField} from '@mui/material';
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";

interface Props {
  onCreateRunner: (runner: Runner) => Runner;
}


// Define the Zod schema for personal best
const personalBestSchema = z.object({
  distance: z.object({
    value: z.number().int().positive().nullable(),
    unit: z.string(),
  }),
  time: z.object({
    seconds: z.number().int().positive().nullable(),
    minutes: z.number().int().positive().nullable(),
    hours: z.number().int().positive().nullable(),
    hundredths: z.number().int().positive().nullable(),
  }),
  timeString: z.string(),
  location: z.string(),
  date: z.date().nullable(),
});
const schema = z.object({
  name: z.string().min(2, "Navn må ha flere enn 2 bokstaver").max(60, "maksgrensen for navn er 60 tegn"),
  age: z.number().int().positive().min(0).max(99),
  image: z.string().url(),
  personalBests: z.array(personalBestSchema),
})

type CreateRunnerFormFields = z.infer<typeof schema>;

const CreateRunner = () => {

  const defaultDistances: Distance[] = [
    {value: 1500, unit: "meters"},
    {value: 3000, unit: "meters"},
    {value: 5000, unit: "meters"},
    {value: 10000, unit: "meters"},
    {value: 21097, unit: "meters"},
    {value: 42195, unit: "meters"},
  ];

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: {isSubmitSuccessful, errors, isSubmitting},
  } = useForm<CreateRunnerFormFields>({
    resolver: zodResolver(schema),
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'personalBests',
  });
  const handleAddPersonalBest = () => {
    append({
      distance: {
        value: null, // Provide a default value, or adjust as needed
        unit: 'meters', // Provide a default value, or adjust as needed
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
    console.log(data)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data)
    } catch (error) {
      setError("name", {
        message: "Navn allerede brukt",
      })
    }
  }

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
          <TextField label="Image" {...register("image")} fullWidth/>
        </Grid>
        {/* Personal Bests Section */}
        <Grid item xs={12}>
          <h2>Personal Bests</h2>

          {fields.map((personalBest, index) => (
            <><Grid item xs={2}>
              <Controller
                name={`personalBests.${index}.distance.value`}
                control={control}
                render={({field}) => (
                  <Select {...field} label="Distance" fullWidth>
                    {defaultDistances.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value + ' ' + option.unit}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid><Grid container spacing={2} key={index}>
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

              <Grid item xs={2}>
                <TextField
                  label="Løp"
                  key={personalBest.id}
                  {...register(`personalBests.${index}.location`)}
                  fullWidth/>

                <span>{errors?.personalBests?.[index]?.location?.message}</span>
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="Dato"
                  key={personalBest.id}
                  {...register(`personalBests.${index}.date`)}
                  fullWidth/>
                <span>{errors?.personalBests?.[index]?.date?.message}</span>
              </Grid>

              <Grid item xs={2}>
                <Button variant="outlined" type="button" onClick={() => remove(index)}>
                  Remove Personal Best
                </Button>
              </Grid>
            </Grid></>
          ))}
          <Button variant="contained" type="button" onClick={handleAddPersonalBest}>
            Add Personal Best
          </Button>
        </Grid>


        <Grid item xs={12}>
          <Button disabled={isSubmitting} type="submit" variant="outlined" color="primary" fullWidth>
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};


export default CreateRunner;