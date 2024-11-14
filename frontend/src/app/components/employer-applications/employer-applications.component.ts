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
      this.applications = data
        .map(application => ({
          ...application,
          aiRank: this.getAIRankForApplication(application)
        }))
        .sort((a, b) => {
          // Extraire les scores sous forme de nombre
          const rankA = parseFloat(a.aiRank);
          const rankB = parseFloat(b.aiRank);
  
          // Si les deux scores sont des nombres valides, les comparer pour tri décroissant
          if (!isNaN(rankA) && !isNaN(rankB)) {
            return rankB - rankA; // Tri en ordre décroissant
          }
  
          // Si l'un des deux n'est pas un nombre, on le considère en bas de la liste
          if (isNaN(rankA)) return 1;
          if (isNaN(rankB)) return -1;
  
          // En cas d'égalité ou d'incompatibilité, garder l'ordre initial
          return 0;
        });
  
      console.log("Candidatures reçues (triées) : ", this.applications);
    });
  }
  
  
  

  getAIRankForApplication(application: any): string {
    return application.aiRank ? application.aiRank : 'En attente de traitement AI';
  }

  viewCV(fileName: string) {
    const url = `http://localhost:8080/api/files/download/${fileName}`;
    window.open(url, '_blank');
  }
  onPassToInterview(application: any) {
    console.log(`Pass to interview for ${application.firstName} ${application.lastName}`);
    // Email sending logic can be implemented here later
  }
  
}
