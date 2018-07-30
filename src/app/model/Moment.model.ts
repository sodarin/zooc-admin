import {MomentImg} from '../service/moment/moment.service';

export class Moment {
  constructor(
    public momentId: number,
    public enterpriseId: number,
    public content: string,
    public time: number,
    public isEidting: boolean = false,
    public likeNum?: number,
    public imgList?: MomentImg[],
    public fileList?: any
  ){}
}
