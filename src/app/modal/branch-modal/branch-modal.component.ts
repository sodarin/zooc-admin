import { Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Branch} from '../../model/Branch';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {Subscription} from 'rxjs';
import {
  AmapAutocompleteService, AmapAutocompleteWrapper, AmapPlaceSearchService,
  AmapPlaceSearchWrapper
} from 'ngx-amap';

@Component({
  selector: 'app-branch-modal',
  templateUrl: './branch-modal.component.html',
  styleUrls: ['./branch-modal.component.css']
})
export class BranchModalComponent implements OnInit {

  @Input() item: Branch;

  result: Branch;
  branchForm: FormGroup;
  address: string = '';

  private _subscription: Subscription;
  private plugin: Promise<AmapPlaceSearchWrapper>;
  private autoComplete: Promise<AmapAutocompleteWrapper>;



  constructor(private fb: FormBuilder, private modal: NzModalRef, private message: NzMessageService, private amapAutoComplete: AmapAutocompleteService, private amapPlaceSearch: AmapPlaceSearchService) {

  }

  ngOnInit() {
    console.log(this.item);
    this.branchForm = this.fb.group({
      name: [this.item.name, [Validators.required]],
      search: [this.item.address],
      latitude: [this.item.latitude, [Validators.required]],
      longitude: [this.item.longitude, [Validators.required]],
      telephone: [this.item.telephone, [Validators.required]]
    });

    this.autoComplete = this.amapAutoComplete.of({
      input: 'address'
    })
  }

  onMapReady(event, address: string) {
    if (event == 'enter'){
      this.searchAddress(address);
    }
  }

  submit() {
    if (this.branchForm.value.name == '' || this.branchForm.value.latitude == '' || this.branchForm.value.longitude == '' || this.branchForm.value.telephone == ''){
      console.log(this.branchForm.value);
      this.message.error('内容不能为空');
    }else{
      this.result = new Branch(this.item.branchId, 1, this.branchForm.value.name, this.branchForm.value.search, this.branchForm.value.latitude, this.branchForm.value.longitude, this.branchForm.value.telephone);
      this.modal.destroy(this.result);
    }
  }

  closeDialog() {
    this.modal.destroy(this.result);
  }

  searchAddress(address: string) {
    console.log(address);
    this.plugin = this.amapPlaceSearch.of({
      pageIndex: 1,
      panel: 'panel'
    });
    address = this.branchForm.value.search;
    this.plugin.then(placeSearch => {
      this._subscription = placeSearch.on('complete').subscribe(event => console.log('PlaceSearch event: "complete"', event));
      this._subscription.add(
        placeSearch.on('listElementClick').subscribe(event => {
          this.branchForm.get('longitude').setValue(event.data.location.lng);
          this.branchForm.get('latitude').setValue(event.data.location.lat);
        })
      )
    });
    this.plugin.then(placeSearch  => placeSearch.search(address));
  }

  clickPoint(event) {
    this.branchForm.get('longitude').setValue(event.lnglat.lng);
    this.branchForm.get('latitude').setValue(event.lnglat.lat);
  }

}
