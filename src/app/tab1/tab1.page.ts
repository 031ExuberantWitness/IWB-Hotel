import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, IonicModule } from '@ionic/angular';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/evento';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab1Page implements OnInit {
  @ViewChild('calendar', { static: false }) calendar!: IonDatetime;
  private higlightColors = {
    'XV años': { backgroundColor: '#428cff', textColor: '#fff' },
    Boda: { backgroundColor: '#2fdf75', textColor: '#000' },
    Cumpleaños: { backgroundColor: '#ffd534', textColor: '#000' },
  };
  event?: Evento;
  highlightedDates: ColorDate[] = [];

  constructor(private eventoService: EventoService, title:Title) {
    title.setTitle('Calendario');
  }

  ngOnInit() {
    const eventos = this.eventoService.getEventos();
    eventos.forEach((evento) => this.marcarFecha(evento.fecha, evento.tipo));
  }

  ionViewDidEnter() {
    this.ngOnInit();
    this.calendar.reset();
  }

  onDateChange(event: any) {
    const date = event.detail.value[0];
    this.event = this.eventoService.getEvento(date);
    this.calendar.reset();
  }

  getColor(tipo: string) {
    return tipo === 'XV años'
      ? 'primary'
      : tipo === 'Boda'
      ? 'success'
      : 'warning';
  }

  private marcarFecha(fecha: string, tipo: string) {
    const color =
      tipo === 'XV años'
        ? this.higlightColors['XV años']
        : tipo === 'Boda'
        ? this.higlightColors['Boda']
        : this.higlightColors['Cumpleaños'];
    this.highlightedDates.push({ date: fecha, ...color });
  }
}

interface ColorDate {
  date: string;
  backgroundColor: string;
  textColor: string;
}