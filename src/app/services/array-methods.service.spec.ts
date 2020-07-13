import { TestBed } from '@angular/core/testing';

import { ArrayMethodsService } from './array-methods.service';

describe('ArrayMethodsService', () => {
  let service: ArrayMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
