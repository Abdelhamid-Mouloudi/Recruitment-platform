import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';  // Importation de throwError
import { catchError } from 'rxjs/operators';    // Importation de catchError
import { Offer } from '../models/offer';  // Modèle à adapter selon votre application

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private baseUrl = 'http://localhost:8080/api';  // URL de base de votre API

  constructor(private http: HttpClient) {}

  // Rechercher des offres par mot-clé
  searchOffers(keyword: string): Observable<Offer[]> {
    const token = localStorage.getItem('JWT');  // Utiliser la clé correcte pour récupérer le token
    console.log('JWT Token:', token);  // Vérifiez si le jeton est stocké correctement
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Ajoutez le jeton dans les en-têtes
    });

    return this.http.get<Offer[]>(`${this.baseUrl}/search?keyword=${keyword}`, { headers }).pipe(
      catchError(err => {
        console.error('Error fetching job offers:', err);  // Affichez l'erreur
        return throwError(err);  // Retourne l'erreur à l'observateur
      })
    );
  }

}
