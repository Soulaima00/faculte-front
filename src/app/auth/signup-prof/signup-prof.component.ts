import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarPublicComponent } from '../../shared/navbar-public/navbar-public.component';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup-prof',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarPublicComponent],
  providers: [AuthService], 
  templateUrl: './signup-prof.component.html',
  styleUrls: ['./signup-prof.component.css']
})
export class SignupProfComponent {
  prof = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: ''
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.registerProf(this.prof).subscribe({
      next: (res: any) => {
        console.log("Réponse :", res);
        alert("Inscription réussie : " + (res.message || res));
      },
      error: err => {
        console.error("Erreur : ", err);
        alert("Erreur lors de l'inscription.");
      }
    });
  }
}
