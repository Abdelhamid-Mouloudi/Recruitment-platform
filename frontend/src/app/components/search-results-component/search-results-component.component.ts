import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/service/offer.service';  // Importez le service
import { Offer } from 'src/app/models/offer';  // Modèle à adapter selon votre application

@Component({
  selector: 'app-search-results-component',
  templateUrl: './search-results-component.component.html',
  styleUrls: ['./search-results-component.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchResults: Offer[] = [];
  searchKeyword: string = '';

  constructor(private route: ActivatedRoute, private offerService: OfferService) {}

  ngOnInit() {
    // Récupérer le mot-clé passé dans l'état de la route
    const stateData = history.state;
    this.searchKeyword = stateData.keyword || '';

    if (this.searchKeyword) {
      this.searchOffers(this.searchKeyword);
    }
  }

  // Rechercher les offres avec le service
  searchOffers(keyword: string) {
    this.offerService.searchOffers(keyword).subscribe(
      (offers) => {
        this.searchResults = offers;
        if (this.searchResults.length === 0) {
          console.log('No offers found for keyword:', this.searchKeyword);
        }
      },
      (error) => {
        console.error('Error fetching job offers:', error);
      }
    );
  }
}
