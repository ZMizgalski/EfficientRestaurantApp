import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';

import { AboutAuthorComponent } from './about-author.component';

describe('AboutAuthorComponent', () => {
  let component: AboutAuthorComponent;
  let fixture: ComponentFixture<AboutAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutAuthorComponent, MatDialogContent, MatDialogActions],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
