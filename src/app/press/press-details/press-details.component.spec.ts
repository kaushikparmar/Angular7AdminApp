import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressDetailsComponent } from './press-details.component';

describe('BlogComponent', () => {
  let component: PressDetailsComponent;
  let fixture: ComponentFixture<PressDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
