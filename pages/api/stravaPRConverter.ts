import data from '../../stravadata.json';
import {Runner} from "../../models/runner";
import {faker} from "@faker-js/faker";
import {readableRunTime} from "../../utils/strings.util";

export function mapPersonalBests(): Runner {
  const personalBests = data.map((item) => ({
    distance: {
      value: item.record_type,
      unit: "m"
    },
    time: {
      hours: Math.floor(item.elapsed_time / 3600)
        ? Math.floor(item.elapsed_time / 3600)
        : '',
      minutes: Math.floor((item.elapsed_time % 3600) / 60),
      seconds: item.elapsed_time % 60,
      hundredths: 0
    },
    timeString: readableRunTime(item.elapsed_time),
    location: "",
    date: new Date()
  }));
  return {
    id: faker.datatype.uuid(),
    name: "Mathias Moen",
    age: 35,
    personalBests: personalBests
  };
}
