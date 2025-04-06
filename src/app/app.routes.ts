import { Routes } from '@angular/router';
import { SignupEtudiantComponent } from './auth/signup-etudiant/signup-etudiant.component';
import { SignupProfComponent } from './auth/signup-prof/signup-prof.component';
import { LoginComponent } from './auth/login/login.component';


export const routes: Routes = [
  { path: 'signup-etudiant', component: SignupEtudiantComponent },
  { path: 'signup-prof', component: SignupProfComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
