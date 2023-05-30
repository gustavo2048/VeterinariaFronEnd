import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPaseadorComponent } from './agregar-paseador.component';

describe('AgregarPaseadorComponent', () => {
  let component: AgregarPaseadorComponent;
  let fixture: ComponentFixture<AgregarPaseadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarPaseadorComponent]
    });
    fixture = TestBed.createComponent(AgregarPaseadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
