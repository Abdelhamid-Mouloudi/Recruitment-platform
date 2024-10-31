import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-employer-applications',
  templateUrl: './employer-applications.component.html',
  styleUrls: ['./employer-applications.component.scss']
})
export class EmployerApplicationsComponent implements OnInit {

  applications: any[] = [];

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

 viewCV(fileName: string) {
     const url = `http://localhost:8080/api/files/download/${fileName}`;
     window.open(url, '_blank');  // Ouvre le fichier PDF dans un nouvel onglet
   }

}
