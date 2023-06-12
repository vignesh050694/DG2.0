import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReceptionTableComponent } from './product-reception-detail.component';

describe('ProductReceptionTableComponent', () => {
  let component: ProductReceptionTableComponent;
  let fixture: ComponentFixture<ProductReceptionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReceptionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReceptionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
