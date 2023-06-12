/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CropHarvestListComponent } from './crop-harvest-list.component';

describe('CropHarvestListComponent', () => {
  let component: CropHarvestListComponent;
  let fixture: ComponentFixture<CropHarvestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropHarvestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropHarvestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
