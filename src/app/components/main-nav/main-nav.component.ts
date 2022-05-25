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
  public args: SerachFilterArgsInterface = { name: '' };
  public recipes: Recipe[] = [];

  constructor(
    private selectedItemService: SelectedItemService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private endpointService: EndpointService
  ) {}

  public get showRecipes(): BehaviorSubject<boolean> {
    return this.selectedItemService.refhreshRecipesSubject;
  }

  public get edittingMode(): BehaviorSubject<boolean> {
    return this.selectedItemService.edittingModeSubject;
  }

  public get added(): BehaviorSubject<boolean> {
    return this.selectedItemService.addedSubject;
  }

  private initializeRecipeRefhreshSubscription(): void {
    this.subscriptions.push(
      this.selectedItemService.refhreshRecipesSubject.subscribe((value) => {
        value ? this.getAllRecipes() : '';
      })
    );
  }

  private getAllRecipes(): void {
    this.endpointService.getAllRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    });
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
    this.selectedItemService.refhreshRecipes = false;
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
      this.selectedItemService.refhreshRecipes = true;
    });
  }

  public editRoute(id: string, value: boolean): void {
    this.selectedItemService.edittingMode = value;
    this.selectedItemService.added = false;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/recipe/' + id]);
  }

  public previewRoute(id: string): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/recipe/' + id]);
  }

  ngOnInit(): void {
    this.selectedItemService.refhreshRecipes = true;
    this.createForm();
    this.inputChanges();
    this.initializeRecipeRefhreshSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
