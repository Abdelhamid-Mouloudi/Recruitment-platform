import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerOffersComponent } from './employer-offers.component';

describe('EmployerOffersComponent', () => {
  let component: EmployerOffersComponent;
  let fixture: ComponentFixture<EmployerOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerOffersComponent]
    });
    fixture = TestBed.createComponent(EmployerOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
