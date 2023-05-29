import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosGestionComponent } from './turnos-gestion.component';

describe('TurnosGestionComponent', () => {
  let component: TurnosGestionComponent;
  let fixture: ComponentFixture<TurnosGestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnosGestionComponent]
    });
    fixture = TestBed.createComponent(TurnosGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
