import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = ''; // Ajout de la variable pour afficher les erreurs

  constructor(
    public auth: AuthenticationService,
    private router: Router
  ) {}

  get isValid() {
    return this.email !== '' && this.password !== '';
  }

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/about']); // Redirection en cas de succès
        } else {
          this.errorMessage = "Échec de la connexion. Vérifiez vos identifiants."; // Affichage du message d'erreur
        }
      },
      error: (error) => {
        this.errorMessage = "Une erreur est survenue. Veuillez réessayer."; // Affichage du message d'erreur générique
      }
    });
  }
}
