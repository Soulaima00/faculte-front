import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user.model';
import { AuthService } from '../../service/auth.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-dashboard-etudiant',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard-etudiant.component.html',
  styleUrls: ['./dashboard-etudiant.component.css']
})
export class DashboardEtudiantComponent implements OnInit {

  professeurs: User[] = [];
  etudiants: User[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProfs().subscribe(data => {
      this.professeurs = data;
    });

    this.authService.getEtudiants().subscribe(data => {
      this.etudiants = data;
    });
  }
}
