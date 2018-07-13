import { Injectable } from '@angular/core';
import {Order} from '../../model/Order.model';
import {OrderEnum} from '../../model/enum/OrderEnum';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private _http: HttpClient) { }

  getOrdersByEnterpriseId(enterpriseId: number, pageSize: number, pageIndex: number): Observable<any> {
    return this._http.get(`/api/v1/enterprise/${enterpriseId}/order/list?usePagination=true&pageSize=${pageSize}&targetPage=${pageIndex}`)
  }

  // getRefundByStatus(enterpriseId: number, pageSize: number, pageIndex: number): Observable<any> {
  //   return this._http.get(`/api/v1/enterprise/${enterpriseId}/order/list?usePagi`)
  // }


}

export class OrderDetail {
  constructor(
    public orderId: number,
    public userId: number,
    public username: string,
    public userEmail: string,
    public userMobile: string,
    public enterpriseId: number,
    public courseId: number,
    public courseName: string,
    public coursePrice: number,
    public time: Date,
    public status: OrderEnum,
    public refundId?: number,
    public refundReason?: string,
    public refundTime?: Date,
  ) {}
}
