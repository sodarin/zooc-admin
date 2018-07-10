import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Lecturer} from '../../model/Lecturer.model';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {


  constructor(private _http: HttpClient) { }


  getLecturersWithoutPageIndex(enterpriseId: number): Observable<any> {
    return this._http.get(`/api/v1/enterprise/${enterpriseId}/lecturer/list`)
  }

  getLecturersById(enterpriseId: number, pageSize: number, pageIndex: number): Observable<any> {
    return this._http.get(`/api/v1/enterprise/${enterpriseId}/lecturer/list?usePagination=true&targetPage=${pageIndex}&pageSize=${pageSize}`)
  }

  updateLecturerBasicInfo(lecturer: Lecturer): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(`/api/v1/lecturer/${lecturer.lecturerId}`, {
      name: lecturer.name,
      photoUrl: lecturer.photoUrl,
      introduction: lecturer.introduction
    }, httpOptions);
  }

  createLecturer(enterpriesId: number, lecturer: Lecturer): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post(`/api/v1/enterprise/${enterpriesId}/lecturer`, {
      name: lecturer.name,
      photoUrl: lecturer.photoUrl,
      introduction: lecturer.introduction
    }, httpOptions)
  }
}
