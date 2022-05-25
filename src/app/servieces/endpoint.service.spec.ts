import { PayloadRecipe } from './../models/payload-recipe.interface';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EndpointService } from './endpoint.service';

describe('EndpointService', () => {
  let service: EndpointService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EndpointService);
  });

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
  });

  it('should reach getAllRecipes() endpoint', async () => {});
  it('should reach getRecipe(id: string) endpoint', async () => {});
  it('should reach deleteRecipe(id: string) endpoint', async () => {});
  it('should reach editRecipe(newRecipe: PayloadRecipe,id: string) endpoint', async () => {});
});
