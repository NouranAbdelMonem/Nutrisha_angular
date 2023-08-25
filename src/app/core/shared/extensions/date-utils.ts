import moment from 'moment';

export class DateUtils {
  static toUTC(date: string | Date) {
    return moment(date)
      .utc(true)
      .add(new Date().getTimezoneOffset(), 'minute')
      .toDate()
      .toISOString();
  }
}
