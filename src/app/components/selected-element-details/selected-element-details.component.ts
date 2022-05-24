import { Ingredient } from './../../models/ingredient.interface';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Recipe } from './../../models/recipe.interface';
import { EndpointService } from './../../servieces/endpoint.service';
import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selected-element-details',
  templateUrl: './selected-element-details.component.html',
  styleUrls: ['./selected-element-details.component.scss'],
})
export class SelectedElementDetailsComponent implements OnInit, OnDestroy {
  private interval: any;
  public recipe!: Recipe;
  public ingredients: Ingredient[] = [];
  public loaded = false;
  private intervalStarted = false;
  public form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private endpointService: EndpointService
  ) {}

  private startErrorInterval(id: string): void {
    this.intervalStarted = true;
    this.interval = setInterval(() => {
      this.getRecipe(id);
    }, 2000);
  }

  private createFormGroup(): void {
    this.form = this.fb.group({
      name: new FormControl(),
      preparationTime: new FormControl(),
      description: new FormControl(),
      ingredients: this.fb.array([new FormControl()]),
    });
  }

  private addAllIngredientsToRecipe(): void {
    this.recipe.ingredients.forEach(() => {
      this.addIngredientFormControl();
    });
  }

  private addIngredientFormControl(): void {
    const control = <FormArray>this.form.controls['ingredients'];
    control.push(control);
  }

  private getRecipe(id: string): void {
    this.endpointService.getRecipe(id).subscribe({
      next: (recipe) => {
        console.log(recipe);
        this.recipe = recipe;
        this.loaded = true;
      },
      // error: () => {
      //   !this.intervalStarted ? this.startErrorInterval(id) : '';
      // },
    });
  }

  private getParamRoute(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      id ? this.getRecipe(id) : '';
    });
  }

  ngOnInit(): void {
    this.getParamRoute();
    this.createFormGroup();
    this.addAllIngredientsToRecipe();
  }

  ngOnDestroy(): void {
    this.intervalStarted = false;
    this.loaded = false;
    clearInterval(this.interval);
  }
}
