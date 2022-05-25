import { SelectedItemService } from './../selected-item.service';
import { Pipe, PipeTransform, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';

@Pipe({
  name: 'hourMinutes',
})
export class HourMinutesPipe implements PipeTransform {
  // private subscription!: Subscription;

  constructor(private selectedItemService: SelectedItemService) {}

  // private addSubscition(): void {
  //   this.subscription =
  //     this.selectedItemService.refhreshRecipesSubject.subscribe((value) => {
  //       console.log(value);
  //     });
  // }

  // ngOnInit(): void {
  //   this.addSubscition();
  // }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

  transform(value: string, ...args: string[]): string {
    // this.selectedItemService.refhreshRecipesSubject.subscribe((value) => {
    //   let hours = Math.floor(Number(value) / 60);
    //   let minutes = Math.floor(Number(value) % 60);
    //   console.log('eee');
    //   return hours + ' h ' + minutes + ' m';
    // });

    return value;
  }
}
