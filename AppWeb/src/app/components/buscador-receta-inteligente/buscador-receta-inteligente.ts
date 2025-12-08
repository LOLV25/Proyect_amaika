
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador-receta-inteligente',
  imports: [FormsModule],
  templateUrl: './buscador-receta-inteligente.html',
  styleUrl: './buscador-receta-inteligente.css',
})
export class BuscadorRecetaInteligente {
  ingredientes = '';
  recetaIA: any = null;
  cargando = false;

  async generarReceta() {
  this.cargando = true;
  try {
    const response = await fetch('http://localhost:3000/api/ia-sugerencia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ producto: this.ingredientes })
    });
    const data = await response.json();
    this.recetaIA = data.sugerencia;
  } catch (error) {
    console.error(error);
    this.recetaIA = '❌ Error al obtener receta';
  } finally {
    this.cargando = false;
  }
}

}
