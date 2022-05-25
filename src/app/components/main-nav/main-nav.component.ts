import { BehaviorSubject, Subscription } from 'rxjs';
import { SelectedItemService } from './../../servieces/selected-item.service';
import { Router } from '@angular/router';
import { SerachFilterArgsInterface } from './../../models/search-filter-args.interface';
import { EndpointService } from './../../servieces/endpoint.service';
import { ConfirmDialogComponent } from './../../dialogs/confirm-dialog/confirm-dialog.component';
import { Recipe } from './../../models/recipe.interface';
import { AboutAuthorComponent } from './../../dialogs/about-author/about-author.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private subscriptions: Subscription[] = [];
  // public showRecipes: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
  //   false
  // );
  public args: SerachFilterArgsInterface = { name: '' };
  public recipes: Recipe[] = [];

  constructor(
    private selectedItemService: SelectedItemService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private endpointService: EndpointService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public get showRecipes(): BehaviorSubject<boolean> {
    return this.selectedItemService.refhreshRecipesSubject;
  }

  public get edittingMode(): BehaviorSubject<boolean> {
    return this.selectedItemService.edittingModeSubject;
  }

  public get added(): BehaviorSubject<boolean> {
    return this.selectedItemService.addedSubject;
  }

  private addAllSubscriptions(): void {
    this.initializeAddedSubscription();
    this.initializeEdditingModeSubscription();
    this.initializeRecipeRefhreshSubscription();
  }

  private initializeEdditingModeSubscription(): void {
    this.subscriptions.push(
      this.selectedItemService.edittingModeSubject.subscribe((value) => {
        if (value) {
          this.reloadRecipes();
        }
      })
    );
  }

  private initializeRecipeRefhreshSubscription(): void {
    this.subscriptions.push(
      this.selectedItemService.refhreshRecipesSubject.subscribe((value) => {
        if (value) {
          this.reloadRecipes();
        }
      })
    );
  }

  private initializeAddedSubscription(): void {
    this.subscriptions.push(
      this.selectedItemService.addedSubject.subscribe((value) => {
        if (value) {
          this.reloadRecipes();
        }
      })
    );
  }

  private getAllRecipes(): void {
    this.selectedItemService.refhreshRecipes = false;
    this.endpointService.getAllRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      this.selectedItemService.refhreshRecipes = true;
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
    this.addAllSubscriptions();
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
    this.selectedItemService.added = false;
    this.selectedItemService.edittingMode = false;
    this.selectedItemService.refhreshRecipes = false;
    this.openConfirmDialog(id);
  }

  public addNewRecipe(): void {
    this.selectedItemService.added = true;
    this.selectedItemService.edittingMode = false;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['recipe/AddNew']);
  }

  public openConfirmDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      result
        ? this.deleteRecipeEndpoint(id)
        : (this.selectedItemService.refhreshRecipes = true);
    });
  }

  private deleteRecipeEndpoint(id: string): void {
    this.endpointService.deleteRecipe(id).subscribe(() => {
      this.reloadRecipes();
    });
  }

  public route(id: string, value: boolean): void {
    this.selectedItemService.edittingMode = value;
    this.selectedItemService.added = false;
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
    this.selectedItemService.refhreshRecipes = false;
    this.getAllRecipes();
  }
}
