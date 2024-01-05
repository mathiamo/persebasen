import { faker } from '@faker-js/faker';
import {readableRunTime} from "../../utils/strings.util";
import {Distance} from "../../models/runner";

function generateRunner() {
  const distances = [
    { value: 1500, unit: 'meters' },
    { value: 3000, unit: 'meters' },
    { value: 5000, unit: 'meters' },
    { value: 10000, unit: 'meters' },
    { value: 21097, unit: 'meters' },
    { value: 42195, unit: 'meters' },
  ];

  const checkDistance = (distance: Distance) => {
    if(distance.value === 1500) {
      return faker.number.int({ min: 205, max: 360 });
    } else if (distance.value === 3000) {
      return faker.number.int({ min: 435, max: 720 });
    } else if (distance.value === 5000) {
      return faker.number.int({ min: 750, max: 1200 });
    }else if (distance.value === 10000) {
      return faker.number.int({ min: 1540, max: 2400 });
    }else if (distance.value === 21097) {
      return faker.number.int({ min: 3500, max: 6900 });
    }else if (distance.value === 42195) {
      return faker.number.int({ min: 7100, max: 9600 });
    } else {
      return 0;
    }
  }
  const personalBests = Array.from({ length: distances.length })
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
        location: faker.location.city(),
        date: date.toISOString().slice(0, 10),
      };
  });

  return {
    id: faker.string.uuid(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    age: faker.number.int({ min: 18, max: 40 }),
    personalBests,
  };
}

export default function handler(req: unknown, res: unknown) {
  const runners = Array.from({ length: 50 }).map(() => generateRunner());
  res.status(200).json(runners);
}