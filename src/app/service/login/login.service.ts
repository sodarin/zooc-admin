import { Injectable } from '@angular/core';
import {Admin} from '../../model/Admin.model';
import {AdminEnum} from '../../model/enum/AdminEnum';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  admin: Admin[] = [
    new Admin(1, 'superadmin', '1', AdminEnum.SYSTEM),
    new Admin(2, 'admin', '1', AdminEnum.ENTERPRISE, 1)
  ];

  currentAdmin: Admin;

  constructor(private _http: HttpClient) { }

  getAdmin(id: string, password: string): Observable<Admin> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post<Admin>('api/v1/administrator/login', {
      administratorId: id,
      password: password
    }, httpOptions)
  }
}
