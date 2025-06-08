import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  prenom: string = '';
  nom: string = '';
  email: string = '';
  password: string = '';
  role: string = 'ROLE_USER';

  constructor(private http: HttpClient,private router: Router) {}

  register() {
    this.http.post('http://localhost:8082/api/register', {
      prenom: this.prenom,
      nom: this.nom,
      email: this.email,
      password: this.password,
      role: [this.role],
    }).subscribe({
      next: () => {
        //alert('Inscription réussie');
        this.router.navigate(['/about']);
      },
      error: () => alert('Erreur lors de l’inscription')
    });
  }
}
