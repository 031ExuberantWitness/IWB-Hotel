import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoomTypesService {
  private roomTypes: string[];
  constructor() {
    this.roomTypes = ['Sencilla', 'Doble', 'Suite', 'Master Suite'];
  }

  getRoomTypes(): string[] {
    return this.roomTypes;
  }
}
