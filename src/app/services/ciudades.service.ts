import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  private API_SERVER = "https://localhost:8081/generales/api/v1/cities";

  constructor(private httpCliente: HttpClient) { }

  public saveCiudad(city: any): Observable<any> {
    return this.httpCliente.post(this.API_SERVER, city);
  }
}
