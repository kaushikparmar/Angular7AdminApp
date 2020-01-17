import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InappropriateListComponent } from './inappropriate-list.component';

describe('InappropriateListComponent', () => {
  let component: InappropriateListComponent;
  let fixture: ComponentFixture<InappropriateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InappropriateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InappropriateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
