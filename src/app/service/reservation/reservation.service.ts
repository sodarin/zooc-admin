import { Injectable } from '@angular/core';
import {Reservation} from '../../model/Reservation.model';
import {ReservationEnum} from '../../model/enum/ReservationEnum';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {



  constructor(private _http: HttpClient) { }

  getReservationsByEnterpriseId(enterpriseId: number, pageSize: number, pageIndex: number, filterConditions?: any): Observable<any> {
    return this._http.get(`/api/v1/enterprise/${enterpriseId}/reservation/list?usePagination=true&pageSize=${pageSize}&targetPage=${pageIndex}&reservationId=${filterConditions.reservationId}&trialNameContaining=${filterConditions.name}&status=${filterConditions.status}`)
  }

  changeReservationStatus(data: any): Observable<any> {
    return this._http.put(`/api/v1/reservation/${data.reservationId}`, {
      status: data.status
    })
  }
}

export class TrialReservationDetail {
  constructor(
    public reservationId: number,
    public userId: number,
    public userMobile: string,
    public userEmail: string,
    public enterpriseId: number,
    public trialId: number,
    public trialName: string,
    public time: Date,
    public message: string,
    public status: ReservationEnum
  ) {}
}
