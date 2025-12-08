import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IContacto } from '../../interfaces/contacto';
import emailjs from 'emailjs-com';


@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto implements OnInit {
  contacto: IContacto = {
    nombre: '',
    email: '',
    motivo: '',
    mensaje: '',
    fecha: undefined,
  };

  mensajes: IContacto[] = [];

  constructor(private api: Api) {
    console.log('🛠️ Constructor Contacto inicializado');
  }

  ngOnInit() {
    console.log('🚀 Componente Contacto montado');
    const guardados = localStorage.getItem('mensajesAmaika');
    if (guardados) {
      this.mensajes = JSON.parse(guardados);
    }
  }

  enviar() {
    try {
      if (!this.contacto.nombre || !this.contacto.email || !this.contacto.motivo || !this.contacto.mensaje) {
        throw new Error('Todos los campos son obligatorios');
      }

      if (!this.contacto.email.includes('@')) {
        throw new Error('Email inválido');
      }

      this.contacto.fecha = new Date().toISOString();

      //Enviar correo con EmailJS
      emailjs.send(
        "service_fgdf0hs",
        "template_hwkcauq",
        {
          nombre: this.contacto.nombre,
          email: this.contacto.email,
          motivo: this.contacto.motivo,
          mensaje: this.contacto.mensaje
        },
        "WpwsUriYRY9f51sxc"
      ).then(() => {
        console.log("✅ EmailJS enviado correctamente");
      }, (err: any) => {
        console.error("❌ Error EmailJS:", err);
      });

      //Guarda en la base de datos
      this.api.postContacto(this.contacto).subscribe({
        next: (resp) => {
          console.log('✅ Guardado en BD:', resp);
        },
        error: (err) => {
          console.error('❌ Error al guardar en BD:', err);
        }
      });

      // Guarda en la bandeja local
      this.mensajes.push({ ...this.contacto });
      localStorage.setItem("mensajesAmaika", JSON.stringify(this.mensajes));

      // 🔄 Resetear formulario
      this.contacto = { nombre: '', email: '', motivo: '', mensaje: '', fecha: undefined };
      alert("✅ Mensaje enviado y guardado en todos los canales");

    } catch (error: any) {
      alert(error.message);
    }
  }
}