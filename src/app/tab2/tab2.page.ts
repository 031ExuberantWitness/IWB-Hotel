import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IonDatetime, IonicModule, IonItem } from '@ionic/angular';
import { EventoService } from '../services/evento.service';
import { Title } from '@angular/platform-browser';
import { ReservationForm, RoomInfo, RoomInfoForm } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { RoomTypesService } from '../services/room-types.service';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class Tab2Page {
  @ViewChild('efectivo') cash!: IonItem;
  @ViewChild('tarjeta') card!: IonItem;
  @ViewChild('fecha') date!: IonDatetime;

  rooms: Room[] = [];
  private prices = { buffete: 1000, extraTowel: 100 };
  private roomPrices = this.roomTypesService.getRoomPrices();

  reservationForm: FormGroup<ReservationForm>;
  fechasOcupadas: string[] = [];
  mensajes_validacion: any;

  constructor(
    private reservationService: ReservationService,
    private roomTypesService: RoomTypesService,
    private roomService: RoomService,
    private title: Title
  ) {
    this.title.setTitle('Nuevo evento');
    this.reservationForm = new FormGroup({
      buffete: new FormControl(false, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      client: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      date: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, this.validarFecha()],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]*'),
        ],
      }),
      rooms: new FormControl<RoomInfo[]>([], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      paymentMethod: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      total: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
    this.mensajes_validacion = {
      buffete: [{ type: 'required', message: 'Este campo es obligatorio.' }],
      client: [{ type: 'required', message: 'Este campo es obligatorio.' }],
      date: [
        { type: 'required', message: 'Este campo es obligatorio.' },
        { type: 'fechaOcupada', message: 'Esta fecha ya está ocupada.' },
      ],
      email: [
        { type: 'required', message: 'Este campo es obligatorio.' },
        { type: 'email', message: 'El correo no es válido.' },
      ],
      phone: [
        { type: 'required', message: 'Este campo es obligatorio.' },
        { type: 'minlength', message: 'El teléfono debe tener 10 dígitos.' },
        { type: 'maxlength', message: 'El teléfono debe tener 10 dígitos.' },
        { type: 'pattern', message: 'El teléfono debe ser numérico.' },
      ],
      rooms: [{ type: 'required', message: 'Este campo es obligatorio.' }],
      paymentMethod: [
        { type: 'required', message: 'Este campo es obligatorio.' },
      ],
    };
  }

  private loadRooms() {
    this.rooms = this.roomService.getRooms();
  }

  ionViewDidEnter() {
    this.loadRooms();
    if (this.date.value) return;
    const fecha = new Date();
    const formato = fecha
      .toLocaleDateString('es-MX', {
        timeZone: 'America/Mazatlan',
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '-')
      .split('-')
      .reverse()
      .join('-');
    this.date.value = `${formato}T${
      fecha.getHours() < 10 ? '0' + fecha.getHours() : fecha.getHours()
    }:${
      fecha.getMinutes() < 10 ? '0' + fecha.getMinutes() : fecha.getMinutes()
    }:${
      fecha.getSeconds() < 10 ? '0' + fecha.getSeconds() : fecha.getSeconds()
    }.${fecha.getMilliseconds()}Z`;
    this.setFechaHora(fecha);
  }

  fechaDesocupada() {
    const fechas = this.fechasOcupadas;
    return (fecha: string) =>
      !fechas.includes(new Date(fecha).toISOString().slice(0, 10));
  }

  elegirMetodo(metodo: string) {
    if (metodo === 'Efectivo') {
      if (this.cash.color === 'primary') {
        this.cash.color = undefined;
        this.reservationForm.controls.paymentMethod.patchValue('');
        return;
      }
      this.cash.color = 'primary';
      this.card.color = undefined;
      this.reservationForm.controls.paymentMethod.patchValue('Efectivo');
    } else {
      if (this.card.color === 'primary') {
        this.card.color = undefined;
        this.reservationForm.controls.paymentMethod.patchValue('');
        return;
      }
      this.cash.color = undefined;
      this.card.color = 'primary';
      this.reservationForm.controls.paymentMethod.patchValue('Transferencia');
    }
  }

  setFechaHora(event: any) {
    if (event instanceof Date) {
      this.reservationForm.controls.date.patchValue(
        event.toISOString().slice(0, 10)
      );
    } else {
      const fecha = new Date(event.detail.value);
      this.reservationForm.controls.date.patchValue(
        fecha.toISOString().slice(0, 10)
      );
    }
  }

  confirmar() {
    this.reservationService.addReservation({
      ...this.reservationForm.getRawValue(),
    });
    this.fechasOcupadas.push(
      new Date(this.reservationForm.controls.date.value)
        .toISOString()
        .slice(0, 10)
    );
    this.reservationForm.reset();
  }

  apartar() {
    this.reservationService.addReservation({
      ...this.reservationForm.getRawValue(),
    });
    this.fechasOcupadas.push(
      new Date(this.reservationForm.controls.date.value)
        .toISOString()
        .slice(0, 10)
    );
    this.reservationForm.reset();
  }

  private getRoomType(
    roomInfo: RoomInfo
  ): 'Sencilla' | 'Doble' | 'Suite' | 'Master Suite' {
    const type = this.rooms.find(
      (room) => room.roomNumber === roomInfo.roomNumber
    )!.type;
    switch (type) {
      case 'Sencilla':
        return 'Sencilla';
      case 'Doble':
        return 'Doble';
      case 'Suite':
        return 'Suite';
      case 'Master Suite':
        return 'Master Suite';
      default:
        return 'Sencilla';
    }
  }
  private calcularPrecio(roomInfo: RoomInfo): number {
    let precio = this.roomPrices[this.getRoomType(roomInfo)];
    precio += this.prices.extraTowel * roomInfo.extraTowels;
    precio += this.reservationForm.controls.buffete.value
      ? this.prices.buffete
      : 0;
    return precio;
  }

  public getFechasOcupadas() {
    return this.fechasOcupadas;
  }

  private validarFecha(): ValidatorFn {
    const fechas = this.getFechasOcupadas();
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const fecha = new Date(control.value);
      if (fechas.includes(fecha.toISOString().slice(0, 10))) {
        return { fechaOcupada: true };
      }
      return null;
    };
  }
}
