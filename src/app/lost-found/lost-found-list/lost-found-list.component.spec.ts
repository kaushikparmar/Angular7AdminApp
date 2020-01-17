import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostFoundListComponent } from './lost-found-list.component';

describe('LostFoundListComponent', () => {
  let component: LostFoundListComponent;
  let fixture: ComponentFixture<LostFoundListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostFoundListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostFoundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
