import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDonacionPerroComponent } from './detalle-donacion-perro.component';

describe('DetalleDonacionPerroComponent', () => {
  let component: DetalleDonacionPerroComponent;
  let fixture: ComponentFixture<DetalleDonacionPerroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleDonacionPerroComponent]
    });
    fixture = TestBed.createComponent(DetalleDonacionPerroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
