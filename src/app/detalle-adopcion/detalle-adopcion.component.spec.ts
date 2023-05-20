import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdopcionComponent } from './detalle-adopcion.component';

describe('DetalleAdopcionComponent', () => {
  let component: DetalleAdopcionComponent;
  let fixture: ComponentFixture<DetalleAdopcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAdopcionComponent]
    });
    fixture = TestBed.createComponent(DetalleAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
