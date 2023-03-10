export interface Runner {
    id: string;
    name: string;
    age: number;
    personalBests: PersonalBest[];
}
export interface PersonalBest {
  distance: Distance;
  time: Time;
  timeString: string;
  location: string;
  date: Date;
}

export interface Distance {
    value: number;
    unit: string;
}

export interface Time {
    seconds?: number;
    minutes?: number;
    hours?: number | string
    hundredths?: number;
}