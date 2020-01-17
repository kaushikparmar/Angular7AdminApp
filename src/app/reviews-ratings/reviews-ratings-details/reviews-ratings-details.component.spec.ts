import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsRatingsDetailsComponent } from './reviews-ratings-details.component';

describe('ReviewsRatingsDetailsComponent', () => {
  let component: ReviewsRatingsDetailsComponent;
  let fixture: ComponentFixture<ReviewsRatingsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsRatingsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsRatingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
