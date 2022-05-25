import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Recipe } from './../../models/recipe.interface';
import { SelectedItemService } from './../../servieces/selected-item.service';
import { EndpointService } from './../../servieces/endpoint.service';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HourMinutesPipe } from './../../servieces/filters/hour-minutes.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavComponent } from './main-nav.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SelectedElementDetailsComponent } from '../selected-element-details/selected-element-details.component';

describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;
  let selectedItemService: SelectedItemService;
  let service: EndpointService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: HourMinutesPipe, useValue: {} }],
      declarations: [MainNavComponent],
    }).compileComponents();
    selectedItemService = TestBed.inject(SelectedItemService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EndpointService);
    service = TestBed.inject(EndpointService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
