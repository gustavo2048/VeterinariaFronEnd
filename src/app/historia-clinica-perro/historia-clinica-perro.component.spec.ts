import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaClinicaPerroComponent } from './historia-clinica-perro.component';

describe('HistoriaClinicaPerroComponent', () => {
  let component: HistoriaClinicaPerroComponent;
  let fixture: ComponentFixture<HistoriaClinicaPerroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriaClinicaPerroComponent]
    });
    fixture = TestBed.createComponent(HistoriaClinicaPerroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
