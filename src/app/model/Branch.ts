export class Branch {
  constructor(
    public branchId: string,
    public enterpriseId: number,
    public name: string,
    public address: string,
    public latitude: number,
    public longitude: number,
    public telephone: string
  ){}
}
