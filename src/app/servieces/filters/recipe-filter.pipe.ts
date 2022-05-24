import { SerachFilterArgsInterface } from './../../models/search-filter-args.interface';
import { Recipe } from './../../models/recipe.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipeFilter',
})
export class RecipeFilterPipe implements PipeTransform {
  transform(value: Recipe[], ...args: SerachFilterArgsInterface[]): Recipe[] {
    if (args[0].name === '') {
      return value;
    }
    return value.filter((recipe) => recipe.name.includes(args[0].name));
  }
}
