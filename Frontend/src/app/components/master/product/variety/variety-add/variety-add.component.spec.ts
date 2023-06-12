import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietyAddComponent } from './variety-add.component';

describe('VarietyAddComponent', () => {
  let component: VarietyAddComponent;
  let fixture: ComponentFixture<VarietyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarietyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarietyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
