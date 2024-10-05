import { Transform } from 'class-transformer';
import _ from 'lodash';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ToArray(): PropertyDecorator {
  return Transform(({ value }) => {
    if (_.isArray(value)) return <string[]>value;

    if (value) {
      return [<string>value];
    }

    if (value === null) return null;

    return undefined;
  });
}
