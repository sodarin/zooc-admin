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

  reservationIdValue ='';
  courseNameValue = '';
  statusValue = '';

  filterStatus = [];

  filterConditions = {'name': this.courseNameValue, 'reservationId': this.reservationIdValue, 'status': this.statusValue};

  pageIndex = 1;
  pageSize = 5;
  total = 1;
  loading = true;
  totalPage = 1;

  sortMap = {
    price   :null,
  };


  dateRange = '';

  constructor(private reservationService$: ReservationService, private loginService$: LoginService, private message: NzMessageService) { }

  ngOnInit() {
    this.searchData();
    this.filterStatus = [
      {'text': '待处理', 'value': 'PENDING'},
      {'text': '已处理', 'value': 'AVAILABLE'},
      {'text': '已取消', 'value': 'CANCELED'},
      {'text': '已使用', 'value': 'USED'},
      {'text': '已过期', 'value': 'EXPIRED'}
    ]
  }

  searchData(reset: boolean = false, pageIndex: number = this.pageIndex) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.reservationService$.getReservationsByEnterpriseId(this.loginService$.currentAdmin.enterpriseId, this.pageSize, pageIndex, this.filterConditions)
      .subscribe(result => {
        this.loading = false;
        this.total = result.total;
        this.totalPage = Math.ceil(this.total / this.pageSize);
        this.pageIndex = pageIndex;
        this.reservations = result.list;
        this.displayData = [...this.reservations];
      });
  }

  filterData() {
    this.reservationService$.getReservationsByEnterpriseId(this.loginService$.currentAdmin.enterpriseId, this.pageSize, 1, this.filterConditions)
      .subscribe(result => {
        this.loading = false;
        this.total = result.total;
        this.totalPage = Math.ceil(this.total / this.pageSize);
        this.pageIndex = 1;
        this.reservations = result.list? result.list: [];
        this.displayData = this.reservations;
      })
  }

  searchReservationId() {
    this.filterConditions.reservationId = this.reservationIdValue;
    this.filterData();
  }

  searchCourseByName() {
    this.filterConditions.name = this.courseNameValue;
    this.filterData();
  }

  filterStatusChange(value: any) {
    this.statusValue = value? value: '';
    this.filterConditions.status = this.statusValue;
    this.filterData();
  }


  checkReservation(data: any) {
    data.status = ReservationEnum[ReservationEnum.AVAILABLE];
    this.reservationService$.changeReservationStatus(data)
      .subscribe(result => {
        this.message.success('修改状态成功');
      });
  }

}
