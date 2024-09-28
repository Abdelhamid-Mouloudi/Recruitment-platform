import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplyOfferComponent } from './apply-offer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ApplyOfferComponent }
];

@NgModule({
  declarations: [ApplyOfferComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ApplyOfferModule { }
