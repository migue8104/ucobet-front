import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCiudadComponent } from './registrar-ciudad.component';

describe('RegistrarCiudadComponent', () => {
  let component: RegistrarCiudadComponent;
  let fixture: ComponentFixture<RegistrarCiudadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarCiudadComponent]
    });
    fixture = TestBed.createComponent(RegistrarCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
