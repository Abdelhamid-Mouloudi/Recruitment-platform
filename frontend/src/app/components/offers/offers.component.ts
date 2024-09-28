import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  jobOffers: any[] = [];
  internshipOffers: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers() {
    this.authService.getAllJobOffers().subscribe((data: any[]) => {
      this.jobOffers = data;
    });
    this.authService.getAllInternshipOffers().subscribe((data: any[]) => {
      this.internshipOffers = data;
    });
  }

  // Redirection pour postuler à une offre
  applyForJobOffer(offerId: number) {
    this.router.navigate([`/apply-job-offer/${offerId}`]);
  }

  applyForInternshipOffer(offerId: number) {
    this.router.navigate([`/apply-internship-offer/${offerId}`]);
  }
}
