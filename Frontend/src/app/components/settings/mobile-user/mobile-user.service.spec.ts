import { TestBed } from '@angular/core/testing';

import { MobileUserService } from './mobile-user.service';

describe('MobileUserService', () => {
  let service: MobileUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
