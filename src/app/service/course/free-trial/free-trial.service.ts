import { Injectable } from '@angular/core';
import {StatusType} from '../../../model/enum/StatusTypeEnum';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreeTrialService {


  constructor(private _http: HttpClient) { }

  getFreeTrialByEnterpriseId(enterpriseId: number, pageSize: number, pageIndex: number): Observable<any> {
    return this._http.get(`/api/v1/enterprise/${enterpriseId}/trial/list?usePagination=true&targetPage=${pageIndex}&pageSize=${pageSize}`)
  }

  getFreeTrialDetail(trialId: number): Observable<any> {
    return this._http.get(`/api/v1/trial/detail/${trialId}`)
  }

  getCategories(): Observable<any> {
    return this._http.get(`/api/v1/category/list`);
  }

  updateFreeTrial(trialInfo: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(`/api/v1/trial/${trialInfo.trialId}`, {
      name: trialInfo.name,
      detail: trialInfo.detail,
      imgUrl: trialInfo.imgUrl,
      categoryId: trialInfo.categoryId,
      branchId: trialInfo.branchId,
      lecturerId: trialInfo.lecturerId,
      releaseTime: trialInfo.releaseTime,
      status: trialInfo.status
    }, httpOptions)
  }

  createFreeTrial(trialInfo: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post(`/api/v1/branch/${trialInfo.branchId}/trial`, {
      name: trialInfo.name,
      detail: trialInfo.detail,
      imgUrl: trialInfo.imgUrl,
      categoryId: trialInfo.categoryId,
      lecturerId: trialInfo.lecturerId
    }, httpOptions)
  }



}

export class TrialDetail {
  constructor(
    public trialId: number,
    public name: string,
    public detail: string,
    public imgUrl: string,
    public categoryId: number,
    public categoryName: string,
    public branchId: number,
    public branchName: string,
    public lecturerId: number,
    public lecturerName: string,
    public releaseTime: string,
    public status: StatusType
  ) {}
}
