import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job-offer',
  templateUrl: './add-job-offer.component.html',
  styleUrls: ['./add-job-offer.component.scss']
})
export class AddJobOfferComponent implements OnInit {
  addJobOfferForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addJobOfferForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      contractType: ['', Validators.required]
    });
  }

  addJobOffer() {
    if (this.addJobOfferForm.valid) {
      this.authService.addJobOffer(this.addJobOfferForm.value).subscribe(() => {
        alert('Offre d\'emploi ajoutée avec succès');
        this.router.navigate(['/employer-offers']);
      });
    }
  }
}
