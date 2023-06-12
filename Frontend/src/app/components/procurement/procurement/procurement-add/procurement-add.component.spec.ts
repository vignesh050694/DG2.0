import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementAddComponent } from './procurement-add.component';

describe('ProcurementAddComponent', () => {
  let component: ProcurementAddComponent;
  let fixture: ComponentFixture<ProcurementAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
