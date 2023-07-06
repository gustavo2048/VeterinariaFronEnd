import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCuidadorComponent } from './agregar-cuidador.component';

describe('AgregarCuidadorComponent', () => {
  let component: AgregarCuidadorComponent;
  let fixture: ComponentFixture<AgregarCuidadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarCuidadorComponent]
    });
    fixture = TestBed.createComponent(AgregarCuidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
