import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comunidad',
  imports: [CommonModule, FormsModule],
  templateUrl: './comunidad.html',
  styleUrl: './comunidad.css',
})
export class Comunidad {
  // Form de nueva publicación
  newTitle = '';
  newAuthor = '';
  newPhotoFile?: File;
  newPhotoPreview?: string;

  // Comentarios temporales por post
  newCommentText: { [postId: string]: string } = {};
  newCommentAuthor: { [postId: string]: string } = {};

  posts: Post[] = [];

  ngOnInit() {
    this.loadPosts();
  }

  // Persistencia
  loadPosts() {
    const raw = localStorage.getItem('amaika_posts');
    this.posts = raw ? JSON.parse(raw) : [];
  }

  savePosts() {
    localStorage.setItem('amaika_posts', JSON.stringify(this.posts));
  }

  // Manejo de imagen subida
  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;
    this.newPhotoFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.newPhotoPreview = reader.result as string;
    };
    reader.readAsDataURL(this.newPhotoFile);
  }

  // Crear una nueva publicación
  async createPost() {
    if (!this.newTitle.trim() || !this.newAuthor.trim() || !this.newPhotoPreview) return;

    const post: Post = {
      id: crypto.randomUUID(),
      title: this.newTitle.trim(),
      author: this.newAuthor.trim(),
      photoUrl: this.newPhotoPreview, // base64
      date: new Date().toLocaleDateString(),
      reactions: { like: 0, love: 0, party: 0 },
      comments: [],
    };

    this.posts.unshift(post);
    this.savePosts();
    // Limpiar form
    this.newTitle = '';
    this.newAuthor = '';
    this.newPhotoFile = undefined;
    this.newPhotoPreview = undefined;
  }

  // Reaccionar
  react(post: Post, type: keyof Reaction) {
    post.reactions[type]++;
    this.savePosts();
  }

  // Agregar comentario
  addComment(post: Post) {
    const text = (this.newCommentText[post.id] || '').trim();
    const author = (this.newCommentAuthor[post.id] || '').trim();
    if (!text || !author) return;

    post.comments.push({
      author,
      text,
      date: new Date().toLocaleString(),
    });
    // limpiar inputs
    this.newCommentText[post.id] = '';
    this.newCommentAuthor[post.id] = '';
    this.savePosts();
  }

  // Eliminar publicación (opcional)
  deletePost(postId: string) {
    this.posts = this.posts.filter(p => p.id !== postId);
    this.savePosts();
  }
}