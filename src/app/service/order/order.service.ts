import { Injectable } from '@angular/core';
import {Order} from '../../model/Order.model';
import {OrderEnum} from '../../model/enum/OrderEnum';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: Order[] = [
    new Order('1', '1', '张三', 200, OrderEnum.AVAILABLE, '2018-7-15 12:30:15', '4878487815487145'),
    new Order('2', '2', '张三1', 200, OrderEnum.REFUNDED, '2018-7-16 12:30:15', '4878487815487146'),
    new Order('3', '3', '张三2', 400, OrderEnum.REFUNDING, '2018-7-17 12:30:15', '4878487815487147'),
    new Order('4', '4', '张三3', 200, OrderEnum.AVAILABLE, '2018-7-18 12:30:15', '4878487815487148'),
    new Order('5', '5', '张三4', 200, OrderEnum.AVAILABLE, '2018-7-19 12:30:15', '4878487815487149'),
    new Order('6', '6', '张三5', 500, OrderEnum.PENDING, '2018-7-20 12:30:15', '4878487815487150'),
    new Order('7', '7', '张三6', 700, OrderEnum.AVAILABLE, '2018-7-21 12:30:15', '4878487815487151'),
    new Order('8', '7', '张三7', 200, OrderEnum.AVAILABLE, '2018-7-22 12:30:15', '4878487815487152'),
    new Order('9', '1', '张三8', 100, OrderEnum.AVAILABLE, '2018-7-23 12:30:15', '4878487815487153')

  ];

  constructor() { }

  getOrder(): Order[] {
    return this.orders;
  }
}
