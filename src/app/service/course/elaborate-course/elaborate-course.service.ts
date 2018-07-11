import { Injectable } from '@angular/core';
import {ElaborateCourse} from '../../../model/ElaborateCourse.model';
import {CourseType} from '../../../model/enum/CourseTypeEnum';
import {Observable} from 'rxjs';
import {StatusType} from '../../../model/enum/StatusTypeEnum';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElaborateCourseService {


  constructor(private _http: HttpClient) { }


  getElaborateCourseByEnterpriseId(enterpriseId: number, pageSize: number, pageIndex: number): Observable<any> {
    return this._http.get(`/api/v1/enterprise/${enterpriseId}/course/list?usePagination=true&targetPage=${pageIndex}&pageSize=${pageSize}`)
  }

  getCategories(): Observable<any> {
    return this._http.get(`/api/v1/category/list`);
  }

  getCourseOfferings(courseId: number): Observable<any> {
    return this._http.get(`/api/v1/course/${courseId}/offering/list`);
  }

  getCourseDetail(courseId: number): Observable<any> {
    return this._http.get(`/api/v1/course/detail/${courseId}`)
  }

  deleteCourseOffering(courseOfferingId: number): Observable<any> {
    return this._http.delete(`/api/v1/offering/${courseOfferingId}`)
  }

  updateCourseOfferings(courseOffering: CourseOffering, courseId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(`/api/v1/offering/${courseOffering.courseOfferingId}`, {
      courseId: courseId,
      branchId: courseOffering.branchId,
      lecturerId: courseOffering.lecturerId
    }, httpOptions)
  }

  createCourseOfferings(courseOffering: CourseOffering, courseId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post(`/api/v1/course/${courseId}/offering`, {
      branchId: courseOffering.branchId,
      lecturerId: courseOffering.lecturerId
    }, httpOptions)
  }

  updateCourseInfo(courseInfo: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put(`/api/v1/course/${courseInfo.courseId}`, {
      name: courseInfo.name,
      detail: courseInfo.detail,
      imgUrl: courseInfo.imgUrl,
      categoryId: courseInfo.categoryId,
      price: courseInfo.price
    }, httpOptions)
  }

  createNewCourse(courseInfo: any, enterpriseId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post(`/api/v1/enterprise/${enterpriseId}/course`, {
      name: courseInfo.name,
      detail: courseInfo.detail,
      imgUrl: courseInfo.imgUrl,
      categoryId: courseInfo.categoryId,
      price: courseInfo.price
    }, httpOptions)
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
    public id: number,
    public courseOfferingId?: number,
    public branchId?: string,
    public branchName?: string,
    public lecturerId?: string,
    public lecturerName?: string
  ) {}
}

export class CourseCategory {
  constructor(
    public categoryId: number,
    public name: string
  ){}
}
