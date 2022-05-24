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
  private recipe: Subject<Recipe> = new Subject<Recipe>();
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

  public get getIngredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  private addAllIngredientsToRecipe(): void {
    this.recipe.subscribe((value: Recipe) => {
      value.ingredients.forEach(() => {
        this.addIngredientFormControl();
      });
      this.ingredientsLoaded.next(true);
    });
  }

  private addIngredientFormControl(): void {
    const control = <FormArray>this.form.controls['ingredients'];
    control.push(new FormControl());
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
