import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInternshipOfferComponent } from './add-internship-offer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AddInternshipOfferComponent }
];

@NgModule({
  declarations: [AddInternshipOfferComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AddInternshipOfferModule { }
