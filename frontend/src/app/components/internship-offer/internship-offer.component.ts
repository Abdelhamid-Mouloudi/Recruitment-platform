import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-internship-offer',
  templateUrl: './internship-offer.component.html',
  styleUrls: ['./internship-offer.component.scss']
})
export class InternshipOfferComponent implements OnInit {
  internshipOffers: any[] = [];


    constructor(
      private authService: AuthService,
      private router: Router
    ) {}



  ngOnInit(): void {
    this.authService.getAllInternshipOffers().subscribe(
      (data) => {
        this.internshipOffers = data;
      },
      (error) => {
        console.error("Error fetching internship offers", error);
      }
    );
  }
applyForInternshipOffer(offerId: number) {
    this.router.navigate([`/apply-internship-offer/${offerId}`]);
  }
}
