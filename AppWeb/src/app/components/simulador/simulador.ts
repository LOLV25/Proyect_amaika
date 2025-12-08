
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simulador',
  imports: [FormsModule],
  templateUrl: './simulador.html',
  styleUrl: './simulador.css',
})
export class Simulador {
 sabores = ['Jamaika', 'Limón', 'Chile', 'Mango', 'Fresa', 'Coco'];
  sabor1 = '';
  sabor2 = '';
  resultado = '';
  descripcion = '';
  mostrarResultado = false;

  combinar() {
    if (!this.sabor1 || !this.sabor2 || this.sabor1 === this.sabor2) {
      this.resultado = '❌ Elige dos sabores distintos';
      this.descripcion = '';
      this.mostrarResultado = true;
      return;
    }

    this.resultado = `${this.sabor1} + ${this.sabor2}`;
    this.descripcion = this.generarDescripcion(this.sabor1, this.sabor2);
    this.mostrarResultado = true;
  }

  generarDescripcion(s1: string, s2: string): string {
  const combinaciones: any = {
    'Jamaika+Chile': {
      desc: '🔥 Explosión tropical con picante vibrante',
      img: 'https://files.nutrify.io///data/uploads/0/file-1640021516170.jpeg'
    },
    'Jamaika+Limón': {
      desc: '🌺 Refrescante y floral, ideal para días soleados',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpVualdvzTEquwPSpijJrp_h7qqgO5geLCHg&s'
    },
    'Fresa+Coco': {
      desc: '🍓🥥 Dulce y cremoso, como un postre caribeño',
      img: 'https://www.cocinadelirante.com/800x600/filters:format(webp):quality(75)/sites/default/files/images/2024/07/receta-de-gelatina-de-fresa-con-coco.jpg'
    },
    'Mango+Chile': {
      desc: '🌶️🥭 Intenso, atrevido y adictivo',
      img: 'https://progel.com.mx/buckets/uploads/_1920x900_crop_center-center_100_none/receta-flan.webp'
    },

    'Chile+Fresa': {
  desc: '🌶️🍓 Picante y dulce, una mezcla atrevida',
  img: 'assets/chile-fresa.png'
},
'Coco+Limón': {
  desc: '🥥🍋 Refrescante y cremoso, ideal para verano',
  img: 'https://i.ytimg.com/vi/kJIJUxkByQU/maxresdefault.jpg'
},
'Jamaika+Mango': {
  desc: '🌺🥭 Tropical y vibrante, sabor de fiesta',
  img: 'https://www.cocinavital.mx/wp-content/uploads/2018/06/gelatina-bicolor-de-jamica-y-mango-e1593716071726.jpg'
},

  };
  const clave = `${s1}+${s2}`;
  const claveInvertida = `${s2}+${s1}`;
  const combo = combinaciones[clave] || combinaciones[claveInvertida];
  this.imagenResultado = combo?.img || 'assets/default.png';
  return combo?.desc || '✨ Sabor único, ¡pruébalo!';
}
  imagenResultado = 'https://www.somosmamas.com.ar/wp-content/uploads/2020/03/Postres-con-gelatina-990x557.jpg';
}
