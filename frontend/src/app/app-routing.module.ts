import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { OffersComponent } from './components/offers/offers.component';
import { EmployerOffersComponent } from './components/employer-offers/employer-offers.component';
import { AddJobOfferComponent } from './components/add-job-offer/add-job-offer.component';
import { AddInternshipOfferComponent } from './components/add-internship-offer/add-internship-offer.component';
import { EmployerApplicationsComponent } from './components/employer-applications/employer-applications.component';
import { AuthGuard } from './guards/auth.guard';  // Importer l'AuthGuard
import { InternshipOfferComponent } from './components/internship-offer/internship-offer.component';
import { JobOfferComponent } from './components/job-offer/job-offer.component';
import { SearchResultsComponent } from './components/search-results-component/search-results-component.component';
import { RoleGuard } from './guards/role.guard';  // Ajouter cette ligne

const routes: Routes = [
   { path: 'search-results', component: SearchResultsComponent, canActivate: [AuthGuard] },

  { path: 'internship-offer', component: InternshipOfferComponent, canActivate: [AuthGuard] },
    { path: 'job-offer', component: JobOfferComponent,  canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },
  // Protégé par AuthGuard
  { path: 'employer-offers', component: EmployerOffersComponent,  canActivate: [AuthGuard] },  // Protégé par AuthGuard
  { path: 'employer-applications', component: EmployerApplicationsComponent, canActivate: [AuthGuard] },  // Protégé par AuthGuard
  { path: 'add-job-offer', component: AddJobOfferComponent, canActivate: [AuthGuard] },  // Protégé par AuthGuard
  { path: 'add-internship-offer', component: AddInternshipOfferComponent, canActivate: [AuthGuard] },  // Protégé par AuthGuard

  // Routes avec lazy loading
  { path: 'apply-job-offer/:offerId', loadChildren: () => import('./components/apply-offer/apply-offer.module').then(m => m.ApplyOfferModule) },
  { path: 'apply-internship-offer/:offerId', loadChildren: () => import('./components/apply-offer/apply-offer.module').then(m => m.ApplyOfferModule) },
  { path: 'edit-job-offer/:offerId', loadChildren: () => import('./components/edit-job-offer/edit-job-offer.module').then(m => m.EditJobOfferModule) },
  { path: 'edit-internship-offer/:offerId', loadChildren: () => import('./components/edit-internship-offer/edit-internship-offer.module').then(m => m.EditInternshipOfferModule) },

  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirection par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
