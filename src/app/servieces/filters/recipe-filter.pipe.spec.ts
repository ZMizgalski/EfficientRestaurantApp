import { Recipe } from './../../models/recipe.interface';
import { SerachFilterArgsInterface } from './../../models/search-filter-args.interface';
import { RecipeFilterPipe } from './recipe-filter.pipe';

describe('RecipeFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new RecipeFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return all recipes value if name id empty', () => {
    const pipe = new RecipeFilterPipe();
    const recipes: Recipe[] = [];
    const args: SerachFilterArgsInterface = { name: '' };
    expect(pipe.transform(recipes, args)).toBe(recipes);
  });

  it('should return all recipes with similar name', () => {
    const pipe = new RecipeFilterPipe();
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
    const filteredRecipe: Recipe[] = [
      {
        _id: '2',
        name: '2',
        description: '1',
        preparationTimeInMinutes: 11,
        ingredients: [{ _id: '2', name: '1', quantity: '1' }],
      },
    ];
    const textValue: SerachFilterArgsInterface = { name: '2' };
    expect(pipe.transform(recipes, textValue)).toEqual(filteredRecipe);
  });
});
