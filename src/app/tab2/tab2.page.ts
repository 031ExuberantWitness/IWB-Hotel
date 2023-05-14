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

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class Tab2Page {
  @ViewChild('efectivo') efectivo!: IonItem;
  @ViewChild('tarjeta') tarjeta!: IonItem;
  @ViewChild('fecha') fecha!: IonDatetime;
  private precios = {
    sobremanteles: 200,
    mesaRegalos: 500,
    brincolin: 1000,
    alberca: 5000,
  };
  reservationForm: FormGroup<ReservationForm>;
  fechasOcupadas: string[] = [];
  mensajes_validacion: any;
  constructor(
    private reservationService: ReservationService,
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

  ionViewDidEnter() {
    if (this.fecha.value) return;
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
    this.fecha.value = `${formato}T${
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
      if (this.efectivo.color === 'primary') {
        this.efectivo.color = undefined;
        this.reservationForm.controls.paymentMethod.patchValue('');
        return;
      }
      this.efectivo.color = 'primary';
      this.tarjeta.color = undefined;
      this.reservationForm.controls.paymentMethod.patchValue('Efectivo');
    } else {
      if (this.tarjeta.color === 'primary') {
        this.tarjeta.color = undefined;
        this.reservationForm.controls.paymentMethod.patchValue('');
        return;
      }
      this.efectivo.color = undefined;
      this.tarjeta.color = 'primary';
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

  private calcularPrecio(): number {
    let precio = 1000;
    precio +=
      this.precios.sobremanteles *
      this.reservationForm.controls.colorSobremantel.value.length;
    precio += this.reservationForm.controls.mesaRegalos.value
      ? this.precios.mesaRegalos
      : 0;
    precio += this.reservationForm.controls.brincolin.value
      ? this.precios.brincolin
      : 0;
    precio +=
      (this.precios.alberca * this.reservationForm.controls.alberca.value) /
      100;
    return precio;
  }

  private actualizarValidacionesAnticipo() {
    this.reservationForm.controls.anticipo.setValidators([
      Validators.required,
      Validators.min(this.calcularPrecio() * 0.1),
      Validators.max(this.calcularPrecio()),
    ]);
    this.reservationForm.controls.anticipo.updateValueAndValidity({
      emitEvent: false,
    });
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
