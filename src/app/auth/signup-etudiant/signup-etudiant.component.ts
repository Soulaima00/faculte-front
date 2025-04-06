import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-signup-etudiant',
  standalone: true, 
  imports: [CommonModule, FormsModule,RouterModule,NavbarComponent], 
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

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:9090/api/auth/signup-etudiant', this.etudiant)
      .subscribe({
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
