import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditInternshipOfferComponent } from './edit-internship-offer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: EditInternshipOfferComponent }
];

@NgModule({
  declarations: [EditInternshipOfferComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EditInternshipOfferModule { }
