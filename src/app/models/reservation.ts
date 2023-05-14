import { FormControl } from '@angular/forms';

export interface Reservation {
  id?: string;
  date: string;
  client: string;
  phone: string;
  email: string;
  buffete: boolean;
  rooms: RoomInfo[];
  deleted?: boolean;
  paymentMethod: string;
}

export interface RoomInfo {
  id?: string;
  roomNumber: string;
  children: number;
  adults: number;
  extraTowels: number;
}

export interface ReservationForm {
  date: FormControl<string>;
  client: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  buffete: FormControl<boolean>;
  rooms: FormControl<RoomInfo[]>;
  paymentMethod: FormControl<string>;
}

export interface RoomInfoForm {
  roomNumber: FormControl<string>;
  children: FormControl<number>;
  adults: FormControl<number>;
  extraTowels: FormControl<number>;
}
