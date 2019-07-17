import { TestBed } from '@angular/core/testing';

import { EbrokerService } from './ebroker.service';

describe('EbrokerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EbrokerService = TestBed.get(EbrokerService);
    expect(service).toBeTruthy();
  });
});
