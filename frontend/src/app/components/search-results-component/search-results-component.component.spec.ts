import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponentComponent } from './search-results-component.component';

describe('SearchResultsComponentComponent', () => {
  let component: SearchResultsComponentComponent;
  let fixture: ComponentFixture<SearchResultsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponentComponent]
    });
    fixture = TestBed.createComponent(SearchResultsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
