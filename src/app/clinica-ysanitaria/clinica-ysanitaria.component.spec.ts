import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaYSanitariaComponent } from './clinica-ysanitaria.component';

describe('ClinicaYSanitariaComponent', () => {
  let component: ClinicaYSanitariaComponent;
  let fixture: ComponentFixture<ClinicaYSanitariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClinicaYSanitariaComponent]
    });
    fixture = TestBed.createComponent(ClinicaYSanitariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
