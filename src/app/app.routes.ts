import { Routes } from '@angular/router';
import { SignupEtudiantComponent } from './auth/signup-etudiant/signup-etudiant.component';
import { SignupProfComponent } from './auth/signup-prof/signup-prof.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardProfComponent } from './prof/dashboard-prof/dashboard-prof.component';
import { DashboardEtudiantComponent } from './etudiant/dashboard-etudiant/dashboard-etudiant.component';
import { ListeUtilisateursComponent } from './gestion/liste-utilisateurs/liste-utilisateurs.component';



export const routes: Routes = [
  { path: 'signup-etudiant', component: SignupEtudiantComponent },
  { path: 'signup-prof', component: SignupProfComponent },
  { path: 'login', component: LoginComponent },
  { path: 'etudiant/dashboard', component: DashboardEtudiantComponent },
  { path: 'prof/dashboard', component: DashboardProfComponent },
  { path: 'utilisateurs', component: ListeUtilisateursComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
