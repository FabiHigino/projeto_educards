import { Routes } from '@angular/router';
import { ArComponent } from './pages/ar/ar.component';
import { HomeComponent } from './pages/home/home.component';
import { CartasComponent } from './pages/cartas/cartas.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página inicial
  { path: 'ar', component: ArComponent }, // Página de Realidade Aumentada
  { path: 'cartas', component: CartasComponent }, // Página de Realidade Aumentada
];