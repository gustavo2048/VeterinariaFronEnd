import { TestBed } from '@angular/core/testing';

import { DonacionPerroService } from './donacion-perro.service';

describe('DonacionPerroService', () => {
  let service: DonacionPerroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonacionPerroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
