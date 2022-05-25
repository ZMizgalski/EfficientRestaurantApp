import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-author',
  templateUrl: './about-author.component.html',
  styleUrls: ['./about-author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutAuthorComponent {}
