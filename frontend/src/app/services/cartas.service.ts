import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Carta {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  imagem: string;
  modelo_3d: string;  // Caminho para o modelo 3D
  mind_target: string;  // Caminho para o arquivo de marcador
}

@Injectable({
  providedIn: 'root'
})
export class CartaService {

  private apiUrl = 'http://localhost:8000/api/cartas/'; 

  constructor(private http: HttpClient) {}

  getCartas(): Observable<Carta[]> {
    return this.http.get<Carta[]>(this.apiUrl);
  }
}
