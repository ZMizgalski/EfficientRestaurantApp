import { Recipe } from './../../models/recipe.interface';
import { FormIngredient } from './../../models/form-ingredient.interface';
import { SelectedItemService } from './../../servieces/selected-item.service';
import { HourMinutesPipe } from './../../servieces/filters/hour-minutes.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
} from '@angular/forms';

import { SelectedElementDetailsComponent } from './selected-element-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Ingredient } from 'src/app/models';
import { Observable } from 'rxjs';

describe('SelectedElementDetailsComponent', () => {
  let component: SelectedElementDetailsComponent;
  let fixture: ComponentFixture<SelectedElementDetailsComponent>;
  let selectedItemService: SelectedItemService;

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
    fixture = TestBed.createComponent(SelectedElementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extracTimeCorrectly', () => {
    expect(
      component['extractPreparationTime']('121212dsdh 1212212321ssm')
    ).toBe(1219485041);
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
});
