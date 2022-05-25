import { Recipe } from './../models/recipe.interface';
import { TestBed } from '@angular/core/testing';

import { SelectedItemService } from './selected-item.service';

describe('SelectedItemService', () => {
  let service: SelectedItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set recipes', () => {
    const recipes: Recipe[] = [
      {
        _id: '1',
        name: '1',
        description: '1',
        preparationTimeInMinutes: 10,
        ingredients: [{ _id: '1', name: '1', quantity: '1' }],
      },
      {
        _id: '2',
        name: '2',
        description: '1',
        preparationTimeInMinutes: 11,
        ingredients: [{ _id: '2', name: '1', quantity: '1' }],
      },
    ];
    service.recipes = recipes;
    expect(service.recipes).toEqual(recipes);
  });

  it('should get refhreshRecipes', () => {
    const refhresh = true;
    service.refhreshRecipes = true;
    expect(service.refhreshRecipes).toEqual(refhresh);
  });

  it('should set added', () => {
    const added = true;
    service.added = true;
    expect(service.added).toEqual(added);
  });

  it('should get edittingMode', () => {
    const edittingMode = true;
    service.edittingMode = true;
    expect(service.edittingMode).toEqual(edittingMode);
  });
});
