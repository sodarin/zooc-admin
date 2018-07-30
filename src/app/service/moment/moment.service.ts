import { Injectable } from '@angular/core';
import {Moment} from '../../model/Moment.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MomentService {


  constructor(private _http: HttpClient) { }

  getAllMoments(enterpriseId: number, usePagination: boolean, targetPage: number, pageSize: number): Observable<any> {
    return this._http.get(`/api/v1/enterprise/${enterpriseId}/moment/list?usePagination=${usePagination}&targetPage=${targetPage}&pageSize=${pageSize}`);
  }

  getMomentImgsByMomentId(momentId: number): Observable<any> {
    return this._http.get(`/api/v1/moment/${momentId}/img/list`)
  }

  getTotalLikeAmountByMomentId(momentId: number): Observable<any> {
    return this._http.get(`/api/v1/moment/${momentId}/like/total`);
  }

  createMoment(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post(`/api/v1/enterprise/${data.enterpriseId}/moment`, {
      content: data.content
    }, httpOptions)
  }

  updateMoment(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(`/api/v1/moment/${data.momentId}`, {
      content: data.content
    }, httpOptions)
  }

  getCommentsByMomentId(momentId: number, targetPage: number): Observable<any> {
    return this._http.get(`/api/v1/moment/${momentId}/comment/list?usePagination=true&targetPage=${targetPage}&pageSize=5`);
  }

  deleteCommentByCommentId(commentMomentId: number): Observable<any> {
    return this._http.delete(`/api/v1/comment/${commentMomentId}`)
  }


}

export class MomentImg {
  constructor(
    public momentImgIndex: number,
    public momentId: number,
    public imgUrl: string
  ) {}
}

export class MomentComment {
  constructor(
    public momentCommentId: number,
    public userId: number,
    public username: string,
    public userEmail: string,
    public userMobile: string,
    public content: string,
    public time: Date
  ) {}
}
