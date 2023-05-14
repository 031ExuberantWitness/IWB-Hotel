import { Injectable } from '@angular/core';
import { BedInfo, Room } from '../models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private rooms: Room[];
  private bedTypes = ['Queen', 'King', 'Individual'];
  private bedInfo: BedInfo[] = [
    {
      type: 'Queen',
      quantity: 1,
    },
    {
      type: 'King',
      quantity: 1,
    },
    {
      type: 'Individual',
      quantity: 1,
    },
  ];
  constructor() {
    this.rooms = [
      {
        id: '1',
        roomNumber: '101',
        capacity: 2,
        type: 'Sencilla',
        beds: [{ type: 'Queen', quantity: 1 }],
        frigobar: true,
        deleted: false,
      },
      {
        id: '2',
        roomNumber: '102',
        capacity: 2,
        type: 'Sencilla',
        beds: [{ type: 'Queen', quantity: 1 }],
        frigobar: true,
        deleted: false,
      },
    ];
  }

  getRooms(): Room[] {
    return this.rooms;
  }

  getBedTypes(): string[] {
    return this.bedTypes;
  }

  getBedInfo(): BedInfo[] {
    return [...this.bedInfo];
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
