import { HourMinutesPipe } from './hour-minutes.pipe';

describe('HourMinutesPipe', () => {
  it('create an instance', () => {
    const pipe = new HourMinutesPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms in minutes "121212" to "2020h 12m"', () => {
    const pipe = new HourMinutesPipe();
    expect(pipe.transform('121212')).toBe('2020h 12m');
  });

  it('return "0h 0m" if not exists ', () => {
    const pipe = new HourMinutesPipe();
    expect(pipe.transform('')).toBe('0h 0m');
  });

  it('return "Xh Ym" if something is changing with formatted data ', () => {
    const pipe = new HourMinutesPipe();
    expect(pipe.transform('2020h sss111111m')).toBe('2020h sss111111m');
  });
});
