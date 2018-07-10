import { Component, OnInit} from '@angular/core';
import {BranchService} from '../../service/branch/branch.service';
import {Branch} from '../../model/Branch';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {BranchModalComponent} from '../../modal/branch-modal/branch-modal.component';
import {LoginService} from '../../service/login/login.service';

@Component({
  selector: 'app-enterprise-branch-info',
  templateUrl: './enterprise-branch-info.component.html',
  styleUrls: ['./enterprise-branch-info.component.css']
})
export class EnterpriseBranchInfoComponent implements OnInit {

  branches: Branch[];
  map;

  i = 1;

  constructor(private branch$: BranchService, private modalService: NzModalService, private message: NzMessageService, private loginService$: LoginService) { }

  ngOnInit() {
    this.branch$.getBranchById(this.loginService$.currentAdmin.enterpriseId)
      .subscribe(result => {
        this.branches = result.list;
      });
  }


  deleteRow(i: string): void {
    const dataSet = this.branches.filter(d => d.branchId !== i);
    this.branches = dataSet;
  }

  edit(data: any): void {
    const modal = this.modalService.create({
      nzTitle: '修改分部',
      nzContent: BranchModalComponent,
      nzComponentParams: {
        item: data
      },
      nzFooter: [{
        label: '提交',
        onClick: (componentInstance) => componentInstance.submit()
      }, {
        label: '取消',
        onClick: componentInstance => componentInstance.closeDialog()
      }]
    });
    modal.afterClose.subscribe(result => {
      if (result){
        this.branch$.updateBranchBasicInfo(result)
          .subscribe(next => {
            this.branch$.getBranchById(this.loginService$.currentAdmin.enterpriseId)
              .subscribe(result => {
                this.branches = result.list;
              });
            this.message.success('修改分部信息成功');
          }, error => {
            this.message.error(error.error);
          })
      }
    });
  }

  addNewData() {
    const item = new Branch('', 1, '', '', 0, 0, '');
    const modal = this.modalService.create({
      nzTitle: '新增分部',
      nzContent: BranchModalComponent,
      nzComponentParams: {
        item: item
      },
      nzFooter: [{
        label: '提交',
        onClick: (componentInstance) => componentInstance.submit()
      }, {
         label: '取消',
        onClick: componentInstance => componentInstance.closeDialog()
        }]
    });
    modal.afterClose.subscribe(result => {
      if (result){
        // this.branches.push(result);
        // this.message.success('添加分部信息成功!');
        // this.deleteRow('-1');
        this.branch$.createBranch(this.loginService$.currentAdmin.enterpriseId, result)
          .subscribe(result => {
            this.branch$.getBranchById(1)
              .subscribe(result => {
                this.branches = result.list;
              });
            this.message.success('修改分部信息成功');
          }, error => {
            this.message.error(error.error);
          })
      }
    });
  }

}
