import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-offers',
  templateUrl: './employer-offers.component.html',
  styleUrls: ['./employer-offers.component.scss']
})
export class EmployerOffersComponent implements OnInit {

  jobOffers: any[] = [];
  internshipOffers: any[] = [];
  applications: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployerOffers();
    this.loadEmployerApplications();
  }

  loadEmployerOffers() {
    this.authService.getEmployerJobOffers().subscribe((data: any[]) => {
      this.jobOffers = data;
      console.log("Offres d'emploi : ", this.jobOffers); // Vérification des données
    });

    this.authService.getEmployerInternshipOffers().subscribe((data: any[]) => {
      this.internshipOffers = data;
      console.log("Offres de stage : ", this.internshipOffers); // Vérification des données
    });
  }

  // Redirection pour ajouter une nouvelle offre
  addJobOffer() {
    this.router.navigate(['/add-job-offer']);
  }

  addInternshipOffer() {
    this.router.navigate(['/add-internship-offer']);
  }

  editJobOffer(offerId: number) {
    this.router.navigate([`/edit-job-offer/${offerId}`]);
  }

  editInternshipOffer(offerId: number) {
    this.router.navigate([`/edit-internship-offer/${offerId}`]);
  }

  loadEmployerApplications() {
    this.authService.getEmployerApplications().subscribe((data: any[]) => {
      this.applications = data;
      console.log("Candidatures reçues : ", this.applications);
    });
  }

  viewApplications() {
    this.router.navigate(['/employer-applications']);  // Redirection vers la liste des candidatures
  }

  // Ajouter la fonction logout
  logout() {
    this.authService.logout(); // Cela dépend de la méthode dans votre service AuthService
    this.router.navigate(['/login']);  // Redirige vers la page de connexion après déconnexion
  }
}
