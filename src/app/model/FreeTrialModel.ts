import {CourseType} from './enum/CourseTypeEnum';
import {StatusType} from './enum/StatusTypeEnum';

export class FreeTrial {
  constructor(
    public trialId: string,
    public url: string,
    public title: string,
    public type: CourseType,
    public branchId: string,
    public statusType: StatusType,
    public releaseTime: string,
    public lecturerId?: string,
    public detail?: string,
    public studentNum?: number
  ){}
}
