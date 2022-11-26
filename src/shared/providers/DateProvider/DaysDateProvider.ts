import dayjs from 'dayjs';

import { IDateProvider } from './IDateProvider';

export class DaysDateProvider implements IDateProvider {
  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }
}
