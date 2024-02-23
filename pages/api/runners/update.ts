import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma';
import {PersonalBest} from '../../../models/runner';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const updatedRunner = req.body;

        const updatedRunnerData = await prisma.runner.update({
            where: {id: updatedRunner.id},
            data: {
                name: updatedRunner.name,
                age: updatedRunner.age,
                image: updatedRunner.image,
                personalBests: {
                    updateMany: updatedRunner.personalBests
                        .filter((pb: PersonalBest) => pb.id !== -1) // Filter out new entries
                        .map((pb: PersonalBest) => ({
                            where: {id: pb.id},
                            data: {
                                timeString: pb.timeString,
                                location: pb.location,
                                date: pb.date,
                                time: {
                                    upsert: {
                                        seconds: pb.time.seconds,
                                        minutes: pb.time.minutes,
                                        hours: pb.time.hours,
                                        hundredths: pb.time.hundredths,
                                    },
                                },
                                distance: {
                                    upsert: {
                                        value: pb.distance.value,
                                        unit: pb.distance.unit,
                                    },
                                },
                            },
                        })),
                    create: updatedRunner.personalBests
                        .filter((pb: PersonalBest) => pb.id === undefined) // Filter only new entries
                        .map((pb: PersonalBest) => ({
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

        res.json(updatedRunnerData);
    } catch (error: unknown) {
        console.error('Error:', error);
        res.status(500).json({error: 'Internal Server Error'});
    } finally {
        await prisma.$disconnect();
    }
}