import { Recipe } from './../../models/recipe.interface';
import { RecipeFilterPipe } from './../../servieces/filters/recipe-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectedItemService } from './../../servieces/selected-item.service';
import { EndpointService } from './../../servieces/endpoint.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HourMinutesPipe } from './../../servieces/filters/hour-minutes.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavComponent } from './main-nav.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SelectedElementDetailsComponent } from '../selected-element-details/selected-element-details.component';
import { Router } from '@angular/router';

describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;
  let selectedItemService: SelectedItemService;
  let service: EndpointService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        HttpClientModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'view/addNew', component: SelectedElementDetailsComponent },
        ]),
      ],
      providers: [HourMinutesPipe, RecipeFilterPipe],
      declarations: [MainNavComponent, HourMinutesPipe, RecipeFilterPipe],
    }).compileComponents();
    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    selectedItemService = TestBed.inject(SelectedItemService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EndpointService);
    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get edittingModeSubject', () => {
    selectedItemService.edittingMode = true;
    expect(component.edittingMode.getValue()).toBeTruthy();
  });

  it('should truncate truncate(text: string, maxCount: number)', () => {
    const truncatedName = component.truncate('1111111111', 5);
    expect(truncatedName).toBe('1111....');
  });

  it('should get addedSubject', () => {
    selectedItemService.added = true;
    expect(component.added.getValue()).toBeTruthy();
  });

  it('should tracBy: trackItem', () => {
    const recipe: Recipe = {
      _id: '1',
      name: '1',
      description: '1',
      preparationTimeInMinutes: 10,
      ingredients: [{ _id: '1', name: '1', quantity: '1' }],
    };
    const id = component.trackItem(1, recipe);
    expect(recipe._id).toEqual(id);
  });

  it('should addNewRecipe', () => {
    const spy = spyOn(router, 'navigate');
    component.addNewRecipe();
    const url = spy.calls.first().args[0];
    expect(url).toEqual(['recipe/AddNew']);
    expect(selectedItemService.added).toBe(true);
    expect(selectedItemService.edittingMode).toBe(false);
  });

  it('should editRoute', () => {
    const spy = spyOn(router, 'navigate');
    component.editRoute('11', false);
    const url = spy.calls.first().args[0];
    expect(url).toEqual(['/recipe/11']);
    expect(selectedItemService.added).toBe(false);
    expect(selectedItemService.edittingMode).toBe(false);
  });

  it('should previewRoute', () => {
    const spy = spyOn(router, 'navigate');
    component.previewRoute('1');
    const url = spy.calls.first().args[0];
    expect(url).toEqual(['/recipe/1']);
  });
});
