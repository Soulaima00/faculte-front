import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupEtudiantComponent } from './signup-etudiant.component';

describe('SignupEtudiantComponent', () => {
  let component: SignupEtudiantComponent;
  let fixture: ComponentFixture<SignupEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
