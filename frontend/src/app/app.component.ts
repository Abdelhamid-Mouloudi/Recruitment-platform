import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';  // Assurez-vous que le chemin est correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-Authentication';

  constructor(private authService: AuthService, private router: Router) {}

  // Méthode de déconnexion
  logout() {
    this.authService.logout();
  }
  // Vérifie si l'utilisateur est connecté
    isLoggedIn() {
      return this.authService.isLoggedIn();  // Supposons que votre AuthService ait cette méthode
    }
   searchKeyword: string = '';

     onSearch() {
        if (this.searchKeyword.trim()) {
          this.router.navigate(['/search-results'], { state: { keyword: this.searchKeyword } });
        }
      }
}
