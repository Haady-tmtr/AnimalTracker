import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';  // Assure-toi que le service est bien importé

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthenticationService) {}

  ngOnInit(): void {
    // Tenter de se reconnecter automatiquement lors du chargement de la navbar
    this.auth.autoLogin();
  }

  // Fonction pour déconnecter l'utilisateur
  logout(): void {
    this.auth.logout();
  }

  // Vérifie si l'utilisateur est administrateur
  isAdmin(): boolean {
    return this.auth.getUserRole() === 'ROLE_ADMIN';  // Utilisation du service pour récupérer le rôle
  }

  // Vérifie si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.auth.isAuthentified;  // Retourne true si l'utilisateur est connecté
  }
}
