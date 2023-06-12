import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmInputComponent } from './farm-input.component';

describe('FarmInputComponent', () => {
  let component: FarmInputComponent;
  let fixture: ComponentFixture<FarmInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
