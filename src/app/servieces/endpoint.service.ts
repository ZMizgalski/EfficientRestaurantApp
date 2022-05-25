import { MatSnackBar } from '@angular/material/snack-bar';
import { PayloadRecipe } from './../models/payload-recipe.interface';
import { apiKey } from './serviceData';
import { Recipe } from './../models/recipe.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  public openMatSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  public generateApiRecipe(newRecipe: any): Observable<any> {
    return this.http.post<any>(`/${apiKey}/recipe`, newRecipe);
  }

  public getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`/${apiKey}/recipe`);
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`/${apiKey}/recipe/` + id);
  }

  public deleteRecipe(id: string): Observable<Recipe> {
    return this.http.delete<Recipe>(`/${apiKey}/recipe/` + id);
  }

  public editRecipe(
    newRecipe: PayloadRecipe,
    id: string
  ): Observable<PayloadRecipe> {
    return this.http.put<Recipe>(`/${apiKey}/recipe/` + id, newRecipe);
  }
}
