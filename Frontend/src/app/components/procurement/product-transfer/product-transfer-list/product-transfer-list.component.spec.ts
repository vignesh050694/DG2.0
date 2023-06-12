import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTransferListComponent } from './product-transfer-list.component';

describe('ProductTransferListComponent', () => {
  let component: ProductTransferListComponent;
  let fixture: ComponentFixture<ProductTransferListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTransferListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTransferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
