import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietyListComponent } from './variety-list.component';

describe('VarietyListComponent', () => {
  let component: VarietyListComponent;
  let fixture: ComponentFixture<VarietyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarietyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarietyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
