import {z} from "zod";

export type Runner = {
    id: number;
    name: string;
    age: number;
    image: string;
    personalBests: PersonalBest[];
}

export type RunnerCreate = Omit<Runner, 'id' | 'personalBests'> & {
    personalBests: PersonalBestCreate[];
};
export type PersonalBestCreate = Omit<PersonalBest, 'id'>;
export type RunnerUpdate = Runner;

export type PersonalBest = {
    id: number;
    distance: Distance;
    time: Time;
    timeString?: string | null;
    location: string | null;
    date?: Date | null;
}

export type Distance = {
    value: number;
    unit: string;
}

export type Time = {
    seconds: number;
    minutes: number;
    hours: number;
    hundredths: number;
}

// Define the Zod schema for personal best
export const personalBestSchema = z.object({
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
export const runnerSchema = z.object({
    name: z.string().min(2, "Navn må ha flere enn 2 bokstaver").max(60, "maksgrensen for navn er 60 tegn"),
    age: z.number().int().positive().min(0).max(99),
    image: z.string().url(),
    personalBests: z.array(personalBestSchema),
})

