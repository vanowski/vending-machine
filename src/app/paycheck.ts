export class Paycheck {
  success: boolean;
  comment: string;

  constructor(success: boolean, comment: string) {
    this.success = success;
    this.comment = comment;
  }
}
