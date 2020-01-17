import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostFoundDetailsComponent } from './lost-found-details.component';

describe('LostFoundDetailsComponent', () => {
  let component: LostFoundDetailsComponent;
  let fixture: ComponentFixture<LostFoundDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostFoundDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostFoundDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
