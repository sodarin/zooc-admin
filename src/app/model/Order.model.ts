import {OrderEnum} from './enum/OrderEnum';

export class Order {
  constructor(
    public orderId: string,
    public courseId: string,
    public username: string,
    public price: number,
    public status: OrderEnum,
    public orderTime: string,
    public transactionSerial: string
  ) {}
}
