import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CiudadesService } from '../services/ciudades.service';
import { EstadosService } from '../services/estados.service';

@Component({
  selector: 'app-registrar-ciudad',
  templateUrl: './registrar-ciudad.component.html',
  styleUrls: ['./registrar-ciudad.component.css']
})
export class RegistrarCiudadComponent implements OnInit{

  ciudadForm: FormGroup;
  states: any;
  city: any[] = [];

  constructor(
    public fb: FormBuilder,
    public CiudadesService: CiudadesService,
    public estadosService: EstadosService
  ){
    this.ciudadForm = this.fb.group({
      name: ['', Validators.required],
      state: ['', Validators.required]
  });

}

ngOnInit(): void {
  this.estadosService.getAllEstados().subscribe(
    resp => {
      this.states = resp.datos;
    },
    error => {
      console.error(error);
      window.alert("No se pudo cargar la lista de estados. Por favor, intente más tarde.");
    }
  );
}

  guardarCiudad() {
    if (this.ciudadForm.valid) {
      const cityData = {
        name: this.ciudadForm.value.name,
        state: this.ciudadForm.value.state.id
      };

      console.log('Datos del formulario a enviar:', cityData);

      this.CiudadesService.saveCiudad(cityData).subscribe(
        resp => {
          alert(resp.mensajes[0]);
          this.ciudadForm.reset();
          this.city.push(resp);
          console.log('Respuesta del servidor:', resp);
        },
        error => {
          console.error('Error al guardar la ciudad:', error);
          alert(error.error.mensajes[0]);
        }
      );
    } else {
      alert('Formulario inválido. Por favor, completa todos los campos requeridos.');
    }
  }

}