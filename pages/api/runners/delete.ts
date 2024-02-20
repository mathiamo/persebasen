// api/delete.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const runnerId = parseInt(req.query.id as string);

        // Find the runner along with their related personal bests, distances, and times
        const runnerWithAssociations = await prisma.runner.findUnique({
            where: {
                id: runnerId,
            },
            include: {
                personalBests: {
                    include: {
                        distance: true,
                        time: true,
                    },
                },
            },
        });

        if (!runnerWithAssociations) {
            // Runner not found
            res.status(404).json({ error: 'Runner not found' });
            return;
        }

        // Delete the runner and cascade deletion of related records
        const deletedRunner = await prisma.runner.delete({
            where: {
                id: runnerId,
            },
            include: {
                personalBests: {
                    include: {
                        distance: true,
                        time: true,
                    },
                },
            },
        });

        res.json(deletedRunner);
    }  catch (error: unknown) {
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
