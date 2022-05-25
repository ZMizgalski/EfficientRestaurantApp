import { PayloadIngredient } from './ingredient-recipe.interface';

export interface PayloadRecipe {
  name: string;
  preparationTimeInMinutes: number;
  description: string;
  ingredients: PayloadIngredient[];
}
