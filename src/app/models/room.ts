import { FormControl } from '@angular/forms';

export interface Room {
  id?: string;
  roomNumber: string;
  capacity: number;
  type: string;
  beds: string[];
  frigobar: boolean;
  deleted?: boolean;
}

export interface RoomForm {
  roomNumber: FormControl<string>;
  capacity: FormControl<number>;
  type: FormControl<string>;
  beds: FormControl<string[]>;
  frigobar: FormControl<boolean>;
}
