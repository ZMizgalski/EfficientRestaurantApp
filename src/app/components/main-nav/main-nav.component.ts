import { SelectedItemService } from './../../servieces/selected-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SerachFilterArgsInterface } from './../../models/search-filter-args.interface';
import { EndpointService } from './../../servieces/endpoint.service';
import { ConfirmDialogComponent } from './../../dialogs/confirm-dialog/confirm-dialog.component';
import { Recipe } from './../../models/recipe.interface';
import { AboutAuthorComponent } from './../../dialogs/about-author/about-author.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  public form!: FormGroup;
  public showRecipes = false;
  public args: SerachFilterArgsInterface = { name: '' };
  public recipes: Recipe[] = [];

  constructor(
    private selectedItemService: SelectedItemService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private endpointService: EndpointService
  ) {}

  private getAllRecipes(): void {
    this.endpointService.getAllRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      this.showRecipes = true;
    });
  }

  public gen(): void {
    this.endpointService
      .generateApiRecipe({
        name: 'elo1',
        preparationTimeInMinutes: 11,
        description: 'aasd123123asd',
        ingredients: [
          { name: 'el23o2', quantity: '20' },
          { name: 'eewqlo2', quantity: '20' },
          { name: 'elqweo2', quantity: '20' },
        ],
      })
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  ngOnInit(): void {
    this.getAllRecipes();
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

  public addNewRecipe(): void {
    console.log('add new recipe');
  }

  public openConfirmDialog(data: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.endpointService.deleteRecipe(data).subscribe((resp) => {
          this.reloadRecipes();
        });
      }
    });
  }

  public route(id: string, value: boolean): void {
    this.selectedItemService.edittingMode = value;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/recipe/' + id]);
  }

  public route2(id: string): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/recipe/' + id]);
  }

  private reloadRecipes(): void {
    this.showRecipes = false;
    this.getAllRecipes();
  }
}
