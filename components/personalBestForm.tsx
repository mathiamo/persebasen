import React, {useState} from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

interface Distance {
    value: number;
    unit: string;
}

interface PersonalBest {
    id: number;
    distance: Distance;
    time: string;
}

interface PersonalBestsFormProps {
    personalBests: PersonalBest[];
    onSubmit: (selectedPersonalBests: number[]) => void;
}

const defaultDistances: Distance[] = [
    {value: 1500, unit: "meters"},
    {value: 3000, unit: "meters"},
    {value: 5000, unit: "meters"},
    {value: 10000, unit: "meters"},
    {value: 21097, unit: "meters"},
    {value: 42195, unit: "meters"},
];

const PersonalBestsForm: React.FC<PersonalBestsFormProps> = ({
                                                                 personalBests,
                                                                 onSubmit,
                                                             }) => {
    const [selectedPersonalBests, setSelectedPersonalBests] = useState<number[]>([]);
    const [newPersonalBest, setNewPersonalBest] = useState<{ distance: Distance; time: string }>({
        distance: defaultDistances[0],
        time: "",
    });

    const handlePersonalBestsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = Number(event.target.value);
        const selectedIndex = selectedPersonalBests.indexOf(selectedValue);
        let newSelectedPersonalBests: number[] = [];

        if (selectedIndex === -1) {
            newSelectedPersonalBests = [...selectedPersonalBests, selectedValue];
        } else {
            newSelectedPersonalBests = selectedPersonalBests.filter((value) => value !== selectedValue);
        }

        setSelectedPersonalBests(newSelectedPersonalBests);
    };

    const handleNewDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const distance = defaultDistances.find((distance) => distance.value === Number(event.target.value));
        if (distance) {
            setNewPersonalBest({...newPersonalBest, distance});
        }
    };

    const handleNewTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPersonalBest({...newPersonalBest, time: event.target.value});
    };

    const handleAddNewPersonalBest = () => {
        const newId = personalBests.length > 0 ? personalBests[personalBests.length - 1].id + 1 : 1;
        const newPersonalBestEntry = {id: newId, ...newPersonalBest};
        onSubmit([...selectedPersonalBests, newPersonalBestEntry.id]);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5">Select Personal Bests</Typography>
                {personalBests.map((personalBest) => (
                    <FormControlLabel
                        key={personalBest.id}
                        control={
                            <Checkbox
                                checked={selectedPersonalBests.includes(personalBest.id)}
                                onChange={handlePersonalBestsChange}
                                value={personalBest.id}
                            />
                        }
                        label={`${personalBest.distance.value} ${personalBest.distance.unit} - ${personalBest.time}`}
                    />
                ))}
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Add New Personal Best</Typography>
                <TextField
                    select
                    label="Distance"
                    value={newPersonalBest.distance.value}
                    onChange={handleNewDistanceChange}
                    sx={{minWidth: 120}}
                >
                    {defaultDistances.map((distance) => (
                        <MenuItem key={distance.value} value={distance.value}>
                            {`${distance.value} ${distance.unit}`}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Time"
                    value={newPersonalBest.time}
                    onChange={handleNewTimeChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">hh:mm:ss:ff</InputAdornment>,
                    }}
                    sx={{mx: 2}}
                />
                <Button variant="contained" onClick={handleAddNewPersonalBest}>
                    Add
                </Button>
            </Grid>
        </Grid>
    );
}
export default PersonalBestsForm;