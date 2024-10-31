import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferComponent } from './job-offer.component';

describe('JobOfferComponent', () => {
  let component: JobOfferComponent;
  let fixture: ComponentFixture<JobOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobOfferComponent]
    });
    fixture = TestBed.createComponent(JobOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
