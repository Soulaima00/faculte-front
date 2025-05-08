import { AuthGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';
import { SignupEtudiantComponent } from './auth/signup-etudiant/signup-etudiant.component';
import { SignupProfComponent } from './auth/signup-prof/signup-prof.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardProfComponent } from './prof/dashboard-prof/dashboard-prof.component';
import { DashboardEtudiantComponent } from './etudiant/dashboard-etudiant/dashboard-etudiant.component';
import { ForumComponent } from './forum/forum.component';



export const routes: Routes = [
  { path: 'signup-etudiant', component: SignupEtudiantComponent },
  { path: 'signup-prof', component: SignupProfComponent },
  { path: 'login', component: LoginComponent },
  { path: 'etudiant/dashboard', component: DashboardEtudiantComponent, canActivate: [AuthGuard] },
  { path: 'prof/dashboard', component: DashboardProfComponent ,canActivate: [AuthGuard]},  
  { path : 'forum', component: ForumComponent , canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
