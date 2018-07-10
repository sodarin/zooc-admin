import { Component, OnInit } from '@angular/core';
import {OrderService} from '../service/order/order.service';
import {Order} from '../model/Order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[];
  displayData: Order[];

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

  sortName = null;
  sortValue = null;

  dateRange = '';


  constructor(private order$: OrderService) { }

  ngOnInit() {
    this.orders = this.order$.getOrder();
    this.displayData = [...this.orders]
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
        (item.orderId.indexOf(this.searchValue) !== -1);
    };
    const data = this.orders.filter(item => filterFunc(item));
    this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  }

  print() {
    console.log(this.dateRange);
  }

}
