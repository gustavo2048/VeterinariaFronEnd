import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEncontradoComponent } from './detalle-encontrado.component';

describe('DetalleEncontradoComponent', () => {
  let component: DetalleEncontradoComponent;
  let fixture: ComponentFixture<DetalleEncontradoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleEncontradoComponent]
    });
    fixture = TestBed.createComponent(DetalleEncontradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
