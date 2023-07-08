import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDonarComponent } from './create-donar.component';

describe('CreateDonarComponent', () => {
  let component: CreateDonarComponent;
  let fixture: ComponentFixture<CreateDonarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDonarComponent]
    });
    fixture = TestBed.createComponent(CreateDonarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
