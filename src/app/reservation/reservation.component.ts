import { Component, OnInit } from '@angular/core';
import {Reservation} from '../model/Reservation.model';
import {ReservationService} from '../service/reservation/reservation.service';
import {ReservationEnum} from '../model/enum/ReservationEnum';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservations: Reservation[];
  displayData: Reservation[];

  searchValue ='';
  filterAddress = [];
  filterType = [];

  searchAddress = [];
  searchType = [];
  sortMap = {
    title   : null,
    price   :null,
    type    : null,
    reservationTime: null
  };

  sortName = null;
  sortValue = null;

  dateRange = '';

  constructor(private reservationService$: ReservationService) { }

  ngOnInit() {
    this.reservations = this.reservationService$.getReservation();
    this.displayData = [...this.reservations];
  }

  sort(sortName: string, value: boolean): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.sortMap) {
      this.sortMap[ key ] = (key === sortName ? value : null);
    }
    this.search();
  }

  search(): void {
    const filterFunc = (item) => {
      return (this.searchAddress.length ? this.searchAddress.some(address => item.address.indexOf(address) !== -1) : true) &&
        (item.freeTrialId.indexOf(this.searchValue) !== -1);
    };
    const data = this.reservations.filter(item => filterFunc(item));
    this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  }

  print() {
    console.log(this.dateRange);
  }

  checkReservation(data: any) {
    data.status = ReservationEnum.AVAILABLE;
  }

}
