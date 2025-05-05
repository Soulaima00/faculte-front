import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9090/api';

  constructor(private http: HttpClient) {}

  // pour login
  login(credentials: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth/login`, credentials);
  }

  // pour signup etudiant
  registerEtudiant(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup-etudiant`, user);
  }

  // pour siignup professeur
  registerProf(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup-prof`, user);
  }

  // pour listeee des utilisateurs
  getEtudiants(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/auth/etudiants`);
  }
  
  getProfs(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/auth/profs`);
  }
}
