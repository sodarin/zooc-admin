import { Injectable } from '@angular/core';
import {FreeTrial} from '../../../model/FreeTrialModel';
import {CourseType} from '../../../model/enum/CourseTypeEnum';
import {StatusType} from '../../../model/enum/StatusTypeEnum';

@Injectable({
  providedIn: 'root'
})
export class FreeTrialService {

  freeTrials = [
    new FreeTrial('1','https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', '全网最热Python3入门', CourseType.HTML, '1', StatusType.AVAILABLE, '2018-7-15'),
    new FreeTrial('2','https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', '分布式事务实践',  CourseType.JAVA, '1', StatusType.OFF, '2018-7-15'),
    new FreeTrial('3','https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'Python3入门机器学习',  CourseType.HTML, '3', StatusType.IN_REVIEW, '2018-7-16'),
    new FreeTrial('4','https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'Vue2.5开发从零基础入门到实战项目',   CourseType['C++'], '3', StatusType.AVAILABLE, '2018-7-18')
  ];

  constructor() { }

  getFreeTrials(): FreeTrial[] {
    return this.freeTrials;
  }

  getFreeTrialsTopThree(): FreeTrial[] {
    return this.freeTrials.slice(0, 3);
  }

  getFreeTrialsById(trialId: string): FreeTrial {
    for (let i = 0; i < this.freeTrials.length; i++) {
      if (this.freeTrials[i].trialId == trialId)
        return this.freeTrials[i];
    }
  }
}
