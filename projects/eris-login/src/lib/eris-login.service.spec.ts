import { TestBed } from '@angular/core/testing';

import { ErisLoginService } from './eris-login.service';

describe('ErisLoginService', () => {
  let service: ErisLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErisLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
