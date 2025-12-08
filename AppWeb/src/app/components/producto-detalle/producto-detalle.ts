import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto-detalle',
  imports: [],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css',
})
export class ProductoDetalle implements OnInit {
  productoId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productoId = this.route.snapshot.paramMap.get('id') || '';
    // Aquí puedes usar el ID para cargar datos del producto
  }
}