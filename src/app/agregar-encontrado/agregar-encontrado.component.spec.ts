import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEncontradoComponent } from './agregar-encontrado.component';

describe('AgregarEncontradoComponent', () => {
  let component: AgregarEncontradoComponent;
  let fixture: ComponentFixture<AgregarEncontradoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEncontradoComponent]
    });
    fixture = TestBed.createComponent(AgregarEncontradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
