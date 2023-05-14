import { Injectable } from '@angular/core';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private rooms: Room[];
  constructor() {
    this.rooms = [
      {
        id: '1',
        roomNumber: '101',
        capacity: 2,
        type: 'Sencilla',
        beds: ['Queen'],
        frigobar: true,
        deleted: false,
      },
      {
        id: '2',
        roomNumber: '102',
        capacity: 2,
        type: 'Sencilla',
        beds: ['Queen'],
        frigobar: true,
        deleted: false,
      },
    ];
  }

  getRooms(): Room[] {
    return this.rooms;
  }

  getRoom(id: string): Room | undefined {
    return this.rooms.find((room) => room.id === id);
  }

  addRoom(room: Room) {
    this.rooms.push(room);
  }

  updateRoom(room: Room) {
    const index = this.rooms.findIndex((r) => r.id === room.id);
    this.rooms[index] = room;
  }

  deleteRoom(id: string) {
    const index = this.rooms.findIndex((r) => r.id === id);
    this.rooms[index].deleted = true;
  }
}
