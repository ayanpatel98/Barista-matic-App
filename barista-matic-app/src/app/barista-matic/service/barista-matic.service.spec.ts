import { TestBed } from '@angular/core/testing';

import { BaristaMaticService } from './barista-matic.service';

describe('BaristaMaticService', () => {
  let service: BaristaMaticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaristaMaticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
