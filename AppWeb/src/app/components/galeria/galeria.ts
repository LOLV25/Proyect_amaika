
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IaService } from '../../services/ia-service';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css',
})
export class Galeria {
  productos = [
    {
    nombre: 'jamaika',
    titulo: 'Gelatina de Jamaica con Panela',
    descripcion: 'Gelatina de jamaica sin saborizantes ni grenetina, endulzada naturalmente con panela.',
    imagen: 'https://dgari.com/wp-content/uploads/2023/01/rosca-de-gelatina-de-jamaica-light_.png', 
    sugerencia: '',
    visible: false
  },

    {
      nombre: 'hibisco',
      titulo: 'Gelatina de Hibisco',
      descripcion: 'Preparada con agar-agar y pétalos naturales. Ideal para una digestión ligera y saludable.',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiTdOczeP9u4VQKCcAA4BeXzzhH4nxD6UE3Q&s',
      sugerencia: '',
      visible: false
    },
    {
      nombre: 'vegana',
      titulo: 'Gelatina Vegana',
      descripcion: 'Endulzada con stevia de alta calidad. Refrescante, fácil de preparar y 100% vegetal.',
      imagen: 'https://i.ytimg.com/vi/pV15MRRCmiA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA76CKJPzPhzCb-mzYhcDB2GEYMQQ',
      sugerencia: '',
      visible: false
    },
    {
      nombre: 'organica',
      titulo: 'Gelatina Orgánica',
      descripcion: 'Libre de colorantes artificiales. Elaborada con ingredientes naturales y hojas de menta.',
      imagen: 'https://diesfrut.com/wp-content/uploads/2023/08/GelatinaFlorJamaica.jpg',
      sugerencia: '',
      visible: false
    }
  ];

  constructor(private iaService: IaService) {}

  mostrarSugerencia(index: number) {
    const tipo = this.productos[index].nombre;
    this.iaService.obtenerSugerencia(tipo).subscribe({
      next: (res) => {
        this.productos[index].sugerencia = res.sugerencia;
        this.productos[index].visible = true;
      },
      error: () => {
        this.productos[index].sugerencia = 'No se pudo obtener la sugerencia de la IA.';
        this.productos[index].visible = true;
      }
    });
  }

  cerrarSugerencia(index: number) {
    this.productos[index].visible = false;
  }

  ngOnInit() {
    console.log('✅ Galeria cargando...');
  }
}