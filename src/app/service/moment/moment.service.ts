import { Injectable } from '@angular/core';
import {Moment} from '../../model/Moment.model';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  moments: Moment[] = [
    new Moment('1', '1', 'asdfasdfawefasdfasdfasdf','2018-7-2 14:20:31', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 10),
    new Moment('2', '1', 'asdfasdfawefasdfasdfasdf','2018-7-2 14:20:31', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 10),
    new Moment('3', '1', 'asdfasdfawefasdfasdfasdf','2018-7-2 14:20:31', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 10),
    new Moment('4', '1', 'asdfasdfawefasdfasdfasdf','2018-7-2 14:20:31', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 10),
    new Moment('5', '1', 'asdfasdfawefasdfasdfasdf','2018-7-2 14:20:31', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 10),
    new Moment('6', '1', 'asdfasdfawefasdfasdfasdf','2018-7-2 14:20:31', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 10),
  ];

  constructor() { }

  getMoments(): Moment[] {
    return this.moments;
  }
}
