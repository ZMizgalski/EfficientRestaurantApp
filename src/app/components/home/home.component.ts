import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<div class="home-container">
    <p class="home-container__p-1">Hello!</p>
    <p class="home-container__p-2">
      Welcome in simple and efficient reastaurant app
    </p>
    <p class="home-container__p-2">Choose your recipe one the left</p>
    <i class="pi pi-arrow-left"></i>
  </div>`,
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
