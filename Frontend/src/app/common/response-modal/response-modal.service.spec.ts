import { TestBed } from '@angular/core/testing';

import { ResponseModalService } from './response-modal.service';

describe('ResponseModalService', () => {
  let service: ResponseModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
