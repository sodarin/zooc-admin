import {CourseType} from './enum/CourseTypeEnum';

export class ElaborateCourse {
  constructor(
    public courseId: number,
    public enterpriseId: number,
    public url: string,
    public title: string,
    public price: number,
    public type: CourseType,
    public address: string,
    public detail?: string,
    public studentNum?: number
  ){}
}
