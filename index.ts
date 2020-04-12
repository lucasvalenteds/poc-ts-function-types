import { startClock } from "./src/clock";

startClock({
  iterations: parseInt(process.argv[3], 0) || -1,
  onNextTime: (time: string) => console.log(time),
});
