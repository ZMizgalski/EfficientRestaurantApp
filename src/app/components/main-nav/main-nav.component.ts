import { SerachFilterArgsInterface } from './../../models/search-filter-args.interface';
import { EndpointService } from './../../servieces/endpoint.service';
import { ConfirmDialogComponent } from './../../dialogs/confirm-dialog/confirm-dialog.component';
import { Recipe } from './../../models/recipe.interface';
import { AboutAuthorComponent } from './../../dialogs/about-author/about-author.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { pairwise, startWith } from 'rxjs';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  public form!: FormGroup;
  public args: SerachFilterArgsInterface = { name: '' };

  public recipes: Recipe[] = [
    {
      _id: '1',
      name: 'elo3',
      preparationTimeInMinutes: 2,
      description: 'aasdasd11',
      ingredients: [
        { _id: '1212121dasdasd2', name: 'eleqweo2', quantity: '20' },
        { _id: '1212dasdsa1212', name: 'eloqw2', quantity: '20' },
        { _id: '121212das12', name: 'eloqweqwe2', quantity: '20' },
      ],
    },
    {
      _id: '2',
      name: 'elo2',
      preparationTimeInMinutes: 33,
      description: 'aasdasd122312',
      ingredients: [
        { _id: '1212121dasdasd2', name: 'eqwelo2', quantity: '20' },
        { _id: '1212dasdsa1212', name: 'elqweo2', quantity: '20' },
        { _id: '121212das12', name: 'elo2qwe', quantity: '20' },
      ],
    },
    {
      _id: '3',
      name: 'elo1',
      preparationTimeInMinutes: 11,
      description: 'aasd123123asd',
      ingredients: [
        { _id: '1212121dasdasd2', name: 'el23o2', quantity: '20' },
        { _id: '1212dasdsa1212', name: 'eewqlo2', quantity: '20' },
        { _id: '121212das12', name: 'elqweo2', quantity: '20' },
      ],
    },
  ];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private endpointService: EndpointService
  ) {}

  public gen(): void {
    this.endpointService
      .generateApiRecipe({
        _id: '3',
        name: 'elo1',
        preparationTimeInMinutes: 11,
        description: 'aasd123123asd',
        ingredients: [
          { _id: '1212121dasdasd2', name: 'el23o2', quantity: '20' },
          { _id: '1212dasdsa1212', name: 'eewqlo2', quantity: '20' },
          { _id: '121212das12', name: 'elqweo2', quantity: '20' },
        ],
      })
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  ngOnInit(): void {
    this.createForm();
    this.inputChanges();
  }

  private createForm(): void {
    this.form = this.fb.group({
      search: '',
    });
  }

  private inputChanges(): void {
    this.form.get('search')?.valueChanges.subscribe((value) => {
      this.args = { name: value };
    });
  }

  public openAboutAuthorDialog(): void {
    const dialogRef = this.dialog.open(AboutAuthorComponent);
    dialogRef.afterClosed().subscribe((_) => {});
  }

  public deleteRecipe(id: string): void {
    this.openConfirmDialog(id);
  }

  public editDialog(id: string): void {}

  public openConfirmDialog(data: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(data);
      }
    });
  }
}
