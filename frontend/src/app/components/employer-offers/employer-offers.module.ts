import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerOffersComponent } from './employer-offers.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: EmployerOffersComponent }
];

@NgModule({
  declarations: [EmployerOffersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployerOffersModule { }
