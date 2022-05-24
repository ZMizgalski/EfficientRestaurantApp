import { FormIngredient } from './../../models/form-ingredient.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Recipe } from './../../models/recipe.interface';
import { EndpointService } from './../../servieces/endpoint.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private endpointService: EndpointService
  ) {}

  private createFormGroup(): void {
    this.form = this.fb.group({
      name: new FormControl(),
      preparationTime: new FormControl(),
      description: new FormControl(),
      ingredients: this.fb.array([]),
    });
  }

  private setAllValues(recipe: Recipe): void {
    this.form.controls['name'].patchValue(recipe.name);
    this.form.controls['preparationTime'].patchValue(
      recipe.preparationTimeInMinutes
    );
    this.form.controls['description'].patchValue(recipe.description);
    this.patchIngredients();
  }

  private patchIngredients(): void {
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
    });
  }

  private getParamRoute(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      id ? this.getHttpRecipe(id) : '';
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  ngOnInit(): void {
    this.getParamRoute();
    this.createFormGroup();
    this.addAllIngredientsToRecipe();
  }

  ngOnDestroy(): void {
    this.ingredientsLoaded.next(false);
    this.loaded.next(false);
  }
}
