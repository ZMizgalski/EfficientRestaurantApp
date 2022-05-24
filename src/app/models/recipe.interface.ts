import { Ingredient } from '.';

export interface Recipe {
  _id: string;
  name: string;
  preparationTimeInMinutes: number;
  description: string;
  ingredients: Ingredient[];
}
