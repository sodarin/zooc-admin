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


  constructor(private order$: OrderService, private loginService$: LoginService) { }

  ngOnInit() {
    this.searchData();

  }

  searchData(reset: boolean = false, pageIndex: number = this.pageIndex) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.order$.getOrdersByEnterpriseId(this.loginService$.currentAdmin.enterpriseId, this.pageSize, pageIndex)
      .subscribe(result => {
        this.loading = false;
        this.total = result.total;
        this.totalPage = Math.ceil(this.total / this.pageSize);
        this.pageIndex = pageIndex;
        this.orders = result.list;
        this.displayData = [...this.orders]
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

  // search(): void {
  //   const filterFunc = (item) => {
  //     return (this.searchAddress.length ? this.searchAddress.some(address => item.address.indexOf(address) !== -1) : true) &&
  //       (item.orderId.indexOf(this.searchValue) !== -1);
  //   };
  //   const data = this.orders.filter(item => filterFunc(item));
  //   this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  // }

  // print() {
  //   console.log(this.dateRange);
  // }

}
