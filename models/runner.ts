export type Runner = {
  id: string;
  name: string;
  age: number;
  image: string;
  personalBests: PersonalBest[];
}

export type PersonalBest = {
  distance: Distance;
  time: Time;
  timeString?: string;
  location: string;
  date?: Date;
}

export type Distance = {
  value: number | null;
  unit: string;
}

export type Time = {
  seconds?: number | null;
  minutes?: number | null;
  hours?: number | null
  hundredths?: number | null;
}

