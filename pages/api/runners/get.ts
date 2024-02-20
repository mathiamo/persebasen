// api/get.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = Array.isArray(req.query.query) ? req.query.query[0] : req.query.query || '';

        const runners = await prisma.runner.findMany({
            where: {
                name: {
                    contains: query.toLowerCase(),
                },
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

        res.json(runners);
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
