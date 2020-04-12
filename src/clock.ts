export function date(): Promise<string> {
  return new Promise((resolve) => {
    const handle = setTimeout(() => {
      resolve(new Date().toLocaleTimeString("en-us"));
      clearTimeout(handle);
    }, 1000);
  });
}

export type ClockMode = (iteration?: number) => boolean;

export function infinite(): ClockMode {
  return () => true;
}

export function finite(ticks: number): ClockMode {
  return (iteration) => (iteration || 0) < ticks;
}

export async function* clock(mode: ClockMode): AsyncGenerator<string> {
  for (let i = 0; mode(i); i++) {
    yield await date();
  }
}

export interface ClockOptions {
  iterations: number;
  onNextTime: (time: string) => void;
}

export async function startClock(options: ClockOptions): Promise<void> {
  const mode: ClockMode =
    options.iterations >= 0 ? finite(options.iterations) : infinite();

  for await (const time of clock(mode)) {
    options.onNextTime(time);
  }
}
