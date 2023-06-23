import { TestBed } from '@angular/core/testing';

import { DonacionRefugioService } from './donacion-refugio.service';

describe('DonacionRefugioService', () => {
  let service: DonacionRefugioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonacionRefugioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
