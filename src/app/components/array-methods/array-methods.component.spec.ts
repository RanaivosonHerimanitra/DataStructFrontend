import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceFormComponent } from './array-methods.component';

describe('ArrayMethodsComponent', () => {
  let component: AbsenceFormComponent;
  let fixture: ComponentFixture<AbsenceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
