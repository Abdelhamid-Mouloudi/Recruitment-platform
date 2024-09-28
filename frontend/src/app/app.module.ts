import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { OffersComponent } from './components/offers/offers.component';
import { EmployerOffersComponent } from './components/employer-offers/employer-offers.component';
import { AddJobOfferComponent } from './components/add-job-offer/add-job-offer.component';  // Importer ici
import { AddInternshipOfferComponent } from './components/add-internship-offer/add-internship-offer.component';
import { EmployerApplicationsComponent } from './components/employer-applications/employer-applications.component';  // Importer ici
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PdfViewerModule } from 'ng2-pdf-viewer'; // Pour gérer les PDF
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    OffersComponent,
    EmployerOffersComponent,
    AddJobOfferComponent,  // Assurez-vous que ce composant est bien déclaré ici
    AddInternshipOfferComponent, EmployerApplicationsComponent  // Assurez-vous que ce composant est bien déclaré ici
  ],
  imports: [
    BrowserModule,
     BrowserAnimationsModule, // Nécessaire pour Angular Material
         MatFormFieldModule,
         MatInputModule,
         MatIconModule,
         MatButtonModule,
         MatSelectModule,
         PdfViewerModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
