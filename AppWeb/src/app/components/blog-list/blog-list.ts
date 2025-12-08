import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IBlog } from '../../interfaces/Blog';
import { Api } from '../../services/api';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.css',
})
export class BlogList implements OnInit {
  blogs: IBlog[] = [];
  cargando = true;

  constructor(private api: Api) {}
  

  ngOnInit() {
    this.api.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar blogs:', err);
        this.cargando = false;
      }
    });
    
  }
}
