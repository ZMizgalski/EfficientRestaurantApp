import { apiKey } from './serviceData';
import { Recipe } from './../models/recipe.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  constructor(private http: HttpClient) {}

  public generateApiRecipe(newRecipe: any): Observable<any> {
    return this.http.post<any>(`/${apiKey}/recipe`, newRecipe);
  }

  public getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`/${apiKey}/recipe`);
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`/${apiKey}/` + id);
  }

  public deleteRecipe(id: string): Observable<Recipe> {
    return this.http.delete<Recipe>(`/${apiKey}/` + id);
  }

  public editRecipe(newRecipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`/${apiKey}/` + newRecipe._id, newRecipe);
  }
}
