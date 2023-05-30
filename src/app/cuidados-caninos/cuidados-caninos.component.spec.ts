import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuidadosCaninosComponent } from './cuidados-caninos.component';

describe('CuidadosCaninosComponent', () => {
  let component: CuidadosCaninosComponent;
  let fixture: ComponentFixture<CuidadosCaninosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuidadosCaninosComponent]
    });
    fixture = TestBed.createComponent(CuidadosCaninosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
