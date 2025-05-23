import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavbarPublicComponent } from '../../shared/navbar-public/navbar-public.component';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup-etudiant',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarPublicComponent],
  templateUrl: './signup-etudiant.component.html',
  styleUrls: ['./signup-etudiant.component.css']
})
export class SignupEtudiantComponent {

  etudiant = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: ''
  };

  constructor(private authService: AuthService, private router: Router) {} // ✅ Inject Router

  onSubmit() {
    this.authService.registerEtudiant(this.etudiant).subscribe({
      next: (res: any) => {
        console.log("Réponse :", res);
        alert("Inscription réussie : " + (res.message || res));
        this.router.navigate(['/login']); 
      },
      error: err => {
        console.error("Erreur : ", err);
        alert("Erreur lors de l'inscription.");
      }
    });
  }
}
