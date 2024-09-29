import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-apply-offer',
  templateUrl: './apply-offer.component.html',
  styleUrls: ['./apply-offer.component.scss']
})
export class ApplyOfferComponent implements OnInit {

  applyForm: FormGroup;
  offerId: number;
  selectedFile: File | null = null;
  pdfFileUrl: string | null = null;  // URL du fichier PDF pour l'affichage

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.offerId = Number(this.route.snapshot.paramMap.get('offerId'));
    this.applyForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      motivationLetter: ['', Validators.required],
      fileName: ['', Validators.required],  // Nom du fichier PDF
    });
  }

  // Méthode pour gérer la sélection du fichier
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {  // Vérification du format PDF
      this.selectedFile = file;  // Stocker le fichier sélectionné
      this.applyForm.patchValue({
        fileSource: file,  // Mise à jour du champ fileSource avec le fichier
        fileName: file.name  // Mise à jour du nom du fichier
      });
      this.pdfFileUrl = window.URL.createObjectURL(file);  // Créer une URL pour afficher le fichier PDF
    } else {
      alert('Veuillez sélectionner un fichier PDF.');
    }
  }

  apply() {
      if (this.applyForm.valid && this.selectedFile) {
        const formData = new FormData();
        formData.append('firstName', this.applyForm.get('firstName').value);
        formData.append('lastName', this.applyForm.get('lastName').value);
        formData.append('age', this.applyForm.get('age').value);
        formData.append('motivationLetter', this.applyForm.get('motivationLetter').value);
        formData.append('file', this.selectedFile);  // Ajouter le fichier au formulaire

        this.authService.applyToJobOffer(this.offerId, formData).subscribe(response => {
          alert('Candidature envoyée avec succès !');
          this.router.navigate(['/offers']);
        }, error => {
          console.error('Erreur lors de la soumission de la candidature', error);
        });
      } else {
        alert('Veuillez remplir tous les champs et ajouter un fichier CV.');
      }
    }
    logout() {
      this.authService.logout(); // Cela dépend de la méthode dans votre service AuthService
      this.router.navigate(['/login']);  // Redirige vers la page de connexion après déconnexion
    }
}
