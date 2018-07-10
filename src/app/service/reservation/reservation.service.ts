import { Injectable } from '@angular/core';
import {Reservation} from '../../model/Reservation.model';
import {ReservationEnum} from '../../model/enum/ReservationEnum';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservations: Reservation[] = [
    new Reservation('1', 'PHP免费试听课', '张三', ReservationEnum.PENDING, '2018-6-15 02:31:53', ''),
    new Reservation('2', 'JAVA免费试听课', '张三', ReservationEnum.PENDING, '2018-6-15 02:31:53', ''),
    new Reservation('1', 'PHP免费试听课', '张三', ReservationEnum.AVAILABLE, '2018-6-15 02:31:53', ''),
    new Reservation('3', 'C++免费试听课', '张三', ReservationEnum.PENDING, '2018-6-15 02:31:53', ''),
    new Reservation('1', 'PHP免费试听课', '张三', ReservationEnum.PENDING, '2018-6-15 02:31:53', '大家好'),
    new Reservation('1', 'PHP免费试听课', '张三', ReservationEnum.AVAILABLE, '2018-6-15 02:31:53', ''),
  ];

  constructor() { }

  getReservation(): Reservation[] {
    return this.reservations;
  }
}
