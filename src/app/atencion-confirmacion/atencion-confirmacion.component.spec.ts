import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionConfirmacionComponent } from './atencion-confirmacion.component';

describe('AtencionConfirmacionComponent', () => {
  let component: AtencionConfirmacionComponent;
  let fixture: ComponentFixture<AtencionConfirmacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtencionConfirmacionComponent]
    });
    fixture = TestBed.createComponent(AtencionConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
