import { Recipe } from './../../models/recipe.interface';
import { FormIngredient } from './../../models/form-ingredient.interface';
import { SelectedItemService } from './../../servieces/selected-item.service';
import { HourMinutesPipe } from './../../servieces/filters/hour-minutes.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormArray,
  FormGroup,
  FormControl,
} from '@angular/forms';

import { SelectedElementDetailsComponent } from './selected-element-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PayloadRecipe } from 'src/app/models';
import { Router } from '@angular/router';

describe('SelectedElementDetailsComponent', () => {
  let component: SelectedElementDetailsComponent;
  let fixture: ComponentFixture<SelectedElementDetailsComponent>;
  let selectedItemService: SelectedItemService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedElementDetailsComponent, HourMinutesPipe],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientTestingModule,
      ],
      providers: [HourMinutesPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    selectedItemService = TestBed.inject(SelectedItemService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SelectedElementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize empty recipe', () => {
    component['initalizeEmptyRecipe']();
    const recipe = {
      _id: '',
      name: '',
      description: '',
      preparationTimeInMinutes: 0,
      ingredients: [],
    };
    expect(component['recipe'].getValue()).toEqual(recipe);
    expect(component.loaded.getValue()).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get edittingMode', () => {
    selectedItemService.edittingMode = false;
    expect(component.edittingMode.getValue()).toBeFalsy();
  });

  it('should get added', () => {
    selectedItemService.added = false;
    expect(component.added.getValue()).toBeFalsy();
  });

  it('should get Recipe', () => {
    const recipe: Recipe = {
      _id: '1',
      name: '1',
      description: '1',
      preparationTimeInMinutes: 10,
      ingredients: [{ _id: '1', name: '1', quantity: '1' }],
    };
    component['recipe'].next(recipe);
    expect(component.getRecipe).toEqual(recipe);
  });

  it('should get getIngredientsSiz', () => {
    const recipes = <FormArray>component.form.controls['ingredients'];
    recipes.push(
      new FormGroup({
        name: new FormControl('1'),
        quantity: new FormControl('2'),
      })
    );
    expect(component.getIngredientsSize).toBe(1);
  });

  it('should extracTimeCorrectly from extractPreparationTime(data: string)', () => {
    expect(
      component['extractPreparationTime']('121212dsdh 1212212321ssm')
    ).toBe(1219485041);
  });

  it('should return 0 from extractPreparationTime(data: string) if catsted to Number is 0', () => {
    expect(component['extractPreparationTime']('0')).toBe(0);
  });

  it('should enableAllInputs', () => {
    const name = component.form.get('name');
    const preparationTime = component.form.get('preparationTime');
    const description = component.form.get('description');
    for (let i = 0; i < 2; i++) {
      (<FormArray>component.form.controls['ingredients']).push(
        new FormGroup({
          name: new FormControl(''),
          quantity: new FormControl(''),
        })
      );
    }
    component['enableAllInputs']();
    (<FormArray>component.form.get('ingredients')).controls.forEach((item) => {
      expect(item?.enabled).toBe(true);
    });
    expect(name?.enabled).toBe(true);
    expect(preparationTime?.enabled).toBe(true);
    expect(description?.enabled).toBe(true);
  });

  it('should clearAllForms and enable all inputs', () => {
    selectedItemService.added = true;
    selectedItemService.addedSubject.subscribe((value) => {
      if (value) {
        component.form.reset();
        component['enableAllInputs']();
      }
    });
    const name = component.form.get('name');
    const preparationTime = component.form.get('preparationTime');
    const description = component.form.get('description');
    for (let i = 0; i < 2; i++) {
      (<FormArray>component.form.controls['ingredients']).push(
        new FormGroup({
          name: new FormControl(''),
          quantity: new FormControl(''),
        })
      );
    }
    component['enableAllInputs']();
    (<FormArray>component.form.get('ingredients')).controls.forEach((item) => {
      expect(item?.enabled).toBe(true);
      expect(item?.value).toEqual({ name: '', quantity: '' });
    });
    expect(name?.enabled).toBe(true);
    expect(preparationTime?.enabled).toBe(true);
    expect(description?.enabled).toBe(true);

    expect(name?.value).toEqual(null);
    expect(preparationTime?.value).toEqual(null);
    expect(description?.value).toEqual(null);
  });

  it('should disableAllInputs', () => {
    const name = component.form.get('name');
    const preparationTime = component.form.get('preparationTime');
    const description = component.form.get('description');
    for (let i = 0; i < 2; i++) {
      (<FormArray>component.form.controls['ingredients']).push(
        new FormGroup({
          name: new FormControl(''),
          quantity: new FormControl(''),
        })
      );
    }
    component['disableAllInputs']();
    (<FormArray>component.form.get('ingredients')).controls.forEach((item) => {
      expect(item?.enabled).toBe(false);
    });
    expect(name?.enabled).toBe(false);
    expect(preparationTime?.enabled).toBe(false);
    expect(description?.enabled).toBe(false);
  });

  it('should addIngredientFormControl', () => {
    const ingredient: FormIngredient = { name: '', quantity: '' };
    expect(component.ingredientsLoaded.getValue()).toBeFalsy();
    component.addIngredientFormControl();
    component.form.controls['ingredients'];
    expect(component.form.controls['ingredients'].value).toEqual([ingredient]);
    expect(component.ingredientsLoaded.getValue()).toBeTruthy();
  });

  it('should creatingNewRecipe()', () => {
    component.creatingNewRecipe();
    expect(selectedItemService.added).toBeTruthy();
  });

  it('should updateExistingRecipe()', () => {
    component.updateExistingRecipe();
    expect(selectedItemService.edittingMode).toBeTruthy();
  });

  it('should makeRecipeRequest(recipe: PayloadRecipe)', () => {
    const recipe: PayloadRecipe = {
      name: '1',
      description: '1',
      preparationTimeInMinutes: 10,
      ingredients: [{ name: '1', quantity: '1' }],
    };
    const detectChangesSpy = spyOn((component as any).cdr, 'detectChanges');
    component['makeRecipeRequest'](recipe);
    expect(detectChangesSpy).toHaveBeenCalled();
  });

  it('should makeSmartRoute(id: string)', () => {
    const spy = spyOn(router, 'navigate');
    component['makeSmartRoute']('1');
    const url = spy.calls.first().args[0];
    expect(url).toEqual(['recipe/1']);
  });

  it('should cancelOperationOnRecipe()', () => {
    const spy = spyOn(router, 'navigate');
    component['cancelOperationOnRecipe']();
    const url = spy.calls.first().args[0];
    expect(url).toEqual(['/home']);
  });
});
