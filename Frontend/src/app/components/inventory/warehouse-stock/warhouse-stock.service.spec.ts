import { TestBed } from '@angular/core/testing';

import { WarhouseStockService } from './warhouse-stock.service';

describe('WarhouseStockService', () => {
  let service: WarhouseStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarhouseStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
