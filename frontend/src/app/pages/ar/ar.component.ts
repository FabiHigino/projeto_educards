import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartaService, Carta } from '../../services/cartas.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ar',
  templateUrl: './ar.component.html',
  styleUrls: ['./ar.component.css'],
  imports: [
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArComponent implements OnInit {
  cartas: Carta[] = [];  // Array para armazenar as cartas recebidas da API
  cartaAtual: Carta | null = null;  // Armazenar a carta atual selecionada para exibir
  iframeSrc: SafeResourceUrl = '';  // Variável para armazenar o caminho do iframe

  constructor(private cartaService: CartaService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.cartaService.getCartas().subscribe(data => {
      this.cartas = data;
      this.cartaAtual = this.cartas[0]; // Exemplo: pegar a primeira carta
      console.log('Carta Atual:', this.cartaAtual); // Verifique se a carta foi carregada corretamente
      if (this.cartaAtual) {
        this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('assets/ar-view.html');
        localStorage.setItem('cartaAtual', JSON.stringify(this.cartaAtual)); // Salvar dados da carta no localStorage
      }
    });
  }

  // Função para atualizar a carta atual (caso tenha algum método de seleção)
  atualizarCarta(carta: Carta): void {
    this.cartaAtual = carta;
  }
}
