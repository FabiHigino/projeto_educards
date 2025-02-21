import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Carta, CartaService } from '../../services/cartas.service';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.css'],
  imports: [
    CommonModule,
    MatButton,
    MatButtonModule,
    MatCardModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartasComponent implements OnInit {
  cartas: Carta[] = [];
  categorias: string[] = [];
  cartasSelecionadas: Carta[] = [];  // Cartas selecionadas para impressão
  categoriasSelecionadas: string[] = [];
  categoriaSelecionada: string = '';
  cartasFiltradas: Carta[] = [];

  constructor(private cartaService: CartaService) {}

  ngOnInit() {
    this.carregarCartas();
  }

  carregarCartas() {
    this.cartaService.getCartas().subscribe((data) => {
      this.cartas = data;
      this.categorias = [...new Set(data.map(carta => carta.categoria))];
      this.filtrarCartas();
    });
  }

  filtrarCartas() {
    if (this.categoriaSelecionada) {
      this.cartasFiltradas = this.cartas.filter(carta => carta.categoria === this.categoriaSelecionada);
    } else {
      this.cartasFiltradas = this.cartas;
    }
  }

  // Método para alternar a seleção das cartas
  toggleSelecionar(carta: Carta) {
    const index = this.cartasSelecionadas.indexOf(carta);
    if (index > -1) {
      // Se a carta já estiver selecionada, remove ela da lista
      this.cartasSelecionadas.splice(index, 1);
    } else {
      // Se a carta não estiver selecionada, adiciona ela à lista
      this.cartasSelecionadas.push(carta);
    }
  }

  // Método para verificar se a carta está selecionada
  isSelecionada(carta: Carta): boolean {
    return this.cartasSelecionadas.includes(carta);
  }

  imprimirCartas() {
    const win = window.open('', '_blank');
    if (!win) return;

    win.document.write(`
      <html>
      <head>
        <style>
          @page { size: A4; margin: 10mm; }
          body { font-family: Arial, sans-serif; text-align: center; }
          .pagina { display: flex; flex-wrap: wrap; width: 210mm; height: 297mm; }
          .carta { width: 57mm; height: 89mm; margin: 3mm; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid #000; }
          img { width: 100%; height: auto; }
        </style>
      </head>
      <body>
    `);

    let htmlContent = '<div class="pagina">';
    let count = 0;

    // Loop através das cartas selecionadas e montando o conteúdo HTML para a impressão
    this.cartasSelecionadas.forEach((carta, index) => {
      htmlContent += `
        <div class="carta">
          <img src="${carta.imagem}" />
        </div>
      `;
      count++;

      // Se chegar em 10 cartas e não for a última carta, adicionar uma nova página
      if (count === 10 && index < this.cartasSelecionadas.length - 1) {
        htmlContent += '</div><div class="pagina">';  // Nova página
        count = 0;
      }
    });

    htmlContent += '</body></html>';
    win.document.write(htmlContent);
    win.document.close();

    // Adicionando um pequeno delay para garantir o carregamento do conteúdo
    setTimeout(() => {
      win.print();
    }, 80);
  }
}
