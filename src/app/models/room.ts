import { FormControl } from '@angular/forms';

export interface Room {
  id?: string;
  roomNumber: string;
  capacity: number;
  type: string;
  beds: BedInfo[];
  frigobar: boolean;
  deleted?: boolean;
}

export interface BedInfo {
  type: string;
  quantity: number;
}

export interface RoomForm {
  roomNumber: FormControl<string>;
  capacity: FormControl<number>;
  type: FormControl<string>;
  beds: FormControl<BedInfo[]>;
  frigobar: FormControl<boolean>;
}
