import {ReservationEnum} from './enum/ReservationEnum';

export class Reservation {
  constructor(
    public freeTrialId: string,
    public title: string,
    public username: string,
    public status: ReservationEnum,
    public reservationTime: string,
    public message: string
  ) {}
}
