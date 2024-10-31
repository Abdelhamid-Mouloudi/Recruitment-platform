import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})
export class JobOfferComponent implements OnInit {
  jobOffers: any[] = [];

   constructor(
      private authService: AuthService,
      private router: Router
    ) {}

  ngOnInit(): void {
    this.authService.getAllJobOffers().subscribe(
      (data) => {
        this.jobOffers = data;
      },
      (error) => {
        console.error("Error fetching job offers", error);
      }
    );
  }
// Redirection pour postuler à une offre
  applyForJobOffer(offerId: number) {
    this.router.navigate([`/apply-job-offer/${offerId}`]);
  }
}
