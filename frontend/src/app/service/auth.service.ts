import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private user: any;
  constructor(
    private http: HttpClient,
    private router: Router  // Injection du Router pour la redirection
  ) { }

  signup(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "sign-up", signupRequest)
      .pipe(map((response: any) => {
        // Si l'inscription réussit, rediriger vers la page de login
        if (response) {
          alert('Inscription réussie ! Redirection vers la page de connexion.');
          this.router.navigate(['/login']);  // Redirection vers la page de login
        }
        return response;
      }));
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "authenticate", loginRequest)
      .pipe(map((response: any) => {
        console.log('Réponse reçue du backend:', response);  // Ajout de log

        const jwtToken = response.jwt;
        const role = response.role;
        localStorage.setItem('JWT', jwtToken);

        // Redirection en fonction du rôle
        if (role === 'USER') {
          this.router.navigate(['/offers']);  // Redirection pour les utilisateurs
        } else if (role === 'EMPLOYER') {
          this.router.navigate(['/employer-offers']);  // Redirection pour les employeurs
        }

        return response;
      }));
  }

  logout() {
    localStorage.removeItem('JWT');  // Supprimer le token JWT du stockage local
    localStorage.removeItem('ROLE');  // Supprimer le rôle de l'utilisateur
    this.router.navigate(['/login']);  // Redirection vers la page de login
  }

//   hello(): Observable<any> {
//     return this.http.get(BASE_URL + 'api/hello', {
//       headers: this.createAuthorizationHeader()
//     });
//   }

  private createAuthorizationHeader() {
    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      return new HttpHeaders().set(
        'Authorization', 'Bearer ' + jwtToken
      );
    } else {
      console.log("JWT token not found in the Local Storage");
      return new HttpHeaders();  // Retourne des en-têtes vides s'il n'y a pas de JWT
    }
  }

  // Récupérer toutes les offres d'emploi
  getAllJobOffers(): Observable<any[]> {
    return this.http.get<any[]>(BASE_URL + 'api/job-offers/all', {
      headers: this.createAuthorizationHeader()  // Ajout du JWT dans l'en-tête
    });
  }

  // Récupérer toutes les offres de stage
  getAllInternshipOffers(): Observable<any[]> {
    return this.http.get<any[]>(BASE_URL + 'api/internship-offers/all', {
      headers: this.createAuthorizationHeader()  // Ajout du JWT dans l'en-tête
    });
  }

  // Récupérer les offres d'emploi d'un employeur
  getEmployerJobOffers(): Observable<any[]> {
    return this.http.get<any[]>(BASE_URL + 'api/job-offers/employer', {
      headers: this.createAuthorizationHeader()  // Ajout du JWT dans l'en-tête
    });
  }

  // Récupérer les offres de stage d'un employeur
  getEmployerInternshipOffers(): Observable<any[]> {
    return this.http.get<any[]>(BASE_URL + 'api/internship-offers/employer', {
      headers: this.createAuthorizationHeader()  // Ajout du JWT dans l'en-tête
    });
  }

  // Postuler à une offre d'emploi
applyToJobOffer(offerId: number, formData: FormData): Observable<any> {
  return this.http.post<any>(`http://localhost:8080/api/applications/apply/${offerId}`, formData, {
    headers: {
      'Authorization': 'Bearer ' + this.getToken()  // Ajouter le JWT dans l'en-tête
    }
  });
}


  // Postuler à une offre de stage
  applyToInternshipOffer(offerId: number, applicationData: any): Observable<any> {
    return this.http.post(BASE_URL + `api/applications/apply/${offerId}`, applicationData, {
      headers: this.createAuthorizationHeader()  // Ajout du JWT dans l'en-tête
    });
  }

  // Mettre à jour une offre d'emploi
  updateJobOffer(offerId: number, offerData: any): Observable<any> {
    return this.http.put(`${BASE_URL}api/job-offers/update/${offerId}`, offerData, {
      headers: this.createAuthorizationHeader()  // Ajout du JWT dans l'en-tête
    });
  }

  // Mettre à jour une offre de stage
  updateInternshipOffer(offerId: number, offerData: any): Observable<any> {
    return this.http.put(`${BASE_URL}api/internship-offers/update/${offerId}`, offerData, {
      headers: this.createAuthorizationHeader()  // Ajout du JWT dans l'en-tête
    });
  }

  // Ajouter l'offre d'emploi avec le JWT dans l'en-tête
  addJobOffer(jobOfferData: any): Observable<any> {
    return this.http.post(`${BASE_URL}api/job-offers/add`, jobOfferData, {
      headers: this.createAuthorizationHeader()  // Ajout du JWT dans l'en-tête
    });
  }

  // Ajouter l'offre de stage avec le JWT dans l'en-tête
  addInternshipOffer(internshipOfferData: any): Observable<any> {
    return this.http.post(`${BASE_URL}api/internship-offers/add`, internshipOfferData, {
      headers: this.createAuthorizationHeader()  // Ajout du JWT dans l'en-tête
    });
  }

  // Cette méthode récupère le token stocké localement
  getToken(): string | null {
    return localStorage.getItem('JWT');  // Le token est stocké dans le localStorage avec la clé 'JWT'
  }

  // Méthode pour enregistrer le token après la connexion
  saveToken(token: string): void {
    localStorage.setItem('JWT', token);
  }

  // Méthode pour supprimer le token lors de la déconnexion
  clearToken(): void {
    localStorage.removeItem('JWT');
  }
// Récupérer les candidatures des offres d'un employeur
getEmployerApplications(): Observable<any[]> {
  return this.http.get<any[]>(BASE_URL + 'api/applications/employer-applications', {
    headers: this.createAuthorizationHeader()  // Ajouter le JWT dans l'en-tête
  });
}


 isLoggedIn(): boolean {
   const token = localStorage.getItem('JWT');
   return !!token;  //
 }
   getUserRole(): string {
     return localStorage.getItem('ROLE') || '';
   }


}
