import { PayloadRecipe } from './../../models/payload-recipe.interface';
import { SelectedItemService } from './../../servieces/selected-item.service';
import { FormIngredient } from './../../models/form-ingredient.interface';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { Recipe } from './../../models/recipe.interface';
import { EndpointService } from './../../servieces/endpoint.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-selected-element-details',
  templateUrl: './selected-element-details.component.html',
  styleUrls: ['./selected-element-details.component.scss'],
})
export class SelectedElementDetailsComponent implements OnInit, OnDestroy {
  private recipe: BehaviorSubject<Recipe> = new BehaviorSubject<Recipe>({
    _id: '',
    name: '',
    description: '',
    preparationTimeInMinutes: 0,
    ingredients: [],
  });
  public ingredientsLoaded: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public form!: FormGroup;
  private id!: string;
  private subscriptions: Subscription[] = [];
  constructor(
    private selectedItemService: SelectedItemService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private endpointService: EndpointService,
    private router: Router
  ) {}

  public get edittingMode(): BehaviorSubject<boolean> {
    return this.selectedItemService.edittingModeSubject;
  }

  public get added(): BehaviorSubject<boolean> {
    return this.selectedItemService.addedSubject;
  }

  private createFormGroup(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      preparationTime: new FormControl(0, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      ingredients: this.fb.array([]),
    });
  }

  private addAllSubscriptions(): void {
    this.subscriptions.push(
      this.selectedItemService.addedSubject.subscribe((value) => {
        if (value) {
          this.form.reset();
          this.enableAllInputs();
        }
      })
    );

    this.subscriptions.push(
      this.selectedItemService.edittingModeSubject.subscribe((value) => {
        if (value) {
          this.enableAllInputs();
        }
      })
    );
  }

  private disableAllInputs(): void {
    this.form.controls['name'].disable();
    this.form.controls['preparationTime'].disable();
    this.form.controls['description'].disable();
    (<FormArray>this.form.get('ingredients')).controls.forEach((item) => {
      item.disable();
    });
  }

  private enableAllInputs(): void {
    this.form.controls['name'].enable();
    this.form.controls['preparationTime'].enable();
    this.form.controls['description'].enable();
    (<FormArray>this.form.get('ingredients')).controls.forEach((item) => {
      item.enable();
    });
  }

  private setAllValues(recipe: Recipe): void {
    this.form.controls['name'].patchValue(recipe.name);
    this.form.controls['preparationTime'].patchValue(
      recipe.preparationTimeInMinutes
    );
    this.form.controls['description'].patchValue(recipe.description);
    this.patchIngredientsValues();
    this.disableAllInputs();
    this.addAllSubscriptions();
  }

  private patchIngredientsValues(): void {
    const patchedIngredients = this.form.controls['ingredients'].value.map(
      (item: FormIngredient, index: number) => {
        item.name = this.getRecipe.ingredients[index].name;
        item.quantity = this.getRecipe.ingredients[index].quantity;
        return item;
      }
    );
    this.form.controls['ingredients'].patchValue(patchedIngredients);
  }

  public get getIngredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  public get getRecipe(): Recipe {
    return this.recipe.getValue();
  }

  public get getIngredientsSize(): Number {
    return !this.getIngredients ? 0 : this.getIngredients.length;
  }

  private addAllIngredientsToRecipe(): void {
    this.form.controls['ingredients'].patchValue([]);
    if (!this.selectedItemService.added) {
      this.recipe.subscribe((value: Recipe) => {
        value.ingredients.forEach(() => {
          this.addIngredientFormControl();
        });
        this.setAllValues(value);
      });
    }
  }

  public addIngredientFormControl(): void {
    this.ingredientsLoaded.next(false);
    const control = <FormArray>this.form.controls['ingredients'];
    control.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
      })
    );
    this.ingredientsLoaded.next(true);
  }

  private getHttpRecipe(id: string): void {
    this.endpointService.getRecipe(id).subscribe({
      next: (response: Recipe) => {
        this.recipe.next(response);
        this.loaded.next(true);
      },
      error: () => {
        this.router.navigate(['/not-found']);
      },
    });
  }

  private initalizeEmptyRecipe(): void {
    this.recipe.next({
      _id: '',
      name: '',
      description: '',
      preparationTimeInMinutes: 0,
      ingredients: [],
    });
    this.loaded.next(true);
  }

  private getParamRoute(): void {
    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      const tmpId = params.get('id');
      this.id = tmpId ? tmpId : '';
      this.id
        ? this.id !== 'AddNew'
          ? this.getHttpRecipe(this.id)
          : this.initalizeEmptyRecipe()
        : '';
    });
  }

  public creatingNewRecipe(): void {
    this.selectedItemService.added = true;
  }

  public updateExistingRecipe(): void {
    this.selectedItemService.edittingMode = true;
  }

  onSubmit() {
    this.disableAllInputs();

    const recipe: PayloadRecipe = {
      name: this.form.value.name,
      preparationTimeInMinutes: Number(this.form.value.preparationTime),
      description: this.form.value.description,
      ingredients: this.form.value.ingredients,
    };
    this.makeRecipeRequest(recipe);
  }

  private makeRecipeRequest(recipe: PayloadRecipe): void {
    this.selectedItemService.edittingMode
      ? this.updateRecipe(recipe)
      : this.addNewRecipe(recipe);
  }

  private addNewRecipe(recipe: PayloadRecipe): void {
    this.endpointService.generateApiRecipe(recipe).subscribe({
      next: (response: Recipe) => {
        this.makeSmartRoute(response._id);
        this.selectedItemService.added = false;
        this.selectedItemService.refhreshRecipes = true;
      },
    });
  }

  private updateRecipe(recipe: PayloadRecipe): void {
    this.endpointService.editRecipe(recipe, this.id).subscribe({
      next: () => {
        this.makeSmartRoute(this.id);
        this.selectedItemService.edittingMode = false;
        this.selectedItemService.refhreshRecipes = true;
      },
    });
  }

  private makeSmartRoute(id: string): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['recipe/' + id]);
  }

  public deleteIngredient(index: number): void {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }

  public cancelOperationOnRecipe(): void {
    this.selectedItemService.added = false;
    this.selectedItemService.edittingMode = false;
    this.router.navigate(['home']);
  }

  ngOnInit(): void {
    this.getParamRoute();
    this.createFormGroup();
    this.addAllIngredientsToRecipe();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
    this.ingredientsLoaded.next(false);
    this.loaded.next(false);
  }
}
