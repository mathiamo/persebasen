// api/update.ts
import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma';
import {PersonalBest} from '../../../models/runner';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const updatedRunner = req.body;
        console.log('Updating runner', updatedRunner)
        const updatedRunnerData = {
            name: updatedRunner.name,
            age: updatedRunner.age,
            image: updatedRunner.image,
            personalBests: {
                upsert: updatedRunner.personalBests.map((pb: PersonalBest) => ({
                    where: {
                        // Assuming a combination of properties to identify a PersonalBest
                        distance_value: pb.distance.value,
                        distance_unit: pb.distance.unit,
                        time_seconds: pb.time.seconds,
                        time_minutes: pb.time.minutes,
                        time_hours: pb.time.hours,
                        time_hundredths: pb.time.hundredths,
                        location: pb.location,
                        date: pb.date,
                    },
                    update: {
                        // Update the properties as needed
                        timeString: pb.timeString,
                    },
                    create: {
                        // Create a new PersonalBest
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
                    },
                })),
            },
        };

        const updatedRunnerResult = await prisma.runner.update({
            where: {id: updatedRunner.id},
            data: updatedRunnerData,
        });

        res.json(updatedRunnerResult);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        } else {
            console.error('Unknown error:', error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    } finally {
        await prisma.$disconnect();
    }
}
