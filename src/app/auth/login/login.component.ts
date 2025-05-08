import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarPublicComponent } from '../../shared/navbar-public/navbar-public.component';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarPublicComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.login).subscribe({
      next: (user) => {
        const role = user.role?.name;
  
        if (!role) {
          alert("Erreur : rôle utilisateur non défini.");
          return;
        }
  
        alert("Bienvenue " + user.nom + " (" + role + ")");
        localStorage.setItem('role', role);
        localStorage.setItem('userId', user.id!.toString());
        localStorage.setItem('user', JSON.stringify(user));


  
        if (role === "ETUDIANT") {
          this.router.navigate(['/forum']);
        } else if (role === "PROFESSEUR") {
          this.router.navigate(['/forum']);
        } else {
          alert("Rôle non reconnu.");
        }
      },
      error: err => {
        console.error("Erreur de connexion :", err);
        alert("Email ou mot de passe incorrect !");
      }
    });
  }
  
}
