import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { OffersComponent } from './components/offers/offers.component';
import { EmployerOffersComponent } from './components/employer-offers/employer-offers.component';
import { AddJobOfferComponent } from './components/add-job-offer/add-job-offer.component';  // Importer ici
import { AddInternshipOfferComponent } from './components/add-internship-offer/add-internship-offer.component';  // Importer ici
import { EmployerApplicationsComponent } from './components/employer-applications/employer-applications.component';
const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'offers', component: OffersComponent },  // Liste des offres pour utilisateurs
  { path: 'employer-offers', component: EmployerOffersComponent },  // Liste des offres pour l'employeur
   { path: 'employer-applications', component: EmployerApplicationsComponent },
  // Utilisation du lazy loading pour ces composants
  { path: 'apply-job-offer/:offerId', loadChildren: () => import('./components/apply-offer/apply-offer.module').then(m => m.ApplyOfferModule) },
  { path: 'apply-internship-offer/:offerId', loadChildren: () => import('./components/apply-offer/apply-offer.module').then(m => m.ApplyOfferModule) },
  { path: 'edit-job-offer/:offerId', loadChildren: () => import('./components/edit-job-offer/edit-job-offer.module').then(m => m.EditJobOfferModule) },
  { path: 'edit-internship-offer/:offerId', loadChildren: () => import('./components/edit-internship-offer/edit-internship-offer.module').then(m => m.EditInternshipOfferModule) },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
     { path: 'add-job-offer', component: AddJobOfferComponent },
      { path: 'add-internship-offer', component: AddInternshipOfferComponent }// Redirection par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
