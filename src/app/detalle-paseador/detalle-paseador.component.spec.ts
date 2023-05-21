import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePaseadorComponent } from './detalle-paseador.component';

describe('DetallePaseadorComponent', () => {
  let component: DetallePaseadorComponent;
  let fixture: ComponentFixture<DetallePaseadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallePaseadorComponent]
    });
    fixture = TestBed.createComponent(DetallePaseadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
