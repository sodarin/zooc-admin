import { Component, OnInit } from '@angular/core';
import {OrderDetail, OrderService} from '../service/order/order.service';
import {Order} from '../model/Order.model';
import {LoginService} from '../service/login/login.service';
import {OrderDisplayEnum} from '../model/enum/OrderDisplayEnum';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderDisplayEnum = OrderDisplayEnum;

  orders: OrderDetail[];
  displayData: OrderDetail[];

  orderIdValue = '';
  courseNameValue = '';
  statusValue = '';

  filterStatus = [];

  filterConditions = {'name': this.courseNameValue, 'orderId': this.orderIdValue, 'status': this.statusValue};



  sortMap = {
    price   :null,
  };

  pageIndex = 1;
  pageSize = 5;
  total = 1;
  loading = true;
  totalPage = 1;


  dateRange = '';


  constructor(private order$: OrderService, private loginService$: LoginService) { }

  ngOnInit() {
    this.searchData();
    this.filterStatus = [
      {'text': '待付款', 'value': 'PENDING'},
      {'text': '已付款', 'value': 'AVAILABLE'},
      {'text': '已取消', 'value': 'CANCELED'},
      {'text': '退款申请', 'value': 'REFUND_REQUESTED'},
      {'text': '已退款', 'value': 'REFUNDED'}
    ]
  }

  searchData(reset: boolean = false, pageIndex: number = this.pageIndex) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.order$.getOrdersByEnterpriseId(this.loginService$.currentAdmin.enterpriseId, this.pageSize, pageIndex, this.filterConditions)
      .subscribe(result => {
        this.loading = false;
        this.total = result.total;
        this.totalPage = Math.ceil(this.total / this.pageSize);
        this.pageIndex = pageIndex;
        this.orders = result.list;
        this.displayData = [...this.orders]
      });
  }

  filterData() {
    this.order$.getOrdersByEnterpriseId(this.loginService$.currentAdmin.enterpriseId, this.pageSize, 1, this.filterConditions)
      .subscribe(result => {
        this.loading = false;
        this.total = result.total;
        this.totalPage = Math.ceil(this.total / this.pageSize);
        this.pageIndex = 1;
        this.orders = result.list? result.list: [];
        this.displayData = this.orders;
      })
  }

  searchOrderId() {
    this.filterConditions.orderId = this.orderIdValue;
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


}
