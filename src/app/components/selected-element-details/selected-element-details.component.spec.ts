import { HourMinutesPipe } from './../../servieces/filters/hour-minutes.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectedElementDetailsComponent } from './selected-element-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SelectedElementDetailsComponent', () => {
  let component: SelectedElementDetailsComponent;
  let fixture: ComponentFixture<SelectedElementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedElementDetailsComponent, HourMinutesPipe],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatSnackBarModule,
        HttpClientTestingModule,
      ],
      providers: [HourMinutesPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedElementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
