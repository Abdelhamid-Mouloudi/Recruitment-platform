import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobOfferComponent } from './add-job-offer.component';

describe('AddJobOfferComponent', () => {
  let component: AddJobOfferComponent;
  let fixture: ComponentFixture<AddJobOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddJobOfferComponent]
    });
    fixture = TestBed.createComponent(AddJobOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
