import { AboutAuthorComponent } from './../../dialogs/about-author/about-author.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  public openAboutAuthorDialog(): void {
    const dialogRef = this.dialog.open(AboutAuthorComponent);
    dialogRef.afterClosed().subscribe((_) => {});
  }
}
