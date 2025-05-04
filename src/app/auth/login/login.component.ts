import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
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
  
        if (role === "ETUDIANT") {
          this.router.navigate(['/etudiant/dashboard']);
        } else if (role === "PROFESSEUR") {
          this.router.navigate(['/prof/dashboard']);
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
