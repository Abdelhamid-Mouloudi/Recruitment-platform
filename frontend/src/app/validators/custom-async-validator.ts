// src/app/validators/custom-async-validator.ts

import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

// Exemple d'un validateur asynchrone
export function customAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  // Logique de validation asynchrone (exemple)
  const isValid = control.value.length > 2;  // Exemple de validation : au moins 3 caractères
  return of(isValid ? null : { invalidLength: true });
}
