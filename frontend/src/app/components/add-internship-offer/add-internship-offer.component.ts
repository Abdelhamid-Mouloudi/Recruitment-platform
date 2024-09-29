import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-internship-offer',
  templateUrl: './add-internship-offer.component.html',
  styleUrls: ['./add-internship-offer.component.scss']
})
export class AddInternshipOfferComponent implements OnInit {
  addInternshipOfferForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addInternshipOfferForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      durationInMonths: ['', Validators.required]
    });
  }

  addInternshipOffer() {
    if (this.addInternshipOfferForm.valid) {
      this.authService.addInternshipOffer(this.addInternshipOfferForm.value).subscribe(() => {
        alert('Offre de stage ajoutée avec succès');
        this.router.navigate(['/employer-offers']);
      });
    }
  }
  logout() {
    this.authService.logout(); // Cela dépend de la méthode dans votre service AuthService
    this.router.navigate(['/login']);  // Redirige vers la page de connexion après déconnexion
  }
}
