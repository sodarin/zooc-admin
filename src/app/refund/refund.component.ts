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

  orderIdValue = '';
  courseNameValue = '';
  userEmailValue = '';
  userMobileValue = '';
  statusValue = '';

  filterStatus = [];
  filterConditions = {'name': this.courseNameValue, 'orderId': this.orderIdValue, 'status': this.statusValue, 'userEmail': this.userEmailValue, 'userMobile': this.userMobileValue};



  sortMap = {
    price   :null,
  };

  pageIndex = 1;
  pageSize = 5;
  total = 1;
  loading = true;
  totalPage = 1;


  dateRange = '';

  constructor(private refundService$: RefundService, private loginService$: LoginService, private message: NzMessageService) { }

  ngOnInit() {
    this.searchData();
    this.filterStatus = [
      {'text': '退款申请', 'value': 'REFUND_REQUESTED'},
      {'text': '已退款', 'value': 'REFUNDED'},
    ]
  }

  searchData(reset: boolean = false, pageIndex: number = this.pageIndex) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.refundService$.getRefundsByEnterpriseId(this.loginService$.currentAdmin.enterpriseId, pageIndex, this.pageSize, this.filterConditions)
      .subscribe(result => {
        this.loading = false;
        this.total = result.total;
        this.totalPage = Math.ceil(this.total / this.pageSize);
        this.pageIndex = pageIndex;
        this.refunds = result.list;
        this.displayData = [...this.refunds]
      });
  }

  filterData() {
    this.refundService$.getRefundsByEnterpriseId(this.loginService$.currentAdmin.enterpriseId,1,  this.pageSize, this.filterConditions)
      .subscribe(result => {
        this.loading = false;
        this.total = result.total;
        this.totalPage = Math.ceil(this.total / this.pageSize);
        this.pageIndex = 1;
        this.refunds = result.list? result.list: [];
        this.displayData = this.refunds;
      })
  }
  searchOrderId() {
    this.filterConditions.orderId = this.orderIdValue;
    this.filterData();
  }

  searchCourseName() {
    this.filterConditions.name = this.courseNameValue;
    this.filterData();
  }

  searchUserEmail() {
    this.filterConditions.userEmail = this.userEmailValue;
    this.filterData();
  }

  searchUserMobile() {
    this.filterConditions.userMobile = this.userMobileValue;
    this.filterData();
  }

  filterStatusChange(value: any) {
    this.statusValue = value? value: '';
    this.filterConditions.status = this.statusValue;
    this.filterData();
  }


  checkRefund(data: any) {
    data.status = RefundType[RefundType.REFUNDED];
    this.refundService$.changeRefundStatus(data)
      .subscribe(result => {
        this.message.success('批准退款成功');
      });
  }

}
