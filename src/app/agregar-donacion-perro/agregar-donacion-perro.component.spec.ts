import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDonacionPerroComponent } from './agregar-donacion-perro.component';

describe('AgregarDonacionPerroComponent', () => {
  let component: AgregarDonacionPerroComponent;
  let fixture: ComponentFixture<AgregarDonacionPerroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarDonacionPerroComponent]
    });
    fixture = TestBed.createComponent(AgregarDonacionPerroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
