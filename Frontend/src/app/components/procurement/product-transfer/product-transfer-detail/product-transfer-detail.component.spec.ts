import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTransferdetailsLsitComponent } from './product-transfer-detail.component';

describe('ProductTransferdetailsLsitComponent', () => {
  let component: ProductTransferdetailsLsitComponent;
  let fixture: ComponentFixture<ProductTransferdetailsLsitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTransferdetailsLsitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTransferdetailsLsitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
