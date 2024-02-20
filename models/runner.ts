export type Runner = {
  id: number;
  name: string;
  age: number;
  image?: string | null;
  personalBests?: PersonalBest[];
}

export type RunnerCreate = Omit<Runner, 'id'>;

export type PersonalBest = {
  distance: Distance;
  time: Time;
  timeString?: string | null;
  location: string | null;
  date?: Date | null;
}

export type Distance = {
  value: number;
  unit: string;
}

export type Time = {
  seconds: number;
  minutes: number;
  hours: number;
  hundredths: number;
}

