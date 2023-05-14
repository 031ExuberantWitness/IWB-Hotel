import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { BedInfo, RoomForm } from '../models/room';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class Tab4Page {
  roomForm: FormGroup<RoomForm>;
  mensajes_validacion: any;

  constructor(private roomService: RoomService, private title: Title) {
    this.title.setTitle('Nueva habitación');
    this.roomForm = new FormGroup({
      roomNumber: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[0-9]+$/)],
      }),
      capacity: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      type: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      beds: new FormControl<BedInfo[]>([], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      frigobar: new FormControl(false, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
    this.mensajes_validacion = {
      roomNumber: [
        { type: 'required', message: 'El número de habitación es requerido' },
        { type: 'pattern', message: 'El número de habitación es inválido' },
      ],
      capacity: [
        { type: 'required', message: 'La capacidad es requerida' },
        { type: 'min', message: 'La capacidad debe ser mayor a 0' },
      ],
      type: [{ type: 'required', message: 'El tipo es requerido' }],
      beds: [{ type: 'required', message: 'Las camas son requeridas' }],
      frigobar: [{ type: 'required', message: 'El frigobar es requerido' }],
    };
  }

  ionViewDidEnter() {}

  confirmar() {
    this.roomService.addRoom({
      ...this.roomForm.getRawValue(),
    });
    this.roomForm.reset();
  }
}
