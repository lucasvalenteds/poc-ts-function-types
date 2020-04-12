import {
  date,
  clock,
  ClockMode,
  finite,
  infinite,
  startClock,
  ClockOptions,
} from "./clock";

describe("date", () => {
  test("Returns ISO date as string after 1ms", async () => {
    const timestamp: string = await date();

    expect(timestamp.length > 0).toBeTruthy();
  });
});

describe("mode", () => {
  test("Infinite always returns true", () => {
    const mode: ClockMode = infinite();

    expect(mode()).toBeTruthy();
  });

  test("Finite uses less operator", () => {
    const [ticksA, iterationsA] = [5, 4];
    const [ticksB, iterationsB] = [10, 10];

    expect(finite(ticksA)(iterationsA)).toBeTruthy();
    expect(finite(ticksB)(iterationsB)).toBeFalsy();
  });
});

describe("clock", () => {
  test("Stop returning after a given condition (mode)", async () => {
    const iterations = 1;
    const mode: ClockMode = finite(iterations);

    const instance = clock(mode);

    expect((await instance.next()).done).toBeFalsy();
    expect((await instance.next()).done).toBeTruthy();
  });
});

describe("startClock", () => {
  test("Sends timestamp to a callback function", async () => {
    const mockOnNextTime = jest.fn();
    const options: ClockOptions = {
      iterations: 2,
      onNextTime: mockOnNextTime,
    };

    await startClock(options);

    expect(mockOnNextTime).toHaveBeenCalledTimes(options.iterations);
  });
});
