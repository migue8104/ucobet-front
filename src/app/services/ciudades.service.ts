import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthGoogleService } from './auth-google.service';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  private API_SERVER = "https://localhost:8081/generales/api/v1/cities";

  constructor(private httpCliente: HttpClient , private authGoogleService: AuthGoogleService) { }

  public saveCiudad(city: any): Observable<any> {
    const token = this.authGoogleService.idToken;
        const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`});
    return this.httpCliente.post(this.API_SERVER, city , {headers});
  }
}
