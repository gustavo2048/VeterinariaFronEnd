import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAdopcionFormularioComponent } from './agregar-adopcion-formulario.component';

describe('AgregarAdopcionFormularioComponent', () => {
  let component: AgregarAdopcionFormularioComponent;
  let fixture: ComponentFixture<AgregarAdopcionFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarAdopcionFormularioComponent]
    });
    fixture = TestBed.createComponent(AgregarAdopcionFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
