import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeridosEncontradosComponent } from './peridos-encontrados.component';

describe('PeridosEncontradosComponent', () => {
  let component: PeridosEncontradosComponent;
  let fixture: ComponentFixture<PeridosEncontradosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeridosEncontradosComponent]
    });
    fixture = TestBed.createComponent(PeridosEncontradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
