import { Component, OnInit } from '@angular/core';
import {Refund} from '../model/Refund.model';
import {RefundService} from '../service/refund/refund.service';
import {ReservationEnum} from '../model/enum/ReservationEnum';
import {RefundType} from '../model/enum/RefundType';
import {OrderDetail} from '../service/order/order.service';
import {LoginService} from '../service/login/login.service';
import {NzMessageService} from 'ng-zorro-antd';
import {RefundDisplayEnum} from '../model/enum/RefundDisplayEnum';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent implements OnInit {

  refundDisplayEnum = RefundDisplayEnum;

  refunds: OrderDetail[];
  displayData: OrderDetail[];

  searchValue ='';
  filterAddress = [];
  filterType = [];

  searchAddress = [];
  searchType = [];
  sortMap = {
    title   : null,
    price   :null,
    type    : null,
    orderTime: null
  };

  pageIndex = 1;
  pageSize = 5;
  total = 1;
  loading = true;
  totalPage = 1;

  sortName = null;
  sortValue = null;

  dateRange = '';

  constructor(private refundService$: RefundService, private loginService$: LoginService, private message: NzMessageService) { }

  ngOnInit() {
    this.searchData();
  }

  searchData(reset: boolean = false, pageIndex: number = this.pageIndex) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.refundService$.getRefundsByEnterpriseId(this.loginService$.currentAdmin.enterpriseId, pageIndex, this.pageSize)
      .subscribe(result => {
        this.loading = false;
        this.total = result.total;
        this.totalPage = Math.ceil(this.total / this.pageSize);
        this.pageIndex = pageIndex;
        this.refunds = result.list;
        this.displayData = [...this.refunds]
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
  //       (item.courseId.indexOf(this.searchValue) !== -1);
  //   };
  //   const data = this.refunds.filter(item => filterFunc(item));
  //   this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  // }
  //
  // print() {
  //   console.log(this.dateRange);
  // }

  checkRefund(data: any) {
    data.status = RefundType[RefundType.REFUNDED];
    this.refundService$.changeRefundStatus(data)
      .subscribe(result => {
        this.message.success('批准退款成功');
      });
  }

}
