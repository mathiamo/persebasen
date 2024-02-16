import {Time} from "../models/runner";

export const parseTime = (time: string) => {
  const [seconds, minutes = '0', hours = '0'] = time.split(':').reverse();
  return {
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: parseInt(seconds),
  };
};
export const calculateTimeInSeconds = (time: Time) => {
  const hourseconds = time.hours*60*60;
  const minuteseconds = time.minutes*60;

  return hourseconds+minuteseconds+time.seconds;
}