import { TestBed } from '@angular/core/testing';

import { FarmInputService } from './farm-input.service';

describe('FarmInputService', () => {
  let service: FarmInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
