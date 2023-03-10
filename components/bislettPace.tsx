import React, { useState } from "react";
import {TextField, Select, MenuItem, FormControl, InputLabel, Typography, Grid, SelectChangeEvent} from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

interface DistanceOption {
  label: string;
  value: number;
}

const RunningPaceCalculator: React.FC = () => {
  const [distance, setDistance] = useState<DistanceOption>({ label: "1 runde", value: 546 });
  const [time, setTime] = useState<string>("00:00");

  const handleDistanceChange = (event: SelectChangeEvent<unknown>) => {

    const value = parseInt(event.target.value as string);
    const label = `${value}m`;
    setDistance({ label, value });
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
    calculatePace()
  };

  const calculatePace = () => {
    const timeArray = time.split(":");
    const minutes = parseInt(timeArray[0]);
    const seconds = parseInt(timeArray[1]);
    const duration = dayjs.duration({
      minutes: Number(minutes) || 0,
      seconds: Number(seconds) || 0
    });

    const distanceInKm = distance.value / 1000;
    const paceInSecondsPerKm = duration.asSeconds() / distanceInKm;

    let paceMinutes = Math.floor(paceInSecondsPerKm / 60);
    let paceSeconds = Math.round(paceInSecondsPerKm % 60);
    if (paceSeconds === 60) {
      paceMinutes += 1;
      paceSeconds = 0;
    }
    return `${paceMinutes}:${paceSeconds < 10 ? '0' : ''}${paceSeconds} min/km`;
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center">
      <Grid>
        <Typography variant="h5" gutterBottom sx={{marginBottom: 2}}>
          Bislett rundekalkulator
        </Typography>

        <FormControl>
          <InputLabel id="distance-select-label">Distance</InputLabel>
          <Select
            labelId="distance-select-label"
            id="distance-select"
            value={distance.value}
            label={'Distance'}
            onChange={handleDistanceChange}
          >
            <MenuItem value={546}>1 runde</MenuItem>
            <MenuItem value={546 * 2}>2 runder</MenuItem>
            <MenuItem value={546 * 3}>3 runder</MenuItem>
            <MenuItem value={546 * 4}>4 runder</MenuItem>
            <MenuItem value={546 * 5}>5 runder</MenuItem>
            <MenuItem value={546 * 6}>6 runder</MenuItem>
            <MenuItem value={546 * 7}>7 runder</MenuItem>
            <MenuItem value={546 * 8}>8 runder</MenuItem>
            <MenuItem value={546 * 9}>9 runder</MenuItem>
            <MenuItem value={546 * 10}>10 runder</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Time"
          type="time"
          defaultValue={time}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 60,
          }}
          sx={{ marginLeft: 2 }}
          onChange={handleTimeChange}
        />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          {calculatePace()}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RunningPaceCalculator;
