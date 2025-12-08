import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Galeria } from './components/galeria/galeria';
import { Resenas } from './components/resenas/resenas';
import { Blog } from './components/blog/blog';
import { Contacto } from './components/contacto/contacto';
import { BlogList } from './components/blog-list/blog-list';
import { Ruleta } from './components/ruleta/ruleta';
import { Simulador } from './components/simulador/simulador';
import { BuscadorRecetaInteligente } from './components/buscador-receta-inteligente/buscador-receta-inteligente';
import { MapaPuntosVenta } from './components/mapa-puntos-venta/mapa-puntos-venta';
import { Comunidad } from './components/comunidad/comunidad';
import { Eventos } from './components/eventos/eventos';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'galeriasFotos', component: Galeria },
    { path: 'resenas', component: Resenas },
    { path: 'blog', component: Blog },
    { path: 'blogs', component: BlogList },
    { path: 'datos', component: Contacto },
    { path: 'ruleta', component: Ruleta },
    { path: 'simulador', component: Simulador },
    { path: 'IA', component: BuscadorRecetaInteligente },
    { path: 'mapa', component: MapaPuntosVenta },
    { path: 'comunidad', component: Comunidad },
    { path: 'eventos', component: Eventos },


    //       
    { path: '**', redirectTo: '' }
];
