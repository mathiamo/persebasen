import React, {useState} from "react";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Button from "@mui/material/Button";
import {ContentCopy} from "@mui/icons-material";
import {copyTextToClipboard} from "../utils/strings.util";

dayjs.extend(duration);

interface DistanceOption {
    label: string;
    value: number;
}

const RunningPaceCalculator: React.FC = () => {
    const [distance, setDistance] = useState<DistanceOption>({label: "1 runde", value: 546});
    const [time, setTime] = useState<string>("00:00");
    const [paceString, setPaceString] = useState<string>("");
    const [timeString, setTimeString] = useState<string>("");

    const handleDistanceChange = (event: SelectChangeEvent<unknown>) => {
        const value = parseInt(event.target.value as string);
        const label = `${value}m`;
        setDistance({label, value});
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
        calculatePace()
    };
    const timeisEmpty = (t: string) => {
        return t === "00:00";
    }
    const handleTimestringChange = () => {
        if (!timeisEmpty(time)) {
            setPaceString(timestring => {
                return timestring.length === 0 ? calculatePace() : timestring + " - " + calculatePace();
            });
            setTimeString(timestring => {
                return timestring.length === 0 ? time : timestring + " - " + time;
            });
        }
    }

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
        if (paceMinutes === 0 && paceSeconds === 0) {
            return "";
        }
        return `${paceMinutes}:${paceSeconds < 10 ? '0' : ''}${paceSeconds}`;
    };

    const setMenuItems = (numberOfMenuItems: number) => {
        const menuItems = [];
        for (let i = 1; i <= numberOfMenuItems; i++) {
            menuItems.push(<MenuItem key={i} value={i * 546}>{i} {i === 1 ? 'runde' : 'runder'}</MenuItem>);
        }

        return menuItems;
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center">
            <Grid>
                <Typography variant="h5" gutterBottom sx={{marginBottom: 2}}>
                    Bislett rundetider
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
                        {setMenuItems(10)}
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
                    sx={{marginLeft: 2}}
                    onChange={handleTimeChange}
                />
                <Button variant="contained" sx={{marginLeft: 2}} onClick={handleTimestringChange}>Legg til</Button>
                {timeString &&
                    <Grid sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography variant="h6" sx={{marginTop: 2}}>
                            {calculatePace() + " min/km"}
                        </Typography>
                        <Typography variant="caption" sx={{marginTop: 2}}>
                            {timeString}
                        </Typography>
                        <Typography variant="caption" sx={{marginTop: 2, maxWidth: 100}}>
                            {paceString}
                            <IconButton size="small" onClick={() => copyTextToClipboard(paceString)}>
                                <ContentCopy/>
                            </IconButton>
                        </Typography>
                    </Grid>
                }

            </Grid>
        </Grid>
    );
};

export default RunningPaceCalculator;
