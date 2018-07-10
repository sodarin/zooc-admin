import { Component, OnInit } from '@angular/core';
import {Refund} from '../model/Refund.model';
import {RefundService} from '../service/refund/refund.service';
import {ReservationEnum} from '../model/enum/ReservationEnum';
import {RefundType} from '../model/enum/RefundType';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent implements OnInit {

  refunds: Refund[];
  displayData: Refund[];

  searchValue ='';
  filterAddress = [];
  filterType = [];

  searchAddress = [];
  searchType = [];
  sortMap = {
    title   : null,
    price   :null,
    type    : null,
    orderTime: null
  };

  sortName = null;
  sortValue = null;

  dateRange = '';

  constructor(private refundService$: RefundService) { }

  ngOnInit() {
    this.refunds = this.refundService$.getRefunds();
    this.displayData = [...this.refunds];
  }


  sort(sortName: string, value: boolean): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.sortMap) {
      this.sortMap[ key ] = (key === sortName ? value : null);
    }
    this.search();
  }

  search(): void {
    const filterFunc = (item) => {
      return (this.searchAddress.length ? this.searchAddress.some(address => item.address.indexOf(address) !== -1) : true) &&
        (item.courseId.indexOf(this.searchValue) !== -1);
    };
    const data = this.refunds.filter(item => filterFunc(item));
    this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  }

  print() {
    console.log(this.dateRange);
  }

  checkReservation(data: any) {
    data.status = RefundType.REFUNDED;
  }

}
