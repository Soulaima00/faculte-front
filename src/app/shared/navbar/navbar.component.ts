import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn = false;
  role: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.isLoggedIn = !!this.role;
  }

  logout() {
    localStorage.clear(); // ou removeItem('role') uniquement
    location.href = '/login'; // ou this.router.navigate(['/login']);
  }
  
}
