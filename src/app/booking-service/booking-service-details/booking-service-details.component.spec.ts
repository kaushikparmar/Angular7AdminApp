import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingServiceDetailsComponent } from './booking-service-details.component';

describe('BookingServiceDetailsComponent', () => {
  let component: BookingServiceDetailsComponent;
  let fixture: ComponentFixture<BookingServiceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingServiceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
