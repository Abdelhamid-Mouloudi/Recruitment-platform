import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';  // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-Authentication';

  constructor(private authService: AuthService) {}

  // Méthode de déconnexion
  logout() {
    this.authService.logout();
  }
}
