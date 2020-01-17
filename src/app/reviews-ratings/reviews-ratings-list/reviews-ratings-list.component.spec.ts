import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsRatingsListComponent } from './reviews-ratings-list.component';

describe('ReviewsRatingsListComponent', () => {
  let component: ReviewsRatingsListComponent;
  let fixture: ComponentFixture<ReviewsRatingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsRatingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsRatingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
