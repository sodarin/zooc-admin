import { Component, OnInit } from '@angular/core';
import {PromotionStrategy, PromotionStrategyService} from '../../service/promotion/promotion-strategy.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-point-manage',
  templateUrl: './point-manage.component.html',
  styleUrls: ['./point-manage.component.less']
})
export class PointManageComponent implements OnInit {

  promotionStrategy: PromotionStrategy;
  isDisabled: boolean = false;
  checkinPoints: number = 1;
  switchValue: boolean = true;
  pointsPerYuan: number = 0.01;

  constructor(private promotionStrategyService$: PromotionStrategyService,
              private message: NzMessageService) { }

  ngOnInit() {
    this.promotionStrategyService$.getPromotionStrategy(1).subscribe( result => {
      this.promotionStrategy = result;
      this.isDisabled = !this.promotionStrategy.usePoints;
      this.checkinPoints = this.promotionStrategy.checkinPoints;
      this.switchValue = this.promotionStrategy.usePoints;
      this.pointsPerYuan = this.promotionStrategy.pointsPerYuan;
    })
  }

  clickSwitch() {
    this.isDisabled = true;
  }

  updateStrategy() {
    let updateContent;
    if (!this.switchValue) {
      updateContent = {usePoints: this.switchValue}
    } else {
      updateContent = {usePoints: this.switchValue, checkinPoints: this.checkinPoints, pointsPerYuan: this.pointsPerYuan};
    }
    this.promotionStrategyService$.updatePromotionStrategy(1, updateContent).subscribe( result => {
      this.message.success('修改成功');
    }, error2 => {
      this.message.error(error2.error);
      this.switchValue = true;
      this.isDisabled = false;
    })
  }

}
