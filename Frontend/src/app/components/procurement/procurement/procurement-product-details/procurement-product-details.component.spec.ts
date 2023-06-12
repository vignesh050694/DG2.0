import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementProductDetailsComponent } from './procurement-product-details.component';

describe('ProcurementProductDetailsComponent', () => {
  let component: ProcurementProductDetailsComponent;
  let fixture: ComponentFixture<ProcurementProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
