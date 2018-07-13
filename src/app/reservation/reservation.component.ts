import { Component, OnInit } from '@angular/core';
import {Reservation} from '../model/Reservation.model';
import {ReservationService, TrialReservationDetail} from '../service/reservation/reservation.service';
import {ReservationEnum} from '../model/enum/ReservationEnum';
import {LoginService} from '../service/login/login.service';
import {NzMessageService} from 'ng-zorro-antd';
import {ReservationDisplayEnum} from '../model/enum/ReservationDisplayEnum';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservationDisplayEnum = ReservationDisplayEnum;

  reservations: TrialReservationDetail[];
  displayData: TrialReservationDetail[];

  searchValue ='';
  filterAddress = [];
  filterType = [];

  pageIndex = 1;
  pageSize = 5;
  total = 1;
  loading = true;
  totalPage = 1;

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

  constructor(private reservationService$: ReservationService, private loginService$: LoginService, private message: NzMessageService) { }

  ngOnInit() {
    this.searchData();
  }

  searchData(reset: boolean = false, pageIndex: number = this.pageIndex) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.reservationService$.getReservationsByEnterpriseId(this.loginService$.currentAdmin.enterpriseId, this.pageSize, pageIndex)
      .subscribe(result => {
        this.loading = false;
        this.total = result.total;
        this.totalPage = Math.ceil(this.total / this.pageSize);
        this.pageIndex = pageIndex;
        this.reservations = result.list;
        this.displayData = [...this.reservations];
      });
  }

  // sort(sortName: string, value: boolean): void {
  //   this.sortName = sortName;
  //   this.sortValue = value;
  //   for (const key in this.sortMap) {
  //     this.sortMap[ key ] = (key === sortName ? value : null);
  //   }
  //   this.search();
  // }
  //
  // search(): void {
  //   const filterFunc = (item) => {
  //     return (this.searchAddress.length ? this.searchAddress.some(address => item.address.indexOf(address) !== -1) : true) &&
  //       (item.freeTrialId.indexOf(this.searchValue) !== -1);
  //   };
  //   const data = this.reservations.filter(item => filterFunc(item));
  //   this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  // }
  //
  // print() {
  //   console.log(this.dateRange);
  // }

  checkReservation(data: any) {
    data.status = ReservationEnum[ReservationEnum.AVAILABLE];
    this.reservationService$.changeReservationStatus(data)
      .subscribe(result => {
        this.message.success('修改状态成功');
      });
  }

}
