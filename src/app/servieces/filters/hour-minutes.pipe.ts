import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourMinutes',
})
export class HourMinutesPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    if (!value) {
      return '0h 0m';
    }

    if (isNaN(Number(value))) {
      const arr = value.toString().split('m');
      const h = arr[0] ? arr[0] : '';
      const m = arr[1] ? arr[1] : '';
      return h + '' + m + 'm';
    }

    let hours = Math.floor(Number(value) / 60);
    let minutes = Math.floor(Number(value) % 60);
    return hours + 'h ' + minutes + 'm';
  }
}
