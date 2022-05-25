import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SelectedElementDetailsComponent } from './components/selected-element-details/selected-element-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AboutAuthorComponent } from './dialogs/about-author/about-author.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { ApiInterceptorService } from './servieces/api-interceptor.service';
import { RecipeFilterPipe } from './servieces/filters/recipe-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HourMinutesPipe } from './servieces/filters/hour-minutes.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    SelectedElementDetailsComponent,
    NotFoundComponent,
    HomeComponent,
    AboutAuthorComponent,
    ConfirmDialogComponent,
    RecipeFilterPipe,
    HourMinutesPipe,
  ],
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true,
    },
    HourMinutesPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
