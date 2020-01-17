/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PressCategoryListComponent } from './press-category-list.component';
import { SharedModule } from '../../../common/modules/shared.module';
import { PressRoutingModule } from '../press-routing.module';

xdescribe('UserListComponent', () => {
  let component: PressCategoryListComponent;
  let fixture: ComponentFixture<PressCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressCategoryListComponent ],
      imports: [
        PressRoutingModule,
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
