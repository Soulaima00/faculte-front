import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post<any>('http://localhost:9090/api/auth/login', this.login)
      .subscribe({
        next: (user) => {
          alert("Bienvenue " + user.nom + " (" + user.role.name + ")");

          // Redirection selon le rôle
          if (user.role.name === "ETUDIANT") {
            this.router.navigate(['/etudiant/dashboard']);
          } else if (user.role.name === "PROFESSEUR") {
            this.router.navigate(['/prof/dashboard']);
          }
        },
        error: err => {
          console.error("Erreur de connexion :", err);
          alert("Email ou mot de passe incorrect !");
        }
      });
  }
}
