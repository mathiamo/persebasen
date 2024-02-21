import {Distance} from "../models/runner";

export const defaultDistances: Distance[] = [
    {value: 1500, unit: "meters"},
    {value: 3000, unit: "meters"},
    {value: 5000, unit: "meters"},
    {value: 10000, unit: "meters"},
    {value: 21097, unit: "meters"},
    {value: 42195, unit: "meters"},
];

export const distanceDisplayStrings: Record<number, string> = {
    1500: "1 500",
    3000: "3 000",
    5000: "5 000",
    10000: "10 000",
    21097: "Halvmara",
    42195: "Maraton",
};

export const getDistanceDisplayString = (value: number): string => {
    return distanceDisplayStrings[value] || `${value} meters`;
};