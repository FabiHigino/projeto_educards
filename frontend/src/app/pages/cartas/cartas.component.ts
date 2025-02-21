import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Carta, CartaService } from '../../services/cartas.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.css'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    FormsModule // Adicionando para suportar [(ngModel)]
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartasComponent implements OnInit {
  cartas: Carta[] = [];
  categorias: string[] = [];
  cartasSelecionadas: Carta[] = [];
  categoriaSelecionada: string = '';
  cartasFiltradas: Carta[] = [];
  todasSelecionadas: boolean = false;

  constructor(private cartaService: CartaService) {}

  ngOnInit() {
    this.carregarCartas();
  }

  carregarCartas() {
    this.cartaService.getCartas().subscribe((data) => {
      this.cartas = data;

      // Captura as categorias e remove duplicadas
      this.categorias = [...new Set(data.map(carta => carta.categoria?.trim()).filter(categoria => categoria))];

      console.log('Categorias carregadas:', this.categorias); // Para depuração

      this.filtrarCartas();
    });
  }

  filtrarCartas() {
    const categoria = this.categoriaSelecionada.trim().toLowerCase();

    this.cartasFiltradas = categoria
      ? this.cartas.filter(carta => carta.categoria?.trim().toLowerCase() === categoria)
      : [...this.cartas];

    console.log('Cartas filtradas:', this.cartasFiltradas); // Para depuração
  }

  toggleSelecionar(carta: Carta) {
    const index = this.cartasSelecionadas.findIndex(c => c.id === carta.id);
    index > -1 ? this.cartasSelecionadas.splice(index, 1) : this.cartasSelecionadas.push(carta);
  }

  isSelecionada(carta: Carta): boolean {
    return this.cartasSelecionadas.some(c => c.id === carta.id);
  }

  selecionarTodasCartas() {
    this.todasSelecionadas = !this.todasSelecionadas;
    this.cartasSelecionadas = this.todasSelecionadas ? [...this.cartasFiltradas] : [];
  }

  imprimirCartas() {
    if (this.cartasSelecionadas.length === 0) {
      alert('Selecione pelo menos uma carta para imprimir.');
      return;
    }

    const win = window.open('', '_blank');
    if (!win) return;

    win.document.write(`
      <html>
      <head>
        <style>
          @page { size: A4; margin: 10mm; }
          body { font-family: Arial, sans-serif; text-align: center; margin: 0; padding: 0; }
          .pagina { display: flex; flex-wrap: wrap; width: 210mm; height: 297mm; page-break-before: always; }
          .pagina:first-child { margin-top: 0; }
          .carta { width: 57mm; height: 89mm; margin: 3mm; display: flex; align-items: center; justify-content: center; border: 1px solid #000; }
          img { width: 100%; height: auto; }
        </style>
      </head>
      <body>
    `);

    let htmlContent = '<div class="pagina">';
    let count = 0;

    this.cartasSelecionadas.forEach((carta, index) => {
      htmlContent += `
        <div class="carta">
          <img src="${carta.imagem}" alt="${carta.titulo}" />
        </div>
      `;
      count++;

      if (count === 10 && index < this.cartasSelecionadas.length - 1) {
        htmlContent += '</div><div class="pagina" style="margin-top: 20mm;">';
        count = 0;
      }
    });

    htmlContent += '</div></body></html>';
    win.document.write(htmlContent);
    win.document.close();

    setTimeout(() => {
      win.print();
    }, 100);
  }
}
