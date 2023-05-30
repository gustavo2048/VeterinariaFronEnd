import { TestBed } from '@angular/core/testing';

import { EncontradoService } from './encontrado.service';

describe('EncontradoService', () => {
  let service: EncontradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncontradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
