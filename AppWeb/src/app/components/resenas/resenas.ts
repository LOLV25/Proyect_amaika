import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';

import { FormsModule } from '@angular/forms';
import { IResena } from '../../interfaces/resañas';

@Component({
  selector: 'app-resenas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './resenas.html',
  styleUrl: './resenas.css',
})
export class Resenas implements OnInit {
  resenas: IResena[] = [];
  nuevaResena: IResena = {
    nombre: '',
    email: '',
    comentario: '',
    rating: 0,
    fecha: undefined
  };

  constructor(private api: Api) { }

  ngOnInit() {
    this.cargarReseñas();
  }

  cargarReseñas() {
    this.api.getResenas().subscribe({
      next: (data) => {
        this.resenas = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar reseñas:', err);
      }
    });
  }

  enviarResena() {
    try {
      if (!this.nuevaResena.nombre || !this.nuevaResena.email || !this.nuevaResena.comentario || !this.nuevaResena.rating) {
        throw new Error('Todos los campos son obligatorios');
      }

      if (!this.nuevaResena.email.includes('@')) {
        throw new Error('Email inválido');
      }

      this.api.postResena(this.nuevaResena).subscribe({
        next: (res) => {
          alert(res.mensaje); 
          this.resenas.push(res.resena); 
          this.nuevaResena = { nombre: '', email: '', comentario: '', rating: 0, fecha: undefined };
        },
        error: (err) => {
          console.error('❌ Error al enviar reseña:', err);
          //alert('Hubo un problema al enviar la reseña');
        }
      });




    } catch (error: any) {
      console.error('❌ Error en validación:', error.message);
      alert(error.message);
    }
  }
}