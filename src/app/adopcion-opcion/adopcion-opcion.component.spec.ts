import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdopcionOpcionComponent } from './adopcion-opcion.component';

describe('AdopcionOpcionComponent', () => {
  let component: AdopcionOpcionComponent;
  let fixture: ComponentFixture<AdopcionOpcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdopcionOpcionComponent]
    });
    fixture = TestBed.createComponent(AdopcionOpcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
