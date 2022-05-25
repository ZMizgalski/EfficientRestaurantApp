import { PayloadRecipe } from './../../models/payload-recipe.interface';
import { SelectedItemService } from './../../servieces/selected-item.service';
import { FormIngredient } from './../../models/form-ingredient.interface';
import { BehaviorSubject, take } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Recipe } from './../../models/recipe.interface';
import { EndpointService } from './../../servieces/endpoint.service';
import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
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

  private createFormGroup(): void {
    this.form = this.fb.group({
      name: new FormControl(),
      preparationTime: new FormControl(),
      description: new FormControl(),
      ingredients: this.fb.array([]),
    });
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
    this.switchEditingMode();
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

  private addAllIngredientsToRecipe(): void {
    this.form.controls['ingredients'].patchValue([]);
    this.recipe.subscribe((value: Recipe) => {
      value.ingredients.forEach(() => {
        this.addIngredientFormControl();
      });
      this.ingredientsLoaded.next(true);
      this.setAllValues(value);
    });
  }

  private addIngredientFormControl(): void {
    const control = <FormArray>this.form.controls['ingredients'];
    control.push(
      new FormGroup({
        name: new FormControl(),
        quantity: new FormControl(),
      })
    );
  }

  private getHttpRecipe(id: string): void {
    this.endpointService.getRecipe(id).subscribe({
      next: (response: Recipe) => {
        this.recipe.next(response);
        this.loaded.next(true);
      },
      error: (error) => {
        this.router.navigate(['/not-found']);
      },
    });
  }

  private getParamRoute(): void {
    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      const tmpId = params.get('id');
      this.id = tmpId ? tmpId : '';
      this.id ? this.getHttpRecipe(this.id) : '';
    });
  }

  onSubmit() {
    this.selectedItemService.edittingMode = false;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.disableAllInputs();
    this.updateRecipe();
  }

  private updateRecipe(): void {
    const recipe: PayloadRecipe = {
      name: this.form.value.name,
      preparationTimeInMinutes: Number(this.form.value.preparationTime),
      description: this.form.value.description,
      ingredients: this.form.value.ingredients,
    };
    this.endpointService.editRecipe(recipe, this.id).subscribe({
      next: () => {},
    });
  }

  ngOnInit(): void {
    this.getParamRoute();
    this.createFormGroup();
    this.addAllIngredientsToRecipe();
  }

  private switchEditingMode(): void {
    if (this.selectedItemService.edittingMode) {
      this.enableAllInputs();
    }
  }

  ngOnDestroy(): void {
    this.ingredientsLoaded.next(false);
    this.loaded.next(false);
  }
}
