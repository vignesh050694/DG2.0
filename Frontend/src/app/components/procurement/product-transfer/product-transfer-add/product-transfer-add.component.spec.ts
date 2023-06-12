import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTransferAddComponent } from './product-transfer-add.component';

describe('ProductTransferAddComponent', () => {
  let component: ProductTransferAddComponent;
  let fixture: ComponentFixture<ProductTransferAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTransferAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTransferAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
