import { Injectable } from '@angular/core';
import {Refund} from '../../model/Refund.model';
import {RefundType} from '../../model/enum/RefundType';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RefundService {


  constructor(private _http: HttpClient) { }

  getRefundsByEnterpriseId(enterpriseId: number, pageIndex: number, pageSize: number, filterConditions?: any): Observable<any> {
    return this._http.get(`/api/v1/enterprise/${enterpriseId}/refund/list?usePagination=true&pageSize=${pageSize}&targetPage=${pageIndex}&orderId=${filterConditions.orderId}&userEmail=${filterConditions.userEmail}&userMobile=${filterConditions.userMobile}&courseNameContaining=${filterConditions.name}&status=${filterConditions.status}`)
  }

  changeRefundStatus(data: any): Observable<any> {
    return this._http.put(`/api/v1/order/${data.orderId}`, {
      status: data.status
    })
  }
}
