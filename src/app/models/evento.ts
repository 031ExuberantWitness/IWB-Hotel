import { FormControl } from '@angular/forms';

export interface Evento {
  fecha: string;
  hora: string;
  maxPersonas: number;
  descripcion: string;
  personas: number;
  cliente: string;
  celular: string;
  frigobar: boolean;
  toallasExtra: boolean;
  tipoCama: string;
  buffet: boolean; 
  precio: number;
  anticipo: number;
  metodo: string;
  saldo: number;
  estado: string;
}

export interface EventoForm {
  fecha: FormControl<string>;
  hora: FormControl<string>;
  maxPersonas: FormControl<number>;
  descripcion: FormControl<string>;
  personas: FormControl<number>;
  cliente: FormControl<string>;
  celular: FormControl<string>;
  frigobar: FormControl<boolean>;
  toallasExtra: FormControl<boolean>;
  tipoCama: FormControl<string>;
  buffet: FormControl<boolean>; 
  precio: FormControl<number>;
  anticipo: FormControl<number>;
  metodo: FormControl<string>;
  saldo: FormControl<number>;
  estado: FormControl<string>; 
}
