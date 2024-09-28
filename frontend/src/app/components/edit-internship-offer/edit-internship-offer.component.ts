import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-internship-offer',
  templateUrl: './edit-internship-offer.component.html',
  styleUrls: ['./edit-internship-offer.component.scss']
})
export class EditInternshipOfferComponent implements OnInit {

  editForm: FormGroup;
  offerId: number;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.offerId = Number(this.route.snapshot.paramMap.get('offerId'));
    this.loadOfferDetails();
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      durationInMonths: ['', Validators.required]  // Attribut spécifique à InternshipOffer
    });
  }

  loadOfferDetails() {
    this.authService.getEmployerInternshipOffers().subscribe((offers: any[]) => {
      const offer = offers.find(o => o.id === this.offerId);
      if (offer) {
        this.editForm.patchValue(offer);
      }
    });
  }

  saveChanges() {
    if (this.editForm.valid) {
      this.authService.updateInternshipOffer(this.offerId, this.editForm.value).subscribe(() => {
        alert('Offre mise à jour avec succès');
        this.router.navigate(['/employer-offers']);  // Retour à la liste des offres de l'employeur
      });
    }
  }
}
