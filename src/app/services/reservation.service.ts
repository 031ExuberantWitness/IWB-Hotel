import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  reservations: Reservation[];
  constructor() {
    this.reservations = [
      {
        id: '1',
        buffete: true,
        client: 'Juan Jesus Mata Solis',
        date: '2021-06-01',
        email: 'jujemataso@ittepic.edu.mx',
        phone: '341 123 4567',
        rooms: [
          {
            id: '1',
            roomNumber: '101',
            adults: 2,
            children: 0,
            extraTowels: 0,
          },
          {
            id: '2',
            roomNumber: '102',
            adults: 1,
            children: 1,
            extraTowels: 1,
          },
        ],
      },
    ];
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === id);
  }

  addReservation(reservation: Reservation) {
    this.reservations.push(reservation);
  }

  updateReservation(reservation: Reservation) {
    const index = this.reservations.findIndex((r) => r.id === reservation.id);
    this.reservations[index] = reservation;
  }

  deleteReservation(id: string) {
    const index = this.reservations.findIndex((r) => r.id === id);
    this.reservations[index].deleted = true;
  }
}
