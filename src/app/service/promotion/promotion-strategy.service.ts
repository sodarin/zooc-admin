import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CouponStatusEnum} from '../../model/enum/CouponStatusEnum';

@Injectable({
  providedIn: 'root'
})
export class PromotionStrategyService {

  constructor(private _http: HttpClient) { }

  getPromotionStrategy(enterpriseId: number): Observable<any> {
    return this._http.get(`/api/v1/promotion-strategy/${enterpriseId}`);
  }

  updatePromotionStrategy(enterpriseId: number, updateContent: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(`/api/v1/promotion-strategy/${enterpriseId}`, {
      useCoupons: updateContent.useCoupons,
      usePoints: updateContent.usePoints,
      pointsPerYuan: updateContent.pointsPerYuan,
      checkinPoints: updateContent.checkinPoints
    }, httpOptions)
  }

  getCouponList(enterpriseId: number, usePagination: boolean, targetPage: number, pageSize: number): Observable<any> {
    return this._http.get(`/api/v1/enterprise/${enterpriseId}/coupon/list`);
  }
}

export class PromotionStrategy {
  constructor(
    public enterpriseId: number,
    public useCoupons: boolean,
    public usePoints: boolean,
    public pointsPerYuan: number,
    public checkinPoints: number
  ) {}
}

export class Coupon {
  constructor(
    public couponId: number,
    public enterpriseId: number,
    public value: number,
    public threshold: number,
    public time: Date,
    public status: CouponStatusEnum
  ) {}
}
