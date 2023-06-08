import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePerdidoComponent } from './detalle-perdido.component';

describe('DetallePerdidoComponent', () => {
  let component: DetallePerdidoComponent;
  let fixture: ComponentFixture<DetallePerdidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallePerdidoComponent]
    });
    fixture = TestBed.createComponent(DetallePerdidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
