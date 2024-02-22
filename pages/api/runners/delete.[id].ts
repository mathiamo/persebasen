import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            res.status(405).json({error: 'Method Not Allowed'});
            return;
        }
        const runnerId = parseInt(req.query.id as string);

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
            res.status(404).json({error: 'Runner not found'});
            return;
        }

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
