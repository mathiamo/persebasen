import {parseTime} from "./time.util";

export function compareRunTime(a: string | null | undefined, b: string | null | undefined): number {
  if (a == null || a === '') {
    return b == null || b === '' ? 0 : 1;
  }
  if (b == null || b === '') {
    return -1;
  }
  const { hours: aHours, minutes: aMinutes, seconds: aSeconds } = parseTime(a);
  const { hours: bHours, minutes: bMinutes, seconds: bSeconds } = parseTime(b);
  if (aHours !== bHours) {
    return aHours - bHours;
  }
  if (aMinutes !== bMinutes) {
    return aMinutes - bMinutes;
  }
  return aSeconds - bSeconds;
}