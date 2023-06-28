import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDonacionRefugioComponent } from './detalle-donacion-refugio.component';

describe('DetalleDonacionRefugioComponent', () => {
  let component: DetalleDonacionRefugioComponent;
  let fixture: ComponentFixture<DetalleDonacionRefugioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleDonacionRefugioComponent]
    });
    fixture = TestBed.createComponent(DetalleDonacionRefugioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
