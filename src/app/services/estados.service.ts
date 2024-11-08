import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private API_SERVER = "https://localhost:8081/generales/api/v1/states";

  constructor(private httpCliente: HttpClient) { }

  public getAllEstados(): Observable<any> {
    return this.httpCliente.get(this.API_SERVER);
  }

}
