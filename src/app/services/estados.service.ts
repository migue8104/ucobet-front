import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthGoogleService } from './auth-google.service';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private API_SERVER = "https://localhost:8081/generales/api/v1/states";

  constructor(private httpCliente: HttpClient , private authGoogleService : AuthGoogleService) { }

  public getAllEstados(): Observable<any> {
    const token = this.authGoogleService.idToken;
    const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`});
    return this.httpCliente.get(this.API_SERVER , {headers});
  }

}
