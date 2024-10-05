import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(timezone);

const VIETNAM_TIMEZONE = 'VN';

export function convertUTCDate(date?: string) {
  return date ? dayjs(date).utc().toDate() : null;
}

export const isBefore = (
  firstDate: Date | string,
  secondDate: Date | string,
) => {
  return dayjs(firstDate).isBefore(secondDate);
};

export const isAfter = (
  firstDate: Date | string,
  secondDate: Date | string,
) => {
  return dayjs(firstDate).isAfter(secondDate);
};

export const isBetweenDate = (
  startDate: Date | string,
  endDate: Date | string,
  date?: Date | string,
) => {
  return dayjs(date).isBetween(startDate, endDate, 'day', '[]');
};

export const diffDay = (
  firstDate: Date | string,
  secondDate: Date | string,
) => {
  return dayjs(firstDate).diff(secondDate, 'day');
};

export const DATE_FORMAT = 'MM/DD/YYYY';
