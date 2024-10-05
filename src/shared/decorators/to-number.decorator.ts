import { Transform } from 'class-transformer';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ToNumber(): PropertyDecorator {
  return Transform(({ value }) => {
    if (typeof value === 'string' && value) {
      if (!Number.isNaN(Number(value))) return +value;
    }
    if (typeof value === 'number') return value;
    if (value === null) return null;
    return undefined;
  });
}
