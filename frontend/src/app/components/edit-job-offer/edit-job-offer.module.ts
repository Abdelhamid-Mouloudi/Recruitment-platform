import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditJobOfferComponent } from './edit-job-offer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: EditJobOfferComponent }
];

@NgModule({
  declarations: [EditJobOfferComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EditJobOfferModule { }
