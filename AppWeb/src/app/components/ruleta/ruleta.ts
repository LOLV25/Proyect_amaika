
import { Component } from '@angular/core';

@Component({
  selector: 'app-ruleta',
  imports: [],
  templateUrl: './ruleta.html',
  styleUrl: './ruleta.css',
})
export class Ruleta {
  premios: string[] = [
    '5% en tu próxima Healthy Box',
    '2x1 en productos del mes',
    '1 gelatina extra',
    'Mini porción de jamaica natural',
    'Reto de hidratación: gana un cupón',
    '3 días sin azúcar = recompensa',
    'Camina 30 min y reclama tu premio',
    '1 día de envío gratuito',
    'Acceso anticipado a nuevo sabor',
    'Sorteo mensual exclusivo',
    'Cliente Amaika del mes',
    'Medalla virtual por consumo responsable'
  ];

  angulo = 0;
  resultado: string | null = null;
  girando = false;

  girarRuleta() {
    if (this.girando) return; // Evita múltiples clics
    
    this.girando = true;
    this.resultado = null;

    const vueltas = 360 * 6; // 6 vueltas completas
    const premioIndex = Math.floor(Math.random() * this.premios.length);
    const anguloFinal = vueltas + (premioIndex * (360 / this.premios.length));

    this.angulo = anguloFinal;

    setTimeout(() => {
      this.resultado = this.premios[premioIndex];
      this.girando = false;
    }, 4000);
  }
}