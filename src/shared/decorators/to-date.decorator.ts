import { Transform } from 'class-transformer';
import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ToDate(): PropertyDecorator {
  return Transform(({ value }) => {
    if (typeof value === 'string' && value) {
      return dayjs(value).toDate().toString() === 'Invalid Date'
        ? undefined
        : dayjs(value).toDate();
    }

    if (value) {
      return <Date>value;
    }

    if (value === null) return null;

    return undefined;
  });
}
