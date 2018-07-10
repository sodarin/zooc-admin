import { Injectable } from '@angular/core';
import {Refund} from '../../model/Refund.model';
import {RefundType} from '../../model/enum/RefundType';

@Injectable({
  providedIn: 'root'
})
export class RefundService {

  refunds: Refund[] = [
    new Refund('2', '1', '张三', 200, RefundType.REFUNDING, '2018-06-20 14:27:56'),
    new Refund('1', '1', '张三', 100, RefundType.REFUNDED, '2018-06-19 14:27:56'),
    new Refund('1', '1', '张三', 100, RefundType.REFUNDED, '2018-06-19 14:27:56'),
    new Refund('1', '1', '张三', 100, RefundType.REFUNDED, '2018-06-19 14:27:56'),
    new Refund('1', '1', '张三', 100, RefundType.REFUNDED, '2018-06-19 14:27:56'),
  ];

  constructor() { }

  getRefunds(): Refund[] {
    return this.refunds;
  }
}
