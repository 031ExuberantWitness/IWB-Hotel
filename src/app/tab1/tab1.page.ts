import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, IonicModule } from '@ionic/angular';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/evento';
import { Title } from '@angular/platform-browser';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab1Page implements OnInit {
  rooms: Room[] = [];

  constructor(private roomService: RoomService, title: Title) {
    title.setTitle('Habitaciones');
  }

  ngOnInit() {
    this.rooms = this.roomService.getRooms();
  }

  ionViewDidEnter() {
    this.ngOnInit();
  }
}
