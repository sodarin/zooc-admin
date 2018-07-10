import { Injectable } from '@angular/core';
import {Enterprise} from '../../model/Enterprise.module';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {


  currentEnterprise: Enterprise;

  constructor(private _http: HttpClient) { }


  getEnterpriseById(enterpriseId: number): Observable<Enterprise> {
    return this._http.get<Enterprise>(`/api/v1/enterprise/${enterpriseId}`);
  }

  updateEnterpriseBasicInfo(type: string, content: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const infoType = type == '企业名称'? 'name': 'introduction';
    const body = {};
    body[infoType] = content;
    return this._http.put(`/api/v1/enterprise/${this.currentEnterprise.enterpriseId}`, JSON.stringify(body), httpOptions)
  }

  updateEnterpriseDetail(detail: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(`/api/v1/enterprise/${this.currentEnterprise.enterpriseId}`, {
      detail: detail
    }, httpOptions);
  }
}
