import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddJobOfferComponent } from './add-job-offer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AddJobOfferComponent }
];

@NgModule({
  declarations: [AddJobOfferComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AddJobOfferModule { }
