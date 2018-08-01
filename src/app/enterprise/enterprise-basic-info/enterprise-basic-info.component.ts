import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../service/login/login.service';
import {EnterpriseService} from '../../service/enterprise/enterprise.service';
import {Admin} from '../../model/Admin.model';
import {Enterprise} from '../../model/Enterprise.module';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'app-enterprise-basic-info',
  templateUrl: './enterprise-basic-info.component.html',
  styleUrls: ['./enterprise-basic-info.component.css']
})
export class EnterpriseBasicInfoComponent implements OnInit {

  admin: Admin;
  enterprise: Enterprise;

  data: any;
  videoUrl;
  videoList = [];


  fileList = [];
  previewImage = '';
  previewVisible = false;
  detail = '';


  constructor(private loginService$: LoginService, private enterpriseService$: EnterpriseService, private message: NzMessageService) { }

  ngOnInit() {
    this.admin = this.loginService$.currentAdmin;
    if (this.admin){
      this.enterpriseService$.getEnterpriseById(this.admin.enterpriseId)
        .subscribe(result => {
          this.enterprise = result;
          this.enterpriseService$.currentEnterprise = result;
          this.data = [
            {
              title: '企业名称',
              introduction: `${this.enterprise.name}`,
              isEditing: false
            },
            {
              title: '企业简介',
              introduction: `${this.enterprise.introduction}`,
              isEditing: false
            }
          ];
          this.fileList = [
            {
              uid: -1,
              name: 'xxx.png',
              status: 'done',
              url: `${this.enterprise.imgUrl}`
            }
          ];
          this.detail = this.enterprise.detail
        })
    }
  }

  edit(item: any) {
    item.isEditing = true
  }

  confirm(item: any) {
    if (item.introduction) {
      this.enterpriseService$.updateEnterpriseBasicInfo(item.title, item.introduction)
        .subscribe(result => {
            this.message.success('修改成功');
            item.isEditing = false;
          },
          error2 => {
            this.message.error(error2.error);
          });
    } else {
      this.message.error('修改内容不能为空');
    }
  }

  cancel(item: any) {
    item.isEditing = false;
  }

  handleChange(info: {file: UploadFile}) {
    if (info.file.status == 'done') {
      this.fileList.splice(0, 1);
      this.enterpriseService$.updateEnterprisePhoto(info.file.response.url).subscribe(result => {
        this.message.success("图片上传成功")
      }, error2 => {
        this.message.error(error2.error);
      })
    }
  }

  handleVideoUpload({file, fileList}) {
    if (file.status == 'done') {
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
        this.videoUrl = file.response.url;
        this.videoList = fileList;
        console.log(this.videoList);
        this.enterpriseService$.updateEnterpriseVideo(file.response.url).subscribe(result => {
          this.message.success('视频上传成功')
        }, error2 => {
          this.message.error(error2.error);
        })
      }
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  updateDetail(event: string) {
    this.enterpriseService$.updateEnterpriseDetail(event)
      .subscribe(result => {
        this.message.success('内容已同步上传')
      }, error => {
        this.message.error(error.error);
      })
  }

}
