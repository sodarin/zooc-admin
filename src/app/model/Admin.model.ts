import {AdminEnum} from './enum/AdminEnum';

export class Admin {
  constructor(
    public administratorId: number,
    public username: string,
    public password: string,
    public type: AdminEnum,
    public enterpriseId?: number
  ){}
}
