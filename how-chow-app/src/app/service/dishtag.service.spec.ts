import { TestBed } from '@angular/core/testing';

import { DishtagService } from './dishtag.service';

describe('DishtagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DishtagService = TestBed.get(DishtagService);
    expect(service).toBeTruthy();
  });
});
