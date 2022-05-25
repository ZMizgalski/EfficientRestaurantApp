import { Recipe } from './../models/recipe.interface';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectedItemService {
  private recipesLocal: BehaviorSubject<Recipe[]> = new BehaviorSubject<
    Recipe[]
  >([]);

  private edittingModeLocal: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private addedLocal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private refhreshRecipesLocal: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public set recipes(recipes: Recipe[]) {
    this.recipesLocal.next(recipes);
  }

  public get recipes(): Recipe[] {
    return this.recipesLocal.getValue();
  }

  public get recipesSubject(): BehaviorSubject<Recipe[]> {
    return this.recipesLocal;
  }

  public get refhreshRecipesSubject(): BehaviorSubject<boolean> {
    return this.refhreshRecipesLocal;
  }

  public get refhreshRecipes(): boolean {
    return this.refhreshRecipesLocal.getValue();
  }

  public set refhreshRecipes(rec: boolean) {
    this.refhreshRecipesLocal.next(rec);
  }

  public get addedSubject(): BehaviorSubject<boolean> {
    return this.addedLocal;
  }

  public get added(): boolean {
    return this.addedLocal.getValue();
  }

  public set added(rec: boolean) {
    this.addedLocal.next(rec);
  }

  public get edittingModeSubject(): BehaviorSubject<boolean> {
    return this.edittingModeLocal;
  }

  public get edittingMode(): boolean {
    return this.edittingModeLocal.getValue();
  }

  public set edittingMode(rec: boolean) {
    this.edittingModeLocal.next(rec);
  }
}
