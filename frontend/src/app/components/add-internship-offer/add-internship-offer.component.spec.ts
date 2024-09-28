import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInternshipOfferComponent } from './add-internship-offer.component';

describe('AddInternshipOfferComponent', () => {
  let component: AddInternshipOfferComponent;
  let fixture: ComponentFixture<AddInternshipOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInternshipOfferComponent]
    });
    fixture = TestBed.createComponent(AddInternshipOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
