import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAdopcionComponent } from './agregar-adopcion.component';

describe('AgregarAdopcionComponent', () => {
  let component: AgregarAdopcionComponent;
  let fixture: ComponentFixture<AgregarAdopcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarAdopcionComponent]
    });
    fixture = TestBed.createComponent(AgregarAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
