import { Injectable } from '@angular/core';
import {Branch} from '../../model/Branch';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BranchService {



  constructor(private _http: HttpClient) { }


  getBranchById(enterpriseId: number): Observable<any> {
    return this._http.get(`/api/v1/enterprise/${enterpriseId}/branch/list`)
  }


  createBranch(enterpriseId: number, branch: Branch): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post(`/api/v1/enterprise/${enterpriseId}/branch`, {
      name: branch.name,
      address: branch.address,
      latitude: branch.latitude,
      longitude: branch.longitude,
      telephone: branch.telephone
    }, httpOptions)
  }

  updateBranchBasicInfo(branch: Branch): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(`/api/v1/branch/${branch.branchId}`, {
      name: branch.name,
      address: branch.address,
      latitude: branch.latitude,
      longitude: branch.longitude,
      telephone: branch.telephone
    }, httpOptions);
  }
}
