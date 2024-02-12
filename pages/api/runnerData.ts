import {faker} from '@faker-js/faker';
import {readableRunTime} from "../../utils/strings.util";
import {Runner} from "../../models/runner"

const runners = Array.from({length: 50}).map(() => generateRunner());

export const fetchRunners = async (query = ""): Promise<Runner[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Fetched runners");

  const filteredRunners = runners.filter((runner) =>
    runner.name.toLowerCase().includes(query.toLowerCase())
  )

  return [...filteredRunners]
}

export const addRunner = async (runner: Pick<Runner, "name">): Promise<Runner> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newRunner = generateRunner()
  newRunner.name = runner.name

  runners.unshift(newRunner)
  return newRunner;
}
export const removeRunner = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const index = runners.findIndex((runner) => runner.id === id);
  runners.splice(index, 1);
}

function generateRunner(): Runner {
  const distances = [
    {value: 1500, unit: 'meters'},
    {value: 3000, unit: 'meters'},
    {value: 5000, unit: 'meters'},
    {value: 10000, unit: 'meters'},
    {value: 21097, unit: 'meters'},
    {value: 42195, unit: 'meters'},
  ];

  const checkDistance = (distance: any) => {
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
      const date = faker.date.past() as Date;

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
    id: faker.datatype.uuid(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    age: faker.datatype.number({min: 18, max: 40}),
    image: faker.image.avatar(),
    personalBests,
  };
}

export default function handler(req: any, res: any) {
  let runners = Array.from({length: 50}).map(() => generateRunner());
  res.status(200).json(runners);
}