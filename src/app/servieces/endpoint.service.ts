import { Recipe } from './../models/recipe.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from './serviceData';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  constructor(private http: HttpClient) {}

  public generateApiRecipe(newRecipe: any): Observable<any> {
    return this.http.post<any>(
      '/3b9072efed4741f58b23f962b607544f/recipe',
      newRecipe
    );
  }

  public getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('/3b9072efed4741f58b23f962b607544f/recipe');
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>('recipe/' + id);
  }

  public deleteRecipe(id: string): Observable<Recipe> {
    return this.http.delete<Recipe>('recipe/' + id);
  }

  public editRecipe(newRecipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>('recipe/' + newRecipe._id, newRecipe);
  }
}
