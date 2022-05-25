import { Recipe } from './../models/recipe.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PayloadRecipe } from './../models/payload-recipe.interface';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EndpointService } from './endpoint.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EndpointService', () => {
  let service: EndpointService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EndpointService);
  });
  function expectNothing() {
    expect(true).toBeTruthy();
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reach generateApiRecipe(newRecipe: any) endpoint', async () => {
    const recipe: PayloadRecipe = {
      name: '1',
      description: '1',
      preparationTimeInMinutes: 10,
      ingredients: [{ name: '1', quantity: '1' }],
    };

    const object = {} as any;

    service.generateApiRecipe(recipe).subscribe({
      next: (response) => {
        expect(response).toEqual(object);
      },
    });
    expectNothing();
  });

  it('should reach getAllRecipes() endpoint', async () => {
    const object = {} as any;
    service.getAllRecipes().subscribe({
      next: (response) => {
        expect(response).toEqual(object);
      },
    });
    expectNothing();
  });
  it('should reach getRecipe(id: string) endpoint', async () => {
    const id = '628e6b076f047803e8ae6bb7';
    const object = {} as any;
    service.getRecipe(id).subscribe({
      next: (response) => {
        expect(response).toEqual(object);
      },
    });
    expectNothing();
  });

  it('should reach deleteRecipe(id: string) endpoint', async () => {
    const id = '628e6b076f047803e8ae6bb7';
    const object = {} as any;
    service.deleteRecipe(id).subscribe({
      next: (response) => {
        expect(response).toEqual(object);
      },
    });
    expectNothing();
  });
  it('should reach editRecipe(newRecipe: PayloadRecipe,id: string) endpoint', async () => {
    const id = '628e6b076f047803e8ae6bb7';
    const object = {} as any;
    const recipe: PayloadRecipe = {
      name: '1',
      description: '1',
      preparationTimeInMinutes: 10,
      ingredients: [{ name: '1', quantity: '1' }],
    };
    service.editRecipe(recipe, id).subscribe({
      next: (response) => {
        expect(response).toEqual(object);
      },
    });
    expectNothing();
  });

  it('should open matSnackBar with inputted message', () => {
    const message = 'Test message';
    service.openMatSnackBar(message);
    expectNothing();
  });
});
