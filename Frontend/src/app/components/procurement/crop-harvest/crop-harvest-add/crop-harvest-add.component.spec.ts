/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CropHarvestAddComponent } from './crop-harvest-add.component';

describe('CropHarvestAddComponent', () => {
  let component: CropHarvestAddComponent;
  let fixture: ComponentFixture<CropHarvestAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropHarvestAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropHarvestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
