import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {
  registros: any;
  barChartData!: [];
  error: any;
  url: string = 'http://localhost:8080/cantidades/repeticiones';
  
   constructor(private http: HttpClient) { }
  
  ngOnInit() {     
    this.http.get<any>(this.url).subscribe(data => {      
       this.barChartData = data;          
    },error => this.error = error);  
}
}