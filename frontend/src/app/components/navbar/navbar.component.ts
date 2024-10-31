import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/service/offer.service';
import { customAsyncValidator } from 'src/app/validators/custom-async-validator'; // Importer le validateur

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  searchForm: FormGroup;  // Déclarez le formulaire

  constructor(private fb: FormBuilder, private offerService: OfferService, private router: Router) {
    // Initialiser le formulaire
    this.searchForm = this.fb.group({
      searchInput: ['', [Validators.required, customAsyncValidator]]  // Utiliser le validateur ici
    });
  }

  onSearch() {
    if (this.searchForm.valid) {  // Vérifiez si le formulaire est valide
      const searchKeyword = this.searchForm.get('searchInput')?.value;  // Récupérer le mot-clé
      this.offerService.searchOffers(searchKeyword).subscribe((results) => {
        console.log('Search results:', results);
        this.router.navigate(['/search-results'], { state: { keyword: searchKeyword } });
      });
    }
  }
}
