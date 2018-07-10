import { Injectable } from '@angular/core';
import {Branch} from '../../model/Branch';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BranchService {


  branches: Branch[] = [
    new Branch('1', 1, '东软第一分部', '这里是一个地址', 0, 0, '18804015102'),
    new Branch('2', 2, '中软第一分部', '这里是一个地址', 0, 0, '18804015102'),
    new Branch('3', 1, '东软第二分部', '这里是一个地址', 0, 0, '18804015102'),
    new Branch('4', 1, '东软第三分部', '这里是一个地址', 0, 0, '18804015102'),
    new Branch('5', 1, '东软第四分部', '这里是一个地址', 0, 0, '18804015102'),
    new Branch('6', 3, '58同城第一分部', '这里是一个地址', 0, 0, '18804015102'),
    new Branch('7', 1, '东软第五分部', '这里是一个地址', 0, 0, '18804015102'),
  ];

  constructor(private _http: HttpClient) { }
  getBranchByIdOrigin(enterpriseId: number): Branch[] {
    return this.branches.filter(branch => branch.enterpriseId == enterpriseId)
  }

  getBranchById(enterpriseId: number): Observable<any> {
    return this._http.get(`/api/v1/enterprise/${enterpriseId}/branch/list`)
  }

  getBranchByBranchId(branchId: string): Branch {
    for (let i = 0; i < this.branches.length; i++) {
      if (this.branches[i].branchId == branchId) {
        return this.branches[i]
      }
    }
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
