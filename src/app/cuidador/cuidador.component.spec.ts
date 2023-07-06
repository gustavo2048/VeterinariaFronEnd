import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuidadorComponent } from './cuidador.component';

describe('CuidadorComponent', () => {
  let component: CuidadorComponent;
  let fixture: ComponentFixture<CuidadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuidadorComponent]
    });
    fixture = TestBed.createComponent(CuidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
