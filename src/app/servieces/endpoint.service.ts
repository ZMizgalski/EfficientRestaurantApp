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

  public generateApiRecipe(newRecipe: Recipe): Observable<any> {
    return this.http.post<any>(url + '/recipe', newRecipe, {});
  }

  public getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(url + '/recipe');
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(url + '/recipe/' + id);
  }

  public deleteRecipe(id: string): Observable<Recipe> {
    return this.http.delete<Recipe>(url + '/recipe/' + id);
  }

  public editRecipe(newRecipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(url + '/recipe/' + newRecipe._id, newRecipe);
  }
}
