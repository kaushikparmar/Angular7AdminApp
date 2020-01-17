import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InappropriateDetailsComponent } from './inappropriate-details.component';

describe('InappropriateDetailsComponent', () => {
  let component: InappropriateDetailsComponent;
  let fixture: ComponentFixture<InappropriateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InappropriateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InappropriateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
