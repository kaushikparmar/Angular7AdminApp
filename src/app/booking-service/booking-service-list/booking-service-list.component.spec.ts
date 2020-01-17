import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingServiceListComponent } from './booking-service-list.component';

describe('BookingServiceListComponent', () => {
  let component: BookingServiceListComponent;
  let fixture: ComponentFixture<BookingServiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingServiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
