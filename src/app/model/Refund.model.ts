import {RefundType} from './enum/RefundType';

export class Refund {
  constructor(
    public courseId: string,
    public orderId: string,
    public username: string,
    public price: number,
    public status: RefundType,
    public orderTime: string
  ){}
}
