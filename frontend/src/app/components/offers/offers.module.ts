import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './offers.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: OffersComponent }
];

@NgModule({
  declarations: [OffersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OffersModule { }
