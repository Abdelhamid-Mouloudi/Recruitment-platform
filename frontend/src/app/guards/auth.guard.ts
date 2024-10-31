import { Injectable } from '@angular/core';
  import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
  import { AuthService } from '../service/auth.service'; // Assurez-vous que le chemin est correct

  @Injectable({
    providedIn: 'root',
  })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      const isAuthenticated = this.authService.isLoggedIn(); // Vérifie l'authentification
      const expectedRole = route.data['expectedRole']; // Récupère le rôle attendu depuis les données de la route

      if (!isAuthenticated) {
        this.router.navigate(['/login']); // Redirige vers la page de connexion si non authentifié
        return false;
      }

      const userRole = this.authService.getUserRole(); // Récupère le rôle de l'utilisateur
      if (expectedRole && userRole !== expectedRole) {
        this.router.navigate(['/unauthorized']); // Redirige vers une page non autorisée si le rôle ne correspond pas
        return false;
      }

      return true; // Autorise l'accès
    }
  }
