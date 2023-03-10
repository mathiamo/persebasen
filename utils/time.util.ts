export const parseTime = (time: string) => {
  const [seconds, minutes = '0', hours = '0'] = time.split(':').reverse();
  return {
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: parseInt(seconds),
  };
};