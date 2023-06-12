import { TestBed } from '@angular/core/testing';

import { DynamicFormControlServiceService } from './dynamic-form-control-service.service';

describe('DynamicFormControlServiceService', () => {
  let service: DynamicFormControlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFormControlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
