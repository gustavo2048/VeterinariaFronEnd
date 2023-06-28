import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDonacionRefugioComponent } from './agregar-donacion-refugio.component';

describe('AgregarDonacionRefugioComponent', () => {
  let component: AgregarDonacionRefugioComponent;
  let fixture: ComponentFixture<AgregarDonacionRefugioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarDonacionRefugioComponent]
    });
    fixture = TestBed.createComponent(AgregarDonacionRefugioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
