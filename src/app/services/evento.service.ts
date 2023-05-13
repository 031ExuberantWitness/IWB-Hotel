import { Injectable } from '@angular/core';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private eventos: Evento[];

  constructor() {
    this.eventos = [
      {
        fecha: '2023-04-20',
        hora: '14:00',
        maxPersonas: 5,
        descripcion: 'Habitación sencilla',
        personas: 1,
        cliente: 'Daniel López',
        celular: '3113113112',
        frigobar: true,
        toallasExtra: true,
        tipoCama: 'Matrimonial',
        buffet: true,  
        precio: 1000,
        anticipo: 500,
        metodo: 'Efectivo',
        saldo: 500,
        estado: 'Apartado',
      },
    ];
  }

  getEventos() {
    return this.eventos;
  }

  getEvento(fecha: string) {
    return this.eventos.find((evento) => evento.fecha === fecha);
  }

  addEvento(evento: Evento) {
    this.eventos.push(evento);
    return this.eventos;
  }

  updateEvento(evento: Evento) {
    const index = this.eventos.findIndex(
      (evento) => evento.fecha === evento.fecha
    );
    this.eventos[index] = evento;
    return this.eventos;
  }

  deleteEvento(fecha: string) {
    const index = this.eventos.findIndex((evento) => evento.fecha === fecha);
    this.eventos.splice(index, 1);
    return this.eventos;
  }
}
