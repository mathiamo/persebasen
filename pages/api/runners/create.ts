// api/create.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import {PersonalBest} from "../../../models/runner";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const createdRunner = req.body;
        console.log('Received runner data:', createdRunner);
        const savedRunner = await prisma.runner.create({
            data: {
                name: createdRunner.name,
                age: createdRunner.age,
                personalBests: {
                    create: createdRunner.personalBests.map((pb: PersonalBest) => ({
                        distance: {
                            create: {
                                value: pb.distance.value,
                                unit: pb.distance.unit,
                            },
                        },
                        time: {
                            create: {
                                seconds: pb.time.seconds,
                                minutes: pb.time.minutes,
                                hours: pb.time.hours,
                                hundredths: pb.time.hundredths,
                            },
                        },
                        timeString: pb.timeString,
                        location: pb.location,
                        date: pb.date,
                    })),
                },
            },
        });

        res.json(savedRunner);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.error('Unknown error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma Client after the operation
    }
}
