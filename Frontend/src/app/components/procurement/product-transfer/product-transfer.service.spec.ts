import { TestBed } from '@angular/core/testing';

import { ProductTransferService } from './product-transfer.service';

describe('ProductTransferService', () => {
  let service: ProductTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
