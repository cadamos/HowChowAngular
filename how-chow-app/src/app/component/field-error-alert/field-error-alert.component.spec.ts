import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorAlertComponent } from './field-error-alert.component';

describe('FieldErrorAlertComponent', () => {
  let component: FieldErrorAlertComponent;
  let fixture: ComponentFixture<FieldErrorAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldErrorAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldErrorAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
