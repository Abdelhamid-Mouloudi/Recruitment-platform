import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-applications',
  templateUrl: './employer-applications.component.html',
  styleUrls: ['./employer-applications.component.scss']
})
export class EmployerApplicationsComponent implements OnInit {

  applications: any[] = [];
  router: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadEmployerApplications();
  }

  loadEmployerApplications() {
    this.authService.getEmployerApplications().subscribe((data: any[]) => {
      this.applications = data.map(application => ({
        ...application,
        aiRank: this.getAIRankForApplication(application)
      }));
      console.log("Candidatures reçues : ", this.applications);
    });
  }

  // Méthode pour récupérer le score AI pour chaque candidature
 getAIRankForApplication(application: any): string {
   return application.aiRank ? application.aiRank : 'En attente de traitement AI';
 }
 logout() {
  this.authService.logout(); // Cela dépend de la méthode dans votre service AuthService
  this.router.navigate(['/login']);  // Redirige vers la page de connexion après déconnexion
}

}