import { Injectable } from '@angular/core';
import {ElaborateCourse} from '../../../model/ElaborateCourse.model';
import {CourseType} from '../../../model/enum/CourseTypeEnum';
import {Observable} from 'rxjs';
import {StatusType} from '../../../model/enum/StatusTypeEnum';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElaborateCourseService {


  constructor(private _http: HttpClient) { }


  getElaborateCourseByEnterpriseId(enterpriseId: number): Observable<any> {
    return this._http.get(`/api/v1/enterprise/${enterpriseId}/course/list`)
  }

  getCategories(): Observable<any> {
    return this._http.get(`/api/v1/category/list`);
  }

  getCourseOfferings(courseId: number): Observable<any> {
    return this._http.get(`/api/v1/course/${courseId}/offering/list`);
  }
}

export class CourseDetail {
  constructor(
    public courseId: number,
    public name: string,
    public detail: string,
    public imgUrl: string,
    public categoryId: number,
    public categoryName: string,
    public releaseTime: string,
    public price: number,
    public statusDesc: StatusType,
    public courseOfferings: CourseOffering
  ){}

}

export class CourseOffering {
  constructor(
    public courseOfferingId: number,
    public branchId: number,
    public branchName: string,
    public lecturerId: number,
    public lecturerName: string
  ) {}
}

export class CourseCategory {
  constructor(
    public categoryId: number,
    public name: string
  ){}
}
