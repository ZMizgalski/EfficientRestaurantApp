import { HourMinutesPipe } from './hour-minutes.pipe';

describe('HourMinutesPipe', () => {
  it('create an instance', () => {
    const pipe = new HourMinutesPipe();
    expect(pipe).toBeTruthy();
  });
});
