import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';

import { IBlog } from '../../interfaces/Blog';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  blogs: IBlog[] = [];
  nuevoBlog: IBlog = {
    titulo: '',
    slug: '',
    contenido: '',
    fecha_publicacion: undefined
  };

  constructor(private api: Api) {}

  ngOnInit() {
    this.cargarBlogs();
  }

  cargarBlogs() {
    this.api.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar blogs:', err);
      }
    });
  }

  enviarBlog() {
    try {
      if (!this.nuevoBlog.titulo || !this.nuevoBlog.slug || !this.nuevoBlog.contenido) {
        throw new Error('Todos los campos son obligatorios');
      }

      // Generar fecha automática
      this.nuevoBlog.fecha_publicacion = new Date().toISOString();

      this.api.postBlog(this.nuevoBlog).subscribe({
        next: (res) => {
          alert('✅ Blog publicado correctamente');
          this.blogs.push(res); // el backend devuelve el blog con id
          this.nuevoBlog = { titulo: '', slug: '', contenido: '', fecha_publicacion: undefined };
        },
        error: (err) => {
          console.error('❌ Error al publicar blog:', err);
          alert('Hubo un problema al publicar el blog');
        }
      });

    } catch (error: any) {
      console.error('❌ Error en validación:', error.message);
      alert(error.message);
    }
  }

  eliminarBlog(id: number) {
    if (confirm('¿Seguro que deseas eliminar este blog?')) {
      this.api.deleteBlog(id).subscribe({
        next: () => {
          this.blogs = this.blogs.filter(b => b.id !== id);
          console.log('✅ Blog eliminado');
        },
        error: (err) => {
          console.error('❌ Error al eliminar blog:', err);
          alert('Hubo un problema al eliminar el blog');
        }
      });
    }
  }
}