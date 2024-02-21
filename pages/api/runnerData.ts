import {faker} from '@faker-js/faker';
import {readableRunTime} from "../../utils/strings.util";
import {PersonalBest, Runner, RunnerCreate} from "../../models/runner"
import axios from "axios";
import {NextApiRequest, NextApiResponse} from "next";

const isLocal = process.env.NODE_ENV === 'development';
const BASE_URL = isLocal ? 'http://localhost:3001' : '/api';
const runners = Array.from({length: 5}).map(() => generateRunner());

export const fetchRunners = async (query = ""): Promise<Runner[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/runners/get`, {
            params: {query: query.toLowerCase()},
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Failed to fetch runners: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching runners:", error);
        throw new Error("Failed to fetch runners");
    }
};

export const addRunner = async (newRunner: RunnerCreate): Promise<Runner> => {
    try {
        console.log("Creating runner", newRunner)
        const response = await axios.post(`${BASE_URL}/runners/create`, newRunner);

        if (response.status === 200) {
            const runner: Runner = response.data;
            runners.unshift(runner);
            return runner;
        } else {
            throw new Error(`Failed to create runner: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error creating runner:", error);
        throw new Error(`Failed to create runner: ${error}`);
    }
};

export const removeRunner = async (id: number): Promise<void> => {
    console.log("Removing runner with id", id)
    try {
        const response = await axios.delete(`${BASE_URL}/runners/delete/${id}`);

        if (response.status === 200) {
            const index = runners.findIndex((runner) => runner.id === id);
            if (index !== -1) {
                runners.splice(index, 1);
            } else {
                console.error(`Runner with id ${id} not found in local array.`);
            }
        }
    } catch (error) {
        console.error("Error removing runner:", error);
        throw new Error(`Failed to remove runner: ${error}`);
    }
};

function generateRunner(): Runner {
    const distances = [
        {value: 1500, unit: 'meters'},
        {value: 3000, unit: 'meters'},
        {value: 5000, unit: 'meters'},
        {value: 10000, unit: 'meters'},
        {value: 21097, unit: 'meters'},
        {value: 42195, unit: 'meters'},
    ];

    const checkDistance = (distance: { value: number, unit: string }) => {
        if (distance.value === 1500) {
            return faker.datatype.number({min: 205, max: 360});
        } else if (distance.value === 3000) {
            return faker.datatype.number({min: 435, max: 720});
        } else if (distance.value === 5000) {
            return faker.datatype.number({min: 750, max: 1200});
        } else if (distance.value === 10000) {
            return faker.datatype.number({min: 1540, max: 2400});
        } else if (distance.value === 21097) {
            return faker.datatype.number({min: 3500, max: 6900});
        } else if (distance.value === 42195) {
            return faker.datatype.number({min: 7100, max: 9600});
        } else {
            return 0;
        }
    }
    const personalBests = Array.from({length: distances.length})
        .map((value, index) => {
            const distance = distances[index];
            const timeInSeconds = checkDistance(distance);
            const date = faker.date.past();

            return {
                distance,
                time: {
                    hours: Math.floor(timeInSeconds / 3600) ? Math.floor(timeInSeconds / 3600) : '',
                    minutes: Math.floor((timeInSeconds % 3600) / 60),
                    seconds: timeInSeconds % 60,
                },
                timeString: readableRunTime(timeInSeconds),
                location: faker.address.city(),
                date,
            };
        });

    return {
        id: faker.datatype.number(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        age: faker.datatype.number({min: 18, max: 40}),
        image: faker.image.avatar(),
        personalBests: personalBests as PersonalBest[],
    };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const runners = Array.from({length: 4}).map(() => generateRunner());
    res.status(200).json(runners);
}