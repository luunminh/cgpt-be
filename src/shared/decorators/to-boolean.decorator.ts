import { Transform } from 'class-transformer';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ToBoolean(): PropertyDecorator {
  return Transform(({ value }) => {
    if (typeof value === 'string' && value) return value === 'true';
    if (typeof value === 'boolean') return value;
    if (value === null) return null;
    return undefined;
  });
}
