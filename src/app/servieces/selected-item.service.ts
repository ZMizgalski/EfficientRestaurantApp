import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectedItemService {
  private edittingModeLocal: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private addedLocal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public get addedSubject(): BehaviorSubject<boolean> {
    return this.addedLocal;
  }

  public get added(): boolean {
    return this.addedLocal.getValue();
  }

  public set added(rec: boolean) {
    this.addedLocal.next(rec);
  }

  public get edittingModeSubject(): BehaviorSubject<boolean> {
    return this.edittingModeLocal;
  }

  public get edittingMode(): boolean {
    return this.edittingModeLocal.getValue();
  }

  public set edittingMode(rec: boolean) {
    this.edittingModeLocal.next(rec);
  }
}
