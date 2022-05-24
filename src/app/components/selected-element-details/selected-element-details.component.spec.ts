import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedElementDetailsComponent } from './selected-element-details.component';

describe('SelectedElementDetailsComponent', () => {
  let component: SelectedElementDetailsComponent;
  let fixture: ComponentFixture<SelectedElementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedElementDetailsComponent ]
    })
    .compileComponents();
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
