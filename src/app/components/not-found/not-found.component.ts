import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `<div class="not-found-container">
    <i class="pi pi-refresh"></i>
    <p class="not-found-container__header">Recipe not found</p>
  </div>`,
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
