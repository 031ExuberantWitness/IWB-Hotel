import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoomTypesService {
  private roomTypes: string[];
  private roomPrices = {
    Sencilla: 1000,
    Doble: 1500,
    Suite: 2000,
    'Master Suite': 2500,
  };
  constructor() {
    this.roomTypes = ['Sencilla', 'Doble', 'Suite', 'Master Suite'];
  }

  getRoomTypes(): string[] {
    return this.roomTypes;
  }

  getRoomPrices() {
    return this.roomPrices;
  }
}
