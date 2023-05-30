import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosConfirmacionComponent } from './turnos-confirmacion.component';

describe('TurnosConfirmacionComponent', () => {
  let component: TurnosConfirmacionComponent;
  let fixture: ComponentFixture<TurnosConfirmacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnosConfirmacionComponent]
    });
    fixture = TestBed.createComponent(TurnosConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
