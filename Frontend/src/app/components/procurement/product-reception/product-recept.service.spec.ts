import { TestBed } from '@angular/core/testing';

import { ProductReceptService } from './product-recept.service';

describe('ProductReceptService', () => {
  let service: ProductReceptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductReceptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
