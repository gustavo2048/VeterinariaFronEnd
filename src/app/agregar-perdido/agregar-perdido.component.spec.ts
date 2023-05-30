import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPerdidoComponent } from './agregar-perdido.component';

describe('AgregarPerdidoComponent', () => {
  let component: AgregarPerdidoComponent;
  let fixture: ComponentFixture<AgregarPerdidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarPerdidoComponent]
    });
    fixture = TestBed.createComponent(AgregarPerdidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
