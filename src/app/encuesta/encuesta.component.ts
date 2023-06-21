import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {
  totalAngularPackages: any;
  opciones!: String[];
  correo!: string;
  selectedOption!: string;
  url: string = 'http://localhost:8080/api/';
  error: any;
  errorMessage!: string;
  email: FormControl = new FormControl('', Validators.required);

  constructor(private http: HttpClient) { }

  ngOnInit() {  
   
    this.http.get<any>(this.url + 'estilos').subscribe(data => {     
       this.totalAngularPackages = data._embedded.estilos;      
       this.opciones =  this.totalAngularPackages.map((estilos: { estilo: any; }) => estilos.estilo);      
    },error => this.error = error);

    
  }
  onOptionSelected() {
    console.log('Valor seleccionado:', this.selectedOption);
  }

  guardar() {  

    const url1 = this.url + "usuarios";
    const url2 = this.url + "grafica";

    const data1 = { correo: this.correo};  
    const data2 = { correo: this.correo, estilo: this.selectedOption  };
if ((this.correo !== undefined && this.correo!= '') && (this.selectedOption !== undefined && this.selectedOption!= '')) {  

    this.http.post(url1, data1).pipe(
      concatMap(() => this.http.post(url2, data2))
    ).subscribe(
      () => {
        // Ambas llamadas se completaron con éxito
        console.log('Llamadas completadas');
        this.errorMessage = 'Se ha almacenado correctamente'        
      },
      (error) => {
        // Ocurrió un error en alguna de las llamadas
        
        console.error(error);
      }
    );   
  } else {
    this.errorMessage = 'Se debe seleccionar estilo e ingresar un correo por favor'  
    this.openErrorModal();
  }

}
public openErrorModal(): void {
  this.errorMessage;  
}

public closeErrorModal(): void {
  this.errorMessage = '';
  location.reload();
}


}
