import { BehaviorSubject, Subscription } from 'rxjs';
import { SelectedItemService } from './../../servieces/selected-item.service';
import { Router } from '@angular/router';
import { SerachFilterArgsInterface } from './../../models/search-filter-args.interface';
import { EndpointService } from './../../servieces/endpoint.service';
import { ConfirmDialogComponent } from './../../dialogs/confirm-dialog/confirm-dialog.component';
import { Recipe } from './../../models/recipe.interface';
import { AboutAuthorComponent } from './../../dialogs/about-author/about-author.component';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private subscriptions: Subscription[] = [];
  public args: SerachFilterArgsInterface = { name: '' };

  constructor(
    private selectedItemService: SelectedItemService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
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

  public get recipes(): any {
    return this.selectedItemService.recipesSubject;
  }

  private initializeRecipeRefhreshSubscription(): void {
    this.subscriptions.push(
      this.selectedItemService.refhreshRecipesSubject.subscribe((value) => {
        value ? this.getAllRecipes() : '';
      })
    );
  }

  public trackItem(index: number, item: Recipe) {
    return item._id;
  }

  private getAllRecipes(): void {
    this.cdr.detectChanges();
    this.endpointService.getAllRecipes().subscribe({
      next: (recipes: Recipe[]) => {
        this.selectedItemService.recipes = recipes;
        this.cdr.markForCheck();
        this.endpointService.openMatSnackBar(
          'Succesfully downlaoded all recipes'
        );
      },
      error: (response: HttpErrorResponse) => {
        this.endpointService.openMatSnackBar(response.message);
      },
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
      result ? this.deleteRecipeEndpoint(id) : '';
    });
  }

  private deleteRecipeEndpoint(id: string): void {
    this.endpointService.deleteRecipe(id).subscribe({
      next: () => {
        this.selectedItemService.refhreshRecipes = true;
        this.endpointService.openMatSnackBar(
          `Succesfully deleted reciep with id: ${id}`
        );
        this.router.navigate(['/home']);
      },
      error: (response: HttpErrorResponse) => {
        this.endpointService.openMatSnackBar(response.message);
      },
    });
  }

  public truncate(text: string, maxCount: number): string {
    return text.length > maxCount
      ? text.substring(0, maxCount - 1) + '....'
      : text;
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
    this.router.navigate(['/home']);
    this.createForm();
    this.inputChanges();
    this.initializeRecipeRefhreshSubscription();
    this.selectedItemService.refhreshRecipes = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
