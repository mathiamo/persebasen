import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    try {
        const {id} = request.query
        console.log('Received request with id:', id);

        if (!id) {
            res.status(400).json({error: 'Invalid request, missing id parameter'});
            return;
        }

        const runnerWithAssociations = await prisma.runner.findUnique({
            where: {
                id: Number(id),
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
                id: Number(id),
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
