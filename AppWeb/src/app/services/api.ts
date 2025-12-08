import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../components/blog/blog';
import { IContacto } from '../interfaces/contacto';
import { IResena } from '../interfaces/resañas';
import { IBlog } from '../interfaces/Blog';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Reseñas
  getResenas(): Observable<IResena[]> {
    return this.http.get<IResena[]>(`${this.baseUrl}/resenas`);
  }

  postResena(data: IResena): Observable<{ mensaje: string, resena: IResena }> {
    return this.http.post<{ mensaje: string, resena: IResena }>(`${this.baseUrl}/resenas`, data);
  }




  // Blog
   // Obtener todos los blogs
   getBlogs(): Observable<IBlog[]> {
    return this.http.get<IBlog[]>(`${this.baseUrl}/blog`);
  }

  // Publicar un nuevo blog
  postBlog(blog: IBlog): Observable<IBlog> {
    return this.http.post<IBlog>(`${this.baseUrl}/blog`, blog);
  }

  // Eliminar un blog
  deleteBlog(id: number): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.baseUrl}/blog/${id}`);
  }



  // Contacto
  postContacto(data: IContacto): Observable<IContacto> {
    return this.http.post<IContacto>(`${this.baseUrl}/contacto`, data);
  }

  getContactos(): Observable<IContacto[]> {
    return this.http.get<IContacto[]>(`${this.baseUrl}/contacto`);
  }
}