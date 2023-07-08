import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibretaSanitariaComponent } from './libreta-sanitaria.component';

describe('LibretaSanitariaComponent', () => {
  let component: LibretaSanitariaComponent;
  let fixture: ComponentFixture<LibretaSanitariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibretaSanitariaComponent]
    });
    fixture = TestBed.createComponent(LibretaSanitariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
