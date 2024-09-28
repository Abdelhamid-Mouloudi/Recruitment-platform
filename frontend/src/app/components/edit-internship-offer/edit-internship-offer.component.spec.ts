import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInternshipOfferComponent } from './edit-internship-offer.component';

describe('EditInternshipOfferComponent', () => {
  let component: EditInternshipOfferComponent;
  let fixture: ComponentFixture<EditInternshipOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInternshipOfferComponent]
    });
    fixture = TestBed.createComponent(EditInternshipOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
