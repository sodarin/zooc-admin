import {MomentImg} from '../service/moment/moment.service';

export class Moment {
  constructor(
    public momentId: number,
    public enterpriseId: number,
    public content: string,
    public time: number,
    public fileList?: any,
    public isEidting: boolean = false,
    public likeNum = 0,
    public imgList?: MomentImg[],
  ){}
}
