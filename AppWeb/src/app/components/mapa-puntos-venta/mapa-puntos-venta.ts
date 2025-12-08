import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa-puntos-venta',
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './mapa-puntos-venta.html',
  styleUrl: './mapa-puntos-venta.css',
})
export class MapaPuntosVenta implements AfterViewInit {
  ngAfterViewInit(): void {
    const map = L.map('map').setView([-2.170998, -79.922359], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Marcador 1: Malecón
    L.marker([-2.170998, -79.922359]).addTo(map).bindPopup(`
      <div style="text-align:center;">
        <strong>Tienda Amaika</strong><br>
        Malecón<br>
        <img src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSw7X4sa-vPpN-vr74Lgele3Rl_sQD2pkYsf61_H__9aNb5_H-ltIaR2nfKnfugbIjiW0KUny69s56odMAtJMXvFv9F8Ppe1fDZqU31YoUzAhJLfF2I-STKZ-NsaZjHBF_LnfKRo=w408-h306-k-no" width="200" style="border-radius:8px; margin-top:8px;">
        <br>
        <a href="https://www.google.com/maps/@-2.170998,-79.922359,3a,75y,90t" target="_blank">
          🌐 Ver en Street View
        </a>
      </div>
    `);

    // Marcador 2: Urdesa
    L.marker([-2.145, -79.950]).addTo(map).bindPopup(`
      <div style="text-align:center;">
        <strong>Distribuidor Amaika</strong><br>
        Urdesa<br>
        <img src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSz3mSKN9Um07upDTd3Curbe1J1dmBvXbvYv0GssNh0qGKwzTTZ1ns4p8-0T_Iq322AIKwPDO1C1ovIwlWs4huo09rLZbeT-VjWuZj3xTcEduF90o7WE2Xtw10TjhDf4hs8Y04xV=w408-h408-k-no" width="200" style="border-radius:8px; margin-top:8px;">
        <br>
        <a href="https://www.google.com/maps/@-2.145,-79.950,3a,75y,90t" target="_blank">
          🌐 Ver en Street View
        </a>
      </div>
    `);

    // Marcador 3: Samborondón
    L.marker([-2.190, -79.880]).addTo(map).bindPopup(`
      <div style="text-align:center;">
        <strong>Amaika Shop</strong><br>
        Village Plaza<br>
        <img src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyaSsyjNsSL0zPUfm6C2xUeDVnA1HjkiS1RhsCrS059SYIiSC6PxLt2dR99rL71dejrnsPwWkBVhUVUhtyQ015sNr4Tzcn1qdK7EvQRP4UTPjvxTW5iS7um_0S15eeacLbADDE8Qg=w408-h408-k-no" width="200" style="border-radius:8px; margin-top:8px;">
        <br>
        <a href="https://www.google.com/maps/@-2.190,-79.880,3a,75y,90t" target="_blank">
          🌐 Ver en Street View
        </a>
      </div>
    `);
  }
}