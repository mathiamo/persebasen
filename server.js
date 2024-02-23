// server.js

const express = require('express');
const cors = require('cors');
const {PrismaClient} = require('./prisma/generated/client');

const prisma = new PrismaClient();
const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000', // Replace with the actual origin of your React app
    credentials: true, // Allow cookies, if your app uses them
}));
app.options('*', cors());
app.use(express.json());

app.post('/runners/create', async (req, res) => {
    try {
        const createdRunner = req.body;
        console.log('Received runner data:', createdRunner);
        const savedRunner = await prisma.runner.create({
            data: {
                name: createdRunner.name,
                age: createdRunner.age,
                image: createdRunner.image,
                personalBests: {
                    create: createdRunner.personalBests.map((pb) => ({
                        distance: {
                            create: {
                                value: pb.distance.value,
                                unit: pb.distance.unit,
                            }
                        },
                        time: {
                            create: {
                                seconds: pb.time.seconds,
                                minutes: pb.time.minutes,
                                hours: pb.time.hours,
                                hundredths: pb.time.hundredths
                            }
                        },
                        timeString: pb.timeString,
                        location: pb.location,
                        date: pb.date,
                    })),
                }
            },
        });

        res.json(savedRunner);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({error: 'Internal Server Error'});
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma Client after the operation
    }
});

app.put('/runners/update', async (req, res) => {
    try {
        const {id, ...updatedRunnerData} = req.body;

        if (!id) {
            return res.status(400).json({error: 'Runner ID is required'});
        }

        console.log('Received updated runner data:', updatedRunnerData);

        const updatedRunner = await prisma.runner.update({
            where: {id: parseInt(id, 10)},
            data: {
                name: updatedRunnerData.name,
                age: updatedRunnerData.age,
                image: updatedRunnerData.image,
                personalBests: {
                    deleteMany: {}, // You might want to clear the existing personal bests
                    create: updatedRunnerData.personalBests.map((pb) => ({
                        distance: {
                            create: {
                                value: pb.distance.value,
                                unit: pb.distance.unit,
                            }
                        },
                        time: {
                            create: {
                                seconds: pb.time.seconds,
                                minutes: pb.time.minutes,
                                hours: pb.time.hours,
                                hundredths: pb.time.hundredths
                            }
                        },
                        timeString: pb.timeString,
                        location: pb.location,
                        date: pb.date,
                    })),
                }
            },
        });

        res.json(updatedRunner);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({error: 'Internal Server Error'});
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma Client after the operation
    }
});
app.get('/runners/get', async (req, res) => {
    try {
        const query = req.query.query || '';
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
            }
        });

        res.json(runners);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({error: 'Internal Server Error'});
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma Client after the operation
    }
});

app.delete('/runners/:id/delete', async (req, res) => {
    try {
        const runnerId = parseInt(req.params.id);
        console.log('Received runner ID:', runnerId);

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
            res.status(404).json({error: 'Runner not found'});
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
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({error: 'Internal Server Error'});
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma Client after the operation
    }
});

process.on('exit', () => {
    prisma.$disconnect();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
