import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-job-offer',
  templateUrl: './edit-job-offer.component.html',
  styleUrls: ['./edit-job-offer.component.scss']
})
export class EditJobOfferComponent implements OnInit {

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
      contractType: ['', Validators.required]  // Attribut spécifique à JobOffer
    });
  }

 loadOfferDetails() {
   this.authService.getEmployerJobOffers().subscribe((offers: any[]) => {
     const offer = offers.find(o => o.id === this.offerId);
     if (offer) {
       this.editForm.patchValue(offer);
     } else {
       console.error('Offre non trouvée');
     }
   }, error => {
     console.error('Erreur lors du chargement des offres', error);
   });
 }


  saveChanges() {
    if (this.editForm.valid) {
      this.authService.updateJobOffer(this.offerId, this.editForm.value).subscribe(() => {
        alert('Offre mise à jour avec succès');
        this.router.navigate(['/employer-offers']);  // Retour à la liste des offres de l'employeur
      });
    }
  }
}
